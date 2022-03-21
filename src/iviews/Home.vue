<template>
  <div class="content-container">
    <a-row :gutter="16">
      <a-col :span="24">
        <template-list :list="testData"></template-list>
      </a-col>
    </a-row>
    <a-row type="flex" justify="center">
      <a-button
        type="primary"
        size="large"
        @click="loadMorePage"
        v-if="!isLastPage"
        :loading="isLoading"
        >加载更多</a-button
      >
    </a-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, computed, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import TemplateList from "../components/TemplateList.vue";
import {GlobalDataProps} from '../store/index';
export default defineComponent({
  name: "Index",
  components: {
    "template-list": TemplateList,
  },
  setup() {
    const router = useRouter();
    const store = useStore<GlobalDataProps>();
    const isLoading = ref(false);
    const isLastPage = ref(false);
    const msg = "123";
    const user = ref("cccc");

    const testData = computed(() => store.state.templates.data);
    console.log('testData: ', testData);
    const onClick = () => {
      router.push("/works");
    };
    const loadMorePage = () => {
      // console.log(testData);
      // isLoading.value = true;
    };
    return {
      msg,
      isLastPage,
      isLoading,
      user,
      onClick,
      testData,
      loadMorePage,
    };
  },
});
</script>
