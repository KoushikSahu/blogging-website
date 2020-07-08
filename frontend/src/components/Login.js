import React, { Component } from 'react'
import { Form, Button, Container } from 'react-bootstrap'

export class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            username: '',
            password: '',
        }

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(e){
        e.preventDefault();
        fetch('http://127.0.0.1:8001/api/auth-token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then(res => res.json())
        .then(
            data => {
                localStorage.setItem('token', data.token);
                window.location.reload();
                window.location.pathname = "/"
            }
        ).catch((err) => {
                window.alert('Login unsuccessful');
            }
        )
    }

    render() {
        console.log(this.state)

        return (
            <div>
                <Container>
                    <Form onSubmit={this.handleLogin}>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Enter Username" 
                            value={this.state.username}
                            onChange={(e) => this.setState({...this.state, username: e.target.value})} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                            type="password" 
                            placeholder="Enter Password"
                            value={this.state.password} 
                            onChange={(e) => this.setState({...this.state, password: e.target.value})} />
                        </Form.Group>
                        <Form.Group>
                            <Button variant="primary" type="submit">
                                Log in
                            </Button>
                        </Form.Group>
                    </Form>
                </Container>
            </div>
        )   
    }
}

export default Login
