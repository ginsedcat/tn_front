import React, { useState, useRef, useEffect } from 'react';
import StickyBox from "react-sticky-box";

export function Input({ label, onChange, name, value }) {
    return <div className="flex-col input">
        <div>{label}</div>
        <input name={name} onChange={onChange} value={value}/>
    </div>
}

export function Select({label, onChange, name, value, options=[]}) {
    return <div className="flex-col select">
        <div>{label}</div>
        <select value={value} name={name} onChange={onChange}>{
            options.map((option) => {
                return <option value={option.key} key={option.key}>
                    {option.from}-{option.to} ({option.free_participants})
                </option>
            })
        }</select>
    </div>
}

export function Button({label, onClick, className}) {
    return <div className={`${className} button`}>
        <div onClick={onClick}>{label}</div>
    </div>
}

export function SideBar({ children, left = true, toggleAbsolute = false, closeTrigger = null }) {
    const childrenArray = React.Children.toArray(children);
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleSidebar = () => setIsCollapsed(!isCollapsed);
    useEffect(()=>{
        if (closeTrigger) setIsCollapsed(true);
    }, [closeTrigger])

    return <>
        <div className={`overlay ${!isCollapsed ? 'active' : ''}`}></div>
        <StickyBox className={`side-bar-sticky ${isCollapsed ? 'collapsed' : ''}`} offsetTop={20} offsetBottom={20}>
            <div className={`side-bar-container ${isCollapsed ? 'collapsed' : ''} ${toggleAbsolute ? '' : 'relative'}`}>
                <div className={`side-bar ${left ? '' : 'right'}`}>
                    <div className={`side-bar-main ${isCollapsed ? 'collapsed' : ''}`}>
                        <div className='side-bar-main-content'>{childrenArray.slice(1)}</div>
                    </div>
                    <div className='side-bar-toggle' onClick={toggleSidebar}>{childrenArray[0]}</div>
                </div>
            </div>
        </StickyBox>
    </>
}

export function SideClick ({}) {
    return <div className='side-click'>
        <div className='side-click-dash'></div>
        <div className='side-click-dash'></div>
        <div className='side-click-dash'></div>
    </div>
}

export function SideTitle ({ children, className }) {
    return <div className={`side-click ${className}`}>{children}</div>
}