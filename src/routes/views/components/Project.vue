<template>
  <div class="project-wrapper">
    <div class="project-card" v-for="project in projects" :key="project.project_id">
      <project-item :project="project" />
    </div>
    <div class="load-more" @click="fetchMoreProject">
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
</style>

<script>
import services from '@/services';
import ProjectItem from '../../PublicComponents/ProjectItem';

export default {
  props: {
    userId: {
      required: true,
      type: String
    }
  },
  components: {
    ProjectItem
  },
  data() {
    return {
      page: 1,
      size: 10,
      projects: [],
      loading: false,
      isEnd: false
    };
  },
  methods: {
    async fetchMoreProject() {
      if (this.loading) return;
      this.loading = true;
      try {
        let projects = await services.project.getUserProject(this.userId, this.page, this.size);
        this.projects = this.projects.concat(projects);
        if (projects.length < this.size) this.isEnd = true;
        this.page++;
      }
      catch(err) {
        this.$message.error(err.message);
        console.error(err);
      }
      finally {
        this.loading = false;
      }
    },
    async initData() {
      this.fetchMoreProject();
    }

  },
  computed: {
  },
  created() {
    this.initData();
  }
};
</script>
