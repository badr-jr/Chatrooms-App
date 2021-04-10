import React from 'react';
import { client, w3cwebsocket as W3CWebSocket } from 'websocket'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './styles.css'
class Chatroom extends React.Component {
    eng = /^[a-zA-Z0-9]+$/;
    arab={'ا':'a','ب':'b','ت':'t','ث':'th','ج':'g','ح':'h','خ':'kh','د':'d','ذ':'th','ر':'r','ز':'z','س':'c','ش':'sh','ص':'s','ض':'dd','ع':'ai','غ':'gh','ف':'f','ق':'q','ك':'k','ل':'l','م':'m','ن':'n','ه':'h','و':'w','ي':'yi','ى':'aa'};
    engToArab = (txt)=>{
        let result = '';
        for(var i=0 ;i < txt.length ; i++){
            result += this.arab[txt[i]];
        }
        return result;
    }
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        }
    }
    room= this.eng.test(this.props.roomName) == false ? this.room=this.engToArab(this.props.roomName) : this.room = this.props.roomName;
    client = new W3CWebSocket('ws://chatting-rooms-app.herokuapp.com/ws/chat/' + this.room+ '/');
    componentDidMount() {
        const objDiv = document.getElementById("chat-box");
        this.client.onopen = () => {
            console.log('Websocket client connected');
        };
        this.client.onmessage = (message) => {
            let receivedData = JSON.parse(message.data);
            if (receivedData) {
                this.setState((state) => ({
                    messages: [...state.messages,
                    {
                        message: receivedData.message,
                        name: receivedData.username
                    }]
                }));
                objDiv.scrollTop = objDiv.scrollHeight;
            }
        }
    }
    sendMessage = (e) => {
        console.log(this.client.readyState);
        if(this.client.readyState){
        this.client.send(JSON.stringify({
            type: "send_group_message",
            message: document.getElementById('message').value,
            username: this.props.user
        }));
    }
        document.getElementById('message').value = ''; 
        e.preventDefault();
    };
    render() {
        return (
            <Container>
                <Typography id='room-title' component='h1' variant='h5' align='center'>Room: <b>{this.props.roomName}</b></Typography>
                <Paper id='chat-box'>
                    {
                        this.state.messages.map((message, index) =>
                            <Card key={index} className='chat-message'>
                                <CardHeader avatar={
                                    <Avatar style={{ backgroundColor: 'darkviolet' }}>{message.name[0].toUpperCase()}</Avatar>
                                } title={message.name} subheader={message.message}>
                                </CardHeader>
                            </Card>
                        )
                    }
                </Paper>
                <form onSubmit={this.sendMessage}>
                    <TextField
                        variant='outlined' margin='normal' fullWidth
                        id='message' label='Your Message' name='message' autoFocus
                    />
                    <Button type='submit' variant="contained" color="primary">Send</Button>
                </form>
            </Container>
        );
    }
}
export default Chatroom;