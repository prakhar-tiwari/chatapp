import React, { useState } from "react";
import axios from 'axios';
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles(theme => ({
  card:{
    width:"500px",
    height:"400px",
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
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  }
}));

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function Register(props) {
  const [name,setName]=useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [result,setResult] = useState("")

  const [openModal,setOpenModal] = useState(false);

  const [modalStyle] =useState(getModalStyle);

  const handleSubmit = e => {
    axios.post('http://localhost:5000/register',{
      name:name,
      username:username,
      password:password
    })
    .then(result=>{
      setResult(result.data.message);
      setOpenModal(true);
      props.history.push("/login");
    })
    .catch(err=>{
      console.log(err);
    })
  };

  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={openModal}
        onClose={()=>setOpenModal(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <Typography variant="h6" id="modal-title">
            {result}
          </Typography>
        </div>
      </Modal>
      <CardContent>
      <TextField
          required
          label="Name"
          className={classes.textField}
          margin="normal"
          onChange={e => setName(e.target.value)}
        />
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
          Register
        </Button>
      </CardContent>
    </Card>
  );
}
