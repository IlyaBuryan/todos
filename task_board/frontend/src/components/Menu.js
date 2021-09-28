import '../styles/Menu.css';
import logo from '../images/fav.png'
import { Link } from 'react-router-dom'

const MenuComponent = () => {
    return (
        <div id="menu_wrapper">
            <div id="menu">
                <span className="menu_header">
                    <img className="menu_image" alt="" src={logo}></img>
                    Task board
                </span>
                <span className="menu_text">Управляейте вашими повседневными задачами. Делитесь задачами с коллегами и додчиненными!</span>
            </div>
            <div className="buttons_group">
                <Link to='/'><div className="button"><span>Users</span></div></Link>
                <Link to='/projects/'><div className="button"><span>Projects</span></div></Link>
                <Link to='/project/create/'><div className="button"><span>Projects create</span></div></Link>
                <Link to='/tasks/'><div className="button"><span>Tasks</span></div></Link>
                <Link to='/tasks/create/'><div className="button"><span>Tasks create</span></div></Link>
                <Link to='/login/'><div className="button"><span>Log in/out</span></div></Link>
            </div>
        </div>
    )
}


export default MenuComponent;