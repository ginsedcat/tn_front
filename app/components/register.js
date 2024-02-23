import { Activities } from './activities';
import { Timeline } from './timeline';
import { Menu } from './menu';
import { SelectedActivitiesProvider } from '../context/selectedActivitiesContextProvider'; 

export function Register({activities, activitiesTypes}) {
    return (
        <SelectedActivitiesProvider>
            <div className='register'>
                <Menu activities={activities} activitiesTypes={activitiesTypes}></Menu>
                <Activities activities={activities} activitiesTypes={activitiesTypes}></Activities>
                <Timeline></Timeline>
            </div>
        </SelectedActivitiesProvider>
    );
}


