// import axios from 'axios';
import img1 from '@/assets/images/hp-banner1.jpg';
import img2 from '@/assets/images/hp-banner2.jpg';
import img3 from '@/assets/images/hp-banner3.jpg';
import img4 from '@/assets/images/hp-banner4.jpg';
import img5 from '@/assets/images/1.png';
import img6 from '@/assets/images/2.png';
import img7 from '@/assets/images/3.png';
import img8 from '@/assets/images/4.png';
let pic = [img1, img2, img3, img4, img5, img6, img7, img8];
let tags = ['测试', 'hello', 'world', '揚羽', 'Aris', 'Ageha', '超長的標籤', '秋名山', 'test111', 'test222', 'test333', 'test444', 'test555', 'test666', 'test777', 'test888'];

export async function createAlbum(data) {
  return {
    album_id: '1123ee'
  }
  // return await axios.get('/api/default/qiniu');
}

export async function getCgDetail(cgId) {
  return {
    cg_id: '1123ee',
    author: {
      user_id: '1',
      nickname: '揚羽',
      avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561479452125&di=67627938cb705e9125d55d2c7d4e0aac&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F716f0d1914ff2e4bc1b4aabfc0a715601f39f7cd.png'
    },
    title: 'xxxxx',
    tags: ['hello', 'world1', '11121', 'hello2', 'world2', '1111', 'hello3', 'world3', '1111111'],
    cg: Math.random() > 0.5 ? 'https://images.mihuashi.com/misc/carousel/2.jpg!carousel' : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561479452125&di=67627938cb705e9125d55d2c7d4e0aac&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F716f0d1914ff2e4bc1b4aabfc0a715601f39f7cd.png',
    allow_add_story: true,
    story: [
      {
        story_id: '1',
        title: '平砍狂战连击刀',
        author_id: 'aris_111'
      },
      {
        story_id: '2',
        title: '标题超级无敌长',
        author_id: 'aris_222'
      }
    ]
  }
  // return await axios.get('/api/default/qiniu');
}

export async function getUserAlbum(userId) {
  return [
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    }
  ]
  // return await axios.get('/api/default/qiniu');
}

export async function getProjectAlbum(userId) {
  return [
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    },
    {
      cg_id: Math.random(),
      cg: pic[parseInt(Math.random() * 8)],
      tags: Array(parseInt(Math.random() * 5)).fill('').map((item) => tags[parseInt(Math.random() * 16)])
    }
  ]
  // return await axios.get('/api/default/qiniu');
}
