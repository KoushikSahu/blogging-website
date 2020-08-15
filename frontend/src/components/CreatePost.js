import React, { Component } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import './form-style.css'

export class CreatePost extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            title: "",
            post: ""
        }

        this.submitHandler = this.submitHandler.bind(this)
        this.titleHandler = this.titleHandler.bind(this)
        this.postHandler = this.postHandler.bind(this)
    }
    
    submitHandler(e){
        e.preventDefault()
        fetch('http://127.0.0.1:8000/api/user-post/', {
            method: 'POST',
            headers: {
                'Authorization': `JWT ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            window.location.pathname = '/user'
        }).catch(err=>{
            console.log(`{err}...can't create post`)
        })
    }

    titleHandler(e){
        this.setState({
            ...this.state,
            title: e.target.value
        })
    }

    postHandler(e){
        this.setState({
            ...this.state,
            post: e.target.value
        })
    }

    render() {
        console.log(this.state)

        return (
            <Container className="form-style">
                <Form onSubmit={this.submitHandler}>
                    <Form.Group>
                        <Form.Label>
                            Title
                        </Form.Label>
                        <Form.Control type="text" onChange={this.titleHandler} value={this.state.title} placeholder="Enter title" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Post
                        </Form.Label>
                        <Form.Control type="textarea" onChange={this.postHandler} value={this.state.post} placeholder="Enter content" />
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" type="submit">Create post!</Button>
                    </Form.Group>
                </Form>             
            </Container>
        )
    }
}

export default CreatePost
