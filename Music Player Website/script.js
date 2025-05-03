const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.querySelector('.progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const playPauseBtn = document.getElementById('playPauseBtn');

let isPlaying = false;

function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = '⏸️';
    isPlaying = true;
  } else {
    audio.pause();
    playPauseBtn.textContent = '▶️';
    isPlaying = false;
  }
}

function volumeUp() {
  if (audio.volume < 1) {
    audio.volume = Math.min(1, audio.volume + 0.1);
    console.log('Volume:', audio.volume); // Debugging
  }
}

function volumeDown() {
  if (audio.volume > 0) {
    audio.volume = Math.max(0, audio.volume - 0.1);
    console.log('Volume:', audio.volume); // Debugging
  }
}

function skipBack() {
  audio.currentTime = Math.max(0, audio.currentTime - 10);
}

function skipForward() {
  audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

audio.addEventListener('timeupdate', () => {
  const { currentTime, duration } = audio;
  const percent = (currentTime / duration) * 100;
  progress.style.width = `${percent}%`;
  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = isNaN(duration) ? '0:00' : formatTime(duration);
});

function seek(event) {
  const width = progressContainer.clientWidth;
  const clickX = event.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

audio.addEventListener('ended', () => {
  playPauseBtn.textContent = '▶️';
  isPlaying = false;
});
