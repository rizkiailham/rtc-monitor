<template>
  <v-app id="inspire">
    <v-app-bar app color="indigo" dark>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container fluid>
      <v-row>
        <v-btn to="/video-input" class="ml-4 pl-4" color="primary">
          <v-icon class= "mr-2">mdi-launch </v-icon>
          go to Background Stream
        </v-btn>
      </v-row>
      <v-row>
        <v-col>
        <div class="inputSelect">
          <div>
            <label class="typo__label">Select video input device to monitor final preview</label>
            <!-- selecting video input -->
            <multiselect v-model="valueVideo" deselect-label="Can't remove this value" track-by="label" label="label"
              placeholder="Select one" :options="videoOptions" :searchable="true" :allow-empty="false" >
              <template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.label }}</strong></template>
            </multiselect>
          </div>
        </div>
        </v-col>
      </v-row>
      <v-row     align="center" justify="center">
          <video class="text-center" width="1280" height="700" autoplay playsinline style="border-radius: 3px; max-width: 60%;margin: 10px;" ref="videoInput"></video>
      </v-row>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>


<script>
import RTC from 'detectrtc'
import Multiselect from 'vue-multiselect'

export default {
  components: {
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
  mounted(){
    this.initDevices()
  },
  watch: {
    valueVideo: function (newValueVideo) {
      this.dispatchAction(newValueVideo, 'videoinput');
    },
    valueAudio: function (newValueAudio) {
      this.dispatchAction(newValueAudio, 'audioinput');
    },
    valueSpeaker: function (newValueSpeaker) {
      this.dispatchAction(newValueSpeaker, 'audiooutput');
    }
  },
  methods: {
    initDevices() {
      let that = this;
      RTC.load(function() {
          RTC.MediaDevices.map(function(device) {
            if (device.kind === "audioinput") {
              that.audioOptions.push(device);
            } else if (device.kind === "videoinput") {
              that.videoOptions.push(device);
            } else if(device.kind === 'audiooutput') {
              that.speakerOptions.push(device)
            } else {
              that.otherOptions.push(device)
            }
          })
      })
    },
    async dispatchAction(value, state) {
      var that = this;
      if (state === 'videoinput') {
        const video = that.$refs.videoInput;
        navigator.mediaDevices.getUserMedia({ video: {
              deviceId: { exact: value.deviceId },
              facingMode: "environment"
        },
        })
        .then(function(stream) {

            video.srcObject = stream;
        });
      } else if (state === 'audioinput') {

      } else if (state === 'audiooutput') {
        const audio = that.$refs.speakerValue;
        try{
          navigator.mediaDevices.getUserMedia({ audio: true })
          .then(function(stream) {
            console.log(stream)
          })
          .catch(function(err) {
            console.log('No mic for you!')
          });
            await audio.setSinkId(value.deviceId);
            console.log('Audio is being played on ' + audio.sinkId);

        } catch(e){
          alert("something error in your device");
          console.log(e);
        }
      }
    }
  }

}
</script>
<style  src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.inputSelect{
  width: 100%;
}
</style>
