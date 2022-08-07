import logo from './logo.svg';
import './App.css';
import React from 'react';
import UserList from "./components/User";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import axios from "axios";

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            'users': []
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
        /**
        const users = [
            {
                'username': 'User10',
                'first_name': 'Сергей10',
                'last_name': 'Сергеев10',
                'email': 'Sergey10@mail.ru',
            },
            {
                'username': 'User11',
                'first_name': 'Сергей11',
                'last_name': 'Сергеев11',
                'email': 'Sergey11@mail.ru',
            }
        ]
        */
    }
    render(){
        return (
            <div>
                <Menu/>
                <UserList users={this.state.users}/>
                <Footer/>
            </div>
        )
    }
}

export default App;
