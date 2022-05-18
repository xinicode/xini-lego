<template>
  <div>
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
    <input ref="fileInput" type="file" :style="{ display: 'none' }" @change="handelFileChange" />
    <ul>
      <li v-for="file in filesList" :key="file.uuid">
        <img style="width:100px;height:100px;" :src="file.url" :alt="file.name" />
        <span v-if="file.status === 'loading'" class="file-icon"><LoadingOutlined /></span>

        <span v-else class="file-icon"><FileOutlined /></span>
        <span class="filename">{{ file.name }}</span>
        <span class="delete-icon" @click="removeFile(file.uid)"><DeleteOutlined /></span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { DeleteOutlined, FileOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import axios from 'axios';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { computed, defineComponent, onMounted, PropType, reactive, ref } from 'vue';
type UploadStatus = 'ready' | 'loading' | 'success' | 'error';
type CheckUpload = (file: File) => boolean | Promise<File>;
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status: UploadStatus;
  raw: File;
  url?: String;
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
    beforeUpload: {
      type: Function as PropType<CheckUpload>,
    },
  },
  emits: ['success', 'error', 'change'],
  setup(props, { emit }) {
    const fileInput = ref<null | HTMLInputElement>(null);
    const filesList = ref<UploadFile[]>([]);
    const isUploading = computed(() => {
      return filesList.value.some((file) => file.status === 'loading');
    });
    const lastFileData = computed(() => {
      const lastFile = _.last(filesList.value);
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
      filesList.value = filesList.value.filter((item) => {
        return item.uid !== id;
      });
    };
    const events = {
      click: triggerUpload,
    };
    const handelFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      beforeUploadCheck(target.files);
    };
    const beforeUploadCheck = (files: null | FileList) => {
      if (!files) return;
      const uploadedFile = files[0];
      if (props.beforeUpload) {
        const result = props.beforeUpload(uploadedFile);
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            if (processedFile instanceof File) {
              addFileToList(processedFile);
            }
          });
        } else if (result === true) {
          addFileToList(uploadedFile);
        }
      } else {
        addFileToList(uploadedFile);
      }
    };
    const addFileToList = (uploadedFile) => {
      const fileObj = reactive<UploadFile>({
        uid: uuidv4(),
        size: uploadedFile.size,
        name: uploadedFile.name,
        raw: uploadedFile,
        status: 'loading',
      });

      try {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedFile);
        fileReader.onload = (res)=>{
          fileObj.url = res.target?.result as String;
          fileObj.status = 'success';
        }
        // fileObj.url = ;
        // fileObj.url = URL.createObjectURL(uploadedFile);
      } catch (error) {
        console.error('error', error);
      }

      filesList.value.push(fileObj);
      console.log("file: Uploader.vue ~ line 136 ~ filesList", filesList)
      // postFile(fileObj);
    };
    const postFile = (readyFile: UploadFile) => {
      emit('success', { ist: filesList.value });
      return;
      const formData = new FormData();
      formData.append(readyFile.name, readyFile.raw);
      readyFile.status = 'loading';
      axios
        .post(props.action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((resp) => {
          readyFile.status = 'success';
          readyFile.resp = resp.data;
          emit('success', { resp: resp.data, file: readyFile, list: filesList.value });
        })
        .catch((err) => {
          console.log(err);
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
      filesList,
      isUploading,
      lastFileData,
      events,
      removeFile,
    };
  },
});
</script>
