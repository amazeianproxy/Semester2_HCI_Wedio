const audio = document.getElementById("audio");
const playButton = document.getElementById("play");
const progressBar = document.getElementById("progress-bar");
const progress = document.getElementById("progress");
const currentTimeA = document.getElementById("current-time");
const durationA = document.getElementById("duration");
const shuffle = document.getElementById("shuffle");   
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const artistPic = document.getElementById("image");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const titleN = document.getElementById("Ntitle");
const artistN = document.getElementById("Nartist");
const artistPicN = document.getElementById("imageN");

const image = ['../assets/ab67616d0000b273c0e833f8baa95fdcbcc4f65a.jpg','../assets/download (1).jpg','../assets/download (2).jpg'];
const songs = ['../music/Stacey Ryan - Fall In Love Alone (Lyrics).mp3','../music/Midnight Fiction Illit.mp3','../music/YOASOBI -  (Idol).mp3']; 
let index = 0;

function nextSong(){
    index = (index + 1) % songs.length;
    updateSong();
}

function previousSong(){
    index = (index - 1 + songs.length) % songs.length;
    updateSong();
}

next.addEventListener('click',nextSong);
previous.addEventListener('click',previousSong);

function updateSong(){
    audio.src = songs[index];
    audio.addEventListener('loadedmetadata', () => {
        durationA.textContent = formatTime(audio.duration);
    });
    console.log(index); 
    artistPic.src = image[index];
    artistPicN.src = image[(index + 1) %songs.length]
    if(index === 0)
    {
        title.textContent = 'Fall in Love Alone';
        artist.textContent = 'Stacey Ryan';
        titleN.textContent = 'Midnight Fiction';
        artistN.textContent = 'ILLIT';
    }else if(index === 1){
        title.textContent = 'Midnight Fiction';
        artist.textContent = 'ILLIT';
        titleN.textContent = 'アイドル';
        artistN.textContent = 'Yoasobi';
    }else{
        title.textContent = 'アイドル';
        artist.textContent = 'Yoasobi';
        titleN.textContent = 'Fall in Love Alone';
        artistN.textContent = 'Stacey Ryan';
    }
    audio.load();
    audio.play();
}

function retrieveStateFromLocalStorage() {
    const playbackStatus = localStorage.getItem("playbackStatus");
    const shuffleMode = localStorage.getItem("shuffleMode");
    const savedCurrentTime = parseFloat(localStorage.getItem("currentTime")) || 0;

    if (playbackStatus === "playing" && audio.paused){
        audio.play();
    }

    if (shuffleMode === "on") {
        shuffle.classList.add("shuffle-on");
    } else {
        shuffle.classList.remove("shuffle-on");
    }
    audio.currentTime = savedCurrentTime;
}

window.addEventListener("beforeunload", saveStateToLocalStorage);
document.addEventListener("DOMContentLoaded", retrieveStateFromLocalStorage);

function playing(){
    if(audio.paused){
        audio.play();
        playButton.classList.remove('play');
        playButton.classList.add('pause');
    }else{
        audio.pause();
        playButton.classList.remove('pause');
        playButton.classList.add('play');
    }
}
function repeat(){
    if(shuffle.classList.contains('shuffle-off'))
    {
        shuffle.classList.remove('shuffle-off');
        shuffle.classList.add('shuffle-on');
    }else{
        shuffle.classList.remove('shuffle-on');
        shuffle.classList.add('shuffle-off');     
    }
}

playButton.addEventListener('click', playing);
shuffle.addEventListener('click',repeat);

document.addEventListener('keydown',function(event)
{
    if(event.key === ' ')
    {
        playing();
    }
});

audio.addEventListener('timeupdate', updateProgress);
if(audio.readyState >= 1){
    durationA.textContent = formatTime(audio.duration);
}else{
    audio.addEventListener('loadedmetadata', () => {
        durationA.textContent = formatTime(audio.duration);
    });
}
if(progressBar)
{
    progressBar.addEventListener('click', (e) => {
        const width = progressBar.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;           
        audio.currentTime = (clickX / width) * duration;
        });
}else{
    console.log("wattt");
}


function updateProgress() {
    const { duration, currentTime } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    currentTimeA.textContent = formatTime(currentTime);
    if(shuffle.classList.contains('shuffle-on') && duration === currentTime)
        {
            currentTimeA = 0;
            audio.play();
        }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}
function saveStateToLocalStorage() {
    localStorage.setItem("playbackStatus", audio.paused ? "paused" : "playing");
    localStorage.setItem("shuffleMode", shuffle.classList.contains("shuffle-on") ? "on" : "off");
    localStorage.setItem("currentTime", audio.currentTime);
}