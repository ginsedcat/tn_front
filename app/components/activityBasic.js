import FIXMELogo from '../../public/activity.webp'
import { ActivityFooter } from './activityFooter';

export function ActivityBasic({activity}) {
    //console.log(FIXMELogo)
    return (
        <div className='activity' id={activity['key']}>
            <div className='activity-item'><h1>{activity['activity']}</h1></div>
            <div className='activity-item'>
                <img className='image' src={FIXMELogo['src']} alt='FIXME'></img>
                <p>{activity['activity_desc']}</p>
            </div>
            <ActivityFooter activity={activity}></ActivityFooter>
        </div>
    );
}
