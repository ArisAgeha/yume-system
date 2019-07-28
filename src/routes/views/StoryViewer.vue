<template>
  <div class="story-viewer">
    <el-dialog
      :visible.sync="show"
      :fullscreen="true"
      :show-close="false"
      :close-on-press-escape="false"
      :append-to-body="true">

      <div class="story-viewer-wrapper medium-scrollbar" @click="closeModal">
        <div class="story-viewer-body" @click.stop>
          <div class="title-wrapper">
            <span class="title text-ellipsis-1">{{ story.title }}</span>
            <div class="info" v-if="story.author">
              <span>作者: {{ story.author.nickname }}</span>
              <span class="time">{{ story.created_at | date }}</span>
            </div>
          </div>
          <div class="section-wrapper">
            <p v-for="(section, index) in storyArr" :key="index">
              {{ section }}
            </p>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { store } from '@/store';
import services from '@/services';

export default {
  components: {
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    storyid: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      story: {},
      storyArr: [],
      page: 1
    };
  },
  methods: {
    async initData() {
      let storyId = this.storyid;
      if (!storyId) {
        this.$message.error('无法查看该故事');
        return;
      }
      try {
        this.story = await services.story.getStoryDetail(storyId);
        this.storyArr = this.story.content.split('\n');
      }
      catch(err) {
        this.$message.error(err.message);
        console.error(err);
      }
    },
    closeModal() {
      store.ui.closeStory();
    }
  },
  watch: {
  },
  computed: {
    show: {
      get() {
        return this.dialogVisible;
      },
      set(val) {
        this.$emit('update:dialogVisible', val);
      }
    }
  },
  beforeDestroy() {
  },
  beforeCreate() {
  },
  created() {
    this.initData();
  }
};
</script>

<style lang='scss' scoped>
.story-viewer-wrapper {
  width: 100%;
  padding-top: 7vh;
  padding-bottom: 50px;
  position: relative;
  transition: 0.3s;
  story-select: none;
  height: 100%;
  overflow: auto;
}

.story-viewer-body {
  width: 800px;
  border-radius: 4px;
  margin: auto;
  transition: 0.3s;
  background-color: #fff;
  font-size: 14px;

  .title-wrapper {
    border-bottom: 2px solid #ececec;
    height: 72px;
    padding: 0 30px;
    display: flex;
    justify-content: center;
    flex-direction: column;

    .title {
      font-size: 24px;
    }

    .info {
      margin-top: 12px;
      
      .time {
        margin-left: 24px;
      }
    }
  }

  .section-wrapper {
    padding: 10px 30px;
    p {
      line-height: 1.4;
      margin: 0.75em 0;
      min-height: 1em;
    }
  }
}
</style>
