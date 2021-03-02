
// MENU HAMBURGER NAV RESPONSSIVE

const btnMenu = document.querySelector('.burger-container');
const menu = document.querySelector('.navigation');
const mainBloc = document.querySelector('.main-bloc');

btnMenu.addEventListener('click', function(){
    menu.classList.toggle('active');
    mainBloc.classList.toggle('active');
})


const allLinks = document.querySelectorAll('.menu-item');

allLinks.forEach(function(item){

    item.addEventListener('click', function(){
        menu.classList.toggle('active');
        mainBloc.classList.toggle('active');
    })

})

// ---------------- LECTEUR AUDIO --------------------- //


const music = document.querySelector('audio'); 
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress'); 
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration'); 
const playBtn = document.getElementById('play');
const volumeRange = document.getElementById('volume-control-container'); 
const volumeBar = document.getElementById('volume'); 
const volumeIcon = document.getElementById('volume-logo');
const loadStart = document.getElementById('on-load');


// Check if playing 

let isPlaying = false; 


// Play 

function playSong () {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause'); 
    playBtn.setAttribute('style', 'font-size: 10px; cursor: pointer;' )
    playBtn.setAttribute('title', 'pause')
    music.play();
}

// pause 

function pauseSong () {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play'); 
    playBtn.setAttribute('title', 'play')
    music.pause();
}

// PLay or Pause eventListener 

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong())); 



// Update Progress Bar & Time 

function updateProgressBar(e) {
    if (isPlaying){
        const {duration, currentTime} = e.srcElement; 
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100; 
        progress.style.width = `${progressPercent}%`; 
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60); 
        let durationSeconds = Math.floor(duration % 60); 
        if ( durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`; 
        }
        // Delay switching duration NAN
        if ( durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`; 
        }
        // Calculate display for current
        const currentMinutes = Math.floor(currentTime / 60); 
        let currentSeconds = Math.floor(currentTime % 60); 
        if ( currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`; 
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }

}

// Set progress Bar 

function setProgressBar(e){
    const width = this.clientWidth ; 
    console.log(e);
    const clickX = e.offsetX; 
    // nous utilisons a destructured constante 
    const {duration} = music; 
    music.currentTime = (clickX / width) * duration; 

}

// Change Volume 

    let lastVolume = 1; 

    function changeVolume(e) {
        let volume = e.offsetX / volumeRange.offsetWidth; 
        // Rounding volume up or down 
        if( volume < 0.1){
            volume = 0; 
        }
        if ( volume > 0.9){
            volume = 1; 
        }
        volumeBar.style.width = `${volume * 100}%`; 
        music.volume = volume; 
        lastVolume = volume; 
    }

// Mute / UnMute 

    function toggleMute () {

        // volumeIcon.className = ''; 

        if ( music.volume) {
            lastVolume = music.volume ; 
            music.volume = 0; 
            volumeBar.style.width = 0; 
            volumeIcon.classList.replace('fa-volume-up', 'fa-volume-mute'); 
            volumeIcon.setAttribute('title', 'Unmute');
        } else {
            music.volume = lastVolume; 
            volumeBar.style.width = `${lastVolume * 100}%`;
            volumeIcon.classList.replace('fa-volume-mute', 'fa-volume-up'); 
            volumeIcon.setAttribute('title', 'Mute');

        }

    }


// Event Listener 

music.addEventListener('timeupdate', updateProgressBar); 
progressContainer.addEventListener('click', setProgressBar); 
volumeRange.addEventListener('click', changeVolume); 
volumeIcon.addEventListener('click', toggleMute);
// loadStart.addEventListener('click', () => music.preload='auto'); 