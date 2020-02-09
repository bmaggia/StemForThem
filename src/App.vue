<template>
  <div id="app">
    <!-- <header></header> -->
    <top-header></top-header>
    
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Top-Header";
export default {
  components: {
    "top-header": Header
  },
  data() {
    return {
      blah: "erik"
    };
  }
};
</script>  

<style lang="scss">
#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
</style>
