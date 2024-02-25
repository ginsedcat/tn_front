import React, { useState, useRef } from 'react';
import { UserForm, TimeLine, ContainerDefault, StickyDefault } from './userForm'
import { ItemList } from './itemList'
import { Menu } from './menu'

import data from '../../misc/data.json'
import { SideWidget, GetResponsiveComponent} from '../aaa/main'

export function Register() {
    const itemsDict = {...data['all_items'], 'contactinfo': {'name': 'Kontaktinė Informacija', 'key': 'contactinfo'}}
    const [formInfo, setFormInfo] = useState({participantCount: ''})
    const itemsOrder = xxxyyy(data['items'])

    // const refDict =  Object.keys(itemsDict).reduce((acc, current) => {
    //     acc[current] = useRef()
    //     return acc
    // }, {})

    const refDict = useRef({})

    const [itemsSelected, setItemsSelected] = useState({})
    const setItemSelected = function(key, timeKey, value) {
        if (value) {
            setItemsSelected(prevItems => ({
                ...prevItems,
                [key]: {
                    'key': key,
                    'active': timeKey,
                    'times': {
                        ...(prevItems[key] ? prevItems[key].times : {}),
                        [timeKey]: value
                    }
                }
            }))
        } else {
            // console.log("sddsdsds")
            setItemsSelected(prevItems => {
                const newItems = { ...prevItems }
                if (newItems[key] && newItems[key].times[timeKey]) {
                    delete newItems[key].times[timeKey]
                    if (Object.keys(newItems[key].times).length == 0) {
                        delete newItems[key]
                    }
                }
                return newItems
                
                // const newItems = { ...prevItems };
                // if (newItems[key] && newItems[key].times[timeKey]) {
                //     delete newItems[key].times[timeKey];
                //     if (Object.keys(newItems[key].times).length === 0) {
                //         delete newItems[key];
                //     }
                // }
                // return newItems;
            });
        }
    }

    const menu = <Menu
        itemClassName='container-b'
        itemsKeys={[{'key': 'contactinfo', 'level': 0}, ...itemsOrder]}
        itemsDict={itemsDict}
        refsDict={refDict}
    />

    return (
        <div className='register-container'>
            {GetResponsiveComponent(
                <div className='menu-container'><StickyDefault className='container-a'>{menu}</StickyDefault></div>,
                <SideWidget>{menu}</SideWidget>
            )}
            <div className='items-container'>
                <UserForm
                        className='container-a container-c'
                        //itemRef={refDict['contactinfo']}
                        itemRef={(element) => refDict.current['contactinfo'] = element}
                        setFormInfo={setFormInfo}
                />
                <ItemList
                    itemClassName='container-a container-c'
                    itemsDict={itemsDict}
                    itemsKeys={itemsOrder}
                    refsDict={refDict}
                    participantCount={formInfo.participantCount}
                    itemsSelected={itemsSelected}
                    setItemSelected={setItemSelected}
                />
            </div>
            <div className='timeline-container'>
                <StickyDefault className='container-a container-c container-d'><TimeLine
                        itemClassName='container-e'
                        itemsDict={itemsDict}
                        refsDict={refDict}
                        itemsSelected={itemsSelected}
                        setItemSelected={setItemSelected}
                    /></StickyDefault>
            </div>
        </div>
    );
}

function xxxyyy(items, level = 0) {
    if (!items) return []
    let res = [];
    items.forEach((item) => {
        res.push({
            'key': item.key,
            'level': level
        })
        res.push(...xxxyyy(item.items, level + 1))
    });
    return res
}