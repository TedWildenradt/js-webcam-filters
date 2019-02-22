const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
  .then(localMediaStream => {
    console.log(localMediaStream)
    video.src = window.URL.createObjectURL(localMediaStream);
    video.play()
  })
  .catch(err => {
    console.error('shiiiiiit', err)
  })
}

function paintToCanvas(){
  const width = video.videoWidth
  const height = video.videoHeight
  canvas.wdith = width
  canvas.height = height

  setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
  }, 16);
}

function takePhoto(){
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL('image/jpeg')
  const link = document.createElement('a');
  link.href = data 
  link.setAttribute('download','handsome');
  link.textContent = 'Download Image';
  strip.insertBefore(link, strip.firstChild);
}

video.addEventListener('canplay', paintToCanvas);
getVideo()