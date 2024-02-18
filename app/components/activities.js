import { Activity } from './activity';

export function Activities({activities, activitiesTypes}) {
    return (
        <div className='activities'>
            {
                Object.entries(activities).map(([key, value]) => (
                    <Activity activity={value} key={key}></Activity>
                ))
            }
        </div>
    );
}