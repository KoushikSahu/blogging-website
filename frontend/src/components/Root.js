import React from 'react'
import NavigationBar from './NavigationBar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './Login'
import Posts from './Posts'
import Signup from './Signup'
import UserPost from './UserPost'
import CreatePost from './CreatePost'

function Root() {
    return (
        <div>
            <Router>
                <NavigationBar />

                <Switch>
                    <Route path='/' exact component={Posts} />
                    <Route path='/login' component={Login} /> 
                    <Route path='/signup' component={Signup} />
                    <Route path='/user' component={UserPost} />
                    <Route path='/create-post' component={CreatePost} />
                </Switch>
            </Router>
        </div>
    )
}

export default Root
