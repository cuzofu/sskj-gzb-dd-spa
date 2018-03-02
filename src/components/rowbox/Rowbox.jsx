require('./Rowbox.less');
import { CacheLink,Link,Control } from 'react-keeper';
import { Checkbox,Flex} from 'antd-mobile';
import Avatar from 'react-avatar';
const CheckboxItem = Checkbox.CheckboxItem;

function Rowbox({ wscode, data , handleCheckChange}) {

  return (
    <div>
      <CheckboxItem checked={data.selected} wrap={true} onChange={() => {handleCheckChange(data)}}>
        <Flex style={{width:window.innerWidth-140}}>
          <Flex className="ck-text ck-2" direction="column" onClick={()=>{Control.go('jcxhdata/'+data.jyid+"/" + wscode,{cache:true})}}>
            <p>报告名称: {data.bgmc}</p>
            <p>样品编号: {data.jybh}</p>
            <p>样品名称: {data.ypmc}</p>
            <p>合格状态: {data.hgzt}</p>
          </Flex>

        </Flex>
      </CheckboxItem>

    </div>
  );
}

export default Rowbox ;
