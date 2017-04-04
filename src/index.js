import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { hashHistory, Router, Route, IndexRoute } from 'react-router'
import App from './pages/App';
import Home from './pages/Home';
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import About from "./pages/About";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import auth from "./authorization/auth";
import ManchesterUnited from './pages/ManchesterUnited';
import Products from './pages/Products';
import BookStore from './pages/BookStore';
import BookDetails from './pages/BookDetails';
import NewBook from "./pages/NewBook";

function requireAuth(nextState, replace) {
  if (!auth.loggedIn) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

var books = BookStore.books;

ReactDOM.render((
  <Router books={books} history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="about" component={About} />
      <Route path="user" component={UserPage} />
      <Route path="admin" component={AdminPage} />
      <Route path="manu" component={ManchesterUnited} />
      <Route path="products/add" component={NewBook} />
      <Route path="products" component={Products} books={books} />
      <Route path="products/details/:id" component={BookDetails} books={books} />
    </Route>
  </Router>
), document.getElementById('root'))