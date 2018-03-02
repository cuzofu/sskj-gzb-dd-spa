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

  // 审批
  async toCheck(ctx, clicked) {

    if ('审批' === clicked) {
      let yjids = [];
      ctx.getState().dataBlob.map((data)=>{
        if (data.selected) {
          yjids.push(data.jyid);
        }
      });

      const userInfo = StorageUtils.getUserInfo();
      let rtn = false;
      if (userInfo && userInfo.userid) {

        rtn = await ctx.fn.DB.DingTalkAPI.updJianYan({
          jyids: yjids,
          ddid: userInfo.userid,
          wsCode: 'ws_shenpi'
        }).catch(()=> {
          Toast.fail('提交审批失败!', 2);
          rtn = false;
        });
      } else {
        rtn = false;
      }
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
          ddid: userInfo.userid,
          wsCode: 'ws_shenpi'
        }).catch(()=> {
          ctx.setState({
            isLoading: false,
            hasMore: true,
          });
          Toast.fail('获取审批数据列表错误!', 2);
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

        Toast.fail('提交审批成功!', 2);
      } else {
        Toast.fail('提交审批失败!', 2);
      }
    }
  },

  async fetchLoadMore(ctx) {

    ctx.setState({isLoading: true});
    const userInfo = StorageUtils.getUserInfo();
    if (userInfo && userInfo.userid) {
      return await ctx.fn.DB.DingTalkAPI.getDaiJianList({
        pageNum: ctx.getState().currentPage,
        rowCount: ctx.getState().pageSize,
        ddid: userInfo.userid,
        wsCode: 'ws_shenpi'
      }).catch(() => {
        ctx.setState({
          isLoading: false,
          hasMore: true,
        });
        Toast.fail('获取数据列表错误!', 2);
      });
    } else {
      return '';
    }
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
