const {APP_URL,CORP_ID} = require(`./../../config/${ENV}.json`);

import slideImg1 from './../../assets/img/1.jpg';
import slideImg2 from './../../assets/img/2.jpg';
import slideImg3 from './../../assets/img/3.jpg';

export default{
  roles: [],
  slideImgList: [
    {
      img: slideImg1,
      title: '',
      url: ''
    },
    {
      img: slideImg2,
      title: '',
      url: ''
    },
    {
      img: slideImg3,
      title: '',
      url: ''
    }],
  menuList: [
    /*{
      id: 'xh',
      text: '校核',
      roleName: 'ws_xiaohe',
      img: 'http://static.dingtalk.com/media/lALOD8EH6szIzMg_200_200.png',
      route: APP_URL.url + '#/jcxh',
      display: false
    },*/
    {
      id: 'sp',
      text: '审批',
      roleName: 'ws_shenpi',
      img: require('./../../assets/img/jgzs4.png'),
      route: APP_URL.url + '#/jcsp',
      display: false
    }
  ],
  rwList: [
    /*{
      id: 'dwxh',
      text: '待我校核',
      roleName: 'ws_xiaohe',
      route: APP_URL.url + '#/jcxh',
      value: '0',
    },
    {
      id: 'dwsp',
      text: '待我审批',
      roleName: 'ws_shenpi',
      route: APP_URL.url + '#/jcsp',
      value: '0',
    },*/
    {
      id: 'notice',
      text: '敬请期待',
      route: '',
      value: '0',
    },
    {
      id: 'notice',
      text: '敬请期待',
      route: '',
      value: '0',

    }
  ],
};
