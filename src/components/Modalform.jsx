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
                <label htmlFor='add-task'>Task Title</label>
                <input type='text' name='add-task' id='add-task' value={task} onChange={(e) => setTask(e.target.value)} />
                <label htmlFor='status'>Task Status</label>
                <select name='status' id='status'>
                    <option value='Incomplete'>Incomplete</option>
                    <option value='Complete'>Complete</option>
                </select>
                <button type='submit' className='submit-modal'>Submit</button>
            </form>
        </section>
    )
}