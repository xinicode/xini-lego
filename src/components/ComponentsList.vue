<template>
  <div class="create-component-list">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="component-item"
      @click="onItemClick(item)"
    >
      <l-text v-bind="item"></l-text>
    </div>
  </div>
  <!-- <Uploader @success="onImageUploaded"></Uploader> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LText from '../components/LText.vue';
import Uploader from '../components/Uploader.vue';
export default defineComponent({
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  name: 'components-list',
  components: {
    LText,
    Uploader,
  },
  setup(props, context) {
    const onItemClick = (data) => {
      context.emit('on-item-click',data)
    };
    return {
      onItemClick
    };
  },
});
</script>

<style>
.component-item {
  width: 100px;
  margin: 0 auto;
  margin-bottom: 15px;
}
</style>
