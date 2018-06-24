import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Hidden
} from "@material-ui/core";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import styled from "styled-components";

const styles = (theme: any) => ({
  appBar: {
    position: "relative" as "relative",
    zIndex: theme.zIndex.drawer + 1
  }
});

const Title = styled(Typography)`
  flex: 1;
  cursor: pointer;
`;

export interface IHeaderProps
  extends RouteComponentProps<{}, {}>,
    WithStyles<"appBar"> {}

export class Header extends React.Component<IHeaderProps> {
  public render() {
    const { history, classes } = this.props;
    return (
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Title
            variant="title"
            color="inherit"
            onClick={() => history.push("/")}
          >
            Mowney
          </Title>
          <Hidden mdUp>
            <IconButton color="inherit" aria-label="Menu" />
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles, { withTheme: true })(withRouter(Header));
