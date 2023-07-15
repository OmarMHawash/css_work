const videoItems = document.getElementsByClassName("video-item");
const nextBtn = document.getElementsByClassName("next-btn")[0];
const videoTags = document.getElementsByTagName("video");
const aBox = document.querySelector(".loading-percent");

const videosLength = videoItems.length;
const loopTime = 8000;
let videoIdx = 0;
let loadPer = 2;

function hideVideos(showIndex) {
  for (let i = 0; i < videoItems.length; i++) {
    const rmTime = (videoTags[i].duration - videoTags[i].currentTime) * 1000;
    if (showIndex != i) {
      videoItems[i].style.display = "none";
      videoTags[i].pause();
      if (i > 0 && rmTime < loopTime) {
        videoTags[i].currentTime = 0;
        console.log(rmTime, loopTime);
      }
    } else {
      videoItems[i].style.display = "block";
      videoTags[i].play();
    }
  }
}

function loopVideos() {
  console.log("videos at", videoIdx);
  hideVideos(videoIdx);
  videoIdx = (videoIdx + 1) % videosLength;
}
function updateLoading() {
  aBox.style.cssText = `width:${loadPer}%`;
  loadPer = (loadPer + 0.2) % 100;
}

function nextVideo() {
  loopVideos();
  loadPer = 2;
}

hideVideos(0);
loopVideos();
setInterval(() => {
  loopVideos();
  loadPer = 2;
}, loopTime);
setInterval(() => {
  updateLoading();
}, loopTime / 500);
