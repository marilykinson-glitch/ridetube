#!/usr/bin/env python3
"""Package the audio fix with the verified upstream 0.3.9 decoder and fetcher."""
import argparse
import gzip
import hashlib
import io
import json
from pathlib import Path
import tarfile

BASE_SHA256 = "63dc4d7deb18849662d7d90efb41017483db5f835e6124fb90e6f5cd45300f5d"
SERVICE = Path(__file__).resolve().parents[1] / "native" / "jap-ridetube-d"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("base", type=Path)
    parser.add_argument("out", type=Path)
    args = parser.parse_args()
    if hashlib.sha256(args.base.read_bytes()).hexdigest() != BASE_SHA256:
        parser.error("upstream service checksum mismatch")
    source = (SERVICE / "ytd.js").read_bytes()
    version = json.loads((SERVICE / "component.json").read_text())["version"]
    with tarfile.open(args.base) as base:
        manifest = json.load(base.extractfile("component.json"))
        manifest["version"] = version
        next(f for f in manifest["files"] if f["path"] == "ytd.js")["sha256"] = hashlib.sha256(source).hexdigest()
        replacements = {"component.json": (json.dumps(manifest, indent=2) + "\n").encode(), "files/ytd.js": source}
        artifact = args.out / f"{manifest['id']}@{version}.tgz"
        with artifact.open("wb") as raw, gzip.GzipFile(filename="", mode="wb", fileobj=raw, mtime=0) as gz, tarfile.open(fileobj=gz, mode="w") as out:
            for member in base:
                data = replacements.get(member.name)
                if data is not None:
                    member.size = len(data)
                    out.addfile(member, io.BytesIO(data))
                else:
                    out.addfile(member, base.extractfile(member) if member.isfile() else None)


if __name__ == "__main__":
    main()
