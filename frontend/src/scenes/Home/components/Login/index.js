import React from 'react';
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography'
import './styles.css'
class Login extends React.Component {
    loggedIn = (e)=>{
            this.props.loggedHandler(true);
            this.props.roomHandler(document.getElementById('roomname').value);
            this.props.userHandler(document.getElementById('username').value);
    }
    render() {
        return (
            <Container maxWidth="xs" component='main' className='login-form'>
                <CssBaseline />
                <div>
                    <Typography component='h1' variant='h5' align='center'>Chat Rooms</Typography>
                    <form onSubmit={this.loggedIn}>
                        <TextField 
                        variant='outlined' margin='normal' required fullWidth 
                        id='roomname' label='Room Name' name='roomname' autoFocus
                        />
                        <TextField 
                        variant='outlined' margin='normal' required fullWidth 
                        id='username' label='Username' name='username'
                        />
                        <Button 
                        type='submit' fullWidth variant='contained' color='primary'>Join Room</Button>
                    </form>
                </div>
            </Container>
        );
    }
}
export default Login;