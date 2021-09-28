import React from 'react'


class TasksForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            project: '',
            user: '',
            text: ''
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.createTask(this.state.project, this.state.user, this.state.text)
        this.setState({
            project: '',
            user: '',
            text: ''
        })
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)} className="row g-3">
                <div className="form-group">
                    <label>Выберите проект</label>
                    <select className="form-select" name="project" onClick={(event) => this.handleChange(event)} >
                        {this.props.projects.map((project) => <option value={project.id} key={project.id}>{project.name} - {project.id}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Выберите пользователя</label>
                    <select className="form-select" name="user" onClick={(event) => this.handleChange(event)} >
                        {this.props.users.map((user) => <option value={user.pk} key={user.username}>{user.username} - {user.pk}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Текст заметки</label>
                    <input type="text" className="form-control" name="text" placeholder="текст заметки" value={this.state.name}
                        onChange={(event) => this.handleChange(event)} />
                </div>
                <input type="submit" className="btn btn-primary mb-3" classtype="submit" value="Save" />
            </form >
        );
    }
}

export default TasksForm;
