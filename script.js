q = console.log;

const playList = [
  {
    audioSrc: "./02 Pastorale.mp3",
    imgSrc: "./02 Pastorale.jpg",
    tarckName: "Pastorale",
  },
  {
    audioSrc: "./03 Song from a Secret Garden.mp3",
    imgSrc: "./03 Song from a Secret Garden.jpg",
    tarckName: "Song from a Secret Garden",
  },
  {
    audioSrc: "./05 Papillon.mp3",
    imgSrc: "./05 Papillon.jpg",
    tarckName: "Papillon",
  },
];

const audioSource = document.getElementById("audioSource");
const audio = document.getElementById("audio");
const tarckName = document.getElementById("tarckName");
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const info = document.getElementById("info");
const image = document.getElementById("image");
const seek = document.getElementById("seek");

function playThat() {
  audio.play();
  play.classList.add("hidden");
  pause.classList.remove("hidden");
  info.classList.remove("down");
  image.classList.remove("animationPause");
}

function pauseThat() {
  audio.pause();
  play.classList.remove("hidden");
  pause.classList.add("hidden");
  info.classList.add("down");
  image.classList.add("animationPause");
}

function nextTrack() {
  if (thisTrack == playList.length) {
    thisTrack = 1;
  } else {
    thisTrack += 1;
  }
  pauseThat();
  set(thisTrack);
  playThat();
}

function previousTrack() {
  if (thisTrack == 1) {
    thisTrack = playList.length;
  } else {
    thisTrack -= 1;
  }
  pauseThat();
  set(thisTrack);
  playThat();
}

function set(i) {
  audio.innerHTML = `<source id="audioSource" src="${
    playList[i - 1].audioSrc
  }" type="audio/mpeg">
Your browser does not support the audio element.`;
  audio.load();
  tarckName.innerText = playList[i - 1].tarckName;
  image.src = playList[i - 1].imgSrc;
}

let thisTrack = 1;
set(thisTrack);

// q(seek.value);

setInterval(checkTreckFinished, 100);

function checkTreckFinished() {
  if (audio.currentTime >= audio.duration) {
    nextTrack();
  }
}

setInterval(modifySeek, 100);

function modifySeek() {
  seek.value = (audio.currentTime / audio.duration) * 100;
  setSeek();
}

function setSeek() {
  seek.style = `background-size: ${seek.value}% 100%`;
}

seek.oninput = function () {
  setSeek();
  audio.currentTime = (this.value / 100) * audio.duration;
  //   q(audio.duration);
  //   q(audio.currentTime);
};
