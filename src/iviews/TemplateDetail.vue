<template>
  <div class="homepage-container">
    <h1>aaa111a</h1>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, ref } from "vue";
export default defineComponent({
  name: "Index",
  setup() {
    const msg = "123";
    const user = ref("cccc");
    const onClick = () => {
      user.value = "aaaac";
    };
    return {
      msg,
      user,
      onClick,
    };
  },
});
</script> 