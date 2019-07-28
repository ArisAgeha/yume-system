<template>
  <div>
    <el-dialog
      title="标题"
      :visible.sync="show"
      width="600px"
      :append-to-body="true">

        <div class="story-selector medium-scrollbar">
          <div class="story-wrapper story-is-added" v-if="insertedStory.length > 0">
            <h3>已绑定的故事</h3>
            <div 
              @click="removeStory(index)"
              class="story" 
              :class="{ ban: !isAdmin && story.user_id !== userId }" 
              v-for="(story, index) in insertedStory" 
              :key="story.story_id">
              <i class="el-icon-remove"></i>
              <span>
                {{ story.title }}
              </span>
            </div>
          </div>
          <div class="story-wrapper remove-story" v-if="recoveryStory.length > 0">
            <h3>解除绑定的故事</h3>
            <div class="story" v-for="(story, index) in recoveryStory" :key="story.story_id" @click="recoverStory(index)">
              <i class="el-icon-plus"></i>
              <span>
                {{ story.title }}
              </span>
            </div>
          </div>
          <div class="story-wrapper my-story">
            <h3>我的故事</h3>
            <div v-if="myStory.length === 0">没有可添加的故事</div>
            <div class="story" v-for="(story, index) in myStory" :key="story.story_id" @click="addStory(index)">
              <i class="el-icon-plus"></i>
              <span>
                {{ story.title }}
              </span>
            </div>
          </div>
        </div>


      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="cancel">取 消</el-button>
        <el-button size="medium" type="primary" @click="save">完 成</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import services from '@/services';
import { store } from '@/store';

export default {
  components: {
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    isAdmin: {
      type: Boolean,
      required: true
    },
    initData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      userId: '',
      myStory: [],
      insertedStory: [],
      recoveryStory: []
    };
  },
  methods: {
    save() {
      this.$emit('update', this.insertedStory);
      this.$message.success('故事设置完成');
      this.cancel();
    },
    cancel() {
      this.show = false;
    },
    recoverStory(index) {
      let story = this.recoveryStory.splice(index, 1)[0];
      this.insertedStory.push(story);
    },
    addStory(index) {
      let story = this.myStory.splice(index, 1)[0];
      this.insertedStory.push(story);
    },
    removeStory(index) {
      let story = this.insertedStory.splice(index, 1)[0];
      this.recoveryStory.push(story);
    }
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
  async created() { 
    this.userId = store.user.state.user_id;
    try {
      let myStory = await services.story.getStory(this.userId);
      if (this.initData) {
        this.insertedStory = this.initData.map(item => {
          return {
            ...item
          };
        });
      }
      let ids = this.insertedStory.map(item => item.story_id);
      this.myStory = myStory.filter(item => !ids.includes(item.story_id));
    }
    catch(err) {
      this.$message.error(err.message);
      console.error(err.message);
    }
  }
};
</script>

<style lang='scss' scoped>
.story-selector {
  max-height: 400px;
  overflow: auto;
  padding-top: 5px;
  padding-bottom: 5px;
}
.story-wrapper {
  .story {
    border-top: 1px solid #ececec;
    padding: 20px;

    i {
      margin-right: 10px;
    }
  }

  .story:last-child {
    border-bottom: 1px solid #ececec;
  }
}

.story-is-added {
  .story:hover {
    cursor: pointer;
    background-color: rgba(254, 240, 240, 0.7);
  }
}

.my-story,
.remove-story {
  .story:hover {
    cursor: pointer;
    background-color: rgba(240, 249, 235, 0.7);
  }
}
</style>
