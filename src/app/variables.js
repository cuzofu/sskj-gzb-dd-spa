const { API_URL,MOCK_URL,TCMSServer } = require(`./../config/${ENV}.json`);
const isDev = __LOCAL__;
export default {
  urlPrefix: API_URL,
  mockUrlPrefix: MOCK_URL,
  TCMSServerPrefix: TCMSServer,
  isDev,
  // 这里放置全局的调用的URL
  URLS: {},
};
