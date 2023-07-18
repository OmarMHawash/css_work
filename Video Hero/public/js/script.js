const videoItems = document.getElementsByClassName("video-item");
const videoTags = document.getElementsByTagName("video");

const videosLength = videoItems.length;
const loopTime = 3000;
let videoIdx = 0;

//todo: hide extra videos
function hideVideos(videoIdx = 0) {
  for (let i = 0; i < videoItems.length; i++) {
    if (videoIdx != i) {
      videoItems[i].style.display = "none";
      videoTags[i].pause();
    } else {
      videoItems[i].style.display = "block";
      videoTags[i].play();
    }
  }
  console.log("showing", videoIdx);
}

//todo: loop to next video
function loopVideos() {
  console.log("looping next");
  videoIdx = (videoIdx + 1) % videosLength;
  hideVideos(videoIdx);
}

//todo: do it every x-seconds
hideVideos();
setInterval(() => {
  loopVideos();
}, loopTime);
