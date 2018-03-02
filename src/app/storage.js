import nattyStorage from 'natty-storage';

const storage = nattyStorage({
  type: 'localStorage',  // 缓存方式, 默认为'localStorage'
  key: 'DingtalkUserInfo',     // !!! 唯一必选的参数, 用于内部存储 !!!
  tag: 'v1.0.0.0',          // 缓存的标记, 用于判断是否有效
  duration: 1000 * 604800,      // 缓存的有效期长, 以毫秒数指定
});

let StorageUtils = {

  getStorage(){
    return storage;
  },
  setUserInfo(userInfo){
    storage.set('userInfo', userInfo);
  },
  deleUserInfo(){
    storage.remove('userInfo');
  },
  getUserInfo(){
    return storage.get('userInfo');
  },
};

export default StorageUtils;
