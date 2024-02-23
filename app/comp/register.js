import React, { useState, useEffect, useRef } from 'react';
// import { Items } from "./items"
// import { TimeLine } from "./timeLine"
import { UserForm, ItemList, Menu, TimeLine, ContainerDefault, StickyDefault } from './userForm'

import data from '../../misc/data.json'

export function Register() {
    // const items = data['items'];
    // const refs = []
    // addRefs(items, refs)
    // const [topItem, setTopItem] = useState(null);
    // useEffect(() => {
    //     const handleScroll = () => {
    //         let top_key = null
    //         let top_val = null
    //         refs.forEach((ref) => {
    //             if (ref.ref.current) {
    //                 const pos = ref.ref.current.offsetTop - window.scrollY;
    //                 if (pos > -10 && (top_val === null || pos < top_val)) {
    //                     top_key = ref.key;
    //                     top_val = pos;
    //                 }
    //             }
    //         });
    //         setTopItem(top_key);
    //     };
    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, [refs])

    // const [selectedItems, setSelectedItems] = useState({});
    // const addSelectedItem = function(key, item, value, parent) {
    //     setSelectedItems({
    //         ...selectedItems,
    //         [key]: {
    //             'key': key,
    //             'item': item,
    //             'value': value,
    //             'parent': parent
    //         }
    //     })
    // }

    // const modSelectedItem = function(key, item, value, parent) {
    //     addSelectedItem(key, item, value, parent)
    // }

    const itemsDict = {...data['all_items'], 'contactinfo': {'name': 'Kontaktinė Informacija'}}
    const [formInfo, setFormInfo] = useState({participantCount: ''})
    const itemsOrder = xxxyyy(data['items'])
    const refDict =  Object.keys(itemsDict).reduce((acc, current) => {
        acc[current] = useRef()
        return acc
    }, {})
    const [itemsSelected, setItemsSelected] = useState({})
    const setItemSelected = function(key, timeKey, value) {
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
    }
    // return (
    //     <div>
    //         <div className="palceholder"></div>
    //         <div className="register">
    //             <Menu itemsKeys={[{'key': 'contactinfo', 'level': 0}, ...itemsOrder]} itemsDict={itemsDict} refsDict={refDict}/>
    //             {/* <Items className={"menu-main"} items={items} items_dict={data['all_items']} type='menu' topItem={topItem} isSticky={true}></Items> */}
    //             <div>
    //                 <ItemList itemsDict={itemsDict} itemsKeys={itemsOrder} refsDict={refDict} participantCount={formInfo.participantCount} itemsSelected={itemsSelected} setItemSelected={setItemSelected}>
    //                     <UserForm itemRef={refDict['contactinfo']} setFormInfo={setFormInfo}/>
    //                 </ItemList>
    //                 {/* <Items className={"main-main"} items={items} items_dict={data['all_items']} type='items' modSelectedItem={modSelectedItem}></Items> */}
    //             </div>
    //             <TimeLine itemsDict={itemsDict} refsDict={refDict} itemsSelected={itemsSelected} setItemSelected={setItemSelected}/>
    //             {/* <TimeLine items={selectedItems} items_dict={data['all_items']}></TimeLine> */}
    //         </div>
    //         <div className="palceholder"></div>
    //     </div>
    // );
    return (
        <div>
            <ContainerDefault className='height500'></ContainerDefault>
            <div className='container-row'>
                <StickyDefault><Menu itemsKeys={[{'key': 'contactinfo', 'level': 0}, ...itemsOrder]} itemsDict={itemsDict} refsDict={refDict}/></StickyDefault>
                <ContainerDefault>
                    <ItemList itemsDict={itemsDict} itemsKeys={itemsOrder} refsDict={refDict} participantCount={formInfo.participantCount} itemsSelected={itemsSelected} setItemSelected={setItemSelected}>
                        <UserForm itemRef={refDict['contactinfo']} setFormInfo={setFormInfo}/>
                    </ItemList>
                </ContainerDefault>
                <StickyDefault><TimeLine itemsDict={itemsDict} refsDict={refDict} itemsSelected={itemsSelected} setItemSelected={setItemSelected}/></StickyDefault>
            </div>
            <ContainerDefault className='height500'></ContainerDefault>
            <ContainerDefault className='height500'></ContainerDefault>
            <ContainerDefault className='height500'></ContainerDefault>
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

function addRefs(items, refs) {
    items.map((item) => {
        item.ref = useRef()
        refs.push({'ref': item.ref, 'key': item.key})
        if(item.items) addRefs(item.items, refs)
    })
    return(refs)
}