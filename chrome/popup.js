document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get([
        'gameName', 
        'gameImage', 
        'speedrunLink', 
        'gameModerators', 
        'gameReleaseDate', 
        'gameCreationDate'
    ], function(data) {
        document.getElementById('game-name').textContent = data.gameName || 'Unknown Game';
        document.getElementById('game-image').src = data.gameImage || '';
        document.getElementById('game-moderators').textContent = `Moderators: ${data.gameModerators || 'N/A'}`;
        document.getElementById('game-release-date').textContent = `Release Date: ${data.gameReleaseDate || 'N/A'}`;
        document.getElementById('game-creation-date').textContent = `Added on: ${data.gameCreationDate || 'N/A'}`;
        document.getElementById('speedrun-link').href = data.speedrunLink || '#';
        document.getElementById('speedrun-link').textContent = data.speedrunLink ? 'View on Speedrun.com' : 'No Speedrun Link';
    });
});
