<template>
  <div class="signup">
    <el-dialog
      :visible.sync="show"
      :fullscreen="true"
      :show-close="false"
      :append-to-body="true">

      <div class="project-mask medium-scrollbar" @click="cancel">
        <div class="project-creator-body" @click.stop>
          <div class="body-left">

            <el-form ref="projectForm" :model="formData" label-width="150px" :rules="rules">
              <div @mouseenter="changeHint('title')" @mouseleave="changeHint('default')">
                <el-form-item prop="title" label="企划标题">
                  <el-input v-model="formData.title" />
                </el-form-item>
              </div>
              <div @mouseenter="changeHint('storyManager')" @mouseleave="changeHint('default')">
                <el-form-item label="故事集管理">
                  <el-button @click="showStorySelector = true">管理</el-button>
                </el-form-item>
              </div>
              <div @mouseenter="changeHint('mainCover')" @mouseleave="changeHint('default')">
                <el-form-item prop="main_cover" label="上传背景主图">
                  <upload :multiple="false">
                    <div class="upload-wrapper">
                      <el-image :src="formData.main_cover" v-if="formData.main_cover" />
                      <i class="el-icon-upload2" v-else></i>
                    </div>
                  </upload>
                </el-form-item>
              </div>
              <div @mouseenter="changeHint('cover')" @mouseleave="changeHint('default')">
                <el-form-item prop="cover" label="上传设定图">
                  <div class="cover-upload-wrapper">
                    <div class="scroll-wrapper medium-scrollbar">
                      <div class="cover-preview-wrapper" v-for="(img, index) of formData.cover" :key="index">
                        <el-image 
                          fit="contain"
                          class="cover-preview" 
                          :src="img" />
                        <i class="el-icon-remove" @click="removeCover(index)"></i>
                      </div>
                    </div>
                    <upload :multiple="true">
                    <div class="multi-upload-wrapper" :class="{hasMargin: formData.cover.length > 0}">
                        <i class="el-icon-plus"></i>
                      </div>
                    </upload>
                  </div>
                </el-form-item>
              </div>
              <div @mouseenter="changeHint('allowJoin')" @mouseleave="changeHint('default')">
                <el-form-item>
                  <el-checkbox v-model="formData.allow_join" label="允许其他人参加企划" :true-label="1" :false-label="2" border />
                </el-form-item>
              </div>
              <div @mouseenter="changeHint('allowAddStory')" @mouseleave="changeHint('default')">
                <el-form-item>
                  <el-checkbox v-model="formData.allow_add_story" label="允许参与者添加故事" :true-label="1" :false-label="2" border />
                </el-form-item>
              </div>
              <el-form-item size="large">
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button @click="cancel">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="body-right">
            <h3>{{ hintTitle }}</h3>
            <div>{{ hintText }}</div>
          </div>
        </div>
      </div>

      <story-selector :init-data="formData.story" @update="updateStory" v-if="showStorySelector" :is-admin="true" :dialog-visible.sync="showStorySelector" />

    </el-dialog>
  </div>
</template>

<script>
import { store } from '@/store';
import Upload from '@/components/MultiUpload';
import services from '@/services';
import { 
  defaultHint,
  titleHint, 
  storyManagerHint, 
  mainCoverHint, 
  coverHint, 
  allowJoinHint, 
  allowAddStoryHint 
} from './text.js';

export default {
  components: {
    Upload,
    StorySelector: () => import('@/components/StorySelector')
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hintTitle: '创建企划',
      hintText: defaultHint,
      showStorySelector: false,
      inputVisible: false,
      inputValue: '',
      formData: {
        title: '',
        main_cover: '',
        cover: [],
        allow_join: 2,
        allow_add_story: 2,
        story: []
      },
      rules: {
        title: [
          { required: true, message: '请先填写标题', triger: 'blur' },
          { min: 1, max: 18, message: '标题长度在18字以内', trigger: 'blur' }
        ],
        cg: [
          { required: true, message: '请先上传画集', triger: 'change' }
        ]
      }
    };
  },
  methods: {
    changeHint(text) {
      switch(text) {
        case 'title':
          this.hintText = titleHint;
          this.hintTitle = '标题';
          break;
        case 'storyManager':
          this.hintText = storyManagerHint;
          this.hintTitle = '故事集管理';
          break;
        case 'mainCover':
          this.hintText = mainCoverHint;
          this.hintTitle = '企划主图';
          break;
        case 'cover':
          this.hintText = coverHint;
          this.hintTitle = '设定图';
          break;
        case 'allowJoin':
          this.hintText = allowJoinHint;
          this.hintTitle = '允许其他人参加计划';
          break;
        case 'allowAddStory':
          this.hintText = allowAddStoryHint;
          this.hintTitle = '允许参与者添加计划';
          break;
        default:
          this.hintText = defaultHint;
          this.hintTitle = '创建企划';
      }
    },
    removeCover(index) {
      this.formData.cover.splice(index, 1);
    },
    updateStory(storys) {
      this.formData.story = storys.map(item => {
        return {
          ...item
        };
      });
    },
    onSubmit() {
      this.$refs['projectForm'].validate(async (valid) => {
        if (valid) {
          try {
            let saveData = {
              ...this.formData,
              story: this.formData.story.map(item => item.story_id)
            };
            await services.project.createProject(saveData);
            this.$message.success('创建成功');
            this.cancel();
          }
          catch(err) {
            console.error(err);
            this.$message.error(err.message);
          }
        } else {
          return false;
        }
      });
    },
    cancel() {
      this.show = false;
    },
    handleClose(tag) {
      this.formData.tags.splice(this.formData.tags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.formData.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  },
  watch: {
    show(val) {
      if (val) {
        store.ui.setBlur(4);
      }
      else {
        store.ui.setBlur(0);
      }
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
  beforeDestroy() {
    store.ui.setBlur(0);
  },
  beforeCreate() {
    store.ui.setBlur(4);
  }
};
</script>

<style lang='scss' scoped>
.el-input {
  max-width: 225px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.project-creator-body {
  background-color: #fff;
  border-radius: 10px;
  width: 1024px;
  margin: auto;
  padding: 40px;
  display: flex;
  margin-top: 15vh;
  margin-bottom: 50px;

  .body-left {
    min-width: 60%;
    max-width: 60%;
    border-right: 1px solid #DCDFE6;
  }
  .body-right {
    padding: 20px;
    line-height: 1.6;
  }

  .upload-wrapper {
    width: 160px;
    min-height: 90px;
    border: 2px dashed #DCDFE6;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;

    i {
      font-size: 30px;
    }
  }

  .cover-upload-wrapper {
    display: flex;
    align-items: center;

    .scroll-wrapper {
      max-width: 210px;
      display: flex;
      align-items: center;
      overflow-x: scroll;

      .cover-preview-wrapper {
        position: relative;
        margin-bottom: 5px;
        margin-right: 20px;
        width: 90px;
        height: 90px;

        .cover-preview {
          background-color: #ececec;
          width: 90px;
          height: 90px;
        }

        i {
          position: absolute;
          right: 0;
          top: 0;
          transform: translate(50%, 0);
          font-size: 20px;
          cursor: pointer;
          display: none;
          color: $primaryColor;
        }

        &:hover i {
          display: inline-block;
        }
      }
    }
  }

  .multi-upload-wrapper {
    width: 90px;
    height: 90px;
    border: 2px dashed #DCDFE6;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    i {
      font-size: 30px;
    }
  }

  .multi-upload-wrapper.hasMargin {
    margin-left: 10px;
  }
}

.project-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
}
</style>
