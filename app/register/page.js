"use client";

import React, { useState, useRef, useEffect } from 'react';

import { getItemDictionary, getItemArray, setItemSelectedFunc, itemsSelectedDictToTimesSelectedDict } from './utilFunctions'
import { Item } from './item'
import { UserForm } from './userForm'
import { Menu } from './menu'
import { SideBar, SideClick } from './utilComponents'
import { SmallTimeLine, TimeLine } from './timeLine'

export default function Home () {
    const startTime = '08:00'
    const endTime = '17:00'
    const refDict = useRef({})
    const [itemsDict, setItemsDict] = useState({});
    const [itemsArray, setItemsArray] = useState([]);
    const [formInfoDict, setFormInfoDict] = useState({participantCount: 0})
    const [itemsSelectedDict, setItemsSelectedDict] = useState({})
    const [timesSelectedDict, setTimesSelectedDict] = useState({})
    const setItemSelected = setItemSelectedFunc(setItemsSelectedDict)
    const [clicks, setClicks] = useState({key: null, counter: 0});
    useEffect(() => {
        setItemsDict(getItemDictionary())
        setItemsArray(getItemArray())
    }, [])
    useEffect(() => {
        setTimesSelectedDict(itemsSelectedDictToTimesSelectedDict(itemsSelectedDict, itemsDict, startTime, endTime))
    }, [itemsSelectedDict])
    useEffect(() => {
        if(clicks.keyTime) {

        }
    }, [clicks])
    return <div className="flex-row register">
        
            <SideBar toggleAbsolute={true} closeTrigger={clicks}>
                <SideClick/>
                <Menu itemsDict={{...itemsDict, 'user-form': {'key': 'user-form', 'name': 'Kontaktinė Informacija'}}} itemsArray={[{'key': 'user-form', 'level': 0}, ...itemsArray]} refDict={refDict} setClicks={setClicks}/>
            </SideBar>
        <div className="flex-col items">
            <UserForm setFormInfoDict={setFormInfoDict} refDict={refDict}/>
            {
                itemsArray.map((key) => {
                    const item = itemsDict[key.key]
                    return <Item key={item.key} item={item} refDict={refDict} participantCount={formInfoDict.participantCount} setCurrentInput={setItemSelected} currentInput={itemsSelectedDict[item.key]}/>
                })
            }
        </div>
            <SideBar left={false} closeTrigger={clicks}>
                <SmallTimeLine timesSelectedDict={timesSelectedDict} startTime={startTime} endTime={endTime}/>
                <TimeLine timesSelectedDict={timesSelectedDict} startTime={startTime} endTime={endTime} refDict={refDict} setClicks={setClicks} setItemSelected={setItemSelected}/>
            </SideBar>
    </div>
}