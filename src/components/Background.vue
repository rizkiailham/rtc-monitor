<template>
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
                      <v-btn @mousedown="gotoFullScreen()" text class="text-capitalize primary--text">
                        <v-icon>mdi-fullscreen</v-icon>
                        Fullscreen
                      </v-btn>
                    </v-toolbar-items>
                    <v-spacer />
                    <!-- 3 button -->
                    <v-toolbar-items>
                      <v-btn class="btn active" to="/background" text @click="activeBtn = 'btn1'"
                        :class="{active: activeBtn === 'btn1'} ">
                        <v-icon>mdi-image</v-icon>
                        background
                      </v-btn>
                      <v-btn class="btn" to="/video-input" text @click="activeBtn = 'btn2'"
                        :class="{active: activeBtn === 'btn2' }">
                        <v-icon>mdi-video</v-icon>
                        Video Input
                      </v-btn>
                      <v-btn class="btn" to="/layout" text @click="activeBtn = 'btn3'"
                        :class="{active: activeBtn === 'btn3' }">
                        <v-icon>mdi-texture-box</v-icon>
                        layout
                      </v-btn>
                    </v-toolbar-items>
                  </v-toolbar>
                  <v-divider></v-divider>
                  <!-- Video player -->
                  <v-card-text class="background-image" :style="{ backgroundImage: `url('${backgroundImage}')` }">
                    <v-layout row wrap>
                      <canvas class="ml-2" ref="c1" width="1580" height="700" style="z-index: -1;
                      outline: black 2px solid; ">
                      </canvas>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-flex>
      </v-row>
    </v-flex>
    <!-- footer -->
    <v-footer class="elevation-3 pt-0 pr-0 pl-0 pb-0" color="white" height="108" app>
      <div class="d-flex full-width">
        <div class="d-flex">
          <div class="bg-list ml-8 align-center" v-for="(background, index) in backgrounds" :key="index"
            @click="setSelectedBackground(background)">
            <div class="image-background-item" :class="selectedBackgroundClass(background)">
              <img ref="bgImage" :src="background" height="100" width="177" />
            </div>
          </div>
        </div>
        <div class="d-flex">
          <v-layout align-center>
            <v-flex class="mr-12">
              <input type="file" accept="image/*" @change="uploadImage($event)"  ref="file" style="display: none">
              <v-btn  :loading="isUpload" @click="$refs.file.click()" color="primary">
                Upload File
              </v-btn>
              <v-btn @mousedown="setActiveBackground()" class="ml-3" color="primary">
                Set Background
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
<script>
  import axios from 'axios'
  import RTC from 'detectrtc'
  import Multiselect from 'vue-multiselect'
  export default {
    components: {
      Multiselect
    },
    data() {
      return {
        isUpload:false,
        valueVideo: "",
        audioOptions: [],
        videoOptions: [],
        programOptions: [],
        detailsDebug: "",
        activeBtn: '',
        backgrounds: [
          '/img/backgrounds/bg1.png',
          '/img/backgrounds/bg2.png',
          '/img/backgrounds/bg3.png',
          '/img/backgrounds/bg4.png',
          'https://rtc.ajak.in/uploads/CustomBackground.jpg'
        ],
        selectedBackground: null,
      }
    },
    created() {
    },
    methods: {
      openDrawer() {
        this.$notify({
          group: 'foo',
          type: 'success',
          title: 'Upload Image Success',
          text: 'image Has successfully uploaded'
        });
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
      setSelectedBackground(background) {
        this.selectedBackground = background;
      },
      selectedBackgroundClass(background) {
        return this.selectedBackground === background ? 'active' : '';
      },
      setActiveBackground(){
        if (this.selectedBackground === null ) {
          this.$notify({
          group: 'foo',
          type: 'error',
          title: 'Error',
          text: 'you have not selected background'
        });
        } else {
          localStorage.setItem('backgroundConfig', this.selectedBackground)
          this.$notify({
            group: 'foo',
            type: 'success',
            title: 'Success',
            text: 'successfully update background'
          });
        }

      },
      uploadImage(event) {
        this.isUpload = true;
        const URL = 'https://rtc.ajak.in/api/api/upload';
        let data = new FormData();
        data.append('name', 'background');
        data.append('background', event.target.files[0]);
        let config = {
          header : {
            'Content-Type' : 'image/png'
          }
        }
        axios.post(URL, data, config).then(response => {
            this.isUpload = false;
            this.$notify({
              group: 'foo',
              type: 'success',
              title: 'Upload Image Success',
              text: 'image Has successfully uploaded',
              duration:3000
            });
            this.backgrounds[this.backgrounds.length -1] = response.data
            this.$refs.bgImage[4].src = response.data

          }
        )
      }
    },
    computed: {
      backgroundImage() {
        return this.selectedBackground;
      },
    },
    watch:{
      backgrounds :  {
        deep: true,
        handler(){
          console.log("tesadas")
        }
        },
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

  .bg-list {
    height: 100px;
    width: 180px;
    color: white;
    border: none;
    background-color: white !important;
    outline: none;
    padding: 0px 0px;
    margin: 7px;
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

  .image-background-item {
    padding-bottom: 0px;
    margin-bottom: 0px;

    &.active {
      -webkit-box-shadow: 0 0 0 3px #1976D2;
      box-shadow: 0 0 0 3px #1976D2;
    }
  }

  .background-image {
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center top;
    background-attachment: fixed;
  }
</style>
