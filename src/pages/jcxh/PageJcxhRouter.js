import { Route } from 'react-keeper'
import Page from './PageJcxh';

export default {
  page: Page,
  route: () => (
    <div>
      <Route component={Page} path="/jcxh" />
    </div>)
};
