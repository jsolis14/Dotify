# Dotify
 Dotify is a front end client that uses the Spotify API to preform certain actions on behalf of a spotify user. Below are a list of actions you will be able to preform with this application

> note that a valid spotify account is required as this application uses spotify's implicit authorization flow to function correctly

## Project Goals

### OAuth
- use spotifys implicit grant flow to authorize my application with spotifys API
### Music Player
- be able to create a spotify-connect device
- pause/play music
- skip songs
- when a user clicks a song, play the song through the created connect device
- volume controls
- be able to control the music player through another spotify-connect-device

### Playlist-bar
- displays the users playlist
- can create a new playlist

### playlist-detail
- when a playlist is clicked, show songs contained in the playlist
- when a song is clicked, play the song in the music player

### Searchbar
- search for a song, artist, or playlist
- when showing results
  - click on a song to play it
  - click on a playlist to view details
  - click on a artist to view details

### Artist Page
- show artist info
- show artist top songs
- when clicked on a song play it

## Bonus
### Top Artist/Song page
- show users top artist over 3months, 6months, and 4 years
- show users top songs over 3months, 6months, and 4 years
- maybe include visuals such as charts
