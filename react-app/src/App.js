import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import PageWrapper from "./components/PageWrapper";
import FormWrapper from "./components/FormWrapper";
import SplashPage from "./components/SplashPage";
// import { authenticate } from "./services/auth";
import { authenticate } from "./store/session";



function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true}>
          <SplashPage />
        </Route>
        <Route path="/login" exact={true}>
          {/* <NavBar /> */}
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          {/* <NavBar /> */}
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/channels/:id" exact={true}>
          <PageWrapper />
        </ProtectedRoute>
        <ProtectedRoute path="/form/:id/:ty" exact={true}>
          <FormWrapper />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
