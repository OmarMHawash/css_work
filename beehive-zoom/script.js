const circles = document.getElementsByClassName("circles")[0];
const overCircles = document.getElementsByClassName("over-circles")[0];
let circlesArr = document.getElementsByClassName("circle");

let cCount = circlesArr.length;
const SW = document.getElementsByClassName("circles-wrapper")[0].offsetWidth;
const SH = document.getElementsByClassName("circles-wrapper")[0].offsetHeight;
const cDim = 110;
const dots = [];
const images = [
  "Adobe.png",
  "Firefox.png",
  "Mastercard.png",
  "Battle.net.png",
  "Steam.png",
  "YouTube.png",
  "Gmail.png",
  "Upwork.png",
  "Linkedin.png",
  "GitHub.png",
  "Figma.png",
  "React.png",
  "Trello.png",
  "WordPress.png",
  "Webflow.png",
  "Dropbox.png",
  "Pintrest.png",
  "Wikipedia.png",
  "Slack.png",
  "Telegram.png",
  "Discord.png",
  "Snapchat.png",
  "Vimeo.png",
  "Twitch.png",
  "Tumblr.png",
  "Live Journal.png",
  "Reddit.png",
  "Medium.png",
  "Twitter.png",
  "WhatsApp.png",
  "Instagram.png",
  "Messenger.png",
  "Facebook.png",
];
// Center of screen (approx center of circles)
const defX = SW / 2;
const defY = SH / 2;
// had to initialize before setting new ones
circles.style.left = `0px`;
circles.style.top = `0px`;

const genDots = (moreXY = 0) => {
  let dotX = -cDim - moreXY;
  let dotY = -cDim / 2 - moreXY;
  let line = 1;
  while (dotY - moreXY < SH) {
    dotX += cDim;
    let dotXY = Math.sqrt(
      (defX + cDim - dotX) ** 2 + (defX + cDim - dotY) ** 2
    );
    dots.push({ X: dotX - cDim / 2, Y: dotY - cDim / 2, offset: dotXY });
    if (dotX - moreXY > SW) {
      if (line % 2 == 0) dotX = 0 - moreXY;
      else dotX = -cDim / 2 - moreXY;
      line += 1;
      dotY += cDim;
    }
    //? for drawing dots
    // let divElement = document.createElement("div");
    // divElement.setAttribute("class", "dot");
    // divElement.style.left = `${dotX}px`;
    // divElement.style.top = `${dotY}px`;
    // circles.appendChild(divElement);
  }
  dots.sort((a, b) => a.offset - b.offset);
};

const drawCircles = (limit = cCount) => {
  circlesArr = document.getElementsByClassName("circle");
  cCount = circlesArr.length;
  if (limit > cCount) limit = cCount;
  for (let i = 0; i < limit; i++) {
    // setTimeout(() => {
    circlesArr[i].style.left = `${dots[i].X}px`;
    circlesArr[i].style.top = `${dots[i].Y}px`;
    // }, i * 50);
  }
};

let dragStartX, dragStartY;
let newX = 0;
let newY = 0;

overCircles.addEventListener("mousedown", (e) => {
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  overCircles.addEventListener("mousemove", dragCircles);
});

overCircles.addEventListener("mouseup", () => {
  overCircles.removeEventListener("mousemove", dragCircles);
});

overCircles.addEventListener("touchstart", (e) => {
  dragStartX = e.touches[0].clientX;
  dragStartY = e.touches[0].clientY;
  overCircles.addEventListener("touchmove", dragCircles);
});

overCircles.removeEventListener(
  "touchmove",
  (e) => {
    if (document.body.scrollTop === 0) {
      e.preventDefault();
    }
  },
  { passive: false }
);

overCircles.addEventListener("touchend", () => {
  overCircles.removeEventListener("touchmove", dragCircles);
});

const dragCircles = (e) => {
  resizeCircles();
  let posLeft = rPx(circles.style.left);
  let posTop = rPx(circles.style.top);
  newX = posLeft + (e.touches ? e.touches[0].clientX : e.clientX) - dragStartX;
  newY = posTop + (e.touches ? e.touches[0].clientY : e.clientY) - dragStartY;

  circles.style.left = `${newX}px`;
  circles.style.top = `${newY}px`;
  dragStartX = e.touches ? e.touches[0].clientX : e.clientX;
  dragStartY = e.touches ? e.touches[0].clientY : e.clientY;
};

const resizeCircles = () => {
  for (let i = 0; i < circlesArr.length; i++) {
    c1 = circlesArr[i];
    let cirX = rPx(c1.style.left) + newX;
    let cirY = rPx(c1.style.top) + newY;
    let cirXY = Math.sqrt(
      (defX - cDim / 2 - cirX) ** 2 + (defY - cDim / 2 - cirY) ** 2
    );
    let cirPower = scaleDistance(cirXY);
    c1.style.setProperty("transform", `scale(${cirPower})`);
  }
};

function scaleDistance(x) {
  const minScale = 0.4;
  const maxScale = 1.6;
  const maxInput = 500;

  const normalizedX = x / maxInput;
  const scaledX = normalizedX * (maxScale - minScale) + minScale;
  const invertedX = maxScale - scaledX;
  return invertedX.toFixed(2);
}

const rPx = (str) => {
  return parseInt(str.replace("px", ""));
};

const spawnCircles = (count = 6) => {
  for (let i = 1; i <= count; i++) {
    let divElement = document.createElement("div");
    divElement.setAttribute("class", "circle");
    let imgElement = document.createElement("img");
    imgElement.setAttribute("src", `./socials/${images[i - 1]}`);
    imgElement.setAttribute("alt", "...");

    divElement.appendChild(imgElement);
    circles.appendChild(divElement);
  }
};

genDots(0);
spawnCircles(33);
drawCircles(99);
resizeCircles();
