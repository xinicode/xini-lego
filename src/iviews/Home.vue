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
import { defineComponent, toRefs, ref ,reactive} from "vue";
import { useRouter } from "vue-router";
import TemplateList from '../components/TemplateList.vue';
export default defineComponent({
  name: "Index",
  components:{
    'template-list': TemplateList,
  },
  setup() {
    const router = useRouter();
    const isLoading = ref(false);
    const isLastPage = ref(false);
    const msg = "123";
    const user = ref("cccc");
    const onClick = () => {
      router.push("/works");
    };
    const testData = [
      {
       id: '123',
        props: 'PageProps',
        title: "string",
        desc: "string",
        coverImg: "string",
        uuid: "string",
        setting: { key: "string]: any" },
        isTemplate: true,
        isHot: true,
        isNew: true,
        author: true,
        copiedCount: 123,
        status: true,
        user : {
          gender: "true",
          nickName: "string",
          picture: "string",
          userName: "string",
        },
      },
      {
       id: '123',
        props: 'PageProps',
        title: "string",
        desc: "string",
        coverImg: "string",
        uuid: "string",
        setting: { key: "string]: any" },
        isTemplate: true,
        isHot: true,
        isNew: true,
        author: true,
        copiedCount: 123,
        status: true,
        user : {
          gender: "true",
          nickName: "string",
          picture: "string",
          userName: "string",
        },
      },
      {
       id: '123',
        props: 'PageProps',
        title: "string",
        desc: "string",
        coverImg: "string",
        uuid: "string",
        setting: { key: "string]: any" },
        isTemplate: true,
        isHot: true,
        isNew: true,
        author: true,
        copiedCount: 123,
        status: true,
        user : {
          gender: "true",
          nickName: "string",
          picture: "string",
          userName: "string",
        },
      },
      {
       id: '123',
        props: 'PageProps',
        title: "string",
        desc: "string",
        coverImg: "string",
        uuid: "string",
        setting: { key: "string]: any" },
        isTemplate: true,
        isHot: true,
        isNew: true,
        author: true,
        copiedCount: 123,
        status: true,
        user : {
          gender: "true",
          nickName: "string",
          picture: "string",
          userName: "string",
        },
      }
    ];
    const loadMorePage = () => {
      console.log(testData);
      // isLoading.value = true;
    };
    return {
      msg,isLastPage,isLoading,
      user,
      onClick,
      testData,
      loadMorePage,
    };
  },
});
</script>
