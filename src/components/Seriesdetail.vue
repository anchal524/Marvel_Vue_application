<template>
  <div>
    <div v-if="badReq">Error 400 : Bad Request! Not a numeric id</div>
    <div v-else>
    <div v-if="err">Error 404 : Series not found</div>
    <div v-else>
    <h1>{{this.series.title}}</h1>
    <br />
    <br />
    <br />
    <img v-if="this.series.thumbnail.path" :src="this.series.thumbnail.path+`/portrait_uncanny.`+this.series.thumbnail.extension" :alt ="this.series.title"/>
    <br />
    <br/>
    <span v-html="this.series.description"></span>
    <br />
    <br />
    <h2>Start Year : {{this.series.startYear}}</h2> 
    <br />
    <h2>End Year : {{this.series.endYear}}</h2> 
    <br />
    <br />
    <h3>Stories:</h3>
    <ul>
      <li v-for="ser in this.series.stories.items" :key="ser.name">{{ser.name}}</li>     
    </ul>
</div>
</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SeriesDetails",
  data() {
    return {
      id: this.$route.params.id,
      series: { title: null, thumbnail: { path: null,extension:null }, description: " ",startYear: null },
      name: null,
      err:false,
      badReq:false
    };
  },
  methods: {
    async getSeries(id) {
      if(isNaN(parseInt(id)))
      {
        this.badReq = true
      }
    const md5 = require("blueimp-md5");
    const publickey = "20064086eb5dea5539cf2be4e9e8f743";
    const privatekey = "e9846adc932f1d910526bd99de72d895d553d5ca";
    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);
    const baseUrl = `https://gateway.marvel.com:443/v1/public/series/${id}`+"?ts=" +ts +"&apikey=" +publickey +"&hash=" +hash ; 
      try{   
    const { data}  =await axios.get(baseUrl);
    this.series = data.data.results[0];
    }
      catch(e){
        this.err = true;
      }
    }
  },
  created() {
    this.getSeries(this.$route.params.id);
  },
  watch: {
    $route() {
      this.getSeries(this.$route.params.id);
    }
  }
};
</script>

<style scoped>
h2 {
  margin: 40px 0 0;
}
ul li{
  padding: 1px;
  font-size: 1.3em;
  margin-bottom: 2px;
  text-align: auto;
  color: #3e5252;
  max-width: 50%;
}
h1{
  font-size: 70px;
  color: rgb(179, 20, 20);
}
span {
  text-align: center;
  max-width: 50%;
}
div {
  /* max-width: 50%; */
  margin: 0 auto;
  /* text-align: center; */
  color: black;
  text-decoration: none !important;
  font-size: 30px;
  font-family: "Times New Roman", Times, serif;
}
</style>