<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid >
      <v-row>
        <v-col>
        <div class="inputSelect">
          <div>
            <label class="typo__label">Select Audio Input Device</label>
            <multiselect v-model="valueAudio" deselect-label="Can't remove this value" track-by="label" label="label"
              placeholder="Select one" :options="audioOptions" :searchable="true" :allow-empty="false"  @select="dispatchAction(valueAudio)">
              <template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.label }}</strong></template>
            </multiselect>
          </div>
        </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
        <div class="inputSelect">
          <div>
            <label class="typo__label">Select Video Input Device</label>
            <multiselect v-model="valueVideo" deselect-label="Can't remove this value" track-by="label" label="label"
              placeholder="Select one" :options="videoOptions" :searchable="true" :allow-empty="false">
              <template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.label }}</strong></template>
            </multiselect>
          </div>
        </div>
        </v-col>
        <v-col>
              <video autoplay playsinline style="border-radius: 3px; max-width: 60%;margin: 10px;"></video>
        </v-col>
      </v-row>
      <v-row>  
        <v-col>
        <div class="inputSelect">
          <div>
            <label class="typo__label">Select audio Output Device</label>
            <multiselect v-model="valueSpeaker" deselect-label="Can't remove this value" track-by="label" label="label"
              placeholder="Select one" :options="speakerOptions" :searchable="true" :allow-empty="false">
              <template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.label }}</strong></template>
            </multiselect>
          </div>
        </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
        <div class="inputSelect">
          <div>
            <label class="typo__label">Select Other Device</label>
            <multiselect v-model="valueOthers" deselect-label="Can't remove this value" track-by="label" label="label"
              placeholder="Select one" :options="otherOptions" :searchable="true" :allow-empty="false">
              <template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.label }}</strong></template>
            </multiselect>
          </div>
        </div>
        </v-col>
      </v-row>      
      </v-container>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
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
      valueAudio: null,
      valueVideo: null,
      valueSpeaker: null,
      valueOthers: null,
      audioOptions: [],
      videoOptions:[],
      speakerOptions:[],
      otherOptions:[]
    }
  },
  mounted(){
    var test = []
    this.initDevices()
  },
  methods:{
    initDevices(){
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
    dispatchAction(value){
    
    // navigator.mediaDevices.getUserMedia({
    //         video: value.
    //     }).then(function(stream) {
    //         video.srcObject = stream;
    //     });
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
