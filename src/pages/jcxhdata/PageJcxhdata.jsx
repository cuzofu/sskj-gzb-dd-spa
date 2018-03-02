require('./PageJcxhdata.less');
import { TCMSServerPrefix } from '../../app/variables';
import logic from './PageLogic';
import xhLogic from './../jcxh/PageLogic';
import spLogic from './../jcsp/PageLogic';
import { Component, LogicRender } from 'refast';
import { Button,Flex,Modal} from 'antd-mobile';
import { Control } from 'react-keeper';

const alert = Modal.alert;

class Jcxhdata extends Component {
  constructor(props) {
    super(props, [xhLogic, spLogic, logic]);
    this.state = {
      hei: document.documentElement.clientHeight
    };
    this.toCheck = this.toCheck.bind(this);
    this.tuiHui = this.tuiHui.bind(this);
  }

  componentWillMount() {
  }

  toCheck() {
    let t = this;
    let params = {
      wscode: this.props.params.wscode,
      tuiHui: 0,
      jyids: [this.props.params.jyid]
    };
    let message = params.wscode === 'ws_xiaohe' ? '校核通过' : '审批通过';
    alert(
      message,
      `确定要${message}吗？`,
      [
        { text: '取消', onPress: () => console.log('cancel') },
        { text: '确定', onPress: () => t.dispatch('toCheck', params) },
      ]
    );
  }

  tuiHui() {
    let t = this;
    let params = {
      wscode: this.props.params.wscode,
      tuiHui: 1,
      jyids: [this.props.params.jyid]
    };
    let message = params.wscode === 'ws_xiaohe' ? '校核退回' : '审批退回';
    alert(
      message,
      `确定要退回吗？`,
      [
        { text: '取消', onPress: () => console.log('cancel') },
        { text: '确定', onPress: () => t.dispatch('toCheck', params) },
      ]
    );
  }

  render() {

    return (
      <div>
        <div className="data-btn">
          <Flex>
            <Flex style={{flex:'1'}}>
              <Button
                across={true}
                className="btn-sc"
                icon="check-circle-o"
                onClick={this.toCheck}>
                {this.props.params.wscode === 'ws_xiaohe' ? '校核' : '审批'}
              </Button>
            </Flex>
            <Flex style={{flex:'1'}}>
              <Button
                across={true}
                className="btn-sc"
                icon="check-circle-o"
                onClick={this.tuiHui}>
                退回
              </Button>
            </Flex>
            <Flex style={{flex:'1'}}>
              <Button
                across={true}
                className="btn-sc"
                icon="cross-circle"
                onClick={()=>{Control.go(-1);}}>
                返回
              </Button>
            </Flex>
          </Flex>
          <Flex>
            <iframe
              src={TCMSServerPrefix + "/jybg.seam?id=" + this.props.params.jyid}
              height={this.state.hei}
              width="100%"
            />
          </Flex>
        </div>
      </div>
    );
  }

}

export default Jcxhdata ;
