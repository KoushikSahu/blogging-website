import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export class NavigationBar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            logged_in: localStorage.getItem('token') ? true : false,
        }
    }

    componentDidMount() {
        if(this.state.logged_in){
            fetch('http://localhost:8001/api/current_user/', {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('token')}`
                }
            }).then(res => res.json())
            .then(
                data => {
                    if(!('username' in data)){
                        localStorage.removeItem('token');
                        this.setState(
                            {
                                logged_in: false,
                            }
                        )
                        window.alert('Incorrect credentials!');
                    }else{
                        this.setState({
                            ...this.state,
                            username: data.username,
                        })
                    }
                }
            ).catch((err)=>{
                this.setState(
                    {
                        logged_in: false,
                    }
                )
                window.alert('Server error!')
            })
        }
    }

    handleLogout(){
        localStorage.removeItem('token');
        this.setState({
            logged_in: false,
        })
    }

    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="md">
                    <Navbar.Brand href='.'>All posts</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {this.state.logged_in ? 
                                    <Nav.Link as={Link} to="/user">Hi, {this.state.username}</Nav.Link>
                                : 
                                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            }
                            {this.state.logged_in ? 
                                    <Nav.Link href='.' onClick={this.handleLogout}>Logout</Nav.Link>
                                : 
                                    <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default NavigationBar
