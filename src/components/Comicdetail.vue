<template>
  <div>
     <div v-if="badReq">Error 400 : Bad Request! Not a numeric id</div>
    <div v-else>
    <div v-if="err">Error 404 : Comic not found</div>
    <div v-else>
    <h1>{{this.comics.title}}</h1>
    <br />
    <br />
    <br />
    <img v-if="this.comics.thumbnail.path" :src="this.comics.thumbnail.path+`/portrait_uncanny.`+this.comics.thumbnail.extension" :alt ="this.comics.title"/>
    <br />
    <br/>
    <span v-html="this.comics.description"></span>
    <br />
    <br />
    <h2>Page Count : {{this.comics.pageCount}}</h2> 
    <br />
    <br />
    <h3>Stories:</h3>
    <ul>
      <li v-for="story in this.comics.stories.items" :key="story.name">{{story.name}}</li>     
    </ul>
    </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ComicDetails",
  data() {
    return {
      id: this.$route.params.id,
      comics: { title: null, thumbnail: { path: null,extension:null }, description: null,pageCount:"Not Available" },
      name: null,
      err:false,
      badReq:false
    };
  },
  methods: {
    async getComic(id) {
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
    const baseUrl = `https://gateway.marvel.com:443/v1/public/comics/${id}`+"?ts=" +ts +"&apikey=" +publickey +"&hash=" +hash ;
      try{
    const { data}  =await axios.get(baseUrl);
    this.comics = data.data.results[0];
    }
      catch(e){
        this.err = true;
      }
    
    }
  },
  created() {
    this.getComic(this.$route.params.id);
  },
  watch: {
    $route() {
      this.getComic(this.$route.params.id);
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