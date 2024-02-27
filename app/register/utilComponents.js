import React, { useState, useRef, useEffect } from 'react';

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

export function Button({label, onClick}) {
    return <div className="button">
        <div onClick={onClick}>{label}</div>
    </div>
}

export function SideBar({ children, toggle, left = true, toggleAbsolute = false }) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  
    return <div className={`side-bar-container ${toggleAbsolute ? '' : 'relative'}`}>
        <div className={`side-bar ${left ? '' : 'right'}`}>
            <div className={`side-bar-main ${isCollapsed ? 'collapsed' : ''}`}>
                <div className='side-bar-main-content'>{children}</div>
            </div>
            <div className='side-bar-toggle' onClick={toggleSidebar}>{toggle}</div>
        </div>
    </div>
}

export function SideClick ({}) {
    return <div>dsds</div>
}