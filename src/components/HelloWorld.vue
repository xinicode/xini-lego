<template>
  <h1>123</h1>
  {{ msg }}
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props:{
    msg: String
  },
  setup() {
    const msg1 = "a";
    return {
      msg1,
    };
  },
});
</script>
