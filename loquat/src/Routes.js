import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./containers/AppliedRoute";
import GroupRoute from "./containers/GroupRoute";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Dashboard from "./containers/Dashboard";
import Group from "./containers/Group";
import NotFound from "./containers/NotFound";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={childProps.user ? Dashboard : Home} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <GroupRoute path="/groups/:groupId" component={Group} props={childProps} />
    {/* <AppliedRoute path="/dashboard" exact component={Dashboard} props={childProps} /> */}
    <Route component={NotFound} />
  </Switch>;