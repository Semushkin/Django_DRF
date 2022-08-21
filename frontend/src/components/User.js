import React from "react";

import {Link} from "react-router-dom";

const UserItem = ({user}) => {

    return (
        <tr>
            <td>{user.pk}</td>
            <td>
                <Link to={`/user/${user.pk}`}>{user.username}</Link>
            </td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
        </tr>
    )
}

const UserList = ({users}) => {

    return (
        <table>
            <th>ID</th>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>E-mail</th>
            {users.map((user) => <UserItem user={user}/>)}
        </table>
    )
}

export default UserList