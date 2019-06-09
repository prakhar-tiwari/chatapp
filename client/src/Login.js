import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import {login} from './actions/authAction';
import {connect} from 'react-redux';

const useStyles = makeStyles(theme => ({
  card:{
    width:"500px",
    height:"300px",
    display:"inline-block",
    margin:"200px"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  },
  button:{
    marginTop:theme.spacing(5)
  }
}));

const Login=(props)=> {
  if(props.auth.isAuth){
    props.history.push('/');
  }
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const user={
    username:username,
    password:password
  }

  const handleSubmit = e => {
     props.login(user,props);
  };

  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <TextField
          required
          label="Username"
          className={classes.textField}
          margin="normal"
          onChange={e => setUserName(e.target.value)}
        />
        <TextField
          required
          label="Password"
          type="password"
          className={classes.textField}
          margin="normal"
          onChange={e => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </CardContent>
    </Card>
  );
}

const mapStateToProps=state=>({
  auth:state.auth
})

export default connect(mapStateToProps,{login})(Login);

