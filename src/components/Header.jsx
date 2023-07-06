import {useRef} from 'react';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripHorizontal, faBell } from '@fortawesome/free-solid-svg-icons';

export const Header = () => {
    let sidebar = useRef()
    const menu = <FontAwesomeIcon icon={faGripHorizontal} />
    const notification = <FontAwesomeIcon icon={faBell} />
    let sidebarState = false
    const toggleSidebar = () => {
        if(sidebarState) {
            sidebar.current.style.width = '0'
            sidebar.current.style.height = '0'
            sidebarState = false
        }
        else{
            sidebar.current.style.width = '50%'
            sidebar.current.style.height = '100vh'
            sidebarState = true
        }
    }
    
    return (
        <header>
            <nav>
                <ul>
                    <li className='icon' onClick={toggleSidebar}>{menu}</li>
                    <li>Homepage</li>
                    <li className='icon'>{notification}</li>
                </ul>
            </nav>
            <aside className='sidebar' id='sidebar' ref={sidebar}>
                <ul>
                    <li><a href='/home'>Link 1</a></li>
                    <li><a href='/home'>Link 2</a></li>
                    <li><a href='/home'>Link 2</a></li>
                    <li><a href='/home'>Link 4</a></li>
                    <li><a href='/home'>Link 5</a></li>
                </ul>
            </aside>
        </header>
    )
}