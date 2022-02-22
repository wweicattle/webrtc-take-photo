let width = 320; // 默认比例
let height = 0; // 视频的高度，需要按照上面等比例放大

let streaming = false;

let video = null;
let canvas = null;
let photo = null;
let startButton = null;

const clearPhoto = () => {
  const context = canvas.getContext('2d')
  // 生成空白图片
  context.fillStyle = "#AAA";
  context.fillRect(0, 0, canvas.width, canvas.height);
  const data = canvas.toDataURL('image/png');
  photo.setAttribute('src', data);
}

const takePhoto = () => {
  const context = canvas.getContext('2d')
  if (width && height) {
    // 将 video 元素的 width 和 height 拿过来
    canvas.width = width;
    canvas.height = height;

    context.drawImage(video, 0, 0, width, height);

    // 生成图片
    const data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  } else {
    clearPhoto()
  }
}

const startUp = async () => {
  video = document.getElementById('video');
  canvas = document.getElementById('canvas');
  photo = document.getElementById('photo');
  startButton = document.getElementById('startButton');

  // 获取摄像头的视频流
  try {
    video.srcObject = await navigator.mediaDevices.getUserMedia({video: true, audio: false})
    video.play()
  } catch (e) {
    console.error(e)
  }

  video.addEventListener('canplay', (event) => {
    if (!streaming) {
      // 按比例放大 videoHeight
      height = video.videoHeight / (video.videoWidth / width);

      // 设置 video 的宽高
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      // 设置 canvas 的宽高
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      streaming = true;
    }
  }, false)

  startButton.addEventListener('click', (event) => {
    // 拍照
    takePhoto()
    event.preventDefault()
  }, false)

  // 生成默认空白图片
  clearPhoto();
}

startUp().then()
