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
// import auth from "./authorization/auth";
import ManchesterUnited from './pages/ManchesterUnited';
import Products from './pages/Products';
import BookDetails from './pages/BookDetails';
import NewBook from "./pages/NewBook";
import UserStore from './stores/userStore'
import NewUser from "./pages/NewUser";

// function requireAuth(nextState, replace) {
//   if (!auth.loggedIn) {
//     replace({
//       pathname: '/login',
//       state: { nextPathname: nextState.location.pathname }
//     })
//   }
// }

var books = UserStore.bookstoreBooks;
// var newBooks = UserStore.allBooks;


ReactDOM.render((

  <Router books={books} history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="about" component={About} />
      <Route path="user" component={UserPage} />
      <Route path="admin" component={AdminPage} />
      <Route path="admin/newuser" component={NewUser} />
      <Route path="admin/newuser/:username" component={NewUser} />
      <Route path="manu" component={ManchesterUnited} />
      <Route path="products/add" component={NewBook} />
      <Route path="products/add/:id" component={NewBook}  />
      <Route path="products" component={Products} books={books} hello="testing" />
      <Route path="products/details/:id" component={BookDetails} books={books}  />
    </Route>
  </Router>
), document.getElementById('root'))