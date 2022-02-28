import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Message, Segment, Grid, Image } from "semantic-ui-react";
export default function Layout() {
  return (
    <React.Fragment>
      <Segment>
        <Message>Selemat DAtang</Message>
        <Grid celled="internally">
          <Grid.Row>
            <Grid.Column width={2}>
              <NavLink to="dashboard">Dashboard</NavLink>
              <NavLink to="chat">Chat</NavLink>
            </Grid.Column>
            <Grid.Column width={14}>
              <Outlet />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </React.Fragment>
  );
}
