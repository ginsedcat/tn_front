import React, { useState, useEffect } from 'react';

import { Input, Select, Button } from './utilComponents'
import { dict2Array } from './utilFunctions'

export function Item({ item, refDict, participantCount, setCurrentInput, currentInput }) {
    const [participants, setParticipant] = useState(participantCount)
    const onInput = (e) => {
        const { name, value } = e.target;
        setParticipant(value)
    }
    const [time, setTime] = useState(item.times.dict[item.times.array[0]])
    useEffect(()=> {
        if (!(currentInput && currentInput.times[time.key])) {
            setParticipant(participantCount)
        }
    }, [participantCount])
    useEffect(() => {
        if(currentInput && currentInput.times[time.key]) {
            setParticipant(currentInput.times[time.key])
        }
    }, [time])
    const onSelect = (e) => {
        setTime(item.times.dict[e.target.value])
    }
    const onClick = (e) => {
        setCurrentInput(item.key, time.key, participants)
    }
    return <div ref={(element) => refDict.current[item.key] = element} className='flex-col item'>
        <div className='header-lvl1'>{ item.name }</div>
        { item.type !== 'title' && <div className='flex-row activities'>
            <div className='activity'>{item.activity_desc}</div>
            { item.type === 'lecture' && <div className='flex-col activity'>
                <div className='header-lvl2'>{item.lecturer}</div>
                <div>{item.lecturer_desc}</div>
            </div>}
        </div>}
        { item.type !== 'title' && <div className='flex-col footer activity'>
            <div>{time.location}</div>
            <div className='flex-row footer-input'>
                {item.times.array.length > 1 && <Select label='Pasirinkite laiką' onChange={onSelect} value={time.key} options={dict2Array(item.times.dict, item.times.array)}/>}
                {item.times.array.length == 1 && <div className="flex-col select">{`Laikas: ${time.from}-${time.to}`}</div>}
                <Input label={`Kiek dalyvių registruojate? (Liko ${time.free_participants} vietų)`} onChange={onInput} value={participants}/>
                <Button label={'Pridėti veiklą'} onClick={onClick}/>
            </div>
        </div>}
    </div>;
}