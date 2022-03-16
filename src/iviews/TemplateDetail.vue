<template>
  <div class="homepage-container">
    <h1>aaa111a</h1>
    {{ msg }}
    <a-button @click="onClick" type="primary">click</a-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "Index",
  setup() {
    const route = useRoute();
    const route2 = useRouter();
    const msg = "123";
    const user = ref("cccc");
    const onClick = () => {
      user.value = "aaaac";
      route2.push({
        path: "/login",
        params: { a: "123" },
      });
    };
    return {
      msg,
      user,
      route,
      onClick,
    };
  },
});
</script>
