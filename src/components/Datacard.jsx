import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export const Datacard = ({ setModal, todos }) => {
    const plusIcon = <FontAwesomeIcon icon={faPlus} />
    const completedTodos = todos.filter((todo) => todo.status)
    const progress = Math.floor(completedTodos.length / todos.length * 100) //Percentage progress
    return (
        <section className='data-card-sect'>
            <div className='data-card'>
                <div className='flash-display'></div>
                <h4 className='title'>Your Project Summary</h4>
                <span className='summary'>{todos.length} Tasks</span>
                <div className='card-methods'>
                    <div className='progress-bar'>
                        <span className='title'>Progress</span>
                        <span className='summary'>{isNaN(progress) ? '0' : progress}% complete</span>
                        <progress id="file" value={progress} max="100"> </progress>
                    </div>
                    <div className='add-task' onClick={() => setModal({type: 'new-task', display: true,})}>{plusIcon}</div>
                </div>
                
            </div>
        </section>
    )
}