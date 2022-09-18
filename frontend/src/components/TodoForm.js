import React from "react";

class TodoForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {text: '', project: '', users: ''}

    }
    handleChange(event){
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    handleProjectChange(event){
        if(!event.target.selectedOptions){
            this.setState({
                'project':[]
            })
            return;
        }
        let project = []
        //for(let i = 0; i < event.target.selectedOptions.length;i++){
        //    users.push(event.target.selectedOptions.item(i).value)
        //}
        project = event.target.selectedOptions.item(0).value
        this.setState(
            {'project':project},
            //console.log(project)
        )
    }

    handleUserChange(event){
        if(!event.target.selectedOptions){
            this.setState({
                'user': ''
            })
            return;
        }
        let user = ''
        //for(let i = 0; i < event.target.selectedOptions.length;i++){
        //     users.push(event.target.selectedOptions.item(i).value)
        //}
        user = event.target.selectedOptions.item(0).value
        this.setState(
            {'user':user},
            //console.log(user)
        )
    }

    handleSubmit(event){
        //console.log(this.state.text, this.state.project, this.state.user)
        this.props.create_todo(this.state.text, this.state.project, this.state.user)
        event.preventDefault()
    }

   render() {
       return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="text"></label>
                    <input type="text" name="text" placeholder="text"
                    value={this.state.text}
                    onChange={(event)=>this.handleChange(event)} />
                </div>

                <select name="project" onChange={(event) => this.handleProjectChange(event)}>
                    {this.props.projects.map((item) => <option value={item.id}>{item.name}</option>)}
                </select>

                <select name="users" onChange={(event) => this.handleUserChange(event)}>
                    {this.props.users.map((item) => <option value={item.id}>{item.first_name}</option>)}
                </select>

                <input type="submit" value="Save" />
            </form>
       );
   }
}

export default TodoForm