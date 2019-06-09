import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import io from "socket.io-client";
import { getMessages, sendMessage, getAllMessages } from "./actions/chatActions";
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: "50px"
  },
  background: {
    backgroundImage: "url('./email-pattern.png')"
  },
  guest: {
    textAlign: "left"
  },
  sender: {
    textAlign: "right"
  },
  chatWindow: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "400px",
    padding: "20px",
    overflowY: "auto"
  },
  chatBox: {
    width: "85%",
    marginTop: "5px",
    "& label.Mui-focused": {
      color: "green"
    },
    "&.Mui-focused fieldset": {
      borderColor: "green"
    }
  },
  button: {
    width: "10%",
    height: "50px",
    left: "10px",
    marginTop: "5px"
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  chip: {
    margin: theme.spacing(1)
  }
}));

const Chat = (props) => {

  const { isAuth } = props.auth;
  if (!isAuth) {
    props.history.push('/login');
  }
  const userId = props.auth.user.id;

  const [message, setMessage] = useState("");
  const [guestname, setGuestName] = useState("");
  const [username, setUserName] = useState("");
  const [guestId, setGuestId] = useState("");

  const guestInitials = guestname.split(" ").map(name => name[0]).join("");
  const userInitials = username.split(" ").map(name => name[0]).join("");

  const [messages, setMessages] = useState([]);
  let sortedMessages = messages.sort((a, b) => a.createdAt < b.createdAt ? -1 : 1);


  const socket = io("http://localhost:5000");
  
  socket.on("chat message", result => {
    setMessages(messages.concat(result));
  })

  useEffect(() => {
    if (props.location.state) {
      const { id, name } = props.location.state;
      setGuestName(name);
      setUserName(props.auth.user.name);
      setGuestId(id);
      axios
        .post("/getmessages", {
          userId: props.auth.user.id,
          guestId: id
        })
        .then(result => {
          setMessages(result.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
    else {
      props.history.push('/');
    }
  }, []);



  const handleSubmit = e => {

    e.preventDefault();
    const messageInfo = {
      to: guestId,
      from: userId,
      message: message
    };
    axios
      .post("/sendmessage", messageInfo)
      .then(result => {
        console.log(result.data);
      })
      .catch(err => {
        console.log(err);
      });
      
    setMessage("");
  };

  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h4" component="h4">
          Chat Application
        </Typography>
        <Typography component="p">{guestname}</Typography>
        <div className={classes.background}>
          <div className={classes.chatWindow}>
            {sortedMessages.map(message => (
              (message.from._id.toString() === guestId.toString()) ?
                <div key={message._id} className={classes.guest}>
                  <Chip
                    avatar={<Avatar>{guestInitials}</Avatar>}
                    label={message.message}
                    className={classes.chip}
                    color="primary"
                  />
                </div> :
                <div key={message._id} className={classes.sender}>
                  <Chip
                    avatar={<Avatar>{userInitials}</Avatar>}
                    label={message.message}
                    className={classes.chip}
                    color="secondary"
                  />
                </div>
            ))}

          </div>
        </div>
        <div className={classes.chatBox}>
          <TextField
            className={classes.chatBox}
            label="Send message"
            variant="outlined"
            id="mui-theme-provider-outlined-input"
            onChange={e => setMessage(e.target.value)}
            value={message}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleSubmit}
          >
            Send
            {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
            <Icon className={classes.rightIcon}>send</Icon>
          </Button>
        </div>
      </Paper>
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  chat: state.chat
})

export default connect(mapStateToProps, { getMessages, sendMessage, getAllMessages })(Chat);
