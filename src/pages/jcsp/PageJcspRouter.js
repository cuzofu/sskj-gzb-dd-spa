import { Route } from 'react-keeper'
import Page from './PageJcsp';

export default {
  page: Page,
  route: () => (
    <div>
      <Route component={Page} path="/jcsp" />
    </div>)
};
