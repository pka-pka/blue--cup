import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'development' ? '/api' : 'http://47.106.250.72:8889';

//  创建 axios 实例，并根据是否存在 token 添加请求头
let request = axios.create({
  baseURL,
  headers: {
    Authorization: sessionStorage.getItem('token')
      ? `Bearer ${sessionStorage.getItem('token')}`
      : '',
  },
});

export const test = () => {
  return request.get('/');
};

//  登录成功则重新添加请求头
export const login = (identity, data) => {
  return request.post(`/auth/${identity}`, data).then(res => {
    const {
      success,
      data: { bearToken },
    } = res.data;
    if (success) {
      request = axios.create({
        baseURL,
        headers: {
          Authorization: `Bearer ${bearToken}`,
        },
      });
      return { data: { success, bearToken } };
    }
    return { data: null };
  });
};
