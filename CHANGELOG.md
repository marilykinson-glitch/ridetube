# Changelog

## App 0.3.46, service 0.3.35

- Video quality: a 1080p choice (experimental: H.264 1080p, shown at the screen's 720 lines; slower to open, may stutter). Auto is unchanged.
- After a seek, the player's times from the old place (until its setTime lands) are no longer taken, forward or back: the clock on screen and the picture are not set back there for a moment.
- The picture watchdog acts after 2.5 s without a frame shown (was 4 s).

## Service 0.3.34 (app 0.3.45)

- Premium is also told from the player answers when Home carries no mark: three plays in a row without ads = Premium, ads in one = not. Kept with the account, so the next start shows it at once (`premium: ...` in the log).

## App 0.3.45, service 0.3.33

- The audio-only (podcast) player screen, unused since 0.3.44, is removed from the code.

## App 0.3.44, service 0.3.33

- The picture shows while the car moves; the "Video while driving" setting is gone (no setting, no coding of the unit needed).
- Home with nobody signed in: no "Xem tiếp" shelf and no watched bars on the tiles (the last account's watching stays out of sight).
- Home with nobody signed in and no network: the connection error is said, not the sign-in card.

## App 0.3.43, service 0.3.33

- Sign-in card: its last line no longer runs past the card's right edge (shorter, and the card is as wide as it).

## App 0.3.42, service 0.3.33

- A video resumed where it was left no longer starts over on a touch: until the player's setTime lands, its times (the file's start) are not taken as the place, the app is told the resume place at once, and +10 s / -10 s wait for it. A setTime the player dropped is sent once more.
- Sought past the picture fetched so far (the video is downloaded front to back): the player says so ("Hình chưa tải tới đoạn này — đã tải tới m:ss, tiếng vẫn phát") and the progress bar shows how far the picture is there, instead of a frozen frame with no word.

## App 0.3.41, service 0.3.32

- Signing in while the general Home loads no longer leaves Home empty: that load answers with the account's own Home.
- Premium in the header only when the service found the account's Premium mark (not known: not shown). When it finds none, the log lists where the Home answer mentions premium (`premium: no mark ... mentions: ...`).

## App 0.3.40, service 0.3.31

- Home with nobody signed in: general videos (YouTube's own Home for no account when it gives one, else a shelf per topic from searches) with a Sign in tile first. The card with the QR code comes only when Sign in is asked (the tile, or Sign in in the menu); Subscriptions, Watch later and Library still show it. The card says the sign-in happens on the phone, on Google's page.
- Premium in the header: shown with the country (VN); hidden when the service saw ads in the account's player answer. The service looks for the Premium mark in the account's Home (`premium` event; `premium: no mark ...` in the log when it finds none).

## Service 0.3.30 (app 0.3.39)

- A video that opens black and silent: when the state is playing and the BMW player sends no time for 6 s (the playFile was accepted, nothing plays), the player is started again by itself on a new connection, where it was. Three times in vain: an error with Try again instead of a black screen. Logged as `audio: no time from the player ...`.

## Service 0.3.29 (app 0.3.39)

- Black picture with the sound running: the service now watches the frames actually shown (ytdec's `shown`), not only decoded. No frame shown for 4 s while the sound plays: ytdec is sought to the clock by itself (what scrubbing by hand did; the sound is not touched); twice in vain, ytdec is started again. Logged as `picture: ...`.
- The picture given up after two ytdec deaths ("video failed, audio only") is tried again every 15 s (4 times a video) instead of staying off until the video is opened again; a picture that runs well clears the count.

## App 0.3.39, service 0.3.28

- Video while driving: with the setting already on, opening the app while the car moves now shows the picture (it came up in audio-only mode, "Chỉ âm thanh · xe đang chạy"). Only switching it on while moving still waits for a stop.
- Player: the Điện thoại (On phone) button and its QR card are gone; the Tiếp theo button takes the top right.

## App 0.3.38, service 0.3.28

- Info tab: the channel name shows even when the answer does not carry it (the playing video's own), and the description is also looked for as attributed text. When the answer has views and dates but no description, the service log says so with the renderers of the answer (`video info without a description ...`).

## App 0.3.37, service 0.3.27

- Info tab: the search for views, date, subscribers and description no longer reads inside the related videos' blocks (tiles, shelves, lists), so another video's figures are never shown for the playing one; missing, they stay empty.

## App 0.3.36, service 0.3.26

- Info tab: the video's views, date, subscribers and description are looked for wherever they sit in the watch-next answer (the TV's answer did not have them under the renderers read before). Without them the tab shows the title and channel. When none are found the service log names the renderers of the answer (`no video info in the answer ... renderers: ...`).

## App 0.3.35, service 0.3.25

- Player, Up next panel: a second tab, Thông tin (Info): views, date, the channel and its subscribers, and the description of the video. Read from the same watch-next answer as the Up next list (the `related` event now carries `info`; when the answer has none, the log says what it holds instead).
- An underrun recovery that was cancelled between its pause and its resume (a fatal error came in) no longer starts the audio again.

## App 0.3.34, service 0.3.24

- Player: a long title no longer runs under the Tiếp theo and Điện thoại buttons (it is cut before them).

## App 0.3.33, service 0.3.24

- Player: a Tiếp theo (Up next) button on the overlay opens a panel over the right of the picture with the next videos (thumbnail, length, two lines of title, channel). Press one to play it and carry on from there; the button closes the panel. The panel takes the place of the Quality and Zoom buttons while open.

## App 0.3.32, service 0.3.24

- A fatal playback error while an underrun recovery is under way now cancels the recovery: it no longer opens the audio again after the app has gone to the error screen (the sound kept playing behind the error).
- The underrun count (3 a minute) starts again with each video.

## App 0.3.31, service 0.3.23

- A burst of `ITEM_BUFFER_UNDERRUN` events no longer breaks the recovery: those arriving while the player is being started again are ignored (one stall, one restart).
- An error of the old video tearing down (about 600 ms) can no longer turn a video opened in the meantime into the error screen.

## App 0.3.30, service 0.3.22

- `ITEM_BUFFER_UNDERRUN` arriving while the audio switches from the temporary head file to the full file (or waits for it) is ignored instead of ending in the error screen with the audio connection closed.

## App 0.3.29, service 0.3.21

- Stop, then a new video at once: the old Stop finishing late no longer clears the new video's state (it ended in `Cannot read properties of null` and no picture or sound).

## App 0.3.28, service 0.3.20

- Search is now a page in the app (YouTube style) instead of the BMW menu: a big search bar that opens the keyboard, suggestion chips, and the recent searches (tap one to search again).
- Playback error `ITEM_BUFFER_UNDERRUN` (long videos) no longer ends in the error screen: on the head file it waits for the full audio, on the full file it restarts the player where it was (3 times a minute at most).

## App 0.3.27, service 0.3.19

- Autoplay no longer stops at "Đã phát xong": when the list runs out, the video YouTube plays next (watch-next) carries on. New daemon command `related`.
- The progress bar no longer shows SponsorBlock segments in green or yellow (they are still skipped, and the Skip button stays).

## App 0.3.26, service 0.3.18

- Pause, Resume, Seek and Fill sent while a video is starting (a quality change, or a new video) are no longer dropped:
  the start comes up as the user last asked. A new video asked while another is starting, then Stop, stays stopped.
- The quality being asked again during a restart: the last one wins, and the place and mode carry over.
- `tools/test_sequences.js`: the command-sequence matrix; `--seed 12345 --cases 12` passes 50/50.

## App 0.3.25, service 0.3.17

- Stop right after changing the video quality keeps the video stopped (the restart is cancelled; it used to start the old video again).

## App 0.3.24, service 0.3.16

- Changing the video quality keeps a paused video paused (it started playing again).
- Changing the video quality in the first 10 seconds comes back to where it was (it restarted from 0).

## App 0.3.23, service 0.3.15

- Video quality changed in Settings now applies to the video playing (as the player's button did); both go through one path.
- The service sends up to 100 videos for History, Liked videos, playlists and searches (it cut them at 50).

## App 0.3.22, service 0.3.14

- Playlists, History, Liked videos and search results show up to 100 videos (they were cut at 20, search at 10).
- Autoplay goes on through the whole list: it used to stop at the end of the four-wide row the video was picked from.

## App 0.3.21, service 0.3.13

- YouTube is asked in Vietnamese (`hl=vi`, `gl=VN`): view counts, ages, shelf names and the Home feed come as
  YouTube's own Vietnamese. The English-to-Vietnamese fallback in `vi.js` stays for older answers.
- Library page (rail): History, Liked videos and the account's playlists; a playlist opens like a channel page.
- Shorts show as normal video tiles (`short: true`) instead of being dropped.
- Members-only detection also reads the Vietnamese badge text.

## Service 0.3.9

- Videos play again: each video's folder was 0700, so BMW's media engine (its own uid) could not open the audio
  and the car answered `ITEM_UNPLAYABLE`. The folders are now 0711: the engine opens the audio by name, and
  nobody can list them. Folders cached by 0.3.8 are fixed when they are played.

## App 0.3.8

- Search: the menu opened from the rail's Search stays open. Before, the video page came back over it about a
  second later, because the head unit keeps that page listed under the menu. The kit now shows the page only
  while it is the screen of ours that came to the front last.

## App 0.3.7, service 0.3.8

- Video while driving takes effect only once switched on while the car is parked.
- The download stops when less than 256 MiB is left free on the head unit.
- README: data use, tested on, uninstall.

## App 0.3.6, service 0.3.7

First public release.
