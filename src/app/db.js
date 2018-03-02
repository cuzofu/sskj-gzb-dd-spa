import nattyFetch from 'natty-fetch';
import { urlPrefix, mockUrlPrefix } from './variables';

import { Toast } from 'antd-mobile';

// See https://github.com/Jias/natty-fetch for more details.
const context = nattyFetch.context({
  mockUrlPrefix: mockUrlPrefix,
  urlPrefix: urlPrefix,
  mock: false,
  withCredentials: false,
  traditional: true,
  data: {
    _tb_token_: '',
  },
  timeout: 5000,
  didFetch: () => Toast.hide(),
  // 请按照需要开启
  fit: function (response) {

    let ret = {
      success: response.success
    };
    if (ret.success) {
      ret.content = response.data;
    } else {
      ret.error = {
        message: response.msg
      }
    }
    return ret;
  }
});

context.create('DingTalkAPI', {

  //获取钉钉配置
  getConfig: {
    url: 'dingtalk/config/get',
    method: 'POST',
    header: {
      // `POST`、`PUT`或`PATCH`请求的最佳实战推荐设置
      'Content-Type': 'application/json;charset=utf-8'
    },
  },

  //获取钉钉用户信息
  getUser: {
    mock: false,
    url: 'dingtalk/userinfo/get',
    method: 'POST',
    header: {
      // `POST`、`PUT`或`PATCH`请求的最佳实战推荐设置
      'Content-Type': 'application/json;charset=utf-8'
    }
  },

  // 查询审核/校验列表
  getDaiJianList: {
    mock: false,
    method: 'GET',
    url: 'dingtalk/jc/daijian',
  },

  // 提交校核/审批
  updJianYan: {
    mock: false,
    method: 'GET',
    url: 'dingtalk/jc/updJianYan',
    header: {
      // `POST`、`PUT`或`PATCH`请求的最佳实战推荐设置
      'Content-Type': 'application/json;charset=utf-8'
    }
  },

  // 获取用户权限/validateRole/{userID}/{roleCode}
  getRole: {
    mock: false,
    method: 'GET',
    url: 'dingtalk/jc/role'
  }

});

export default context.api;
