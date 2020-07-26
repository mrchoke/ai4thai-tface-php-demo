/*
    AI For Thai T-Face API
    JavaScript Demo
    https://aiforthai.in.th
    https://www.facebook.com/groups/aiforthai

    NECTEC NSTDA
    25/07/2020

*/
const url = "proxy_bin.php";

// detect type of image
const getType = (b64) => {
  const signatures = {
    R: "image/gif",
    "/": "image/jpeg",
    i: "image/png",
  };
  for (let s in signatures) {
    if (b64.indexOf(s) === 0) {
      return signatures[s];
    }
  }
};
// get image as Blob
const dataURItoBlob = (dataURI) => {
  const byteString = atob(dataURI.split(",")[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], {
    type: getType(dataURI.split(",")[1]),
  });
};

// ค้นหาด้วย axios
const searchAxios = async () => {
  const formdata = new FormData();
  formdata.append("file", dataURItoBlob(orig_img));

  const res = await axios.post(url, formdata, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
  }).catch(error => {
    result.innerHTML = error;
    return {}
  });
  return await res.data;
};

// ประมวลผลการค้นหา
const getResult = async () => {
  resultText.innerText = "กำลังค้นหา....";

  const res = await searchAxios();

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
        getResult();
      },
      options
    );
  });
};
