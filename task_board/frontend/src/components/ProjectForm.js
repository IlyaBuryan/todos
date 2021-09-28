import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            link: '',
            usersId: []
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleChangeUsers(event) {
        let eventVar = event.target.value
        if (this.state.usersId.includes(eventVar)) {
            let newState = this.state.usersId.filter((ids) => ids !== eventVar);
            this.setState({ usersId: newState })
        } else {
            this.setState({ usersId: [...this.state.usersId, eventVar] })
        }
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.createProject(this.state.name, this.state.link, this.state.usersId)
        this.setState({ usersId: [] })
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)} className="row g-3">
                <div className="form-group">
                    <label>Название проекта</label>
                    <input type="text" className="form-control" name="name" placeholder="name" value={this.state.name}
                        onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label>Ссылка на проект</label>
                    <input type="text" className="form-control" name="link" placeholder="link" value={this.state.link}
                        onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label>Выберите юзера</label>
                    <select className="form-select" multiple onChange={(event) => this.handleChangeUsers(event)} >
                        {this.props.users.map((user) => <option value={user.pk} key={user.username}>{user.username} - {user.pk}</option>)}
                    </select>
                </div>
                <input type="submit" className="btn btn-primary mb-3" classtype="submit" value="Save" />
            </form >
        );
    }
}

export default ProjectForm;
