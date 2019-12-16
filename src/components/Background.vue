<template>
	<input type="file" accept="image/*" @change="uploadImage($event)" id="file-input">
</template>

<script>
import axios from 'axios'
export default {
	methods:{
		uploadImage(event) {

    const URL = 'http://localhost:3333/api/upload'; 

    let data = new FormData();
    data.append('name', 'background');
    data.append('background', event.target.files[0]); 

    let config = {
      header : {
        'Content-Type' : 'image/png'
      }
    }

    axios.post(
      URL, 
      data,
      config
    ).then(
      response => {
        console.log(response)
      }
    )
  }
	}
}
</script>