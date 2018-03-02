const {APP_URL,CORP_ID} = require(`./../../config/${ENV}.json`);

export default{

  slideImgList: [
    {
      img: require('./../../assets/img/1.jpg'),
      title: '',
      url: ''
    },
    {
      img: require('./../../assets/img/2.jpg'),
      title: '',
      url: ''
    },
    {
      img: require('./../../assets/img/3.jpg'),
      title: '',
      url: ''
    }],
  menuList: [{
    id: 'xh',
    text: '校核',
    img: 'http://static.dingtalk.com/media/lALOD8EH6szIzMg_200_200.png',
    route: APP_URL.url + '#/jcxh'
  }, {
    id: 'sp',
    text: '审批',
    img: require('./../../assets/img/jgzs4.png'),
    route: APP_URL.url + '#/jcsp'
  }],
  rwList: [{
    id: 'dwxh',
    text: '待我校核',
    route: APP_URL.url + '#/jcxh',
    value: '0',

  }, {
    id: 'dwsp',
    text: '待我审批',
    route: APP_URL.url + '#/jcsp',
    value: '0',

  }, {
    id: 'notice',
    text: '敬请期待',
    route: '',
    value: '0',

  }, {
    id: 'notice',
    text: '敬请期待',
    route: '',
    value: '0',

  }],
};
