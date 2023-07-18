const videoHero = document.getElementById("video-hero");
const videoItems = document.getElementsByClassName("video-item");
const nextBtn = document.getElementsByClassName("next-btn")[0];
const videoTags = document.getElementsByTagName("video");
const aBox = document.querySelector(".loading-percent");

videoHero.addEventListener("mousedown", handleMouseDown);
videoHero.addEventListener("mouseup", handleMouseUp);

const videosLength = videoItems.length;
const loopTime = 8000;
let videoIdx = 0;
let loadPer = 2;
let isDragging = false;
let xPos = 0;

function hideVideos(showIndex) {
  for (let i = 0; i < videoItems.length; i++) {
    const rmTime = (videoTags[i].duration - videoTags[i].currentTime) * 1000;
    if (showIndex != i) {
      videoItems[i].style.display = "none";
      videoTags[i].pause();
      if (i > 0 && rmTime < loopTime) {
        videoTags[i].currentTime = 0;
      }
    } else {
      videoItems[i].style.display = "block";
      videoTags[i].play();
    }
  }
}

function loopVideos(offset = 1) {
  hideVideos(videoIdx);
  let newVideoIndex = (videoIdx + offset) % videosLength;
  videoIdx = Math.max(0, newVideoIndex);
}
function updateLoading() {
  aBox.style.cssText = `width:${loadPer}%`;
  loadPer = (loadPer + 0.2) % 100;
}

function moveVideo(offset = 1) {
  loopVideos(offset);
  loadPer = 2;
}

hideVideos(videoIdx);
loopVideos();
setInterval(() => {
  moveVideo();
}, loopTime);
setInterval(() => {
  updateLoading();
}, loopTime / 500);

function handleMouseDown(event) {
  isDragging = true;
  xPos = event.clientX;
}

function handleMouseUp(event) {
  isDragging = false;
  newXPos = event.clientX;
  const dragDistance = newXPos - xPos;
  if (dragDistance > 10) {
    moveVideo(-1);
  } else if (dragDistance < -10) {
    moveVideo();
  }
}

function loadDocumet() {
  videoHero.style.display = "block";
}
