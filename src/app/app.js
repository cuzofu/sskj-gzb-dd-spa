import { HashRouter } from 'react-keeper'
import { setup, LogicRender } from 'refast';
import { render } from 'react-dom';

import { isDev } from 'variables';

import PageIndex from 'pages/index'
import PageJcxh from 'pages/jcxh'
import PageJcsp from 'pages/jcsp'
import PageJcxhdata from 'pages/jcxhdata/';

import DB from 'db';
import './app.less';
import './ding';

import { Toast ,Modal } from 'antd-mobile';


if (window.chrome && window.chrome.webstore) {
  setInterval(() => {
    document.body.focus();
  }, 200);
}

// 这里使用setup来配置noflux
setup('fn', {
  toast: Toast,
  modal: Modal,
  DB,
});

render(
  <HashRouter>
    <div>
      <PageIndex.route />
      <PageJcxh.route/>
      <PageJcsp.route/>
      <PageJcxhdata.route/>
    </div>
  </HashRouter>,
  document.getElementById('App')
);
