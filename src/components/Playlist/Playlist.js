// src/components/Playlist/Playlist.js
import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

function Playlist({ playlistName, tracks, onRemove, onNameChange, onSave }) {
  const handleNameChange = (e) => onNameChange(e.target.value);

  return (
    <div className="Playlist">
      <input value={playlistName} onChange={handleNameChange} />
      <TrackList tracks={tracks} onRemove={onRemove} isRemoval={true} />
      <button onClick={onSave}>SAVE TO SPOTIFY</button>
    </div>
  );
}

export default Playlist;
