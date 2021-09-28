import '../styles/Tables.css';
import { useParams } from 'react-router-dom'


const SingleTask = ({ task }) => {
    return (
        <tr>
            <td>
                {task.id}
            </td>
            <td>
                {task.project}
            </td>
            <td>
                {task.user}
            </td>
            <td>
                {task.text}
            </td>
            <td>
                {task.is_active.toString()}
            </td>
            <td>
                {task.created_date}
            </td>
            <td>
                {task.updated_date}
            </td>
        </tr>
    )
}

const ProjectTasksList = ({ tasks }) => {
    let { id } = useParams();
    let filtered_tasks = tasks.filter((task) => task.project === +id);
    return (
        <div className="table_wrapper">
            <table>
                <thead>
                    <tr>
                        <th>
                            Key
                        </th>
                        <th>
                            Project
                        </th>
                        <th>
                            UserID
                        </th>
                        <th>
                            Text
                        </th>
                        <th>
                            Activity
                        </th>
                        <th>
                            Created date
                        </th>
                        <th>
                            Updated date
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filtered_tasks.map((task) => <SingleTask key={task.id} task={task} />)}
                </tbody>
            </table>
        </div>
    )
}


export default ProjectTasksList;
