import PageConst from './PageConst';
import { ListView,Toast  } from 'antd-mobile';
import update from 'react-addons-update';

import StorageUtils from '../../app/storage';

export default {

  defaults(props) {

    return {
      ...PageConst,
      scValue: 0,
      allChecked: false,
      hasMore: true,
      pageSize: 10,
      currentPage: 1,
      dataBlob: [],
      isLoading: false,
      isError: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    }
  },


  selectedAll(ctx){
    const selected = update(ctx.getState().allChecked, {$set: !ctx.getState().allChecked});
    const dataBlob = update(ctx.getState().dataBlob, {
      $apply: (dataBlob) => {
        return dataBlob.map(item=> {
          return update(item, {selected: {$set: selected}})
        })
      }
    });


    ctx.setState({
      dataBlob,
      allChecked: selected,
      dataSource: ctx.getState().dataSource.cloneWithRows(dataBlob),
    });
  },

  toExamine(ctx, obj){
    switch (obj) {
      case 0:
        break;
      case 1:
        break;
      default:
        break;
    }
  },

  selectOneCheck(ctx, obj){
    const dataBlob = update(ctx.getState().dataBlob, {
      $apply: (dataBlob) => {
        return dataBlob.map(item=> {
          if (item.jybh === obj.jybh) {
            return update(item, {selected: {$set: !obj.selected}})
          } else {
            return item;
          }
        })
      }
    });

    ctx.setState({
      dataBlob,
      dataSource: ctx.getState().dataSource.cloneWithRows(dataBlob),
    });
  },

  selectSclx(ctx, obj){
    ctx.setState({
      scValue: obj
    })
  },

  clearData(ctx){
    ctx.setState({
      dataBlob: [],
      currentPage: 1,
      hasMore: true,
      dataSource: ctx.getState().dataSource.cloneWithRows([]),
    });
  },

  // 校核
  async toCheck(ctx, action) {

    if (action) {
      let jyids = [];
      ctx.getState().dataBlob.map((data)=>{
        if (data.selected) {
          jyids.push(data.jyid);
        }
      });
      let params = {
        jyids: jyids,
        tuiHui: '退回' === action ? 1 : 0,
        wsCode: 'ws_xiaohe',
        ddid: ''
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
        Toast.fail('操作失败', 2);
        rtn = false;
      });


      if (rtn) {

        ctx.setState({
          dataBlob: [],
          currentPage: 1,
          hasMore: true,
          dataSource: ctx.getState().dataSource.cloneWithRows([]),
        });

        let content = await ctx.fn.DB.DingTalkAPI.getDaiJianList({
          pageNum: 1,
          rowCount: ctx.getState().pageSize,
          ddid: params.ddid,
          wsCode: 'ws_xiaohe'
        }).catch(()=> {
          ctx.setState({
            isLoading: false,
            hasMore: true,
          });
          Toast.fail('获取数据列表错误!', 2);
        });

        if (!content) {
          ctx.setState({
            isLoading: false,
          });
          return;
        }

        const dataBlob = update(ctx.getState().dataBlob, {$set: content});

        ctx.setState({
          dataBlob,
          dataSource: ctx.getState().dataSource.cloneWithRows(dataBlob),
          currentPage: ctx.getState().currentPage + 1,
          isLoading: false,
        });

        Toast.fail('操作成功', 2);
      } else {
        Toast.fail('操作失败', 2);
      }
    }
  },

  async fetchLoadMore(ctx) {

    ctx.setState({isLoading: true});

    let params = {
      pageNum: ctx.getState().currentPage,
      rowCount: ctx.getState().pageSize,
      ddid: '',
      wsCode: 'ws_xiaohe'
    };

    const userInfo = StorageUtils.getUserInfo();
    if (userInfo && userInfo.userid) {
      params.ddid = userInfo.userid;
    }
    return await ctx.fn.DB.DingTalkAPI.getDaiJianList(params).catch(()=> {
      ctx.setState({
        isLoading: false,
        hasMore: true,
      });
      Toast.fail('获取数据列表错误!', 2);
    });
  },

  loadedData(ctx, obj){

    if (!obj) {
      ctx.setState({
        isLoading: false,
      });
      return;
    }

    const dataBlob = update(ctx.getState().dataBlob, {$push: obj});

    ctx.setState({
      dataBlob,
      dataSource: ctx.getState().dataSource.cloneWithRows(dataBlob),
      currentPage: ctx.getState().currentPage + 1,
      isLoading: false,
      allChecked: false
    });

  }

};
