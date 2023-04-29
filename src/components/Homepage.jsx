import { useState, useReducer} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalendar,faMessage, faUser, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import listIcon from './listIcon.svg';
import newIcon from './addnew.svg';
import { Header } from "./Header";
import { Datacard } from "./Datacard";
import { Modalform } from "./Modalform";


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

const FILTER_MAP = {//Object to filter todos
    All: () => true,
    Incomplete: (todo) => !todo.status,
    Complete: (todo) => todo.status,
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
        case 'delete-task':
            const copy = [...state].filter((todo,index) => index !== action.payload.id);
            window.localStorage.setItem('initialTodos',JSON.stringify(copy));
            return state.filter((todo,index) => index !== action.payload.id);
        case 'edit-task':
            window.localStorage.setItem('initialTodos',JSON.stringify(action.payload));
            return [...action.payload];
        case 'toggle-check':
            const toggledArr = state.map((todo,index) =>  action.payload.id === index 
                ? {
                    ...todo,
                    status: !todo.status
                } 
                : { ...todo }
            )
            window.localStorage.setItem('initialTodos',JSON.stringify(toggledArr));
            return toggledArr;
        default:
            return state;
    }
}

const Homepage = () => {
    const [modal, setModal] = useState({type: null, display: false});
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDate, setTaskDate] = useState(todayIs);
    const [taskTime, setTaskTime] = useState(timeIs);
    const [taskTimeEnd, setTaskTimeEnd] = useState(timeIs);
    const [taskStatus, setTaskStatus] = useState('Incomplete');
    const [filter, setFilter] = useState('All');
    const [todos, dispatch] = useReducer(reducer, initialTodos());

    const modalProps = {
        taskTitle,
        setTaskTitle,
        taskDate,
        setTaskDate,
        taskTime,
        setTaskTime,
        taskTimeEnd,
        setTaskTimeEnd,
        taskStatus,
        setTaskStatus,
        dispatch,
        modal,
        setModal,
        todos,
    }

    function handleDelete(e, index) {
        e.preventDefault();
        dispatch({
            type: 'delete-task',
            payload: {
                id: index
            }
        })
    }

    function handleEdit(e, todo, index) {
        e.preventDefault();
        setModal({type: 'edit-task', display: true, id: index});
        setTaskTitle(todo.title);
    }
    
    return (
        <>
            <Header />
            <main>
                <Datacard setModal={setModal} todos={todos} />
                {modal.type && <Modalform {...modalProps} />}
                <section className='tasks'>
                    <div className='info'>
                        <h3 className='title'>My Tasks</h3>
                        <span className='aside'>
                            <label htmlFor="sort-todo">Filter:   </label>
                            <select className='sort-todo' onChange={(e) => {setFilter(e.target.value)}}>
                                <option value="All">All</option>
                                <option value="Complete">Complete</option>
                                <option value="Incomplete">Incomplete</option>
                            </select>
                        </span>
                    </div>
                    <div className='container'>
                        <ul className='task-list'>
                            {todos.length ? todos.filter(FILTER_MAP[filter]).map((todo,index) => {
                                return (
                                <li key={index} id={index}>
                                    <input type="checkbox" name="toggle-check" onChange={() => dispatch({type: 'toggle-check', payload:{id: index}})} checked={todo.status}/>
                                    <div className='task-icon'>
                                        <img src={listIcon} alt='listIcon' width='30px' />
                                    </div>
                                    <div>
                                        <h4 style={{fontWeight: 500}}>{todo.title}</h4>
                                        <span>{todo.time} - {todo.endtime}</span>
                                    </div>
                                    <div className="ic" onClick={(e) => {handleDelete(e, index)}}>
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </div>
                                    <div className="ic" onClick={(e) => {handleEdit(e, todo, index)}}>
                                        <FontAwesomeIcon icon={faEdit}/>
                                    </div>
                                </li>
                            )}) :
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
            <footer>
                <div>
                <FontAwesomeIcon icon={faHome} style={{height: '15px', color: '#3586eb'}} />
                </div>
                <div>
                <FontAwesomeIcon icon={faCalendar} style={{height: '15px', color: '#8F8F8F'}} />
                </div>
                <div>
                    <div className='add-task' onClick={() => setModal({type: 'new-task', display: true,})}>
                        <img src={newIcon} alt='listIcon' width='30px' />
                    </div>
                </div>
                <div>
                    <FontAwesomeIcon icon={faMessage} style={{height: '15px', color: '#8F8F8F'}} />
                </div>
                <div>
                    <FontAwesomeIcon icon={faUser} style={{height: '15px', color: '#8F8F8F'}} />
                </div>
            </footer>
        </>
    )
}

export default Homepage;