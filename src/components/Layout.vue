<template>
<v-layout row wrap>
    <v-btn color="success" @mousedown="startCapture" ref="startButton" id="start" rounded> Start Capture</v-btn>&nbsp;
    <v-btn @mousedown="gotoFullScreen" ref="stopButton" id="stop">Stop Capture</v-btn>
    <!-- <video controls width="250" ref="videokita">
      Sorry, your browser doesn't support embedded videos.
    </video> -->
    <div style="position: relative;">
      <canvas ref="c1" width="1920" height="1080" style="position: absolute; left: 0; top: 0; z-index: 0;
      outline: red 5px solid; " ></canvas>
    </div>

<br>
</v-layout>
</template>

<script>

export default {
  name: 'home',
  data(){
    return {
      t:true,
      displayMediaOptions:{
        video: {
          cursor: {
            exact: "none"
          }
        },
        audio: false
      }
    }
  },
  methods:{
    async startCapture(){

      var c1 = this.$refs.c1
      var ctx = c1.getContext("2d");
      // var img = document.createElement("img")
      var base_image = new Image();
      base_image.onload = function(){
        ctx.drawImage(base_image, 0, 0);
      }
      base_image.src = 'http://localhost:3333/uploads/CustomBackground.jpg';
      var videoElem = this.createVideo("fikuri")
      var videoElem2 = this.createVideo("fikuri2")
      try {
      //   await navigator.mediaDevices.getDisplayMedia({
      //   width: 1920,
      //   height: 1080,
      //   aspectRatio: 1.777777778,
      //   cursor:"never"
      // }).then(screenStream =>{
          // videoElem.srcObject = screenStream
          // videoElem.play();
          // this.startDrawToVideo(ctx, videoElem, 610, 20, 1300, 900)
          navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
          }).then((cameraStream)=> {
            videoElem2.srcObject = cameraStream
            videoElem2.play()
            videoElem2.volume = 1;
            videoElem2.muted = false;

            this.startDrawToVideo(ctx, videoElem2, 20, 20, 1280, 720)
          });
      // });
        var Streamx = c1.captureStream(60)
        // this.$refs.videokita.srcObject = Streamx
        // this.$refs.videokita.play()
      } catch(err) {
        console.error("Error: " + err);
      }
    },
    drawAnImage(ctx){
      console.log("tests")

    },
    createVideo(className){
      this.HTMLVideoElement = function() {};
      var videoElem = document.createElement('video')
          videoElem.className =  className;
          videoElem.muted = true;
          videoElem.volume = 0;
          videoElem.width =  360;
          videoElem.height =  240;
      return videoElem;
    },
    startDrawToVideo(ctx,videoElem,x,y,w,h){
      // ctx.drawImage(videoElem,5,5,260,125)
      var i = window.setInterval(function() {
        ctx.drawImage(videoElem,x,y,w,h)
      },1)
    },
    async stopCapture(){
      var videoElem = this.$refs.mainVid
      let tracks = videoElem.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoElem.srcObject = null;
    },
    gotoFullScreen(){
      console.log()
      var elem =  this.$refs.c1;
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
          elem.msRequestFullscreen();
        }

    },
    drawToCanvas(video, idx){
      // drawImage(video, idx);
      // setTimeout(drawToCanvas, 1);
    }
  }
}
</script>
