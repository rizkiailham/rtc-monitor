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
                      <canvas class="ml-2" ref="c1" width="1580" height="700" style="z-index: 0;
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
              <v-btn @mousedown="setLayout()" class="ml-3" color="primary">
                Set Layout
              </v-btn>
            </v-flex>
          </v-layout>
          <router-link  class="btn-close" to="/background">
            <v-icon  x-large color="white">mdi-close</v-icon>
          </router-link>
        </div>
      </div>
    </v-footer>
  </v-layout>
</template>

<script>
  export default {
    data() {
      return {
        valueVideo: "",
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
    methods: {
      openDrawer() {
        console.log("drawer open")
      },
      gotoFullScreen() {
        console.log()
        var elem = this.$refs.c1;
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
        // console.log((this.selectedLayout))
        let swtichLayout = layout.substr(layout.length-11);
        if (swtichLayout === "layout1.png") {
          this.drawLayoutToCanvas(20,120,150,100);
          this.drawLayoutToCanvas(200,120,1350,500,0);
          localStorage.setItem("layoutConfig", "1");

        } else if (swtichLayout === "layout2.png") {
          this.drawLayoutToCanvas(20,520,150,100);
          this.drawLayoutToCanvas(200,120,1350,500,0);
          localStorage.setItem("layoutConfig", "2");

        } else if (swtichLayout === "layout3.png") {
          this.drawLayoutToCanvas(20,120,1350,500,);
          this.drawLayoutToCanvas(1400,120,150,100,0);
          localStorage.setItem("layoutConfig", "3");

        } else if (swtichLayout === "layout4.png") {
          this.drawLayoutToCanvas(20,120,1350,500,);
          this.drawLayoutToCanvas(1400,520,150,100,0);
          localStorage.setItem("layoutConfig", "4");

        }
      },
      setLayout(){
        let swtichLayout = this.selectedLayout.substr(this.selectedLayout.length-11);
        // console.log(localStorage.getItem('layoutConfig'))
        if (swtichLayout === "layout1.png") {
          localStorage.setItem("layoutConfig", "1");
          this.$notify({
            group: 'foo',
            type: 'Success',
            title: 'Success',
            text: 'Layout 1 selected'
          });
        } else if (swtichLayout === "layout2.png") {
          localStorage.setItem("layoutConfig", "2");
          this.$notify({
            group: 'foo',
            type: 'Success',
            title: 'Success',
            text: 'Layout 2 selected'
          });
        } else if (swtichLayout === "layout3.png") {
          localStorage.setItem("layoutConfig", "3");
          this.$notify({
            group: 'foo',
            type: 'Success',
            title: 'Success',
            text: 'Layout 3 selected'
          });
        } else if (swtichLayout === "layout4.png") {
          localStorage.setItem("layoutConfig", "4");
          this.$notify({
            group: 'foo',
            type: 'Success',
            title: 'Success',
            text: 'Layout 4 selected'
          });
        } else {
          alert("you have not selected layout");
          this.$notify({
            group: 'foo',
            type: 'error',
            title: 'error',
            text: 'you have not selected layout'
          });
        }
      },
      selectedLayoutClass(layout) {
        return this.selectedLayout === layout ? 'active' : '';
      },
      drawLayoutToCanvas(x,y,w,h, mode=1){
        var c = this.$refs.c1;
        var ctx = c.getContext("2d");
        if(mode === 1){
          ctx.clearRect(0, 0, c.width, c.height);
          ctx.strokeStyle = "blue";
        } else{
          ctx.strokeStyle = "red";
        }
          ctx.beginPath();
          ctx.rect(x, y, w, h);
          ctx.stroke();
      }
    },
    computed: {
      computedValueVideo: function (newValueVideo) {
        this.dispatchAction(newValueVideo, 'videoinput');
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

    .text-icon{
    margin-left: 10px;
  }
</style>
