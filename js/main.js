const images = document.querySelectorAll("img");

let globalIndex = 0,
  last = { x: -1000, y: -1000 };

const activate = (image, x, y) => {
  image.style.left = `${x}px`;
  image.style.top = `${y}px`;
  image.style.zIndex = globalIndex;

  image.dataset.status = "active";

  last = { x, y };
};

const distanceFromLast = (x, y) => {
  return Math.hypot(x - last.x, y - last.y);
};

const handleOnMove = (e) => {
  if (!document.querySelector("div.imprint").classList.contains("show")) {
    if (distanceFromLast(e.clientX, e.clientY) > window.innerWidth / 7) {
      const lead = images[globalIndex % images.length],
        tail = images[(globalIndex - 5) % images.length];

      activate(lead, e.clientX, e.clientY);

      if (tail) {
        tail.dataset.status = "inactive";
        tail.dataset.focus = "false";
      }

      if (globalIndex != 0) {
        document.querySelector(".info").classList.add("hide");
      }

      globalIndex++;

      document.querySelector(".counter").innerHTML =
        lead.dataset.index + "/" + images.length;
    }
  }
};

window.onmousemove = (e) => handleOnMove(e);

window.ontouchmove = (e) => handleOnMove(e.touches[0]);

window.onload = () => {
  let i = 1;
  images.forEach((img) => {
    img.style.top = `-1000px`;
    img.style.top = `-1000px`;
    img.dataset.index = i;
    img.dataset.status = "inactive";
    img.dataset.focus = "false";
    i++;
  });
};

images.forEach((img) => {
  img.onclick = () => {
    if (img.dataset.focus == "true") {
      img.dataset.focus = "false";
      img.style.zIndex = globalIndex;
    } else {
      images.forEach((img) => {
        img.dataset.focus = "false";
      });
      img.dataset.focus = "true";
    }
  };
});

document.querySelector("span.imprint").onclick = () => {
  document.querySelector("div.imprint").classList.toggle("show");
};

document.querySelector(".close-i").onclick = () => {
  document.querySelector("div.imprint").classList.toggle("show");
};
