import '../styles/Tables.css';
import { Link } from 'react-router-dom'


const SingleTask = ({ task, deleteTask }) => {
    return (
        <tr>
            <td>
                {task.id}
            </td>
            <td>
                <Link to={`${task.project}`}>{task.project} filter</Link>
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
            <td>
                <button type='button' className="btn btn-warning" onClick={() => deleteTask(task.id)}>Delete</button>
            </td>
        </tr>
    )
}
const TasksList = ({ tasks, deleteTask }) => {
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
                        <th>
                            Delete
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => <SingleTask key={task.id} task={task} deleteTask={deleteTask} />)}
                </tbody>
            </table>
        </div>
    )
}


export default TasksList;
