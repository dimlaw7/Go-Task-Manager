import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

export const Modalform = ({ modal, setModal, taskTitle, setTaskTitle, taskDate, setTaskDate, taskTime, setTaskTime, taskTimeEnd, setTaskTimeEnd, taskStatus, setTaskStatus, dispatch, todos}) => {
    const closeWindow = <FontAwesomeIcon icon={faWindowClose} />
    function resetStates() {
        setModal(false)
        setTaskTitle('')
        setTaskStatus('Incomplete')
    }
    function handleSubmit(e, modalId) {
        e.preventDefault();
        if (!modalId && modalId !== 0) {//todo id is undefined & !0, then it is new task
            const getTodos = window.localStorage.getItem('initialTodos');
            if (getTodos) {
                const initialTodos = JSON.parse(getTodos);
                initialTodos.push({
                    title: taskTitle,
                    date: taskDate,
                    time: taskTime,
                    endtime: taskTimeEnd,
                    status: taskStatus=== 'Incomplete' ? false : true,
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
                    status: taskStatus=== 'Incomplete' ? false : true,
                }
            });
            resetStates();
        }
        else {//Else It is edit task
            const updatedTodo = todos.map((todo,index) => {
                return modalId === index ? {
                        title: taskTitle,
                        date: taskDate,
                        time: taskTime,
                        endtime: taskTimeEnd,
                        status: taskStatus=== 'Incomplete' ? false : true,
                    }
                    : { ...todo }
            })
            dispatch({
                type: 'edit-task',
                payload: updatedTodo,
            });
            resetStates();
        }
    }
    return (
        <section className='modal-form'>
            <div className='close-modal' onClick={() => setModal(false)}>
                <span>{closeWindow}</span>
            </div>
            <h4 className='title'>{modal.type==='new-task' ? 'Add New Task' : 'Update Task'}</h4>
            <form onSubmit={(e) => handleSubmit(e, modal.id)}>
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