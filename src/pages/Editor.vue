<template>
  <div class="editor-container">
    <a-layout>
      <a-layout-sider width="300" style="background: #fff">
        <div class="sidebar-container">
          组件列表
          <components-list :list="defaultTextTemplates" @onItemClick="addItem" />
        </div>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content class="preview-container">
          <p>画布区域</p>
          <div class="preview-list" id="canvas-area"></div>
        </a-layout-content>
      </a-layout>
      <ul>
        <li v-for="item in list" :key="item.id">
          {{ item.name }}
          <pre>{{ item }}</pre>
        </li>
      </ul>
      <a-layout-sider width="300" style="background: #fff" class="settings-panel">
        组件属性
        <Uploader ref="uploadDom" @change="getChild" />
        父：<input type="text" @change="getText" v-model="text" />
        <a-button @click="getRef">ref获取子组件</a-button>
        <h1>{{ userInfo.test }}</h1>
      </a-layout-sider>
    </a-layout>
  </div>
</template>
<script lang="ts">
import Helper from '@/base/ya-helper';
import Uploader from '@/components/Uploader.vue';
import { GlobalDataProps } from '@/store/index';
import $axios from '@/utils/request';
import _ from 'lodash';
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
export default defineComponent({
  components: {
    Uploader,
  },
  setup() {
    const text = ref<any>('T');
    const text2 = ref<any>('');
    const userInfo = ref({
      test: '123',
    });
    const uploadDom = ref();
    const store = useStore<GlobalDataProps>();
    onMounted(() => {
      const t = Helper.makeAutoId();
      console.log(t);
    });
    const aaa = () => {};
    // const list = computed(() => store.state.editor.components);
    const list: any = [];
    return {
      store,
      aaa,
      userInfo,
      list,
      text,
      text2,
      uploadDom,
    };
  },
});
</script>

<style>
.editor-container .preview-container {
  padding: 24px;
  margin: 0;
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.editor-container .preview-list {
  padding: 0;
  margin: 0;
  min-width: 375px;
  min-height: 200px;
  border: 1px solid #efefef;
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  margin-top: 50px;
  max-height: 80vh;
}
</style>
