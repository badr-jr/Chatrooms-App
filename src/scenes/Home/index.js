import React from 'react';
import Login from './components/Login'
import Chatroom from './components/Chatroom'
class Home extends React.Component {
    constructor(){
        super();
        this.state = {
            isLoggedIn: false,
            room: '',
            username: '',
        }
    }
    updateLoggedState = (loggedState) =>{
        this.setState({isLoggedIn:loggedState});
    } 
    updateRoomState = (roomName) =>{
        this.setState({room:roomName});
    }
    updateUsernameState = (name) =>{
        this.setState({username:name});
    }
  
    render() {
        return (
            <div>
                {this.state.isLoggedIn ? <Chatroom roomName={this.state.room} user={this.state.username}/>: 
                <Login loggedHandler={this.updateLoggedState} roomHandler={this.updateRoomState} userHandler={this.updateUsernameState}/>
                }
            </div>
        );
    }
}
export default Home;