import React, { useState, useEffect } from 'react';

import { SideClick, SideTitle } from './utilComponents'
import { createTimeArrayWithSpacing, minsToTime, timeToMins } from './utilFunctions'

export function TimeLine({ timesSelectedDict, startTime, endTime, refDict, setClicks, setItemSelected }) {
    const startMins = timeToMins(startTime)
    const endMins = timeToMins(endTime)
    const times = createTimeArrayWithSpacing(startMins, endMins, 60)
    return <div className='small-time-line'>
        <SideTitle className={'header-lvl1'}>Pasirinktos veiklos</SideTitle>
        <div className='small-time-line-timeline'>
            <div className='small-time-line-timeline-content'>
                {Object.entries(timesSelectedDict).map(([key, value]) => {
                    const handleClick = () => {
                        if (setClicks) setClicks((prev) => ({
                            'key': value.item.key,
                            'keyTime': key,
                            'counter': prev.counter + 1
                        }))
                        refDict.current[value.item.key].scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        setItemSelected(value.item.key, null, null, key)
                    }
                    return <div onClick={handleClick} className='big-time-line-timeline-time-box' style={{
                        position: 'absolute',
                        left: `${value.x0 * 100}%`,
                        top: `${value.y0 * 100}%`,
                        width: `${(value.x1 - value.x0) * 100}%`,
                        height: `${(value.y1 - value.y0) * 100}%`
                    }}  key={key}>
                        <div>{`${value.time.from}-${value.time.to}`}</div>
                        <div>{`${value.item.name}`}</div>
                        <div>{value.value}</div>
                    </div>
                })}
            </div>
        </div>
    </div>
}

export function SmallTimeLine({ timesSelectedDict, startTime, endTime }) {
    const startMins = timeToMins(startTime)
    const endMins = timeToMins(endTime)
    const times = createTimeArrayWithSpacing(startMins, endMins, 60)
    return <div className='small-time-line'>
        <SideClick/>
        <div className='small-time-line-timeline'>
            <div className='small-time-line-timeline-content'>
                {times.map((time) => {
                    return <div className='small-time-line-timeline-time-label' style={{height:`${100*time.height}%`}} key={time.key}>{time.time}</div>
                })}
                {Object.entries(timesSelectedDict).map(([key, value]) => {
                    return <div className='small-time-line-timeline-time-box' style={{
                        position: 'absolute',
                        left: `0`,
                        top: `${value.y0 * 100}%`,
                        width: '100%',
                        height: `${(value.y1 - value.y0) * 100}%`
                    }}  key={key}></div>
                })}
            </div>
        </div>
    </div>
}
