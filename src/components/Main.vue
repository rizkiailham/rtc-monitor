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
                    <v-toolbar-title class="mr-4 ml-4 headline black--text">Preview </v-toolbar-title>
                    <v-toolbar-items>
                      <v-btn @mousedown="gotoFullScreen()" text class="text-capitalize primary--text">
                        <v-icon>mdi-fullscreen</v-icon>
                        Fullscreen
                      </v-btn>
                    </v-toolbar-items>
                    <v-spacer />
                    <!-- 3 button -->
                    <v-toolbar-items>
                        <v-btn class="btn" to="/background" text @click="activeBtn = 'btn1'" :class="{active: activeBtn === 'btn1'} ">
                          <v-icon>mdi-image</v-icon>
                          background
                        </v-btn>
                      <v-btn class="btn" to="/video-input" text @click="activeBtn = 'btn2'" :class="{active: activeBtn === 'btn2' }">
                        <v-icon>mdi-video</v-icon>
                        Video Input
                      </v-btn>
                      <v-btn class="btn" to="/layout" text @click="activeBtn = 'btn3'" :class="{active: activeBtn === 'btn3' }">
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
    <!-- background -->
    <v-footer class="elevation-3" color="white" height="100" app>
      <v-layout row wrap justify-end>
        <v-flex class="pl-4 ml-4" xs3>
          <multiselect v-model="valueVideo" deselect-label="Can't remove this value" track-by="label" label="label"
            placeholder="Select Background Source" :options="videoOptions" :searchable="true" :allow-empty="false">
            <template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.label }}</strong></template>
          </multiselect>
        </v-flex>
        <!-- Selecting Video Input -->
        <v-flex class="pl-4 ml-4" xs3>
          <multiselect v-model="valueProgram" deselect-label="Can't remove this value" track-by="label" label="label"
            placeholder="Select Program" :options="programOptions" :searchable="true" :allow-empty="false">
            <template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.label }}</strong></template>
          </multiselect>
        </v-flex>
        <v-flex class="text-right" xs3 end>
          <v-btn color="primary">
            <v-icon> mdi-folder</v-icon>
            save
          </v-btn>
        </v-flex>
        <v-flex align="right" class="text-right">
          <v-btn color="primary" text>
            <v-icon> mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
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

      }
    },
    computed: {
      valueVideo: function (newValueVideo) {
        this.dispatchAction(newValueVideo, 'videoinput');
      },
      valueProgram: function (newValueVideo) {
        this.dispatchAction(newValueVideo, 'videoinput')
      }
    }
  }
</script>
<style>
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
</style>
