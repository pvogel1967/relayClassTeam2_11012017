import 'bootstrap-loader';
import '../scss/styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
  createBrowserRouter, makeRouteConfig, Route, Link
} from 'found';

import { Home } from './components/home';
import { WidgetTablePage } from './components/widget-table-page';
import { WidgetFormPage } from './components/widget-form-page';

import { CarHome } from './components/car-home';
import { CarTablePage } from './components/car-table-page';
import { CarFormPage } from './components/car-form-page';

class AppPage extends React.Component {

  static propTypes = {
    children: PropTypes.object,
  };

  render() {
    return <div>
      <header>
        <h1>Welcome to Modern Relay!</h1>
      </header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/widgets">Widgets</Link></li>
          <li><Link to="/cars">Cars</Link></li>
        </ul>
      </nav>
      {this.props.children}
      <footer>
        <small>&copy; 2017, A Cool Company, Inc.</small>
      </footer>
    </div>;
  }
}

const BrowserRouter = createBrowserRouter({
  routeConfig: makeRouteConfig(
    <Route path="/" Component={AppPage}>
      <Route path="/widgets" Component={WidgetTablePage} />
      <Route path="/create-widget" Component={WidgetFormPage} />
      <Route path="/cars" Component={CarTablePage} />
      <Route path="/create-car" Component={CarFormPage} />
      <Route path="/" Component={Home} exact />
    </Route>
  ),
});

ReactDOM.render(
  <BrowserRouter />,
  document.querySelector('main'),
);