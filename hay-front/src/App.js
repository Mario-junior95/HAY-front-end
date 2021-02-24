import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Blog from "./components/blog/Blog";
import Book from "./components/book/Book";
import Contact from "./components/contact/Contact";
import Home from "./components/home/Home";
import Events from "./components/events/Events";
import AdminLogin from "./Components-Admin/Login/Login";
import Admin from "./Components-Admin/Admin/Admin";
import AdminHome from "./Components-Admin/HomeAdmin/HomeAdmin";
import AdminBook from "./Components-Admin/BookAdmin/BookAdmin";
import AdminBlog from "./Components-Admin/BlogAdmin/BlogAdmin";
import AdminContact from "./Components-Admin/ContactAdmin/ContactAdmin";
import AdminEvent from "./Components-Admin/EventAdmin/EventAdmin";
import SupportGroup from "./Components-Admin/SupportGroup/SupportGroup";
import AdminUser from "./Components-Admin/User/User";

import ProtectedRoute from "./ProtectedRoute";

//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9hZG1pbi1sb2dpbiIsImlhdCI6MTYxMzU3MDU2NSwiZXhwIjoxNjEzNTc0MTY1LCJuYmYiOjE2MTM1NzA1NjUsImp0aSI6InlvdVVBUEJ4QjRoQjd1SkQiLCJzdWIiOjEsInBydiI6ImNmMjg0YzJiMWUwNmYzM2MyNmJkNTc5NzU2NmQ5ZmQ3NGJlMTFiZjUifQ.AVsCA7n6276_TfEijIr8P7ps2AND0tgRHubfI_7I3aA

function App() {
  const [language, setLanguage] = useState("");
  const [isAuth, setIsAuth] = useState(localStorage.getItem("tokens"));

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Book" component={Book} />
          <Route path="/Events" component={Events} />
          <Route path="/Contact" component={Contact} />
          <Route path="/Blog" component={Blog} />
        </Switch>
    
        <Route path="/Admin-Login" component={AdminLogin} />
        <ProtectedRoute
          exact
          path="/Admin-Management"
          component={Admin}
          isAuth={isAuth}
        />
        <ProtectedRoute
          path="/Admin-User"
          component={AdminUser}
          isAuth={isAuth}
        />
        <ProtectedRoute
          path="/Admin-Home"
          component={AdminHome}
          isAuth={isAuth}
        />
        <ProtectedRoute
          path="/Admin-Event"
          component={AdminEvent}
          isAuth={isAuth}
        />
        <ProtectedRoute
          path="/Admin-Book"
          component={AdminBook}
          isAuth={isAuth}
        />
        <ProtectedRoute
          path="/Admin-Book-Support"
          component={SupportGroup}
          isAuth={isAuth}
        />
        <ProtectedRoute
          path="/Admin-Blog"
          component={AdminBlog}
          isAuth={isAuth}
        />
        <ProtectedRoute
          path="/Admin-Contact"
          component={AdminContact}
          isAuth={isAuth}
        />
      </div>
    </Router>
  );
}

export default App;
