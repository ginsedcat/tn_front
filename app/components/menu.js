import StickyBox from "react-sticky-box";

export function Menu({activities, activitiesTypes}) {
    return (
        <StickyBox className='timeline' offsetTop={20} offsetBottom={20}>
            {activitiesTypes['activities'].map((key, index) => {
                const activity = activities[key]
                return(
                    <div key={activity.key}>
                        <a href={'#' + activity.key}>{activity.activity}</a>
                    </div>
                )
            })}
            {activitiesTypes['lectures'].map((key, index) => {
                const activity = activities[key]
                return(
                    <div key={activity.key}>
                        <a href={'#' + activity.key}>{activity.activity}</a>
                    </div>
                )
            })}
        </StickyBox>
    );
}