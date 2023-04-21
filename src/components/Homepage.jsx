import { useState, useReducer } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import listIcon from './listIcon.svg';
import { Modalform } from './Modalform';
import { Header } from "./Header";
import { Datacard } from "./Datacard";

const initialTodos = [
    {
        id: 1,
        title: 'UI Design',
        time: '9:00am - 11:00am',
        taskStatus: 'Incomplete'
    },
    {
        id: 2,
        title: 'Web Development',
        time: '9:00am - 11:00am',
        taskStatus: 'Incomplete'
    }
];

const reducer = (state, action) => {
    switch (action.type) {
        case 'add-task':
            console.log('Submit Works')
            return [...state, {
                id: 3,
                title: action.payload.name,
                time: '9:00am - 11:00am',
                taskStatus: 'Incomplete'
            }]
            break;
        default:
            break;
    }
}

const Homepage = () => {
    const [modal, setModal] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [todos, dispatch] = useReducer(reducer, initialTodos);
    const arrowRight = <FontAwesomeIcon icon={faAngleRight} />
    return (
        <>
            <Header />
            <main>
                <Datacard setModal={setModal} />
                {modal && <Modalform setModal={setModal} task={taskTitle} setTask={setTaskTitle} todos={todos} dispatch={dispatch} />}
                <section className='tasks'>
                    <div className='info'>
                        <h3 className='title'>My Tasks</h3>
                        <span className='aside'>See All</span>
                    </div>
                    <div className='container'>
                        <ul className='task-list'>
                            {todos.map((todo) => 
                                <li key={todo.id}>
                                    <div className='task-icon'>
                                        <img src={listIcon} alt='listIcon' width='30px' />
                                    </div>
                                    <div>
                                        <h4>{todo.title}</h4>
                                        <span>{todo.time}</span>
                                    </div>
                                    {arrowRight}
                                </li>
                            )}
                        </ul>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Homepage;