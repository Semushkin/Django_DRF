import React from "react";

class ProjectForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {name: '', link: '', users: ''}

    }
    handleChange(event){
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    handleUserChange(event){
        if(!event.target.selectedOptions){
            this.setState({
                'users':[]
            })
            return;
        }
        let users = []
        for(let i = 0; i < event.target.selectedOptions.length;i++){
            users.push(event.target.selectedOptions.item(i).value)
        }
        this.setState(
            {'users':users}
        )
    }

    handleSubmit(event){
        this.props.create_project(this.state.name, this.state.link, this.state.users)
        event.preventDefault()
    }

   render() {
       return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="name"></label>
                    <input type="text" name="name" placeholder="name"
                    value={this.state.name}
                    onChange={(event)=>this.handleChange(event)} />
                </div>

                <div className="form-group">
                    <label htmlFor="link"></label>
                    <input type="text" name="link" placeholder="link"
                    value={this.state.link}
                    onChange={(event)=>this.handleChange(event)} />
                </div>

                <select name="users" multiple onChange={(event) => this.handleUserChange(event)}>
                    {this.props.users.map((item) => <option value={item.id}>{item.first_name}</option>)}
                </select>

                <input type="submit" value="Save" />
            </form>
       );
   }
}

export default ProjectForm