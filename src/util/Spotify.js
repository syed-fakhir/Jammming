// src/util/Spotify.js
const clientId = 'a8c1e70c2bc34e519f8322e8b5854841';
const redirectUri = 'https://magical-moonbeam-855e65.netlify.app/';
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) return accessToken;

    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenMatch && expiresInMatch) {
      accessToken = tokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const scope = 'playlist-modify-public';
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${scope}&redirect_uri=${redirectUri}`;
    }
  },

  async search(term) {
    const token = this.getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const jsonResponse = await response.json();
    if (!jsonResponse.tracks) return [];
    return jsonResponse.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri
    }));
  },

  async savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) return;

    const token = this.getAccessToken();
    const headers = { Authorization: `Bearer ${token}` };

    const meResponse = await fetch('https://api.spotify.com/v1/me', { headers });
    const meJson = await meResponse.json();
    const userId = meJson.id;

    const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      headers,
      method: 'POST',
      body: JSON.stringify({ name })
    });
    const playlistJson = await playlistResponse.json();

    return fetch(`https://api.spotify.com/v1/playlists/${playlistJson.id}/tracks`, {
      headers,
      method: 'POST',
      body: JSON.stringify({ uris: trackUris })
    });
  }
};

export default Spotify;
