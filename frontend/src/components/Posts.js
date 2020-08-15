import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap'
import './posts-style.css'

export class Posts extends Component {
    constructor(props) {
        super(props)

        this.state = { 
            data: [],
        }
    }

    componentDidMount(){
        fetch('http://127.0.0.1:8000/api/posts/'
        ).then(res=>res.json())
        .then(json=>{
            this.setState(
                {
                    data: json,
                }
            )
        })
    }

    render() {
        console.log(this.state.data)
        return (
            <Container>
                {
                    this.state.data.map((val, key)=>{
                        return (
                            <Container>
                                <Row className="posttitle">
                                    {val.title}
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
