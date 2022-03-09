<template>
  <div class="homepage-container">
    <a-layout :style="{ background: '#fff' }">
      <a-layout-header class="header">
        <div class="page-title">
          <router-link to="/">高{{ user }}</router-link>
          <!-- <a-button type="primary" @click="onClick">测试按钮</a-button> -->
        </div>
        <user-profile></user-profile>
      </a-layout-header>
      <a-layout-content class="home-layout">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
    <a-layout-footer>
      © 20000929号-2
    </a-layout-footer>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, ref } from "vue";
import { useRouter } from "vue-router";
import userProfile from "../components/UserProfile.vue";

export default defineComponent({
  name: "Index",
  components: {
    "user-profile": userProfile,
  },
  setup() {
    const user = ref("user");
    const router = useRouter();
    const onClick = () => {
      router.push("/works");
    };
    return {
      onClick,user
    };
  },
});
</script> 
<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.page-title {
  color: #fff;
}
</style>