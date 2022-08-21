import React from "react";

const TodoItem = ({todo}) => {
    return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.text}</td>
            <td>{todo.date_create}</td>
            <td>{todo.date_update}</td>
            <td>{todo.active}</td>
            <td>{todo.project}</td>
            <td>{todo.user}</td>
        </tr>
    )
}

const TodoList = ({todos}) => {

    return (
        <table>
            <th>ID</th>
            <th>Text</th>
            <th>Create Date</th>
            <th>Update Date</th>
            <th>Active</th>
            <th>Project</th>
            <th>User</th>
            {todos.map((todo) => <TodoItem todo={todo}/>)}
        </table>
    )
}

export default TodoList