// src/components/App/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

function App() {
  useEffect(() => {
    Spotify.handleRedirect();
  }, []);

  
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const search = async (term) => {
    const results = await Spotify.search(term);
    setSearchResults(results);
  };

  const addTrack = (track) => {
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) return;
    setPlaylistTracks(prev => [...prev, track]);
  };

  const removeTrack = (track) => {
    setPlaylistTracks(prev => prev.filter(current => current.id !== track.id));
  };

  const updatePlaylistName = (name) => setPlaylistName(name);

  const savePlaylist = async () => {
    const trackUris = playlistTracks.map(track => track.uri);
    await Spotify.savePlaylist(playlistName, trackUris);
    setPlaylistName('New Playlist');
    setPlaylistTracks([]);
  };

  return (
    <div>
      <h1>Jammming 🎵</h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults results={searchResults} onAdd={addTrack} />
          <Playlist
            playlistName={playlistName}
            tracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
