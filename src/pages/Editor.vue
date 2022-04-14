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
        <Uploader ref="uploadDom" @on-change="getChild" />
        父：<input type="text" v-model="text" />
        <a-button @click="getRef">ref获取子组件</a-button>
      </a-layout-sider>
    </a-layout>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import Uploader from '../components/Uploader.vue';
import { GlobalDataProps } from '../store/index';
import userCUrrentInstance from '../utils/useCurrentInstance';

export default defineComponent({
  components: {
    Uploader,
  },
  setup() {
    const { proxy } = userCUrrentInstance();
    const text = ref<any>('this is test msg');
    const uploadDom = ref();
    const getRef = () => {
      const query = {
        conStr: 'iaas',
        filters: '',
        orderby: 'createTime desc',
        page: 1,
        page_size: 10,
        params: { content: '', custId: '' },
        rawfilters: {},
        searchParams: {},
        sqlId: 'iaasVpcPeeringConnection.getListForCrossUserUserCanManageCustomer',
        total: true,
      };
      proxy.$axios.post('gateway/cmp-main-api/api/queryPageList', query).then((rs: any) => {
        const datas = rs.data;
        console.log(datas);
      });
    };
    // emitter.on("on-change", (s) => {
    //   text.value = s;
    // });
    const cuihao = ref();
    const store = useStore<GlobalDataProps>();
    const aaa = () => {
      cuihao.value.triggerUpload();
      console.log(cuihao);
    };
    // const list = computed(() => store.state.editor.components);
    const list: any = [];
    return {
      store,
      aaa,
      list,
      cuihao,
      text,
      getRef,
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
