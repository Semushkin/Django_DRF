import logo from './logo.svg';
import './App.css';
import React from 'react';
import UserList from "./components/User";
import ProjectList from "./components/Projects";
import TodoList from "./components/Todo";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import NotFound404 from "./components/NotFound404";
import ProjectsUser from "./components/ProjectsUser";
import axios from "axios";
import {HashRouter, BrowserRouter, Route, Link, Switch, Redirect} from "react-router-dom";

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': []
        }
    }

    componentDidMount(){
        axios.get('http://127.0.0.1:8000/api/users/').then(response=>{
            this.setState(
                {
                    'users': response.data
                }
            )
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/').then(response=>{
            this.setState(
                {
                    'projects': response.data
                }
            )
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo/').then(response=>{
            this.setState(
                {
                    'todos': response.data
                }
            )
        }).catch(error => console.log(error))
    }
    render(){
        return (
            <div>
                <BrowserRouter>
                    <nav>
                        <ul>
                            <li><Link to='/'>Author</Link></li>
                            <li><Link to='/projects'>Projects</Link></li>
                            <li><Link to='/todos'>Todos</Link></li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/' component={() => <UserList users={this.state.users}/>} />
                        <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}/>} />
                        <Route exact path='/todos' component={() => <TodoList todos={this.state.todos}/>} />
                        <Route path='/user/:id'>
                            <ProjectsUser projects={this.state.projects}/>
                        </Route>
                        <Redirect from='/project' to='/projects'/>
                        <Route component={NotFound404}/>
                    </Switch>
                </BrowserRouter>
                <Footer/>
            </div>
        )
    }
}

export default App;
