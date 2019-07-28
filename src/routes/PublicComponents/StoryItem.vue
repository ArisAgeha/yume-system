<template>
  <div class="story-item" @click="previewStory">
    <div class="title">
      <span class="text-ellipsis-2">
        {{ story.title }}
      </span>
    </div>
    <div class="preview">
      {{ story.preview }}
    </div>
  </div>
</template>

<script>
import { store } from '@/store';

export default {
  props: {
    story: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
    };
  },
  methods: {
    previewStory() {
      store.ui.previewStory(this.story.story_id);
      this.$emit('previewStory');
    }
  },
  computed: {
  },
  created() {
  }
};
</script>

<style lang='scss' scoped>
  .story-item {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 4px 0 rgba(0,0,0,.3);
    transition: 0.3s;
    cursor: pointer;

    .title {
      height: 25%;
      border-bottom: 1px solid #ececec;
      font-size: 20px;
      padding: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .preview {
      padding: 10px;
      height: 75%;
      line-height: 1.4;
    }
  }

  .story-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0,0,0,.4);
  }
</style>
