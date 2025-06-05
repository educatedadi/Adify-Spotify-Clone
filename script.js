console.log("Welcome to Spotify");

//Intialize the Variable
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myprogressBar');
let gif = document.getElementById('gif');
let songiteams = Array.from(document.getElementsByClassName('songiteam'));

let songs = [
    {songName: "Let me love you", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "On My Way", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "The Drum", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Faded", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Dreamer", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Lily", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "DarkSide", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Alone", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Play", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Hello World", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]
songiteams.forEach((element, i)=>{
    //console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songName;
})
//audioElement.play();
//handel play pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1; // Show the playing.gif
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0; // Hide the playing.gif
    }
});
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songiteamPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

// Select the songinfo element
let songInfo = document.querySelector('.songinfo');

// Update the songinfo text when a song is played
const updateSongInfo = () => {
    const songNameElement = document.querySelector('.songinfo span'); // Select the song name span
    if (!songNameElement) {
        // If the span doesn't exist, create it
        const span = document.createElement('span');
        span.textContent = songs[songIndex].songName;
        document.querySelector('.songinfo').appendChild(span);
    } else {
        // Update the existing span with the current song name
        songNameElement.textContent = songs[songIndex].songName;
    }
};

// Update the songinfo when a song is clicked
Array.from(document.getElementsByClassName('songiteamPlay')).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = songs[index].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        songIndex = index;
        gif.style.opacity = 1; // Ensure gif is visible
        updateSongInfo(); // Update the songinfo text
    });
});

// Add event listeners for next and previous buttons
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0; // Loop back to the first song
    } else {
        songIndex += 1; // Move to the next song
    }
    audioElement.src = songs[songIndex].filePath; // Update the song source
    audioElement.currentTime = 0; // Reset playback time
    audioElement.play(); // Play the new song
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1; // Ensure gif is visible
    updateSongInfo(); // Update the songinfo text
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1; // Loop back to the last song
    } else {
        songIndex -= 1; // Move to the previous song
    }
    audioElement.src = songs[songIndex].filePath; // Update the song source
    audioElement.currentTime = 0; // Reset playback time
    audioElement.play(); // Play the new song
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1; // Ensure gif is visible
    updateSongInfo(); // Update the songinfo text
});