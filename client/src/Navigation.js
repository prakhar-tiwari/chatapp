import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { connect } from 'react-redux';
import { logout } from './actions/authAction';
import { withRouter } from 'react-router-dom';

const Navigation = (props) => {
    const [value, setValue] = React.useState(1);

    function handleChange(event, newValue) {
        setValue(newValue);
    }
    const { isAuth } = props.auth;

    return (
        <Paper square>
            <Tabs value={value} indicatorColor="primary" textColor="primary" onChange={handleChange}>
                {isAuth ?
                    <Tab label="Dashboard" onClick={() => props.history.push('/')} /> : null}
                {
                    (!isAuth) ?
                        <div>
                            <Tab label="Login" onClick={() => props.history.push('/login')} />
                            <Tab label="Register" onClick={() => props.history.push('/Register')} />
                        </div> :
                        <Tab label="Logout" onClick={() => props.logout()} />
                }
            </Tabs>
        </Paper>
    );
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default withRouter(connect(mapStateToProps, { logout })(Navigation));