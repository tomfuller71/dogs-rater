import React from "react";
import { Redirect, Route } from "react-router";

const AuthenticationCheck = ({ component: Component, user }) => {
  if (user !== null) {
<<<<<<< HEAD
    return <Component user={user}/>;
=======
    return <Component user={user} />;
>>>>>>> 038a56d0ba777cc6a40b49103489494b3accb4fb
  }
  return <Redirect to="/user-sessions/new" />;
};

const AuthenticatedRoute = ({ component, user, ...rest }) => {
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <AuthenticationCheck user={user} component={component}  />
    </Route>
  );
};

export default AuthenticatedRoute;
