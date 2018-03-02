import PageConst from './PageConst';
import {Toast} from "antd-mobile";
import { Control } from 'react-keeper';
import StorageUtils from "../../app/storage";
export default {
  defaults(props) {
    //初始的state
    return {
    }
  },

  // 校核
  async toCheck(ctx, param) {

    let params = {
      jyids: param.jyids,
      ddid: param.ddid,
      wsCode: param.wscode,
      tuiHui: param.tuiHui
    };

    const userInfo = StorageUtils.getUserInfo();
    if (userInfo && userInfo.userid) {
      params.ddid = userInfo.userid;
    } else {
      Toast.fail('操作失败', 2);
      return false;
    }
    let rtn = false;
    rtn = await ctx.fn.DB.DingTalkAPI.updJianYan(params).catch(()=> {
      rtn = false;
    });
    if (rtn) {
      Toast.fail('请求成功!', 2);
      setTimeout(() => {
        Control.go(-1);
      }, 2000)
    } else {
      Toast.fail('请求失败!', 2);
    }
  },

};
