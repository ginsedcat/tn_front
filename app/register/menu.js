import React, { useState, useEffect } from 'react';

export function Menu({ itemsDict, itemsArray, refDict, setClicks }) {
    const [topItem, setTopItem] = useState(null);
    useEffect(() => {
        const handleScroll = () => {
            let top_key = null
            let top_val = null
            Object.entries(refDict.current).forEach(([key, value]) => {
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
        handleScroll()
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])
    return <div className='flex-col item menu'> 
        {itemsArray.map((key) => {
            return <MenuItem setClicks={setClicks} highlight={key.key === topItem} level={key.level} key={key.key} item={itemsDict[key.key]} itemRef={refDict}/>
        })}
    </div>
}

function MenuItem({ item, itemRef, level=0, highlight=false, setClicks }) {
    const handleClick = () => {
        if (setClicks) setClicks((prev) => ({
            'key': item.key,
            'counter': prev.counter + 1
        }))
        itemRef.current[item.key].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    return <div className={`menu-item ${highlight?'highlight':''}`} onClick={handleClick}>
        <div style={{paddingLeft:`${level*20}px`}}>{item.name}</div>
    </div>
}