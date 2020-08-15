import React, { Component } from 'react'
import { Form, Button, Container } from 'react-bootstrap'

export class Signup extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            username: '',
            password: '',
        }

        this.handleSignup = this.handleSignup.bind(this)
    }
    
    handleSignup(e){
        e.preventDefault()
        fetch('http://localhost:8000/api/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(json => {
            localStorage.setItem('token', json.token);
            window.location.reload();
            window.location.pathname = "/";
        });
    }

    render() {
        return (
            <div>
                <Container>
                    <Form onSubmit={this.handleSignup}>
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
                                Sign up
                            </Button>
                        </Form.Group>
                    </Form>
                </Container>
            </div>
        )
    }
}

export default Signup
