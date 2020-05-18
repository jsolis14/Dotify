# Dotify
Dotify is a front end client that uses the Spotify API to preform certain actions on behalf of a spotify user. Below are a list of actions you will be able to preform with this application

> note that a valid spotify account is required as this application uses spotify's implicit authorization flow to function correctly

[Link to live website](https://aadotify.herokuapp.com/ "Dotify Homepage")

## Scopes used in Dotify
* streaming user-read-email
* user-read-private
* user-read-playback-state
* user-modify-playback-state
* user-library-read
* user-library-modify
* playlist-read-private
* playlist-read-collaborative
* playlist-modify-public
* playlist-modify-private

## What will you be able to do with Dotify?

### Music Player
- be able to create a spotify-connect device
- pause/play music
- skip songs
- when a user clicks a song, play the song through the created connect device
- volume controls
- be able to control the music player through another spotify-connect-device

### Playlist-bar
- displays your current playlist
- create a new playlist

### playlist-detail
- when a playlist is clicked, show songs contained in the playlist
- when a song is clicked, play the song in the music player

### Searchbar
- search for a song or artist
- when showing results
  - click on a song to play it
  - click on a artist to view details

### Artist Page
- see artist info
- see artist top songs
- when clicked on a song play it
- see related artists

## To run locally
- Clone the repo
- Run the following command ```npm install``` in tour terminal
- add a .env file with the corresponding keys
  - REACT_APP_REDIRECT_URI
  > this will be the url spotify will redirect to once the client logs in through spotify
  - REACT_APP_CLIENT_ID
  > this will be **YOUR OWN** client id that you can get from [Spotify for Developers](https://developer.spotify.com/)
- run ```npm run dev``` in your terminal to run in the development environment
