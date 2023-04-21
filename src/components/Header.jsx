import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripHorizontal, faBell } from '@fortawesome/free-solid-svg-icons';

export const Header = () => {
    const menu = <FontAwesomeIcon icon={faGripHorizontal} />
    const notification = <FontAwesomeIcon icon={faBell} />
    return (
        <header>
            <nav>
                <ul>
                    <li className='icon'>{menu}</li>
                    <li>Homepage</li>
                    <li className='icon'>{notification}</li>
                </ul>
            </nav>
        </header>
    )
}