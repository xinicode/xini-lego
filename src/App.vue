<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "App",
  setup() {
    const route = useRoute();
    console.log('route: ', route);
    const withHeader = computed(() => {
      return route.meta.withHeader;
    });
    console.log(withHeader);
    return {
      withHeader,
    };
  },
});
</script>
<style>
.app-container .global-spinner {
  position: fixed;
  top: 10px;
  right: 50%;
}
</style>
