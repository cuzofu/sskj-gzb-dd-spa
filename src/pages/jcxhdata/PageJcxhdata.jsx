require('./PageJcxhdata.less');
import logic from './PageLogic';
import xhLogic from './../jcxh/PageLogic';
import spLogic from './../jcsp/PageLogic';
import { Component, LogicRender } from 'refast';
import { Button,Flex,Modal} from 'antd-mobile';
import { CacheLink,Control,Link,Route } from 'react-keeper';

const alert = Modal.alert;

class Jcxhdata extends Component {
  constructor(props) {
    super(props, [xhLogic, spLogic, logic]);
  }

  componentWillMount() {

  }

  onPassClick = () => alert('同意', '确定同意吗?', [
    {
      text: '取消', onPress: () => {}
    },
    {
      text: '确定', onPress: () => {Control.go(-1)}
    },
  ]);

  render() {
    return (
      <div>
        <div className="data-btn">
          暂无数据
          <Flex>
            <Flex style={{flex:'1'}}> <Button across={true} className="btn-sc" icon="check-circle-o"
                                              onClick={()=> this.onPassClick()}>{this.props.params.wscode === 'ws_xiaohe' ? '校核' : '审批'}</Button>
            </Flex>
            <Flex style={{flex:'1'}}> <Button across={true} className="btn-sc" icon="cross-circle"
                                              onClick={()=>{Control.go(-1);}}>返回</Button> </Flex>
          </Flex>
        </div>

      </div>
    );
  }

}

export default Jcxhdata ;
