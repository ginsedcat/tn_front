import React, { useState } from 'react';

export function ActivityFooter({activity}) {
    const time = activity['times'][0]

    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectedTime = activity['times'][selectedIndex]

    const handleDropdownChange = (event) => {
        const newIndex = event.target.value;
        setSelectedIndex(newIndex);
    };

    return (
        <div className='activity-item'>
            <div className='activity-footer-item'>
                <p>Kokiam laikui registruojates?
                    <select value={selectedIndex} onChange={handleDropdownChange}>
                        {activity['times'].map((option, index) => (
                        <option key={index} value={index}>
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
                <button>Pridėti prie registracijos</button>
            </div>
        </div>
    );
}
