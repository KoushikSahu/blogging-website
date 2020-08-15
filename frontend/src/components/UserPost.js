import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './posts-style.css'

export class Posts extends Component {
    constructor(props) {
        super(props)

        this.state = { 
            data: [],
        }

        this.deletePost = this.deletePost.bind(this)
    }

    componentDidMount(){
        fetch('http://127.0.0.1:8000/api/user-post/', {
            method: 'GET',
            headers: {
                'Authorization': `JWT ${localStorage.getItem('token')}`
            }
        }
        ).then(res=>res.json())
        .then(json=>{
            this.setState(
                {
                    data: json,
                }
            )
        })
    }

    deletePost(pk){
        var detail = {
            key: pk
        }

        fetch('http://127.0.0.1:8000/api/posts/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(detail)
        }).then(res=>{
            console.log(res)
            return res.json()
        })
        .then(json=>{
            console.log(json)
            window.location.pathname = '/user'
        })
    }

    render() {
        console.log(this.state.data)
        return (
            <Container>
                <Row className="my-3 justify-content-center">
                    <Button as={Link} to="/create-post" variant="primary">
                        Create a post
                    </Button>
                </Row>
                {
                    this.state.data.map((val, key)=>{
                        return (
                            <Container>
                                <Row className="posttitle">
                                    <Col sm={11}>{val.title}</Col>
                                    <Col sm={1}><Button variant="danger" onClick={()=>{this.deletePost(val.id)}}>Delete</Button></Col>
                                </Row>
                                <Row className="posttext">
                                    {val.post}
                                </Row>
                                <hr />
                            </Container>
                        )
                    })   
                }   
            </Container>
        )
    }
}

export default Posts
