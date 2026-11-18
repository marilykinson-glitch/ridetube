# Changelog

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
