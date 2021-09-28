import '../styles/Tables.css';


const SingleProject = ({ project, deleteProject }) => {
    return (
        <>
            <tr>
                <td>
                    {project.id}
                </td>
                <td>
                    {project.name}
                </td>
                <td>
                    {project.link}
                </td>
                <td>
                    {project.username.join(" || ")}
                </td>
                <td>
                    <button type='button' className="btn btn-warning" onClick={() => deleteProject(project.id)}>Delete</button>
                </td>
            </tr>
        </>
    )
}

const ProjectsList = ({ projects, deleteProject, findProjects }) => {
    let serachText = ''
    return (
        <>
            <form onSubmit={(event) => { event.preventDefault(); findProjects(serachText) }} className="row g-3">
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Поиск проектов"
                        onChange={(event) => serachText = event.target.value} />
                </div>
                <input type="submit" className="btn btn-primary mb-3" classtype="submit" value="Search" />
            </form >

            <div className="table_wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>
                                Key
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                link
                            </th>
                            <th>
                                UserIds
                            </th>
                            <th>
                                delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => <SingleProject key={project.id} project={project} deleteProject={deleteProject} />)}
                    </tbody>
                </table>
            </div>
        </>
    )
}


export default ProjectsList;
