import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export const Datacard = ({ setModal }) => {
    const plusIcon = <FontAwesomeIcon icon={faPlus} />
    return (
        <section className='data-card-sect'>
            <div className='data-card'>
                <div className='flash-display'></div>
                <h4 className='title'>Today's Project Summary</h4>
                <span className='summary'>15 Tasks</span>
                <div className='progress-bar'>
                    <span className='title'>Progress</span>
                    <span className='summary'>14%</span>
                    <progress id="file" value="32" max="100"> 32% </progress>
                </div>
                <div className='add-task' onClick={() => setModal(true)}>{plusIcon}</div>
            </div>
        </section>
    )
}