<template>
  <v-layout>
    <v-flex>
      <v-row xs12 >
        <v-flex xs12 mr-2>
          <v-card class="white--text" height="100"  tile flat color="primary" align="right" >
          Erik olsvik
            <v-avatar @mousedown="openDrawer()" color="primary">
              <v-icon dark>mdi-account-circle</v-icon>
            </v-avatar>
            <v-row align="center" justify="center" >
              <v-col  sm="10" md="10" style="margin-top:-25px;" >
                <v-card class="elevation-4 " >
                  <v-toolbar flat  align="left" >
                    <v-toolbar-title  class="mr-4 ml-4 headline black--text">Preview </v-toolbar-title>
                          <v-toolbar-items>
                            <v-btn text class="text-capitalize primary--text">
                              <v-icon>mdi-fullscreen</v-icon>  
                              Fullscreen
                            </v-btn>
                          </v-toolbar-items>
                    <v-spacer/>
                      <v-toolbar-items>
                        <v-btn text class="text-capitalize primary--text">
                          <v-icon>mdi-image</v-icon>  
                          background
                        </v-btn>
                      <v-btn text class="text-capitalize primary--text">
                        <v-icon>mdi-video</v-icon>  
                        Video Input
                      </v-btn>
                      <v-btn text class="text-capitalize primary--text">
                        <v-icon>mdi-texture-box</v-icon>  
                        layout  
                      </v-btn>
                      </v-toolbar-items>
                  </v-toolbar>
                  <v-divider></v-divider>
                  <v-card-text>
                      <v-layout row wrap>
                        hello world
                      </v-layout>
                  </v-card-text>
                  
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-flex>
      </v-row>
    </v-flex>
    <v-footer class="elevation-3" color="white" height="100"  app>
        <v-toolbar flat >
              <multiselect v-model="valueVideo" deselect-label="Can't remove this value" track-by="label" label="label"
                placeholder="Select Video" :options="videoOptions" :searchable="true" :allow-empty="false" >
                <template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.label }}</strong></template>
              </multiselect>
        </v-toolbar>
    </v-footer>
  </v-layout>
</template>

<style  src="vue-multiselect/dist/vue-multiselect.min.css"></style>


<script>
import RTC from 'detectrtc'
import Multiselect from 'vue-multiselect'
export default {
  components:{
    Multiselect
  },
  data () {
    return {
      valueAudio: "",
      valueVideo: "",
      valueSpeaker: "",
      valueOthers: null,
      audioOptions: [],
      videoOptions:[],
      speakerOptions:[],
      otherOptions:[],
      detailsDebug: ""
    }
  },
  created(){
    this.dispatchAction(null,"videoinput");
  },
  methods:{
    openDrawer(){
      console.log("drawer open")
    },
    dispatchAction(value, state) {
      var that = this;
      if (state === 'videoinput') {
      console.log("hadir")
        navigator.mediaDevices.getUserMedia({video:true}).then(function(stream) {
          console.log("permission granted")
        }).catch(function(e){
          console.log(e);
        });
      }
    },
    initDevices() {
      let that = this;
      RTC.load(function() {
          RTC.MediaDevices.map(function(device) {
            if (device.kind === "videoinput") {
              that.videoOptions.push(device);
            } 
          })
      })
    },
    hasGetUserMedia() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia);
  }


  },
  // watch: {
  //   valueVideo: function (newValueVideo) {
  //     this.dispatchAction(newValueVideo, 'videoinput');
  //   },
  // }
}
</script>
<style >
  html { 
      overflow-y: auto!important
    }
  .v-toolbar__content{
    padding:0;
  }

</style>