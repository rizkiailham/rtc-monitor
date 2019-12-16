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
    <v-layout>
        <v-flex>
            <v-row xs12>
                <v-flex xs12>
                    <!-- header -->
                    <v-card class="white--text" height="130" tile flat color="primary">
                        <v-layout row wrap align-center pt-5 ml-10 mr-5>
                            <img :src="require('../assets/rtc-logo.png')" height="60" />
                            <v-spacer></v-spacer>
                            Erik olsvik
                            <v-avatar @mousedown="openDrawer()" color="primary">
                                <v-icon dark>mdi-account-circle</v-icon>
                            </v-avatar>
                        </v-layout>
                        <!-- content -->
                        <v-row align="center" justify="center">
                            <v-col sm="10" md="10" style="margin-top:-25px;">
                                <v-card class="elevation-4 ">
                                    <v-toolbar flat align="left">
                                        <v-toolbar-title class="mr-4 ml-4 headline black--text">Preview
                                        </v-toolbar-title>
                                        <v-toolbar-items>
                                            <v-btn @mousedown="gotoFullScreen()" text
                                                class="text-capitalize primary--text">
                                                <v-icon>mdi-fullscreen</v-icon>
                                                Fullscreen
                                            </v-btn>
                                        </v-toolbar-items>
                                        <v-spacer />
                                        <!-- 3 button -->
                                        <v-toolbar-items>
                                            <v-btn class="btn" to="/background" text @click="activeBtn = 'btn1'"
                                                :class="{active: activeBtn === 'btn1'} ">
                                                <v-icon>mdi-image</v-icon>
                                                background
                                            </v-btn>
                                            <v-btn class="btn" to="/video-input" text @click="activeBtn = 'btn2'"
                                                :class="{active: activeBtn === 'btn2' }">
                                                <v-icon>mdi-video</v-icon>
                                                Video Input
                                            </v-btn>
                                            <v-btn class="btn active" to="/layout" text @click="activeBtn = 'btn3'"
                                                :class="{active: activeBtn === 'btn3' }">
                                                <v-icon>mdi-texture-box</v-icon>
                                                layout
                                            </v-btn>
                                        </v-toolbar-items>
                                    </v-toolbar>
                                    <v-divider></v-divider>
                                    <!-- Video player -->
                                    <v-card-text>
                                        <v-layout row wrap>
                                            <video ref="mainVideo" autoplay controls width="1800" height="700">
                                                <source src="https://www.w3schools.com/tags/movie.mp4" type="video/mp4">
                                                Your browser does not support the video tag.
                                            </video>
                                        </v-layout>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-flex>
            </v-row>
        </v-flex>
        <v-footer class="elevation-3 pt-0 pr-0 pl-0 pb-0" color="white" height="108" app>
            <div class="d-flex align-center full-width">
                <div class="d-flex">
                    <div class="bg-list ml-8 align-center" v-for="(layout, index) in layouts" :key="index"
                        @click="setSelectedLayout(layout)">
                        <div class="image-layout-item" :class="selectedLayoutClass(layout)">
                            <img :src="layout" height="95" />
                        </div>
                    </div>
                </div>
                <div class="d-flex">
                    <v-layout align-center>
                        <v-flex class="mr-12">
                            <v-btn class="ml-3" color="primary">
                                Set Layout
                            </v-btn>
                        </v-flex>
                    </v-layout>
                    <div class="btn-close">
                        <v-icon x-large color="white">mdi-close</v-icon>
                    </div>
                </div>

            </div>
        </v-footer>
    </v-layout>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<script>
    import RTC from 'detectrtc'
    import Multiselect from 'vue-multiselect'
    export default {
        components: {
            Multiselect
        },
        data() {
            return {
                valueVideo: "",
                valueProgram: "",
                audioOptions: [],
                videoOptions: [],
                programOptions: [],
                detailsDebug: "",
                activeBtn: '',
                layouts: [
                    '/img/layouts/layout1.png',
                    '/img/layouts/layout2.png',
                    '/img/layouts/layout3.png',
                    '/img/layouts/layout4.png',
                ],
                selectedLayout: null,
            }
        },
        created() {
            this.dispatchAction(null, "videoinput");
        },
        methods: {
            openDrawer() {
                console.log("drawer open")
            },
            dispatchAction(value, state) {
                var that = this;
                if (state === 'videoinput') {
                    console.log("hadir")
                    navigator.mediaDevices.getUserMedia({
                        video: true
                    }).then(function (stream) {
                        console.log("permission granted")
                        that.initDevices()
                    });
                }
            },
            initDevices() {
                let that = this;
                RTC.load(function () {
                    RTC.MediaDevices.map(function (device) {
                        if (device.kind === "videoinput") {
                            that.videoOptions.push(device);
                            that.programOptions.push(device);
                        }
                    })
                })
            },
            gotoFullScreen() {
                console.log()
                var elem = this.$refs.mainVideo;
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.mozRequestFullScreen) {
                    /* Firefox */
                    elem.mozRequestFullScreen();
                } else if (elem.webkitRequestFullscreen) {
                    /* Chrome, Safari & Opera */
                    elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) {
                    /* IE/Edge */
                    elem.msRequestFullscreen();
                }
            },
            setSelectedLayout(layout) {
                this.selectedLayout = layout;
            },
            selectedLayoutClass(layout) {
                return this.selectedLayout === layout ? 'active' : '';
            },
        },
        computed: {
            valueVideo: function (newValueVideo) {
                this.dispatchAction(newValueVideo, 'videoinput');
            },
            valueProgram: function (newValueVideo) {
                this.dispatchAction(newValueVideo, 'videoinput')
            },
            backgroundImage() {
                return this.selectedBackground;
            }
        }
    }
</script>
<style lang="scss">
    html {
        overflow-y: auto !important
    }

    .v-toolbar__content {
        padding: 0;
    }

    .btn {
        border: none;
        color: #1976D2 !important;
        outline: none;
        padding: 10px 16px;
        cursor: pointer;
        font-size: 18px;
        text-decoration: none !important;
        align-content: center;
    }

    .active,
    .btn:hover {
        background-color: #1976D2;
        color: white !important;
    }

    .btn-close {
        height: 115px;
        width: 115px;
        color: white;
        border: none;
        background-color: #1976D2 !important;
        outline: none;
        padding: 0px 0px;
        margin: 0;
        cursor: pointer;
        text-decoration: none !important;
        display: flex;
        justify-content: center;
    }

    .inline-item {
        display: inline-block;
    }

    .d-flex {
        display: flex;
        justify-content: space-between;

        &.full-width {
            width: 100%;
        }
    }

    .image-layout-item {
        padding-bottom: 0px;

        &.active {
            -webkit-box-shadow: 0 0 0 3px #1976D2;
            box-shadow: 0 0 0 3px #1976D2;
        }
    }

    .background-layout {
        background-repeat: no-repeat;
        background-size: 100% auto;
        background-position: center top;
        background-attachment: fixed;
    }
</style>
