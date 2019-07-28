// import axios from 'axios';
import img1 from '@/assets/images/hp-banner1.jpg';
import img2 from '@/assets/images/hp-banner2.jpg';
import img3 from '@/assets/images/hp-banner3.jpg';
import img4 from '@/assets/images/hp-banner4.jpg';

export async function getAlbum() {
  return [
    {
      cg_id: '1',
      title: 'xxxxx',
      cg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561479452125&di=67627938cb705e9125d55d2c7d4e0aac&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F716f0d1914ff2e4bc1b4aabfc0a715601f39f7cd.png'
    },
    {
      cg_id: '2',
      title: 'xxxxx',
      cg: img1
    },
    {
      cg_id: '3',
      title: 'xxxxx',
      cg: img2
    },
    {
      cg_id: '4',
      title: 'xxxxx',
      cg: img3
    },
    {
      cg_id: '5',
      title: 'xxxxx',
      cg: img2
    },
    {
      cg_id: '6',
      title: 'xxxxx',
      cg: img1
    },
    {
      cg_id: '7',
      title: 'xxxxx',
      cg: img2
    },
    {
      cg_id: '8',
      title: 'xxxxx',
      cg: 'img3'
    }
  ]
  // return await axios.get('/api/default/qiniu');
}

export async function getProject() {
  return [
    {
      project_id: '1',
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
      project_id: '2',
      title: '旋风冲锋龙卷风',
      introduction: '这是短评',
      main_cover: img4,
      cover: [img1, img2],
      story: []
    },
    {
      project_id: '3',
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
