<template>
  <div class="story">
    <div class="storys-wrapper">
      <div class="story-card" v-for="story in storys" :key="story.story_id">
        <story-item :story="story" />
      </div>
    </div>

    <div class="load-more" @click="fetchMoreStory">
      <span v-if="!loading && !isEnd">加载更多</span>
      <span v-else-if="loading && !isEnd">
        <i class="el-icon-loading"></i>
        加载中...
      </span>
      <span v-else-if="isEnd">
        没有更多啦
      </span>
    </div>
  </div>
</template>

<script>
import services from '@/services';
import StoryItem from '../../PublicComponents/StoryItem';

export default {
  components: {
    StoryItem
  },
  props: {
    projectId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      storys: [],
      page: 1,
      size: 20,
      isEnd: false
    };
  },
  methods: {
    async initData() {
      this.fetchMoreStory();
    },
    async fetchMoreStory() {
      if (this.loading || this.isEnd) return;
      this.loading = true;
      try {
        let storys = await services.story.getProjectStory(this.projectId, this.page, this.size);
        this.storys = this.storys.concat(storys);
        if (storys.length < this.size) this.isEnd = true;
        this.page++;
      }
      catch(err) {
        this.$message.error(err.message);
        console.error(err);
      }
      finally {
        this.loading = false;
      }
    }
  },
  computed: {
  },
  created() {
    this.initData();
  }
};
</script>

<style lang='scss' scoped>
.load-more {
  height: 50px;
  width: 100%;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border: 1px solid #ececec;
}

.storys-wrapper {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-around;
  background: #edf2fa;
  padding-top: 10px;
  border-radius: 4px;

  .story-card {
    width: 30%;
    height: 300px;
    margin: 10px 0;
  }
}
</style>
