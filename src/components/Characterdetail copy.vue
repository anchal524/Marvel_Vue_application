<template>
  <div>
    
      <h1>{{this.characters.name}}</h1>
      <br />
      <br />
      <br />
      <img v-if="this.characters.thumbnail.path" :src="this.characters.thumbnail.path+`/portrait_uncanny.`+this.characters.thumbnail.extension" />
      <br />
      <br/>
      <span v-html="this.characters.description"></span>
      <br />
      <br />
      <br />
      <h4>Comics:</h4>
      <ul>
        <li v-for="comic in this.characters.comics.items" :key="comic.name">{{comic.name}}</li>     
      </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CharacterDetails",
  data() {
    return {
      id: this.$route.params.id,
      characters: { name: null, thumbnail: { path: null,extension:null }, description: null },
    //   characters: { name: null,  description: null },
      name: null,
    };
  },
  methods: {
    getCharacter(id) {
    const md5 = require("blueimp-md5");
    const publickey = "20064086eb5dea5539cf2be4e9e8f743";
    const privatekey = "e9846adc932f1d910526bd99de72d895d553d5ca";
    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);
    const baseUrl = `https://gateway.marvel.com:443/v1/public/characters/${id}`+"?ts=" +ts +"&apikey=" +publickey +"&hash=" +hash ;
    console.log(baseUrl);
    axios
      .get(baseUrl)
      .then(({ data }) => (this.characters = data.data.results[0]));
      console.log("c",this.characters.name);
     }
  },
  created() {
    this.getCharacter(this.$route.params.id);
    console.log("c",this.characters.name);
  },
  watch: {
    $route() {
      this.getCharacter(this.$route.params.id);
    }
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}
span {
  text-align: center;
  max-width: 50%;
}
div {
  max-width: 50%;
  margin: 0 auto;
}
</style>