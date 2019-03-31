import React from "react";
import { Route } from "react-router-dom";

export default ({ component: C, props: cProps, computedMatch: match, ...rest }) =>
  <Route {...match} {...rest} render={(props) => (<C {...props} {...cProps} groupId={match.params.groupId} />)} />;
