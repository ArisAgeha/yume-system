// import axios from 'axios';
import img1 from '@/assets/images/hp-banner1.jpg';
import img2 from '@/assets/images/hp-banner2.jpg';
import img3 from '@/assets/images/hp-banner3.jpg';
import img4 from '@/assets/images/hp-banner4.jpg';

export async function createProject(data) {
  return {
    project_id: '1123ee',
    user_id: 'aris111'
  }
  // return await axios.get('/api/default/qiniu');
}

export async function getAlbum(cgId) {
  return {
    cg_id: '1123ee',
    title: 'xxxxx',
    tags: ['hello', 'world'],
    cg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561479452125&di=67627938cb705e9125d55d2c7d4e0aac&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F716f0d1914ff2e4bc1b4aabfc0a715601f39f7cd.png',
    allow_add_story: true,
    story: [
      {
        story_id: '111',
        title: '平砍狂战连击刀',
        author_id: 'aris_111'
      },
      {
        story_id: '222',
        title: '标题超级无敌长',
        author_id: 'aris_222'
      }
    ]
  }
  // return await axios.get('/api/default/qiniu');
}

export async function getUserProject(userId, page, size) {
  return [
    {
      project_id: Math.random(),
      title: '平砍狂战连击刀',
      introduction: '这是一条超长的测试这是一条超长的测试这是一条超长的测试这是一条超长的测试这是一条超长的测试这是一条超长的测试这是一条超长的测试这是一条超长的测试',
      main_cover: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561479452125&di=67627938cb705e9125d55d2c7d4e0aac&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F716f0d1914ff2e4bc1b4aabfc0a715601f39f7cd.png',
      cover: [img1, img2, img3, img4],
      story: [
        {
          title: '魔兽体验',
          preview: '塞利欧，快点回到你的位置！他们要来了！'
        },
        {
          title: '高次元日记',
          preview: '这里都布满了高阶属性，魔兽和人类……不对，他们已经不能称之为人类了吧。不同的种族就这样聚成了一片混沌。'
        }
      ]
    },
    {
      project_id: Math.random(),
      title: '旋风冲锋龙卷风',
      introduction: '这是短评',
      main_cover: img4,
      cover: [img1, img2],
      story: []
    },
    {
      project_id: Math.random(),
      title: '旋风冲锋龙卷风',
      introduction: '这是短评',
      main_cover: img2,
      cover: [img4, img3, 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561479452125&di=67627938cb705e9125d55d2c7d4e0aac&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F716f0d1914ff2e4bc1b4aabfc0a715601f39f7cd.png'],
      story: [
        {
          title: '魔兽体验',
          preview: '塞利欧，快点回到你的位置！他们要来了！'
        }
      ]
    },
    {
      project_id: Math.random(),
      title: '平砍狂战连击刀',
      introduction: '这是一条超长的测试这是一条超长的测试这是一条超长的测试这是一条超长的测试这是一条超长的测试这是一条超长的测试这是一条超长的测试这是一条超长的测试',
      main_cover: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561479452125&di=67627938cb705e9125d55d2c7d4e0aac&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F716f0d1914ff2e4bc1b4aabfc0a715601f39f7cd.png',
      cover: [img1, img2, img3, img4],
      story: [
        {
          title: '魔兽体验',
          preview: '塞利欧，快点回到你的位置！他们要来了！'
        },
        {
          title: '高次元日记',
          preview: '这里都布满了高阶属性，魔兽和人类……不对，他们已经不能称之为人类了吧。不同的种族就这样聚成了一片混沌。'
        }
      ]
    },
    {
      project_id: Math.random(),
      title: '旋风冲锋龙卷风',
      introduction: '这是短评',
      main_cover: img4,
      cover: [img1, img2],
      story: []
    },
    {
      project_id: Math.random(),
      title: '旋风冲锋龙卷风',
      introduction: '这是短评',
      main_cover: img2,
      cover: [img4, img3, 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561479452125&di=67627938cb705e9125d55d2c7d4e0aac&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F716f0d1914ff2e4bc1b4aabfc0a715601f39f7cd.png'],
      story: [
        {
          title: '魔兽体验',
          preview: '塞利欧，快点回到你的位置！他们要来了！'
        }
      ]
    },
    {
      project_id: Math.random(),
      title: '平砍狂战连击刀',
      introduction: '这是一条超长的测试这是一条超长的测试这是一条超长的测试这是一条超长的测试这是一条超长的测试这是一条超长的测试这是一条超长的测试这是一条超长的测试',
      main_cover: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561479452125&di=67627938cb705e9125d55d2c7d4e0aac&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F716f0d1914ff2e4bc1b4aabfc0a715601f39f7cd.png',
      cover: [img1, img2, img3, img4],
      story: [
        {
          title: '魔兽体验',
          preview: '塞利欧，快点回到你的位置！他们要来了！'
        },
        {
          title: '高次元日记',
          preview: '这里都布满了高阶属性，魔兽和人类……不对，他们已经不能称之为人类了吧。不同的种族就这样聚成了一片混沌。'
        }
      ]
    },
    {
      project_id: Math.random(),
      title: '旋风冲锋龙卷风',
      introduction: '这是短评',
      main_cover: img4,
      cover: [img1, img2],
      story: []
    },
    {
      project_id: Math.random(),
      title: '旋风冲锋龙卷风',
      introduction: '这是短评',
      main_cover: img2,
      cover: [img4, img3, 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561479452125&di=67627938cb705e9125d55d2c7d4e0aac&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F716f0d1914ff2e4bc1b4aabfc0a715601f39f7cd.png'],
      story: [
        {
          title: '魔兽体验',
          preview: '塞利欧，快点回到你的位置！他们要来了！'
        }
      ]
    },
    {
      project_id: Math.random(),
      title: '旋风冲锋龙卷风',
      introduction: '这是短评',
      main_cover: img2,
      cover: [img4, img3, 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561479452125&di=67627938cb705e9125d55d2c7d4e0aac&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F716f0d1914ff2e4bc1b4aabfc0a715601f39f7cd.png'],
      story: [
        {
          title: '魔兽体验',
          preview: '塞利欧，快点回到你的位置！他们要来了！'
        }
      ]
    }
  ]
  // return await axios.get('/api/default/qiniu');
}

export async function getProjectDetail(projectid) {
  return {
    project_id: '1123ee',
    title: 'Project X!',
    introduction: `这是一条长说明这是一条长说明这
    是一条长说明这是一条长说明这是一条长说
    明这是一条长说明这是一条长说明这是一条长说明这是一条长说明`,
    main_cover: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561479452125&di=67627938cb705e9125d55d2c7d4e0aac&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F716f0d1914ff2e4bc1b4aabfc0a715601f39f7cd.png',
    cover: [img4, img3, 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561479452125&di=67627938cb705e9125d55d2c7d4e0aac&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F716f0d1914ff2e4bc1b4aabfc0a715601f39f7cd.png'],
    allow_add_story: true,
    allow_join: true,
    member_num: 34,
    publish_num: 754,
    joiner: [
      {
        user_id: '1',
        nickname: '扬羽①号',
        avatar: img1
      },
      {
        user_id: '2',
        nickname: '扬羽②号',
        avatar: img2
      },
      {
        user_id: '3',
        nickname: '扬羽③号',
        avatar: img3
      },
      {
        user_id: '4',
        nickname: '扬羽4号',
        avatar: img4
      },
      {
        user_id: '5',
        nickname: '扬羽4号',
        avatar: img3
      }
    ]
  }
  // return await axios.get('/api/default/qiniu');
}
