import FIXMELogo from '../../public/activity.webp'
import { ActivityBasic } from './activityBasic';
import { ActivityLecture } from './activityLecture';

export function Activity({activity}) {
    switch (activity.type) {
        case 'activities':
          return(<ActivityBasic activity={activity}></ActivityBasic>)
        case 'lecture':
            return(<ActivityLecture activity={activity}></ActivityLecture>)
        default:
          return(<p>FIXME</p>)
    }
}
