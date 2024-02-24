import { ContainerDefault, HeaderLvl1, SelectDefault, InputDefault, ButtonDefault } from './userForm'
import React, { useState, useEffect } from 'react';
import FIXMELogo from '../../public/activity.webp'

export function ItemList({
    itemClassName,
    itemsKeys,
    itemsDict,
    refsDict,
    participantCount,
    itemsSelected,
    setItemSelected
}) {
    return <>
            {itemsKeys.map((key) => {
                return <Item
                    className={itemClassName}
                    key={key.key}
                    item={itemsDict[key.key]}
                    // itemRef={refsDict[key.key]}
                    itemRef={(element) => refsDict.current[key.key] = element}
                    participantCount={participantCount}
                    itemSelected={itemsSelected[key.key]}
                    setItemSelected={setItemSelected}
                />
            })}
    </>
}

function Item({ className, item, itemRef, participantCount, itemSelected, setItemSelected }) {
    return <ContainerDefault className={`${className} flex-col`} itemRef={itemRef}> 
        {item.type === 'title' && <ItemTitle item={item}/>}
        {item.type === 'lecture' && <ItemLecture item={item}/>}
        {item.type === 'activities' && <ItemActivities item={item}/>}
        {['lecture', 'activities'].includes(item.type) &&
            <ItemFooter item={item} participantCount={participantCount} itemSelected={itemSelected} setItemSelected={setItemSelected}/>
        }
    </ContainerDefault>
}

function ItemTitle({ item }) {
    return <HeaderLvl1>{item.name}</HeaderLvl1>
}

function ItemLecture({ item }) {
    return <>
        <div className='flex-row'>
            <HeaderLvl1>{item.name}</HeaderLvl1>
            {item.recommended_age && <div className='label'>{item.recommended_age}</div>}
        </div>
        <div className='flex-col'>
            <ItemBase title={item.lecturer} description={item.lecturer_desc} img={FIXMELogo['src']}/>
            <ItemBase description={item.activity_desc} img={FIXMELogo['src']}/>
        </div>
    </>
}

function ItemActivities({ item }) {
    return <>
        <div className='flex-row'>
            <HeaderLvl1>{item.name}</HeaderLvl1>
            {item.recommended_age && <div className='label'>{item.recommended_age}</div>}
        </div>
        <ItemBase description={item.activity_desc} img={FIXMELogo['src']}/>
    </>
}

function ItemBase({ title=null, description=null, img=null}) {
    return <div className='item-base'>
        <div className='wrap'>
            {img && <div className="image"><img src={img}></img></div>}
            {description && <div className="text">
                {title && <h2 className='header-lvl-2'>{title}</h2>}
                <p>{description}</p>
            </div>}
        </div>
    </div>
}

function ItemFooter({ item, participantCount, itemSelected, setItemSelected }) {
    // FIXME: PROOPER FIELD LOAD
    const [index, setIndex] = useState(0)
    const time = item.times[index];
    const [participantsNum, setParticipantsNum] = useState(participantCount)
    useEffect(() => {
        if(itemSelected && itemSelected.times[time.key]) return
        setParticipantsNum(participantCount)
    }, [participantCount]);
    useEffect(() => {
        if(!itemSelected) return
        setParticipantsNum(itemSelected.times[itemSelected.active])
        setIndex(item.times.findIndex(item => item.key === itemSelected.active))
    }, [itemSelected]);
    const handleSelect = (event) => {
        setIndex(event.target.value)
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setParticipantsNum(value)
    };
    const handleSubmit = (e) => {
        setItemSelected(item.key, time.key, participantsNum)
    };
    const handleDelete = (e) => {
        setItemSelected(item.key, time.key, null)
    }
    const isActiveNow = itemSelected && itemSelected.times && Object.keys(itemSelected.times).includes(time.key) ? true : false
    return <div className='item-footer'>
        <div className='label'>{time.location}</div>
        <div className='flex-row'>
            <div><SelectDefault label='Pasirinkite laiką' options={item.times} onChange={handleSelect} value={index}/></div>
            <div><InputDefault label={`Kiek dalyvių registruojate? (Liko ${time.free_participants} vietų)`} value={participantsNum} onChange={handleChange}/></div>
            <div><ButtonDefault
                className={`${isActiveNow ? 'selected' : ''}`}
                label={isActiveNow ? 'Modifikuoti veiklą' : 'Pridėti veiklą'}
                onClick={handleSubmit}
            ></ButtonDefault></div>
            {
                isActiveNow && <div><ButtonDefault
                    className={`delete`}
                    label='Pašalinti veiklą'
                    onClick={handleDelete}
                ></ButtonDefault></div>
            }
        </div>
    </div>
}