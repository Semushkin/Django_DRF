//import logo from './logo.svg';
import './App.css';
import React from 'react';
import UserList from "./components/User";
import ProjectList from "./components/Projects";
import TodoList from "./components/Todo";
//import Menu from "./components/Menu";
import Footer from "./components/Footer";
import NotFound404 from "./components/NotFound404";
import ProjectsUser from "./components/ProjectsUser";
import LoginForm from "./components/Auth";
import ProjectForm from "./components/ProjectForm";
import TodoForm from "./components/TodoForm";
import axios from "axios";
import Cookies from "universal-cookie";
import {BrowserRouter, Route, Link, Switch, Redirect} from "react-router-dom";



class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': '',
        }
    }

    create_todo(text, project, user)
    {
        const headers = this.get_headers()
        const data = {text: text, project: project, user: user}
        console.log(data)
        axios.post(`http://127.0.0.1:8000/api/todo/`,data, {headers}).then(response=>{
            this.load_data()
        }).catch(error => {
            console.log(error)
            this.setState({todos:[]})})
    }

    delete_todo(id)
    {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, {headers}).then(response=>{
            this.load_data()
        }).catch(error => {
            console.log(error)
            this.setState({todos:[]})})
    }

    create_project(name, link, users)
    {
        const headers = this.get_headers()
        const data = {name: name, link: link, users: users}
        axios.post(`http://127.0.0.1:8000/api/projects/`,data, {headers}).then(response=>{
            this.load_data()
        }).catch(error => {
            console.log(error)
            this.setState({projects:[]})})
    }

    delete_project(id)
    {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers}).then(response=>{
            this.load_data()
        }).catch(error => {
            console.log(error)
            this.setState({projects:[]})})
    }

    logout(){
        this.set_token('')

    }

    is_auth(){
        return !!this.state.token
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token':token}, () => this.load_data())
    }

    get_token_from_storage(){
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }

    get_token(username, password) {
        const data = {username:username, password:password}
        axios.post('http://127.0.0.1:8000/api-token-auth/', data).then(response=>{
            this.set_token(response.data['token'])
        }).catch(error => alert('Не верный логин или пароль'))
    }

    data(token) {
        localStorage.setItem('token', token)
        let token_get = localStorage.getItem('token')

        document.cookie = `token=${token}`
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users/', {headers}).then(response=>{
            this.setState(
                {
                    'users': response.data
                }
            )
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/', {headers}).then(response=>{
            this.setState(
                {
                    'projects': response.data
                }
            )
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo/', {headers}).then(response=>{
            this.setState(
                {
                    'todos': response.data
                }
            )
        }).catch(error => console.log(error))
    }

    get_headers(){
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_auth()){
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    componentDidMount(){
        this.get_token_from_storage()
    }
    render(){
        return (
            <div>
                <BrowserRouter>
                    <nav>
                        <ul>
                            <li><Link to='/'>Users</Link></li>
                            <li><Link to='/projects'>Projects</Link></li>
                            <li><Link to='/todos'>Todos</Link></li>
                            <li>
                                { this.is_auth() ? <button onClick={() => this.logout()}> Logout </button> : <Link to='/login'>Login</Link>}
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/' component={() => <UserList users={this.state.users}/>} />
                        <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} delete_project={(id)=>this.delete_project(id)}/>} />
                        <Route exact path='/projects/create' component={() => <ProjectForm users={this.state.users} create_project={(name, link, users)=>this.create_project(name, link, users)}/>} />
                        <Route exact path='/todos' component={() => <TodoList todos={this.state.todos} delete_todo={(id)=>this.delete_todo(id)} />} />
                        <Route exact path='/todos/create' component={() => <TodoForm users={this.state.users} projects={this.state.projects} create_todo={(text, project, user)=>this.create_todo(text, project, user)}/>} />
                        <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)}/>} />
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
