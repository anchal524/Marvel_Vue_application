<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/characters/page/0">Characters</router-link>
      <router-link to="/comics/page/0">Comics</router-link>
      <router-link to="/series/page/0">Series</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
nav {
  padding: 20px 20px 20px 0;
}
nav a {
  padding: 10px;
  text-decoration: none;
  background: #fff;
  border-radius: 3px;
  color: #2c3e50;
  font-weight: bold;
  margin-right: 15px;
  font-size: 40px;
}
</style>
