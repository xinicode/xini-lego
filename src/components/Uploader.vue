<template>
  <div>
    <button @click="toTop">传给父</button>
    <div v-on="events">
      <slot v-if="isUploading" name="loading">
        <button disabled>正在上传</button>
      </slot>

      <slot
        name="uploaded"
        v-else-if="lastFileData && lastFileData.loaded"
        :uploadedData="lastFileData.data"
      >
        <button>点击上传</button>
      </slot>

      <slot v-else name="defalut">
        <button>点击上传</button>
      </slot>
    </div>
    <ul>
      <li v-for="file in uploadedFiles" :key="file.uuid">
        <span v-if="file.status === 'loading'" class="file-icon"><LoadingOutlined /></span>
        <span v-else class="file-icon"><FileOutlined /></span>
        <span class="filename">{{ file.name }}</span>
        <span class="delete-icon" @click="removeFile(file.uid)"><DeleteOutlined /></span>
      </li>
    </ul>
    <input ref="fileInput" :style="{ display: 'none' }" type="file" @change="handelFileChange" />
  </div>
  <h1>子：{{ st }}</h1>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  inject,
  getCurrentInstance,
  onMounted,
} from 'vue';
import axios from 'axios';
import { emitter } from '../main';
import { DeleteOutlined, LoadingOutlined, FileOutlined } from '@ant-design/icons-vue';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { UploadFileStatus } from 'ant-design-vue/lib/upload/interface';
type UploadStatus = 'ready' | 'loading' | 'success' | 'error';
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status: UploadStatus;
  raw: File;
  resp?: any;
}
export default defineComponent({
  components: {
    DeleteOutlined,
    LoadingOutlined,
    FileOutlined,
  },
  props: {
    action: {
      type: String,
      default: 'http://wwww.bbbb/ccc/upload',
      required: true,
    },
  },
  setup(props) {
    const st: any = inject('cuihao');
    const toTop = () => {
      // emitter.emit("on-change", "from child111");
      st.value = '123';
    };
    const uploadedFiles = ref<UploadFile[]>([]);
    const fileInput = ref<null | HTMLInputElement>(null);
    const fileStatus = ref<UploadStatus>('ready');

    const isUploading = computed(() => {
      return uploadedFiles.value.some((file) => file.status === 'loading');
    });
    const lastFileData = computed(() => {
      const lastFile = _.last(uploadedFiles.value);
      if (lastFile) {
        return {
          loaded: lastFile.status === 'success',
          data: lastFile.resp,
        };
      }
      return false;
    });
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };
    const removeFile = (id: string) => {
      uploadedFiles.value = uploadedFiles.value.filter((item) => {
        return item.uid !== id;
      });
    };
    const events = {
      click: triggerUpload,
    };
    const handelFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      if (!files) return;
      const uploadedFile = files[0];
      const formData = new FormData();
      formData.append(uploadedFile.name, uploadedFile);
      const fileObj = reactive<UploadFile>({
        uid: uuidv4(),
        size: uploadedFile.size,
        name: uploadedFile.name,
        raw: uploadedFile,
        status: 'loading',
      });
      uploadedFiles.value.push(fileObj);
      axios
        .post(props.action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((resp) => {
          console.log(resp.data);
          fileObj.status = 'success';
        })
        .catch(() => {
          fileObj.status = 'error';
        })
        .finally(() => {
          if (fileInput.value) {
            fileInput.value.value = '';
          }
        });
    };
    onMounted(() => {
      //   const instance = getCurrentInstance();
      //   console.log(instance?.proxy?.$parent);
    });
    return {
      triggerUpload,
      handelFileChange,
      fileInput,
      uploadedFiles,
      fileStatus,
      isUploading,
      lastFileData,
      events,
      removeFile,
      st,
      toTop,
    };
  },
});
</script>
