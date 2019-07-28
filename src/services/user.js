import axios from 'axios';
import img4 from '@/assets/images/hp-banner4.jpg';

export async function getData() {
  console.log('---');
  return await axios.get('/user/data');
}

export async function signup(formData) {
  let postData = {
    key: formData
  };
  return await axios.post('/user/signup', postData);
}

export async function login(formData) {
  let postData = {
    key: formData
  };
  return await axios.post('/user/login', postData);
}

export async function setuserinfo(formdata) {
  return await axios.post('/user/setuserinfo', formdata);
}

export async function getUserDetail(userId) {
  return {
    user_id: '1',
    nickname: '揚羽',
    sign: '弁護士さんは仕事、猫は散歩、島ならではの関係です。',
    avatar: img4,
    publish_num: 423,
    fans_num: 7746,
    cover: img4
  }
  // return await axios.post('/user/setuserinfo', formdata);
}
