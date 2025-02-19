const playButton = document.getElementById("playBtn");
const prevButton = document.getElementById("prevBtn");
const nextButton = document.getElementById("nextBtn");
const audioPlayer = document.getElementById("audioPlayer");
const audioSource = document.getElementById("audioSource");
const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");
const songList = document.getElementById("songList");
const languageSelect = document.getElementById("language");

let currentSongIndex = 0;
let songs = {
    hindi: [

      
        { title: "Nirmohiya", artist: "Prithvi Gandharv and Suvarna Tiwari", url: "songs/Nirmohiya.mp3" },
        { title: "Chand ne Kaho", artist: "", url: "songs/Chand ne kaho.mp3" },
      
       
    ],
    english: [
        { title: "Really like to party", artist: "", url: "songs/i really like to party.mp3" },
        { title: "Dreamers", artist: "football", url: "songs/Dreamers.mp3" },
        { title: "All Time low", artist: "", url: "songs/All time low.mp3" },
      
    ],
    marathi: [
      
        { title: "Mi maj harpun", artist: "", url: "songs/Mi maj harpun.mp3" },
        { title: "Hich aamuchi Prarthana", artist: "", url: "songs/Hich aamuchi Prarthana.mp3" },
        { title: "Nam tuze Gheta Deva", artist: "", url: "songs/nam tuze gheta deva 2.mp3" },
        { title: "Tambdi chambdi", artist: "", url: "songs/Tambdi chambdi.mp3" }
    ]
};

function loadSongs() {
    const selectedLanguage = languageSelect.value;
    const songListData = songs[selectedLanguage];

    // Clear previous songs
    songList.innerHTML = "";

    // Add new songs
    songListData.forEach((song, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${song.title} - ${song.artist}`;
        listItem.addEventListener("click", () => {
            currentSongIndex = index;
            playSong();
        });
        songList.appendChild(listItem);
    });
}

function playSong() {
    const selectedLanguage = languageSelect.value;
    const song = songs[selectedLanguage][currentSongIndex];

    if (audioSource.src !== song.url) {
        let currentTime = audioPlayer.currentTime;  // Store current position
        audioSource.src = song.url;
        audioPlayer.load();
        audioPlayer.currentTime = currentTime;  // Resume from the last position
    }

    audioPlayer.play();
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    playButton.textContent = "Pause";
}


playButton.addEventListener("click", () => {
    if (audioPlayer.paused) {
        playSong();
    } else {
        audioPlayer.pause();
        playButton.textContent = "Play";
    }
});

prevButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex > 0) ? currentSongIndex - 1 : songs[languageSelect.value].length - 1;
    playSong();
});

nextButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex < songs[languageSelect.value].length - 1) ? currentSongIndex + 1 : 0;
    playSong();
});

languageSelect.addEventListener("change", loadSongs);

// Initial Load
loadSongs();
