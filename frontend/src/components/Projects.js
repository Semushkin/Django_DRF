import React from "react";

const ProjectItem = ({project, delete_project}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.link}</td>
            <td>{project.users}</td>
            <td><button onClick={()=>delete_project(project.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const ProjectList = ({projects, delete_project}) => {

    return (
        <table>
            <th>Project ID</th>
            <th>Project Name</th>
            <th>Link</th>
            <th>Users</th>
            <th></th>
            {projects.map((project) => <ProjectItem project={project} delete_project={delete_project}/>)}
        </table>
    )
}

export default ProjectList