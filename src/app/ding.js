import Ding from './../dings';
const { DINTALK_API } = require(`./../config/${ENV}.json`);

async function init() {
  try {
    const isAuth = await Ding.ddConfig();
    console.log(isAuth);
  } catch (err) {
    console.log(err);
  }
}

if (DINTALK_API === true) {
  init();
} else {
  alert(' Dingtalk jsApi 服务: 没有配置启用 (如何使用请查看文档) ')
}
