import React, { useState, useEffect } from 'react';
import { ContainerDefault } from './userForm'

export function Menu({ itemClassName, itemsKeys, itemsDict, refsDict }) {
    const [topItem, setTopItem] = useState(null);
    useEffect(() => {
        const handleScroll = () => {
            let top_key = null
            let top_val = null
            Object.entries(refsDict.current).forEach(([key, value]) => {
                if (value) {
                    const pos = value.offsetTop - window.scrollY;
                    if (pos > -10 && (top_val === null || pos < top_val)) {
                        top_key = key;
                        top_val = pos;
                    }
                }
            });
            setTopItem(top_key);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])
    return <ContainerDefault> 
        {itemsKeys.map((key) => {
            // console.log(key)
            // console.log(itemsDict[key.key])
            return <MenuItem className={itemClassName} highlight={key.key === topItem} level={key.level} key={key.key} item={itemsDict[key.key]} itemRef={refsDict}/>
        })}
    </ContainerDefault>
}

function MenuItem({ className, item, itemRef, level=0, highlight=false }) {
    const handleClick = () => {
        itemRef.current[item.key].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    return <div className={`${className} ${highlight?'highlight':''}`} onClick={handleClick}>
        <div style={{paddingLeft:`${level*20}px`}}>{item.name}</div>
    </div>
}