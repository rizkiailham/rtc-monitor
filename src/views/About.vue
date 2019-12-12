<template>
<v-layout>
  <v-flex>
    <v-row xs12 >
      <v-flex xs12 mr-2>
        <v-card class="white--text" height="200"  tile flat color="primary"  align="right"  >
              Erik olsvik
              <v-avatar @mousedown="openDrawer()" color="primary">
                <v-icon dark>mdi-account-circle</v-icon>
              </v-avatar>
          <v-row align="center" justify="center" >
            <v-col  sm="10" md="10" class="mt-12 pt-10" >
              <v-card class="elevation-10">
                <v-toolbar flat>
                  <v-toolbar-title class="black--text">Dashboard</v-toolbar-title>
                  <v-spacer />
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row>
                    <v-col sm="3" >
                      <v-card height="200px" align="left" >
                        <v-card-title class="pa-0 pt-1 white primary--text" >
                          <span class="pl-2  headline">Menu</span>
                          <v-spacer></v-spacer>
                          <v-menu >
                            <template v-slot:activator="{ on }">
                              <v-btn dark icon v-on="on" >
                                <v-icon  class="black--text">mdi-dots-vertical</v-icon>
                              </v-btn>
                            </template>
                            <v-list>
                              <v-list-item v-for="(item, i) in items" :key="i" @click="" >
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </v-card-title>
                        <v-card-text>
                          asdasdasdasd
                          <v-btn small color="primary"> Preview </v-btn>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-flex>
    </v-row>
    <v-row>
    
    </v-row>
  </v-flex>
</v-layout>
</template>


<script>
export default {
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
  methods:{
    openDrawer(){
      console.log("drawer open")
    }
  }
}
</script>
<style >
  html { 
      overflow-y: auto!important
    }
</style>