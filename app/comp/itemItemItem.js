import FIXMELogo from '../../public/activity.webp'
import React, { useState, useContext } from 'react';

export function ItemItemItem({item, items_dict, modSelectedItem}) {
    const item_dict = items_dict[item.key]
    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleDropdownChange = (event) => {
        const newIndex = event.target.value;
        setSelectedIndex(newIndex)
    };
    const selectedTime = item_dict.times[selectedIndex]

    const [inputValue, setInputValue] = useState(0);
    const handleInputChange = (event) => {
        setInputValue(event.target.value)
    }

    const handleOnClick = (event) => {
        modSelectedItem(selectedTime.key, selectedTime, inputValue, item)
    }
    return (
        <div className='item-item-item' ref={item.ref}>
            <div className='flex-row'>
                <h1>{item_dict.name}</h1>
                <div>{item_dict.recommended_age}</div>
            </div>
            <div className='flex-row'>
                <div className='item-item-item-content'>
                    <img className='image' src={FIXMELogo['src']} alt='FIXME'></img>
                    <p>{item_dict.activity_desc}</p>
                </div>
                {item_dict.type == 'lecture' && <div className='item-item-item-content'>
                    <img className='image' src={FIXMELogo['src']} alt='FIXME'></img>
                    <h2>{item_dict.lecturer}</h2>
                    <p>{item_dict.lecturer_desc}</p>
                </div>}
            </div>
            <div>{selectedTime.location}</div>
            <div className='flex-row'>
                <Select value={selectedIndex} items={item_dict.times} onChange={handleDropdownChange}/>
                <Input onChange={handleInputChange} max={selectedTime.free_participants}/>
                <div className='center'><button onClick={handleOnClick}>Pridėti veiklą</button></div>
            </div>
        </div>
    );
}

function Select({value, items, onChange}) {
    if (items.length == 1) {
        const res = <div className="select-container center">
            <div>{`Laikas: ${items[0].from}-${items[0].to}`}</div>
        </div>
        return res
    }
    const res = <div className="select-container">
        <div className="select-label">Pasirinkite laiką</div>
        <select className="custom-select" value={value} onChange={onChange}>{
            items.map((item, index) => {
                const res = <option value={index} key={item.key}>
                    {item.from}-{item.to} ({item.free_participants})
                </option>
                return res
            })
        }</select>
    </div>
    return res
}

function Input({onChange, max}) {
    const res = <div className="input-container">
        <div className="input-label">Kiek dalyvių registruojate? (Liko {max} vietų)</div>
        <input className="custom-input" onChange={onChange}></input>
    </div>
    return res
}