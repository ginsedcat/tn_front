import React, { useContext } from 'react';
import { SelectedActivitiesContext } from '../context/selectedActivitiesContextProvider';
import StickyBox from "react-sticky-box";

export function Timeline() {
    const { selectedActivities, setSelectedActivities, addSelectedActivity } = useContext(SelectedActivitiesContext);
    return (
        <StickyBox className='timeline' offsetTop={20} offsetBottom={20}>
            {
                Object.entries(selectedActivities).map(([key, value]) => (
                    <p>{key} {value['from']}-{value['to']}</p>
                ))
            }
        </StickyBox>
    );
}