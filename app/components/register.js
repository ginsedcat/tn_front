import { Activities } from './activities';
import { Timeline } from './timeline';
import React, { useState } from 'react';

export function Register({activities, activitiesTypes}) {
    const [selectedActivities, setSelectedActivities] = useState([]);

    const handleDropdownChange = (event) => {
        const newIndex = event.target.value;
        setSelectedIndex(newIndex);
    };

    return (
        <div className='register'>
            <Activities activities={activities} activitiesTypes={activitiesTypes}></Activities>
            <Timeline></Timeline>
        </div>
    );
}
