require('./PageJcsp.less');
import logic from './PageLogic';
import { Component, LogicRender } from 'refast';
import { Tabs, ListView, ActivityIndicator, Button, Popup, ActionSheet, Flex, Toast} from 'antd-mobile';
import Filterbox from 'components/filterbox';
import Rowbox from 'components/rowbox';
const TabPane = Tabs.TabPane;

class Jcsp extends Component {

  constructor(props) {
    super(props, logic);
  }

  componentWillMount() {
    dd.biz.navigation.setTitle({
      title: '审批',//控制标题文本，空字符串表示显示默认文本
    });
  }

  componentDidMount() {
    this.dispatch(['fetchLoadMore', 'loadedData']);
  }

  onEndReached = (event) => {
    if (!this.state.hasMore) {
      Toast.fail('没有多更记录!', 2);
      return;
    }
    this.dispatch(['fetchLoadMore', 'loadedData']);
  };

  onScChange = (value) => {
    this.dispatch('selectSclx', value);
    Popup.hide();
  };

  onAllChange = () => {
    this.dispatch('selectedAll');
    Popup.hide();
  };

  onSxClick = () => {
    Popup.show(
      <Filterbox onAllChange={this.onAllChange} onScChange={this.onScChange} allChecked={this.state.allChecked}
                 scValue={this.state.scValue} scList={this.state.scList} closePop={()=>{ Popup.hide();}}/>
      , {mask: false});
  };

  handleTabClick = (key) => {
    Popup.hide();
    this.dispatch(['clearData', 'fetchLoadMore', 'loadedData']);
  };

  handleCheckChange = (obj) => {
    this.dispatch('selectOneCheck', obj);
  };

  onCzClick = () => {
    const BUTTONS = ['审批通过', '审批退回', '取消'];
    ActionSheet.showActionSheetWithOptions({
        options: BUTTONS,
        cancelButtonIndex: 2,
        title: '操作',
        message: <div style={{color:'red'}}>这里的操作会使勾选项会全部改变,请谨慎操作!</div>,
        maskClosable: true,
        'data-seed': 'logId',
      },
      (buttonIndex) => {
        if (buttonIndex !== 2) {
          let selectedData = this.state.dataBlob.filter((data)=>{
            return data.selected === true;
          });
          if (selectedData && selectedData.length > 0) {
            this.dispatch(['toCheck'], BUTTONS[buttonIndex]);
          } else {
            Toast.fail('请至少选择一条记录!', 2);
          }
        }
      });
  };

  render() {

    const row = (rowData) => {
      return <Rowbox wscode="ws_shenpi" data={rowData} handleCheckChange={this.handleCheckChange}/>;
    };

    return (
      <div className="page-jcsp">

        <div className="nav">
          <Flex>
            <Flex style={{flex:'1'}}> <Button icon="search" across={true} className="btn-sc"
                                              onClick={this.onSxClick}>筛选</Button>
            </Flex>
            <Flex style={{flex:'1'}}> <Button icon="ellipsis" across={true} className="btn-sc"
                                              onClick={this.onCzClick}>操作</Button> </Flex>
          </Flex>
          <ListView ref="lv"
                    dataSource={this.state.dataSource}
                    renderFooter={() => (
                      <div className="loading-list">
                        {this.state.isLoading ? <ActivityIndicator text="加载中..."/> : <div>加载完毕</div>}
                      </div>
                    )}
                    renderRow={row}
                    style={{
                      height: window.innerHeight-110,
                      overflow: 'auto',
                    }}
                    pageSize={10}
                    onScroll={() => { console.log('scroll'); }}
                    scrollRenderAheadDistance={500}
                    scrollEventThrottle={200}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={100}
          />
          {/*<Tabs defaultActiveKey="1" animated={true} swipeable={false}
                onTabClick={ (activeKey) => this.handleTabClick(activeKey) }>
            <TabPane tab="待我审批" key="1">

            </TabPane>
            <TabPane tab="我已审批" key="2">
              <Flex>
                <Flex style={{flex:'1'}}> <Button icon="search" across={true} className="btn-sc"
                                                  onClick={this.onSxClick}>筛选</Button>
                </Flex>
                <Flex style={{flex:'1'}}> <Button icon="ellipsis" across={true} className="btn-sc"
                                                  onClick={this.onCzClick}>操作</Button> </Flex>
              </Flex>
            </TabPane>
          </Tabs>*/}
        </div>

      </div>
    );
  }
}

export default Jcsp;
