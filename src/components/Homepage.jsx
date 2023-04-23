import { useState, useReducer} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import listIcon from './listIcon.svg';
//import { Modalform } from './Modalform';
import { Header } from "./Header";
import { Datacard } from "./Datacard";


const d = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000));
const todayIs = d.toJSON().slice(0, 10);
console.log(d.toJSON());
const timeIs = d.toJSON().slice(11, 16);
const initialTodos = () => {
    const getTodos = window.localStorage.getItem('initialTodos');
    if (getTodos) {
        return JSON.parse(getTodos)
    }
    return [];
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'add-task':
            return [...state, {
                title: action.payload.title,
                date: action.payload.date,
                time: action.payload.time,
                endtime: action.payload.endtime,
                status: action.payload.status
            }]
            break;
        default:
            return state;
            break;
    }
}

const Homepage = () => {
    const [modal, setModal] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDate, setTaskDate] = useState(todayIs);
    const [taskTime, setTaskTime] = useState(timeIs);
    const [taskTimeEnd, setTaskTimeEnd] = useState(timeIs);
    const [taskStatus, setTaskStatus] = useState('Incomplete');
    const [todos, dispatch] = useReducer(reducer, initialTodos());
    const arrowRight = <FontAwesomeIcon icon={faAngleRight} />
    const closeWindow = <FontAwesomeIcon icon={faWindowClose} />
    function handleSubmit(e) {
        e.preventDefault();
        const getTodos = window.localStorage.getItem('initialTodos');
        if (getTodos) {
            const initialTodos = JSON.parse(getTodos);
            initialTodos.push({
                title: taskTitle,
                date: taskDate,
                time: taskTime,
                endtime: taskTimeEnd,
                status: taskStatus
            });
            window.localStorage.setItem('initialTodos',JSON.stringify(initialTodos));
        }
        else{
            window.localStorage.setItem('initialTodos',JSON.stringify([{
                title: taskTitle,
                date: taskDate,
                time: taskTime,
                endtime: taskTimeEnd,
                status: taskStatus
            }]));
        }
        dispatch({
            type: 'add-task',
            payload: {
                title: taskTitle,
                date: taskDate,
                time: taskTime,
                endtime: taskTimeEnd,
                status: taskStatus
            }
        });
        setModal(false);
        setTaskTitle('');
    }
    return (
        <>
            <Header />
            <main>
                <Datacard setModal={setModal} />
                {modal && (
                    <section className='modal-form'>
                        <div className='close-modal' onClick={() => setModal(false)}>
                            <span>{closeWindow}</span>
                        </div>
                        <h4 className='title'>Add New Task</h4>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <label htmlFor='add-task'>Task Title
                                <input type='text' name='add-task' id='add-task' value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} autoComplete='off' />
                            </label>
                            <label htmlFor='task-date'>Task Date
                                <input type='date' name='task-date' id='task-date' value={taskDate} onChange={(e) => setTaskDate(e.target.value)}/>
                            </label>
                            <div className="flex-input">
                                <label htmlFor='task-date'>Start Time
                                    <input type='time' name='task-time' id='task-time' value={taskTime} onChange={(e) => setTaskTime(e.target.value)} />
                                </label>
                                <label htmlFor='task-date'>End Time
                                    <input type='time' name='task-time' id='task-time' value={taskTimeEnd} onChange={(e) => setTaskTimeEnd(e.target.value)} />
                                </label>
                            </div>
                            <label htmlFor='status'>Task Status
                                <select name='status' id='status' onChange={(e) => setTaskStatus(e.target.value)}>
                                    <option value='Incomplete'>Incomplete</option>
                                    <option value='Complete'>Complete</option>
                                </select>
                            </label>
                            <button type='submit' className='submit-modal'>Submit</button>
                        </form>
                    </section>
                )
                }
                <section className='tasks'>
                    <div className='info'>
                        <h3 className='title'>My Tasks</h3>
                        <span className='aside'>See All</span>
                    </div>
                    <div className='container'>
                        <ul className='task-list'>
                            {todos.length ? todos.reverse().map((todo,index) => 
                                <li key={index}>
                                    <div className='task-icon'>
                                        <img src={listIcon} alt='listIcon' width='30px' />
                                    </div>
                                    <div>
                                        <h4>{todo.title}</h4>
                                        <span>{todo.time} - {todo.endtime}</span>
                                    </div>
                                    {arrowRight}
                                </li>
                            )
                            :
                            (
                                <>
                                    <br/><br/>
                                    <h4>You have not added a task to manage</h4>
                                    <p>Click the button in the blue card above to begin</p>
                                </>
                            )}
                        </ul>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Homepage;