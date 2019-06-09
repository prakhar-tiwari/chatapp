import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { getUsers } from "./actions/authAction";
import Typography from "@material-ui/core/Typography";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import {clearChat} from "./actions/chatActions";

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    height: "500px",
    padding: "2rem 0",
    backgroundImage: "url('./chatList.png')"
  },
  root: {
    alignItems: "center",
    width: "50%",
    marginTop: theme.spacing(10),
    marginLeft: "30%",
    overflowX: "auto"
  },
  margin: {
    margin: theme.spacing(2),
    // backgroundColor:green[600],
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      pointerEvents: 'cursor'
    }
  }
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles();
  const { className, message, onClose, variant, ...other } = props;

  return (
    <SnackbarContent
      className={[classes[variant], className].join(" ")}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          {message}
        </span>
      }
      {...other}
    />
  );
}

const Dashboard = props => {
  const {isAuth}=props.auth;
  if(!isAuth){
    props.history.push('/login');
  }
  useEffect(() => {
    props.clearChat();
    props.getUsers();
  }, []); // Works as componentDidMount lifecycle method of React class

  const { users } = props.auth;
  const usersChat = users.filter(user => user.name !== props.auth.user.name);
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h4" component="h4">
          Available Users
        </Typography>
        <div className={classes.container}>
          {usersChat.map(user => (
            <MySnackbarContentWrapper
             key={user.email}
              variant="info"
              className={classes.margin}
              message={user.name}
              onClick={() => props.history.push({
                pathname: '/chat',
                state: {
                  id: user._id,
                  name: user.name
                }
              })}
            />
          ))}
        </div>
      </Paper>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getUsers,clearChat }
)(Dashboard);
