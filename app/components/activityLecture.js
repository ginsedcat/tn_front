import FIXMELogo from '../../public/activity.webp'
import { ActivityFooter } from './activityFooter';

export function ActivityLecture({activity}) {
    console.log(FIXMELogo)
    return (
        <div className='activity'>
            <div className='activity-item'><h1>{activity['activity']}</h1></div>
            <div className='activity-row'>
                <div className='activity-item'>
                    <img className='image' src={FIXMELogo['src']} alt='FIXME'></img>
                    <div>
                        <h2>{activity['lecturer']}</h2>
                        <p>{activity['lecturer_desc']}</p>
                    </div>
                </div>
                <div className='activity-item'>
                    <img className='image' src={FIXMELogo['src']} alt='FIXME'></img>
                    <p>{activity['activity_desc']}</p>
                </div>
            </div>
            <ActivityFooter activity={activity}></ActivityFooter>
        </div>
    );
}
