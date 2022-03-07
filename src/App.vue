<template>
  <h1>标准模版</h1>
  <ul>
    <Hello msg="beangin" />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Hello from "./components/hello";

export default defineComponent({
  name: "App",
  methods: {
    aasda() {
      console.log(")");
    },
  },
  components: {
    Hello,
  },
});
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
</style>
