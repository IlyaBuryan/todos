import React from "react"
import axios from 'axios'
import baseUrl from '../constants'
import Cookies from 'universal-cookie'
import '../App.css';

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
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
        axios.post(`${baseUrl()}token/`, { username: this.state.username, password: this.state.password })
            .then(response => {
                const token = response.data
                this.set_token(token.access)
                this.setState(
                    {
                        password: ''
                    }
                )
            }).catch(error => console.log(error))
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token, { path: '/' })
        this.props.refreshState()
    }


    logout(event) {
        const cookies = new Cookies()
        cookies.set('token', '', { path: '/' })
        this.props.refreshState()
    }

    is_authenticated() {
        const cookies = new Cookies()
        return cookies.get('token') !== ''
    }

    render() {
        return (
            (this.is_authenticated()) ?
                <div className="col-5">
                    <h4>Вы залогинены и можете выйти</h4>
                    <input type="button" className="btn btn-warning" value="Logout" onClick={(event) => this.logout(event)} />
                </div > :
                <form onSubmit={(event) => this.handleSubmit(event)} className="row g-3">
                    <input type="text" className="form-control" name="username" placeholder="username" value={this.state.login} onChange={(event) => this.handleChange(event)} />
                    <input type="password" className="form-control" name="password" placeholder="password" value={this.state.password} onChange={(event) => this.handleChange(event)} />
                    <input type="submit" className="btn btn-primary mb-3" classtype="submit" value="Login" />
                </form>
        );
    }
}
export default LoginForm;
