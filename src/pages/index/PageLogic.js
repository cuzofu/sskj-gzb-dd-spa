import PageConst from './PageConst';
import StorageUtils from "../../app/storage";

import { Toast } from 'antd-mobile';

export default {
  defaults(props) {
    return {
      ...PageConst,
    }
  },

  async getRole(ctx) {

    let roles = [];
    let params = {
      ddid: ''
    };
    const userInfo = StorageUtils.getUserInfo();
    if (userInfo && userInfo.userid) {
      params.ddid = userInfo.userid;
    }
    roles = await ctx.fn.DB.DingTalkAPI.getRole(params).catch(() => {
      Toast.fail('获取权限失败!', 2);
    });
    if (roles && roles.length > 0) {
      let menuList = ctx.getState().menuList;
      roles.map(role => {
        menuList.map(menu => {
          if (menu.roleName === role.roleName) {
            menu.display = role.trueOrFalse;
          }
        });
      });
      ctx.setState({
        roles: roles,
        menuList: menuList
      });
    }
  }
};
