import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ isAuth: isAuth, component: Component, ...rest }) => {
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          if (isAuth) {
            return <Component />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/Admin-Login",
                  state: { from: props.location },
                }}
              />
            );
          }
        }}
      />
    </div>
  );
};

export default ProtectedRoute;
