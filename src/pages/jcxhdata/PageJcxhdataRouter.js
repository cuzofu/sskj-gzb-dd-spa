import { Route } from 'react-keeper'
import Page from './PageJcxhdata';

export default {
  page: Page,
  route: () => (
    <div>
      <Route component={Page} path='/jcxhdata/:jyid/:wscode'/>
    </div>)
};
