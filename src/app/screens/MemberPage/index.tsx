import React from "react";
import { Container } from "@mui/material";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { VisitOtherPage } from "./visitOtherPage";
import { VisitMyPage } from "./visitMyPage";
import "../../../css/my_page.css";

export function MemberPage() {
  let member = useRouteMatch();
  return (
    <div className="member_page">
      <Switch>
        <Route path={`${member.path}/other`}>
          <VisitOtherPage />
        </Route>
        <Route path={`${member.path}`}>
          <VisitMyPage />
        </Route>
      </Switch>
    </div>
  );
}
