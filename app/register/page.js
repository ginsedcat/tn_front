"use client";

import React, { useState, useRef, useEffect } from 'react';

import { getItemDictionary, getItemArray, setItemSelectedFunc } from './utilFunctions'
import { Item } from './item'
import { UserForm } from './userForm'
import { Menu } from './menu'
import { SideBar, SideClick } from './utilComponents'

export default function Home () {
    const refDict = useRef({})
    const [itemsDict, setItemsDict] = useState({});
    const [itemsArray, setItemsArray] = useState([]);
    const [formInfoDict, setFormInfoDict] = useState({participantCount: 0})
    const [itemsSelectedDict, setItemsSelectedDict] = useState({})
    const setItemSelected = setItemSelectedFunc(setItemsSelectedDict)
    useEffect(() => {
        setItemsDict(getItemDictionary())
        setItemsArray(getItemArray())
    }, [])
    return <div className="flex-row register">
        
            <SideBar
                toggleAbsolute={true}
                toggle={<SideClick/>}
            >
                <Menu itemsDict={{...itemsDict, 'user-form': {'key': 'user-form', 'name': 'Kontaktinė Informacija'}}} itemsArray={[{'key': 'user-form', 'level': 0}, ...itemsArray]} refDict={refDict}/>
            </SideBar>
        <div className="flex-col items">
            <UserForm setFormInfoDict={setFormInfoDict} refDict={refDict}/>
            {
                itemsArray.map((key) => {
                    const item = itemsDict[key.key]
                    return <Item key={item.key} item={item} refDict={refDict} participantCount={formInfoDict.participantCount}/>
                })
            }
        </div>
            <SideBar
                left={false}
                toggle={<SideClick/>}
            >
                <Menu itemsDict={{...itemsDict, 'user-form': {'key': 'user-form', 'name': 'Kontaktinė Informacija'}}} itemsArray={[{'key': 'user-form', 'level': 0}, ...itemsArray]} refDict={refDict}/>
            </SideBar>
    </div>
}