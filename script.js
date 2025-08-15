console.log("Welcome to Adify Music Player");

// Initialize variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myprogressBar');
let gif = document.getElementById('gif');
let songiteams = Array.from(document.getElementsByClassName('songiteam'));

let songs = [
    { songName: "Let me love you", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "On My Way", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "The Drum", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Faded", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Dreamer", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Lily", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "DarkSide", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Alone", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Play", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Hello World", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
];

// Load covers and names
songiteams.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songName;
});

// Reset all small play icons to "play"
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songiteamPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

// Highlight current song & sync icons
function highlightPlayingSong() {
    document.querySelectorAll('.songiteam').forEach((item, idx) => {
        let playBtn = item.querySelector('.songiteamPlay');
        if (idx === songIndex) {
            item.classList.add('playing');
            playBtn.classList.remove('fa-circle-play');
            playBtn.classList.add('fa-circle-pause');
        } else {
            item.classList.remove('playing');
            playBtn.classList.remove('fa-circle-pause');
            playBtn.classList.add('fa-circle-play');
        }
    });
}

// Format time as M:SS
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    if (secs < 10) secs = "0" + secs;
    return `${minutes}:${secs}`;
}

// Show total duration when loaded
audioElement.addEventListener('loadedmetadata', () => {
    document.getElementById('totalTime').textContent = formatTime(audioElement.duration);
});

// Update seekbar & current time
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
    document.getElementById('currentTime').textContent = formatTime(audioElement.currentTime);
});

// Seekbar change event
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Update song info
const updateSongInfo = () => {
    const songNameElement = document.querySelector('.songinfo span');
    if (!songNameElement) {
        const span = document.createElement('span');
        span.textContent = songs[songIndex].songName;
        document.querySelector('.songinfo').appendChild(span);
    } else {
        songNameElement.textContent = songs[songIndex].songName;
    }
    highlightPlayingSong();
};

// Master play button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
    highlightPlayingSong();
});

// Song item small play button
Array.from(document.getElementsByClassName('songiteamPlay')).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        if (songIndex === index && !audioElement.paused) {
            // Pause if the same song is clicked while playing
            audioElement.pause();
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
        } else {
            songIndex = index;
            audioElement.src = songs[songIndex].filePath;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
            updateSongInfo();
        }
    });
});

// Next button
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex >= songs.length - 1) ? 0 : songIndex + 1;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
    updateSongInfo();
});

// Previous button
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex <= 0) ? songs.length - 1 : songIndex - 1;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
    updateSongInfo();
});

// ===== About Modal Functionality =====
const aboutBtn = document.getElementById('aboutNav');
const aboutModal = document.getElementById('aboutModal');
const closeBtn = aboutModal.querySelector('.close-btn');

// Open modal when "About" is clicked
aboutBtn.addEventListener('click', () => {
    aboutModal.style.display = 'block';
});

// Close modal when cross is clicked
closeBtn.addEventListener('click', () => {
    aboutModal.style.display = 'none';
});

// Close modal when clicking outside the content box
window.addEventListener('click', (event) => {
    if (event.target === aboutModal) {
        aboutModal.style.display = 'none';
    }
});

