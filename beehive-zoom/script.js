const circles = document.getElementsByClassName("circles")[0];
const overCircles = document.getElementsByClassName("over-circles")[0];
let circlesArr = document.getElementsByClassName("circle");

let cCount = circlesArr.length;
const SW = document.body.offsetWidth;
const SH = document.body.offsetHeight;
const cDim = 120;
const dots = [];

console.log(document.getElementById("main-container").offsetWidth);

// Center of screen (approx center of circles)
const defX = SW / 2 - cDim / 2;
const defY = SH / 2 - cDim / 2;

// had to initialize before setting new ones
circles.style.left = `0px`;
circles.style.top = `0px`;

const genDots = (moreXY = 0) => {
  let dotX = -cDim / 2 - moreXY;
  let dotY = 0 - moreXY;
  let line = 1;
  while (dotY - moreXY < SH) {
    if (dotX - moreXY > SW) {
      line += 1;
      if (line % 2 == 0) dotX = 0 - moreXY;
      else dotX = -cDim / 2 - moreXY;
      dotY += cDim;
    }
    dotX += cDim;
    let dotXY = Math.sqrt((defX - dotX) ** 2 + (defY - dotY) ** 2);
    dots.push({ X: dotX, Y: dotY, offset: dotXY });
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
let newX = defX;
let newY = defY;

overCircles.addEventListener("mousedown", (e) => {
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  overCircles.addEventListener("mousemove", dragCircles);
});

overCircles.addEventListener("mouseup", () => {
  overCircles.removeEventListener("mousemove", dragCircles);
});

const dragCircles = (e) => {
  resizeCircles();
  let posLeft = rPx(circles.style.left);
  let posTop = rPx(circles.style.top);
  newX = posLeft + e.clientX - dragStartX;
  newY = posTop + e.clientY - dragStartY;

  circles.style.left = `${newX}px`;
  circles.style.top = `${newY}px`;

  dragStartX = e.clientX;
  dragStartY = e.clientY;
};

const resizeCircles = () => {
  for (let i = 0; i < circlesArr.length; i++) {
    c1 = circlesArr[i];
    let cirX = rPx(c1.style.left) + newX;
    let cirY = rPx(c1.style.top) + newY;
    let cirXY = Math.sqrt((defX - cirX) ** 2 + (defY - cirY) ** 2);
    let cirPower = scaleDistance(cirXY);
    c1.style.setProperty("transform", `scale(${cirPower})`);
  }
};

function scaleDistance(x) {
  const minScale = 0.4;
  const maxScale = 1.5;
  const maxInput = 1000;

  const normalizedX = x / maxInput;
  const scaledX = normalizedX * (maxScale - minScale) + minScale;
  const invertedX = 1.6 - scaledX;
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
    imgElement.setAttribute("src", `./images2/${i}.png`);
    imgElement.setAttribute("alt", "...");

    divElement.appendChild(imgElement);
    circles.appendChild(divElement);
  }
};

genDots(100);
spawnCircles(17);
spawnCircles(2);
drawCircles(99);
