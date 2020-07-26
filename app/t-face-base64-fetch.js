/*
    AI For Thai T-Face API
    JavaScript Demo
    https://aiforthai.in.th
    https://www.facebook.com/groups/aiforthai

    NECTEC NSTDA
    25/07/2020

*/
const url = "proxy_base64.php";

// ค้นหาด้วย fetch
const searchFetch = async (b64) => {
  const res = await fetch(url, {
    method: "POST",

    body: JSON.stringify({ image: b64 }),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch(error => {
    result.innerHTML = error;
    return {}
  });

  if (res.ok) {
    return res.json();
  } else {
    result.innerHTML = `Error: ${res.status} ${res.statusText}`
    return {}
  }
};

// ประมวลผลการค้นหา
const getResult = async (b64) => {
  resultText.innerText = "กำลังค้นหา....";

  const res = await searchFetch(b64);

  if (res && res.boxes) {
    preview.src = drawResult(res.boxes);
    resultText.innerText = "พบ " + res.boxes.length + "ใบหน้า";
    if (res.result && res.result.length) {
      result.innerHTML = showResult(res.result, res.boxes);
    } else {
      result.innerHTML = "ใบหน้าไม่ตรงกับฐานข้อมูล";
    }
  } else {
    resultText.innerText = "ไม่เจอใบหน้าบนรูปนี้";
  }
};

// event on change เมื่อเลือกรูป
img.onchange = () => {
  result.innerHTML = "";
  const files = img.files[0] || img.files;
  loadImage.parseMetaData(files, (data) => {
    const options = {
      canvas: true,
      maxHeight: 640,
      maxWidth: 640,
    };
    if (data.exif) {
      options.orientation = data.exif.get("Orientation");
    }
    loadImage(
      files,
      (canvas) => {
        preview.src = orig_img = canvas.toDataURL("image/jpeg");
        createCanvas();
        const b64 = canvas.toDataURL("image/jpeg").split(",")[1];
        getResult(b64);
      },
      options
    );
  });
};
