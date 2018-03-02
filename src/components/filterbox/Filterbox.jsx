require('./Filterbox.less');
import { Checkbox,List,Radio,Button,WhiteSpace} from 'antd-mobile';
const CheckboxItem = Checkbox.CheckboxItem;
const RadioItem = Radio.RadioItem;

function Filterbox({ onAllChange ,onScChange,allChecked ,scValue,scList,closePop}) {

  return (
    <div className="popup-selected" style={{height: window.innerHeight}}>
      <List renderHeader={() => '选择筛选项目'}>
        <CheckboxItem checked={allChecked} onChange={() => onAllChange()}>
          全选
        </CheckboxItem>
      </List>
      {/*<List renderHeader={() => '类型'}>*/}
        {/*{scList.map((i, k) => (*/}
          {/*<RadioItem key={i.value} checked={scValue===i.value} onChange={() => onScChange(i.value)}>*/}
            {/*{i.label}*/}
          {/*</RadioItem>*/}
        {/*))}*/}
      {/*</List>*/}
      <WhiteSpace size="lg"/>
      <Button type="primary" onClick={()=>closePop()} across={true}>关闭</Button>
    </div>
  );
}

export default Filterbox ;
