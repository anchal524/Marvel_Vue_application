<template>
  <div>
    <div v-if="badReq">Error 400:Bad Request!Not a numeric page</div>
    <div v-else>
    <div v-if="err">Error 404:Page not found</div>
    <div v-else>
      <ul>
        <li v-for="(character,index) in characters" :key="index">
          <router-link :to="{name: 'CharacterDetails', params: {id: character.id}}">{{character.name}}</router-link>
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
  name: "Characters ",
  data() {
    return {
    page: this.$route.params.page,
    characters: [],
    err:false,
    notFirstPage:true,
    notLastPage:true,
    badReq:false
    };
  },methods:{
    getData(page){
      if(isNaN(parseInt(page)))
      {
        console.log("id",parseInt(page));
        this.badReq = true

      }
    const md5 = require("blueimp-md5");
    const publickey = "20064086eb5dea5539cf2be4e9e8f743";
    const privatekey = "e9846adc932f1d910526bd99de72d895d553d5ca";
    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);
     const offset = page * 20;
    const baseUrl = "https://gateway.marvel.com:443/v1/public/characters"+"?ts=" +ts +"&apikey=" +publickey +"&hash=" +hash +"&offset=" +offset +"&limit=20"; 
    console.log("yo",typeof page);
    axios
      .get(baseUrl)
      .then(({ data }) => (this.characters = data.data.results));
    console.log("page",this.$route.params.page);
  },getNextPage(){
      console.log("pagenew",this.$route.params.page);
      let pageNum = (parseInt(this.$route.params.page)+1).toString();
      console.log("pageNum",pageNum);
      this.$router.push({name:"characters",params:{page:pageNum}})
    } ,getPrevPage(){
      console.log("pageprevnew",this.$route.params.page);
      let pageNum = (parseInt(this.$route.params.page)-1).toString();
      console.log("pageNumprev",pageNum);
      this.$router.push({name:"characters",params:{page:pageNum}})
    } 
  },
  created() {
      if(parseInt(this.$route.params.page) < 79){
          if(parseInt(this.$route.params.page) == 0)
          {
              this.notFirstPage=false
            }else{
                this.notFirstPage=true
            }
            if(parseInt(this.$route.params.page) == 78)
            {
               this.notLastPage=false 
            }else{
                this.notLastPage=true
            }

        this.getData(this.$route.params.page);
        }else
        {this.err=true
        console.log("err",this.err);}

  },  watch: {
    $route() {
         if(parseInt(this.$route.params.page) < 79 && parseInt(this.$route.params.page) >= 0){
             if(parseInt(this.$route.params.page) == 0)
          {
               this.notFirstPage=false
              console.log("firstPage",this.firstPage);
            }
            else{
                 this.notFirstPage=true
                 console.log("firstPage",this.firstPage);
            }
            if(parseInt(this.$route.params.page) == 78)
            {
               this.notLastPage=false 
            }else{
                this.notLastPage=true
            }
      this.getData(this.$route.params.page);
      this.err=false;
    }else
        {this.err=true
        console.log("fromroute err",this.err);}
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
  background-color: #e0edf4;
  border-left: 5px solid #3eb3f6;
  margin-bottom: 2px;
  color: #3e5252;
}

p {
  text-align: center;
  padding: 30px 0;
  color: gray;
}
</style>