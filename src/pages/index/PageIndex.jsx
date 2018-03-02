require('./PageIndex.less');
import logic from './PageLogic';
import {Component, LogicRender} from 'refast';
import {Carousel, Grid, List, WhiteSpace} from 'antd-mobile';
import {Control} from 'react-keeper';

const Item = List.Item;

class Index extends Component {
  constructor(props) {
    super(props, logic);
  }

  handleRwRoute(obj, number) {
    switch (obj.id) {
      case "notice":
        this.notice();
        break;
      default:
        dd.biz.util.openLink({
          url: obj.route,
        });
        break;
    }
  }

  handleGnRoute(obj, number) {
    // Control.go(obj.route);
    dd.biz.util.openLink({
      url: obj.route,
    });
  }

  notice() {
    dd.device.notification.alert({
      title: "提示",
      message: "敬请期待",
      buttonName: "确定",
    });
  }

  render() {

    return (
      <div className="page-index">
        <Carousel
          className="my-carousel"
          autoplay={true}
          infinite
          selectedIndex={1}
          swipeSpeed={35}>
          {this.state.slideImgList.map(ii => (
            <img key={ii}
                 src={ii.img}
                 alt="icon"
                 onLoad={() => {
                   // fire window resize event to change height
                   window.dispatchEvent(new Event('resize'));
                   this.setState({
                     initialHeight: null,
                   });
                 }}
            />

          ))}
        </Carousel>


        <div className="div-solid">
          <Grid data={this.state.rwList} onClick={this.handleRwRoute.bind(this)} className="grid-bg"
                columnNum={4} hasLine={false}
                renderItem={dataItem => (
                  <div>
                    <div className="grid-contia">
                      <div className="grid-count">{dataItem.value}</div>
                    </div>
                    <div className="grid-text">{dataItem.text}</div>
                  </div>
                )}/>
        </div>

        <WhiteSpace size="lg"/>

        <div className="div-solid div-title">功能列表</div>

        <Grid data={this.state.menuList} onClick={this.handleGnRoute.bind(this)} className="grid-bg"
              columnNum={4}
              renderItem={dataItem => (
                <div>
                  <div className="grid-contia">
                    <img
                      src={dataItem.img}
                      width="80"
                      height="80"/>
                  </div>
                  <div className="grid-text">{dataItem.text}</div>
                </div>)}
        />

        <WhiteSpace size="lg"/>
        <div className="div-solid div-title">新闻</div>

      </div>
    );
  }
}

export default Index ;
