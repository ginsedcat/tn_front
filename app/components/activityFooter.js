import React, { useState, useContext } from 'react';
import { SelectedActivitiesContext } from '../context/selectedActivitiesContextProvider';

export function ActivityFooter({activity}) {
    const { selectedActivities, setSelectedActivities, addSelectedActivity } = useContext(SelectedActivitiesContext);

    const time = activity['times'][0]

    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectedTime = activity['times'][selectedIndex]

    const handleDropdownChange = (event) => {
        const newIndex = event.target.value;
        setSelectedIndex(newIndex)
    };

    const handleAddActivity = (event) => {
        console.log(selectedTime)
        addSelectedActivity(
            {
                ...selectedTime
            }    
        );
    };

    return (
        <div className='activity-item'>
            <div className='activity-footer-item'>
                <p>Kokiam laikui registruojates?
                    <select value={selectedIndex} onChange={handleDropdownChange}>
                        {activity['times'].map((option, index) => (
                        <option value={index} key={index}>
                            {option['from']}-{option['to']} ({option['free_participants']})
                        </option>
                        ))}
                    </select>
                </p>
            </div>
            <div className='activity-footer-item'>
                <p>Liko {selectedTime['free_participants']} vietų (iš {selectedTime['total_participants']})</p>
            </div>
            <div className='activity-footer-item'>
                <button onClick={handleAddActivity}>Pridėti prie registracijos</button>
            </div>
        </div>
    );
}
