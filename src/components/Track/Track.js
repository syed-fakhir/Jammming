// src/components/Track/Track.js
import React from 'react';

function Track({ track, onAdd, onRemove, isRemoval }) {
  const addTrack = () => onAdd(track);
  const removeTrack = () => onRemove(track);

  return (
    <div className="Track">
      <div className="Track-info">
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>
      {isRemoval ? <button onClick={removeTrack}>-</button> : <button onClick={addTrack}>+</button>}
    </div>
  );
}

export default Track;
