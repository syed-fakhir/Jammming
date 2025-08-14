// src/components/TrackList/TrackList.js
import React from 'react';
import Track from '../Track/Track';

function TrackList({ tracks, onAdd, onRemove, isRemoval }) {
  return (
    <div className="TrackList">
      {tracks.map(track => (
        <Track key={track.id} track={track} onAdd={onAdd} onRemove={onRemove} isRemoval={isRemoval} />
      ))}
    </div>
  );
}

export default TrackList;
