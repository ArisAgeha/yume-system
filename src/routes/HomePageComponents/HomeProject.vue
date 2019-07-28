<template>
  <div class="home-project">
    <div class="project-card" v-for="pj in projects" :key="pj.project_id">
      <project-item :project="pj" />
    </div>
  </div>
</template>

<script>
import services from '@/services';
import ProjectItem from '@/routes/PublicComponents/ProjectItem';

export default {
  components: {
    ProjectItem
  },
  data() {
    return {
      projects: []
    };
  },
  methods: {
  },
  computed: {
  },
  async created() {
    try {
      this.projects = await services.home.getProject();
    }
    catch(err) {
      this.$message.error(err.message);
      console.error(err);
    }
  }
};
</script>

<style lang='scss' scoped>
.home-project {
  background-color: #e6eaee;
  padding-bottom: 80px;

  .project-card {
    width: 60%;
    margin: auto;
  }
}
</style>
