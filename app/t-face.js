/*
    AI For Thai T-Face API
    JavaScript + PHP Demo
    https://aiforthai.in.th
    https://www.facebook.com/groups/aiforthai

    NECTEC NSTDA
    25/07/2020

*/

const img_url =
  "https://www.aiforthai.in.th/aiplatform/views/pages/facetraining/upload/";

const result = document.getElementById("result");
const resultText = document.getElementById("resultText");
const preview = document.getElementById("previreImg");
const previewCanvas = document.createElement("canvas");
const img = document.getElementById("fimg");
let orig_img = null;

// สีผลลัพธ์
const color = (n) => {
  const colors = [
    "#0059ff",
    "#ff0044",
    "#10e372",
    "#ff9c08",
    "#a408ff",
    "#00ddfa",
    "#ffdd00",
    "#b5ed0c",
    "#8a5a24",
    "#c918ac",
  ];

  const ns = n.toString();
  const i = ns[ns.length - 1];

  return colors[i];
};

// วาดกรอบผลลัพธ์
const drawResult = (boxes) => {
  const ctx = previewCanvas.getContext("2d");

  for (let i = 0; i < boxes.length; ++i) {
    const rect = boxes[i];
    ctx.beginPath();
    const xRatio = ctx.canvas.width / previewCanvas.width;
    const yRatio = ctx.canvas.height / previewCanvas.height;
    ctx.lineWidth = 3;
    ctx.strokeStyle = color(i);

    ctx.strokeRect(
      rect.x * xRatio,
      rect.y * yRatio,
      rect.w * xRatio,
      rect.h * yRatio
    );
  }
  return previewCanvas.toDataURL("image/jpeg");
};
// ตัดหน้า
const cropFace = (rect) => {
  const margin = 40;
  const faceCanvas = document.createElement("canvas");
  const ctx = faceCanvas.getContext("2d");
  faceCanvas.width = rect.w + margin * 2;
  faceCanvas.height = rect.h + margin * 2;
  const image = new Image();
  image.onload = function () { };
  image.src = orig_img;

  const x = rect.x - margin;
  const y = rect.y - margin;
  const h = rect.h + margin * 2;
  const w = rect.w + margin * 2;

  ctx.drawImage(image, x, y, w, h, 0, 0, w, h);

  return faceCanvas.toDataURL();
};

// แสดงผลผลการค้นหา
const showResult = (res, boxes) => {
  let cards = "";

  res.forEach((r, n) => {
    cards += `<div class="row "> <div class="col mb-4">
      <div class="card h-100 text-center" style="border-color:${color(n)};">
    <img src="${cropFace(boxes[n])}" class="card-img-top img-thumbnail" >
      <div class="card-body">
        <h6 class="card-title">หน้าที่ ${n + 1}</h6>
      </div>
       </div>
       </div>`;
    r.forEach((i) => {
      cards += `<div class="col mb-4">
      <div class="card h-100 text-center">
    <img src = "${img_url + i.image_path}" class="card-img-top img-thumbnail" >
      <div class="card-body">
        <h6 class="card-title">${parseFloat(i.score * 100).toFixed(2)}</h6>
      </div>
       </div>
       </div>`;
    });
    cards += `</div>`;
  });

  return cards;
};

// create canvas
const createCanvas = () => {
  const image = new Image();
  const ctx = previewCanvas.getContext("2d");
  image.addEventListener("load", () => {
    previewCanvas.height = image.height;
    previewCanvas.width = image.width;
    ctx.drawImage(image, 0, 0);
  });
  image.src = orig_img;
};
