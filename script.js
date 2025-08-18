const images = document.querySelectorAll("img");
const large_image_container = document.getElementById("large_image_container");
const large_image = document.getElementById("large_image");
let currentImageIndex = -1;

large_image_container.setAttribute("onclick", "hideLarge()");

let srcs = [];
for (let image of images) {
  let src = image.getAttribute("src");
  if (src !== "") {
    let hqSrc = src.replace("&sz=w200", "&sz=w2000");
    image.setAttribute("onclick", `showLarge("${hqSrc}")`);
    srcs.push(hqSrc);
  }
}

function showLarge(src) {
  large_image.setAttribute("src", src);
  currentImageIndex = srcs.indexOf(src);
  large_image.style.opacity = "1";
  large_image_container.style.zIndex = "100";
}

function hideLarge() {
  large_image.style.opacity = "0";
  large_image.setAttribute("src", "");
  large_image_container.style.zIndex = "-1";
}

function previous() {
  if (large_image.style.opacity === "1") {
    large_image.setAttribute("src", "");
    showLarge(srcs[(currentImageIndex - 1 + srcs.length) % srcs.length]);
  }
}

function next() {
  if (large_image.style.opacity === "1") {
    large_image.setAttribute("src", "");
    showLarge(srcs[(currentImageIndex + 1) % srcs.length]);
  }
}

document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "Escape":
      e.preventDefault();
      hideLarge();
      break;
    case "ArrowLeft":
      e.preventDefault();
      previous();
      break;
    case "ArrowRight":
      e.preventDefault();
      next();
      break;
  }
});
