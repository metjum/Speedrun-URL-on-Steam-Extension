chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'fetchSpeedrunLink') {
      const steamAppId = message.appId;
      let gameName = '';
      let gameImage = '';
      let gameModerators = '';
      let gameReleaseDate = '';
      let gameCreationDate = '';
  
      // Načítání dat z API Steamu
      fetch(`https://store.steampowered.com/api/appdetails?appids=${steamAppId}`)
        .then(response => response.json())
        .then(data => {
          const appData = data[steamAppId].data;
  
          if (appData) {
            gameName = appData.name || 'Unknown Game';
          } else {
            throw new Error('App data not found');
          }
  
          // Načítání dat z API Speedrun
          return fetch(`https://www.speedrun.com/api/v1/games?name=${encodeURIComponent(gameName)}`);
        })
        .then(response => response.json())
        .then(data => {
          const gameData = data.data[0];
          const speedrunLink = gameData ? gameData.weblink : null;
          gameImage = gameData && gameData.assets && gameData.assets['cover-tiny'] ? gameData.assets['cover-tiny'].uri : '';
          gameModerators = gameData && gameData.moderators ? Object.keys(gameData.moderators).join(', ') : 'N/A';
          gameReleaseDate = gameData && gameData['release-date'] ? gameData['release-date'] : 'N/A';
          gameCreationDate = gameData && gameData.created ? gameData.created : 'N/A';
  
          // Uložení dat do úložiště
          chrome.storage.local.set({
            'gameName': gameName,
            'gameImage': gameImage,
            'speedrunLink': speedrunLink,
            'gameModerators': gameModerators,
            'gameReleaseDate': gameReleaseDate,
            'gameCreationDate': gameCreationDate
          });
  
          sendResponse({ link: speedrunLink });
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
          sendResponse({ link: null });
        });
  
      return true; // Označení, že odpověď bude asynchronní
    }
  });
  