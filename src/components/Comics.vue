<template>
  <div>
    <div v-if="badReq">Error 400 : Bad Request! Not a numeric page number</div>
    <div v-else>
    <div v-if="err">Error 404 : Page not found</div>
    <div v-else>
    <ul>
      <li v-for="(comic,index) in comics" :key="index">
        <router-link :to="{name: 'ComicDetails', params: {id: comic.id}}">{{comic.title}}</router-link>
      </li>
    </ul>
    <button v-if="notLastPage" v-on:click="getNextPage">Next</button>
    <button v-if="notFirstPage" v-on:click="getPrevPage">Previous</button>
    </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Comics ",
  data() {
    return {
      page: this.$route.params.page,
      comics: [],
      err:false,
      notFirstPage:true,
      notLastPage:true,
      badReq:false
    };
  },
  methods:{
    getData(page){
      if(isNaN(parseInt(page)))
      {       this.badReq = true;   }
    const md5 = require("blueimp-md5");
    const publickey = "20064086eb5dea5539cf2be4e9e8f743";
    const privatekey = "e9846adc932f1d910526bd99de72d895d553d5ca";
    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);
     const offset = page * 20;
    const baseUrl = "https://gateway.marvel.com:443/v1/public/comics"+"?ts=" +ts +"&apikey=" +publickey +"&hash=" +hash +"&offset=" +offset +"&limit=20"; 
    axios
      .get(baseUrl)
      .then(({ data }) => (this.comics = data.data.results));
  },getNextPage(){
      let pageNum = (parseInt(this.$route.params.page)+1).toString();
      this.$router.push({name:"comics",params:{page:pageNum}})
    } ,getPrevPage(){
      let pageNum = (parseInt(this.$route.params.page)-1).toString();
      this.$router.push({name:"comics",params:{page:pageNum}})
    } },
  created() {
  if(parseInt(this.$route.params.page) < 2592 && parseInt(this.$route.params.page) >= 0){
          if(parseInt(this.$route.params.page) == 0)
          {
              this.notFirstPage=false
            }else{
                this.notFirstPage=true
            }
            if(parseInt(this.$route.params.page) == 2591)
            {
               this.notLastPage=false 
            }else{
                this.notLastPage=true
            }

        this.getData(this.$route.params.page);
        } else if(isNaN(parseInt(this.$route.params.page)))
      {
        this.badReq = true

      }else
        {this.err=true}
  },  watch: {
    $route() {
      if(parseInt(this.$route.params.page) < 2592 && parseInt(this.$route.params.page) >= 0){
             if(parseInt(this.$route.params.page) == 0)
          {this.notFirstPage=false;}
            else{this.notFirstPage=true  }
            if(parseInt(this.$route.params.page) == 2591)
            {
               this.notLastPage=false 
            }else{
                this.notLastPage=true
            }
      this.getData(this.$route.params.page);
    } else if(isNaN(parseInt(this.$route.params.page)))
      {
        this.badReq = true

      }else
        {this.err=true}
    }
  }
};
</script>

<style scoped>
ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

ul li {
  padding: 20px;
  font-size: 1.3em;
  background-color: whitesmoke;
  border-left: 5px solid #3eb3f6;
  margin-bottom: 2px;
  color: black;
}
a {
  color: rgb(179, 20, 20);
}
p {
  text-align: center;
  padding: 30px 0;
  color: gray;
}
div {
    text-align: center;
    color: black;
    text-decoration: none !important;
    font-size: 30px;
    font-family: "Times New Roman", Times, serif;
}
button{
  font-size: medium;
    color: rgb(179, 20, 20);
    font-weight: bold;
    text-decoration: none !important;
    border: grey groove 2px;
    padding: 10px;
    background-color: whitesmoke;
    margin-top: 15px;
}
</style>