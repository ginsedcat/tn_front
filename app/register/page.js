"use client";

import React, { useState, useRef, useEffect } from 'react';

import StickyBox from "react-sticky-box";

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
        <StickyBox offsetTop={20} offsetBottom={20}>
            <SideBar
                toggleAbsolute={true}
                toggle={<SideClick/>}
            >
                <Menu itemsDict={{...itemsDict, 'user-form': {'key': 'user-form', 'name': 'Kontaktinė Informacija'}}} itemsArray={[{'key': 'user-form', 'level': 0}, ...itemsArray]} refDict={refDict}/>
            </SideBar>
        </StickyBox>
        <div className="flex-col items">
            <UserForm setFormInfoDict={setFormInfoDict} refDict={refDict}/>
            {
                itemsArray.map((key) => {
                    const item = itemsDict[key.key]
                    return <Item key={item.key} item={item} refDict={refDict} participantCount={formInfoDict.participantCount}/>
                })
            }
        </div>
        <StickyBox offsetTop={20} offsetBottom={20}>
            <SideBar
                left={false}
                toggle={<div>dssdfdfddfsdsdsd</div>}
            >
                <Menu itemsDict={{...itemsDict, 'user-form': {'key': 'user-form', 'name': 'Kontaktinė Informacija'}}} itemsArray={[{'key': 'user-form', 'level': 0}, ...itemsArray]} refDict={refDict}/>
            </SideBar>
        </StickyBox>
    </div>
}