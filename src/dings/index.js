import jsapi from './jsapi.json';
import DB from '../app/db';
import { Toast } from 'antd-mobile';
import StorageUtils from '../app/storage';

const { APP_URL } = require(`./../config/${ENV}.json`);

class DingClient {

  ddConfig() {
    return new Promise((resolve, reject) => {

      let jsapiArr = [];
      for (let i in jsapi) {
        jsapi[i]
          ? jsapiArr.push(i)
          : ""
      }
      (async () => {

        const data = await DB.DingTalkAPI.getConfig(APP_URL).catch((err) => {
          Toast.fail('获取钉钉配置服务错误!', 2);
          console.log(err);
        });

        if (data) {
          dd.config({
            agentId: data.agentid,
            corpId: data.corpId,
            timeStamp: data.timeStamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: jsapiArr
          });

          dd.error(function (error) {
            reject("DingTalk jsApi is Error:" + JSON.stringify(error));
          });

          dd.ready(function (content) {
            resolve('DingTalk Auth is OK!');

            dd.runtime.permission.requestAuthCode({
              corpId: data.corpId,
              onSuccess: function (result) {

                DB.DingTalkAPI.getUser({
                  code: result.code,
                  corpId: data.corpId
                }).then(
                  function (content) {
                    StorageUtils.setUserInfo(content);
                  },
                  function (error) {
                    Toast.fail('钉钉身份验证接口失败!', 2);
                    console.log('钉钉身份验证接口失败!' + JSON.stringify(error));
                  });

                dd.ui.webViewBounce.disable();

              },
              onFail: function (err) {
                Toast.fail('钉钉免登服务错误!', 2);
                console.log("钉钉免登服务错误!" + JSON.stringify(err));
              }
            });
          });
        }
      })();
    });
  };
}


export default new DingClient();
