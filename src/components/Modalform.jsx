import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

export const Modalform = ({ setModal, task, setTask, dispatch }) => {
    function handleSubmit(e) {
        e.preventDefault();
        dispatch({
            type: 'add-task',
            payload: {
                name: task,
                status: 'Incomplete'
            }
        });
        setModal(false);
        setTask('');
    }
    const closeWindow = <FontAwesomeIcon icon={faWindowClose} />
    return (
        <section className='modal-form'>
            <div className='close-modal' onClick={() => setModal(false)}>
                <span>{closeWindow}</span>
            </div>
            <h4 className='title'>Add New Task</h4>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor='add-task'>Task Title
                    <input type='text' name='add-task' id='add-task' value={task} onChange={(e) => setTask(e.target.value)} />
                </label>
                <label htmlFor='task-date'>Task Date
                    <input type='date' name='task-date' id='task-date' />
                </label>
                <label htmlFor='task-date'>Task Date
                    <input type='time' name='task-time' id='task-time' />
                </label>
                <label htmlFor='status'>Task Status
                    <select name='status' id='status'>
                        <option value='Incomplete'>Incomplete</option>
                        <option value='Complete'>Complete</option>
                    </select>
                </label>
                <button type='submit' className='submit-modal'>Submit</button>
            </form>
        </section>
    )
}