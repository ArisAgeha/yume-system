<template>
  <div class="project-item">
    <div class="info-bar">
      <div class="left">
        <div class="main-cover">
          <img fit="cover" :src="project.main_cover" alt="" />
        </div>
        <div class="info">
          <div class="title">{{ project.title }}</div>
          <div class="introduction text-ellipsis-2">{{ project.introduction }}</div>
        </div>
      </div>
      <div class="right">
        <el-button type="primary" @click="showProject">查看</el-button>
      </div>
    </div>
    <el-divider />
    <div class="content">
      <div class="story-wrapper" v-if="project.story.length > 0">
        <div class="story" v-for="st in project.story" :key="st.story_id">
          <h3>{{ st.title }}</h3>
          <p>{{ st.preview }}</p>
        </div>
      </div>
      <div class="cover-wrapper" v-if="project.cover.length > 0">
        <div class="cover" v-for="(cover, index) in project.cover" :key="index">
          <el-image :src="cover" fit="cover" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '@/store';

export default {
  props: {
    project: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
    };
  },
  methods: {
    showProject() {
      store.ui.previewProject(this.project.project_id);
    }
  },
  computed: {
  },
  created() {
  }
};
</script>

<style lang='scss' scoped>
.project-item {
  margin: auto;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0,0,0,.08);
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 30px;
  background-color: #fff;

  .info-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      align-items: center;
      .main-cover {
        height: 60px;
        width: 60px;
        min-width: 60px;
        min-height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 30px;

        img {
          width: 60px;
          height: 60px;
          object-fit: cover;
        }
      }

      .info {
        color: #666;
        height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 80%;

        .title {
          font-size: 18px;
        }

        .introduction {
          line-height: 1.2;
        }
      }

    }
  }

  .content {
    .story-wrapper {
    }

    .cover-wrapper {
      display: flex;
      align-items: center;
      margin-top: 20px;

      .cover {
        width: 320px;
        height: 180px;
        margin-right: 20px;

        .el-image {
          width: 100%;
          height: 100%;
        }
      }

      .cover:last-child {
        margin-right: 0;
      }
    }
  }

}
</style>
