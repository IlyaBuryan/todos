import React from 'react'
import './App.css'
import axios from 'axios'
import UsersList from './components/Users'
import ProjectsList from './components/Projects'
import TasksList from './components/Tasks'
import ProjectTasksList from './components/ProjectTasks'
import MenuComponent from './components/Menu'
import LoginForm from './components/Auth'
import ProjectForm from './components/ProjectForm'
import TasksForm from './components/TaskForm'
import Footer from './components/Footer'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import baseUrl from './constants'
import Cookies from 'universal-cookie'

// import { gql, GraphQLClient } from 'graphql-request'

const NotFound404 = ({ location }) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.refreshState = this.refreshState.bind(this);
        this.createProject = this.createProject.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.createTask = this.createTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.findProjects = this.findProjects.bind(this);
        this.state = {
            'users': [],
            'projects': [],
            'tasks': []
        }
    }

    refreshState() {
        const headers = this.get_headers()

        // const query = gql`
        // {
        //     allProjects {
        //       id
        //       name
        //       username {
        //         id
        //         username
        //       }
        //     }
        //     allTasks {
        //       id
        //       text
        //     }
        //     usersByProjectId(id: 6) {
        //       username {
        //         id
        //         firstName
        //         lastName
        //       }
        //     }
        //   }`

        // const client = new GraphQLClient('http://127.0.0.1:8000/graphql/', { headers })
        // client.request(query).then((data) => console.log(data))

        axios.get(`${baseUrl()}users/`, { headers })
            .then(response => {
                const users = response.data
                this.setState(
                    {
                        'users': users.results
                    }
                )
            }).catch(error => {
                console.log(error)
                if (this.state.users !== []) {
                    this.setState(
                        {
                            'users': []
                        }
                    )
                }
            })
        axios.get(`${baseUrl()}todos/projects/`, { headers })
            .then(response => {
                const projects = response.data
                this.setState(
                    {
                        'projects': projects.results
                    }
                )
            }).catch(error => {
                console.log(error)
                if (this.state.projects !== []) {
                    this.setState(
                        {
                            'projects': []
                        }
                    )
                }
            })
        axios.get(`${baseUrl()}todos/tasks/`, { headers })
            .then(response => {
                const tasks = response.data
                this.setState(
                    {
                        'tasks': tasks.results
                    }
                )
            }).catch(error => {
                console.log(error)
                if (this.state.tasks !== []) {
                    this.setState(
                        {
                            'tasks': []
                        }
                    )
                }
            })
    }

    componentDidMount() {
        this.refreshState()
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        const cookies = new Cookies()
        const token = cookies.get('token')
        headers['Authorization'] = 'Bearer ' + token
        return headers
    }

    createProject(name, link, usersId) {
        const headers = this.get_headers()
        const data = { name: name, link: link, username: usersId }
        axios.post(`${baseUrl()}todos/projects/`, data, { headers })
            .then(response => {
                let new_project = response.data
                this.setState({ projects: [...this.state.projects, new_project] })
            }).catch(error => console.log(error))
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`${baseUrl()}todos/projects/${id}/`, { headers })
            .then(response => {
                this.setState({ projects: this.state.projects.filter((project) => project.id !== id) })
            }).catch(error => console.log(error))
    }

    createTask(project, user, text) {
        const headers = this.get_headers()
        const data = { project: project, user: user, text: text }
        axios.post(`${baseUrl()}todos/tasks/`, data, { headers })
            .then(response => {
                let new_task = response.data
                this.setState({ tasks: [...this.state.tasks, new_task] })
            }).catch(error => console.log(error))
    }

    deleteTask(id) {
        const headers = this.get_headers()
        axios.delete(`${baseUrl()}todos/tasks/${id}/`, { headers })
            .then(response => {
                this.refreshState()
            }).catch(error => console.log(error))
    }

    findProjects(text) {
        const headers = this.get_headers()
        axios.get(`${baseUrl()}todos/projects/?name=${text}`, { headers })
            .then(response => {
                const projects = response.data
                this.setState({ projects: projects.results })
            }).catch(error => { console.log(error) })
    }

    render() {
        return (
            <div className="wrapper">
                <div className="up_block">
                    <BrowserRouter>
                        <MenuComponent />
                        <Switch>
                            <Route exact path='/' component={() => <UsersList users={this.state.users} />} />
                            <Route exact path='/projects/' component={() => <ProjectsList
                                projects={this.state.projects}
                                deleteProject={this.deleteProject}
                                findProjects={this.findProjects}
                            />}
                            />
                            <Route exact path='/project/create/' component={() => <ProjectForm
                                users={this.state.users}
                                createProject={this.createProject}
                            />}
                            />
                            <Route exact path='/tasks/' component={() => <TasksList
                                tasks={this.state.tasks}
                                deleteTask={this.deleteTask}
                            />}
                            />
                            <Route exact path='/tasks/create/' component={() => <TasksForm
                                users={this.state.users}
                                projects={this.state.projects}
                                createTask={this.createTask}
                            />}
                            />
                            <Route path="/tasks/:id" component={() => <ProjectTasksList tasks={this.state.tasks} />} />
                            <Route exact path='/login/' component={() => <LoginForm refreshState={this.refreshState} />} />
                            <Route component={NotFound404} />
                        </Switch>
                    </BrowserRouter>
                    <Footer />
                </div>
            </div>
        )
    }
}

export default App;