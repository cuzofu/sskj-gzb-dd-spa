import { Route } from 'react-keeper'
import Page from './PageIndex';

export default {
  page: Page,
  route: () => (
    <div>
      <Route index component={Page} path='/home' />
    </div>)
};
