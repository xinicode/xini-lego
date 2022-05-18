<template>
  <div class="editor-container">
    <a-layout>
      <a-layout-sider width="300" style="background: #fff">
        <div class="sidebar-container">
          组件列表
          <components-list :list="defaultTextTemplates"  @onItemClick="addItem"/>
        </div>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content class="preview-container">
          <p>画布区域</p>
          <div class="preview-list" id="canvas-area">
            <component v-for="item in list"
              :is="item.name"
              :key="item.id"
              v-bind="item.props"
            />
          </div>

          
        </a-layout-content>
      </a-layout>
      <a-layout-sider width="300" style="background: #fff" class="settings-panel">
        组件属性
       
      </a-layout-sider>
    </a-layout>
  </div>
</template>
<script lang="ts">
import Helper from '@/base/ya-helper';
import ComponentsList from '@/components/ComponentsList.vue';
import Uploader from '@/components/Uploader.vue';
import { GlobalDataProps } from '@/store/index';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { defaultTextTemplates } from '../base/defaultTemplates';
import { commonUploadCheck } from '../base/helper';
import Ltext from '../components/LText.vue';
export default defineComponent({
  components: {
    'l-text':Ltext,
    Uploader,
    ComponentsList
  },
  setup() {
    const styleProps = {
      fontSize:"24px",
      color:"red"
    };
    const tag = "h1"
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
    const list = computed(() => store.state.editor.components);
    // const list: any = [];
    const action: string = "http://wwww.bbbb/ccc/upload";
    const uploadSucc = (val)=>{
      console.log(val)
    }
    const addItem = (props:any) =>{
      store.commit('addComponent',props)
    }
    return {
      addItem,
      commonUploadCheck,
      store,
      uploadSucc,
      action,
      aaa,
      userInfo,
      list,
      text,
      defaultTextTemplates,
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
