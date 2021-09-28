import '../styles/Tables.css';


const SingleUser = ({ user }) => {
    return (
        <tr>
            <td>
                {user.pk}
            </td>
            <td>
                {user.username}
            </td>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}

const UsersList = ({ users }) => {
    return (
        <div className="table_wrapper">
            <table>
                <thead>
                    <tr>
                        <th>
                            id
                        </th>
                        <th>
                            Username
                        </th>
                        <th>
                            First name
                        </th>
                        <th>
                            Last Name
                        </th>
                        <th>
                            Email
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => <SingleUser key={user.pk} user={user} />)}
                </tbody>
            </table>
        </div>
    )
}


export default UsersList;
