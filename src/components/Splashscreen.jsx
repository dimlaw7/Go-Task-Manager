import task2 from './task2.svg';
import './Splashscreen.css';

const Splashscreen = ({ appState }) => {
    return (
        <div className='Splashscreen'>
            <section className='hero'>
                <div className='img-container'>
                    <img src={task2} className='hero-img' alt='hero-img' />
                </div>
            </section>
            <section className='splash-intro'>
                <h1>Welcome to Go Task Manager</h1>
                <p>A platform that handles your tasks while you focus on other activities</p>
                <button onClick={() => appState(true)}>Let's Start</button>      
            </section>
        </div>
    )
}

export default Splashscreen;