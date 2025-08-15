// Spotify.js
const clientId = 'a8c1e70c2bc34e519f8322e8b5854841'; // Replace with your Spotify App's Client ID
const redirectUri = window.location.hostname.includes('localhost')
  ? 'https://localhost:3000/'
  : 'https://magical-moonbeam-855e65.netlify.app/'; // Local & Netlify handling

const scope = 'playlist-modify-public playlist-modify-private';
let accessToken;

// Step 1: Get Access Token
export const Spotify = {
  getAccessToken() {
    if (accessToken) return accessToken;

    // Check if token exists in URL after redirect
    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenMatch && expiresMatch) {
      accessToken = tokenMatch[1];
      const expiresIn = Number(expiresMatch[1]);

      // Clear token after expiry
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // Clean URL

      return accessToken;
    }

    // Step 2: Redirect to Spotify authorization if no token
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    window.location = authUrl;
  },

  // Step 3: Search
  async search(term) {
    const token = this.getAccessToken();
    const endpoint = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`;

    const response = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
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
  }
};











// src/util/Spotify.js
// const clientId = 'a8c1e70c2bc34e519f8322e8b5854841';
// const redirectUri = 'https://magical-moonbeam-855e65.netlify.app/';
// let accessToken;

// const Spotify = {
//   getAccessToken() {
//     console.log("=== getAccessToken called ===");

//     if (accessToken) {
//       console.log("Token already set:", accessToken);
//       return accessToken;
//     }

//     const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
//     const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

//     console.log("URL:", window.location.href);
//     console.log("Token Match:", tokenMatch);
//     console.log("Expires Match:", expiresInMatch);

//     if (tokenMatch && expiresInMatch) {
//       accessToken = tokenMatch[1];
//       const expiresIn = Number(expiresInMatch[1]);
//       console.log(`Token obtained: ${accessToken}, expires in ${expiresIn} seconds`);

//       window.setTimeout(() => accessToken = '', expiresIn * 1000);
//       window.history.pushState('Access Token', null, '/');
//       return accessToken;
//     } else {
//       const scope = 'playlist-modify-public';
//       const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${scope}&redirect_uri=${encodeURIComponent(redirectUri)}`;
//       console.log("Redirecting to Spotify auth URL:", authUrl);
//       window.location = authUrl;
//     }
//   },

//   async search(term) {
//     console.log(`=== search() called with term: "${term}" ===`);
//     const token = this.getAccessToken();
//     console.log("Token used for search:", token);

//     try {
//       const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       console.log("Search API response status:", response.status);

//       const jsonResponse = await response.json();
//       console.log("Search API JSON:", jsonResponse);

//       if (!jsonResponse.tracks) return [];
//       return jsonResponse.tracks.items.map(track => ({
//         id: track.id,
//         name: track.name,
//         artist: track.artists[0].name,
//         album: track.album.name,
//         uri: track.uri
//       }));
//     } catch (error) {
//       console.error("Search API error:", error);
//       return [];
//     }
//   },

//   async savePlaylist(name, trackUris) {
//     console.log(`=== savePlaylist() called with name: "${name}", tracks:`, trackUris);

//     if (!name || !trackUris.length) {
//       console.warn("Playlist name or track URIs missing, aborting save.");
//       return;
//     }

//     const token = this.getAccessToken();
//     const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

//     try {
//       const meResponse = await fetch('https://api.spotify.com/v1/me', { headers });
//       const meJson = await meResponse.json();
//       console.log("Current user profile:", meJson);

//       const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${meJson.id}/playlists`, {
//         headers,
//         method: 'POST',
//         body: JSON.stringify({ name })
//       });
//       const playlistJson = await playlistResponse.json();
//       console.log("New playlist created:", playlistJson);

//       const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistJson.id}/tracks`, {
//         headers,
//         method: 'POST',
//         body: JSON.stringify({ uris: trackUris })
//       });
//       console.log("Tracks added to playlist, response:", addTracksResponse.status);
//     } catch (error) {
//       console.error("Error saving playlist:", error);
//     }
//   }
// };

// export default Spotify;









// // src/util/Spotify.js
// const clientId = 'a8c1e70c2bc34e519f8322e8b5854841';
// const redirectUri = 'https://magical-moonbeam-855e65.netlify.app/';
// let accessToken;

// const Spotify = {
//   getAccessToken() {
//     if (accessToken) return accessToken;

//     const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
//     const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

//     if (tokenMatch && expiresInMatch) {
//       accessToken = tokenMatch[1];
//       const expiresIn = Number(expiresInMatch[1]);
//       window.setTimeout(() => accessToken = '', expiresIn * 1000);
//       window.history.pushState('Access Token', null, '/');
//       return accessToken;
//     } else {
//       const scope = 'playlist-modify-public';
//       window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${scope}&redirect_uri=${redirectUri}`;
//     }
//   },

//   async search(term) {
//     const token = this.getAccessToken();
//     const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     const jsonResponse = await response.json();
//     if (!jsonResponse.tracks) return [];
//     return jsonResponse.tracks.items.map(track => ({
//       id: track.id,
//       name: track.name,
//       artist: track.artists[0].name,
//       album: track.album.name,
//       uri: track.uri
//     }));
//   },

//   async savePlaylist(name, trackUris) {
//     if (!name || !trackUris.length) return;

//     const token = this.getAccessToken();
//     const headers = { Authorization: `Bearer ${token}` };

//     const meResponse = await fetch('https://api.spotify.com/v1/me', { headers });
//     const meJson = await meResponse.json();
//     const userId = meJson.id;

//     const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
//       headers,
//       method: 'POST',
//       body: JSON.stringify({ name })
//     });
//     const playlistJson = await playlistResponse.json();

//     return fetch(`https://api.spotify.com/v1/playlists/${playlistJson.id}/tracks`, {
//       headers,
//       method: 'POST',
//       body: JSON.stringify({ uris: trackUris })
//     });
//   }
// };

// export default Spotify;
