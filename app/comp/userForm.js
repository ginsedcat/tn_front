import React, { useState, useEffect } from 'react';
import StickyBox from "react-sticky-box";

export function UserForm({ className, setFormInfo, itemRef}) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormInfo((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    return <ContainerDefault
        itemRef={itemRef}
        className={className}
        >
        <Fit>
            <HeaderLvl1>Kontaktinė Informacija</HeaderLvl1>
            <InputDefault label='Vardas ir Pavardė' name='fullName' onChange={handleChange}/>
            <InputDefault label='El. pašto adresas' name='email' onChange={handleChange}/>
            <InputDefault label='Telefono numeris' name='phoneNumber' onChange={handleChange}/>
            <InputDefault label='Miestas' name='city' onChange={handleChange}/>
            <InputDefault label='Mokykla' name='school' onChange={handleChange}/>
            <InputDefault label='Vidutinis amžius arba/ir klasė' name='ageOrGrade' onChange={handleChange}/>
            <InputDefault label='Kiek dalyvių registuojate?' name='participantCount' onChange={handleChange}/>
        </Fit>
    </ContainerDefault>
}

export function ContainerDefault({ children, className, itemRef }) {
    return <div ref={itemRef} className={`container-default ${className}`}>{children}</div>
}

export function HeaderLvl1({ children }) {
    return <h1 className='header-lvl-1'>{children}</h1>
}

export function InputDefault({ label, onChange, name, value }) {
    return <div className="input-default flex-col">
        <div className="label">{label}</div>
        <div style={{ display:'flex'}}><input name={name} onChange={onChange} value={value}/></div>
    </div>
}

export function Fit({ children }) {
    return <div className="fit">
        {children}
    </div>
}

export function SelectDefault({ label, onChange, name, value, options=[] }) {
    return <div className="input-default flex-col">
        <div className="label">{label}</div>
        <select value={value} name={name} onChange={onChange}>{
            options.map((option, index) => {
                const res = <option value={index} key={option.key}>
                    {option.from}-{option.to} ({option.free_participants})
                </option>
                return res
            })
        }</select>
    </div>
}

export function ButtonDefault({ className, label, onClick }) {
    return <div className={`input-default ${className}`}>
        <button onClick={onClick}>{label}</button>
    </div>
}

function timeToMins(time) {
    const parts = time.split(':');
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    return hours * 60 + minutes;
}

function minsToTime(mins) {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
}

function createArrayWithSpacing(start, end, space) {
    const array = [];
    for (let i = start; i < end; i += space) {
        const next_i = (i + space) > end ? end : (i + space)
        array.push({
            'key': i,
            'start': i,
            'height': (next_i - i) / (end - start),
            'time': minsToTime(i)
        });
    }
    return array;
}

export function TimeLine({ itemClassName, refsDict, itemsSelected, itemsDict, setItemSelected }) {
    const y0min = timeToMins("08:00");
    const y1max = timeToMins("18:00");
    const itemsSelectedRender = {};
    Object.entries(itemsSelected).map(([key, value]) => {
        Object.entries(value.times).map(([key2, value2]) => {
            const item = itemsDict[key]
            const times = item.times
            const index = times.findIndex(item => item.key === key2)
            const time = item.times[index]
            itemsSelectedRender[key2] = {
                'key': key,
                'timeKey': key2,
                'item': item,
                'time': time,
                'value': value2,
                'y0': (timeToMins(time.from) - y0min) / (y1max - y0min),
                'y1': (timeToMins(time.to) - y0min) / (y1max - y0min),
                'x': 0
            }
        })
    })
    let xmax = 0;
    Object.entries(itemsSelectedRender).forEach(([key, value], index, array) => {
        let x = 0;
        array.slice(0, index).forEach(([key_, value_]) => {
            if(value.y0 < value_.y1 && value.y1 > value_.y0 && value.x <= value_.x) {
                x = value_.x + 1
            }
        });
        value.x = x;
        if (xmax < x) xmax = x;
    });
    xmax = xmax + 1
    Object.entries(itemsSelectedRender).map(([key, value]) => {
        value.x0 = (value.x + 0.02) / xmax
        value.x1 = (value.x + 0.98) / xmax
    })
    return <>
            <HeaderLvl1>Pasirinktos veiklos</HeaderLvl1>
            <TimeMain start={y0min} end={y1max}>{
                Object.entries(itemsSelectedRender).map(([key, item]) => {
                    return <TimeItem
                        className={itemClassName}
                        key={item.timeKey}
                        item={item.item}
                        timeKey={item.timeKey}
                        itemRef={refsDict}
                        setItemSelected={setItemSelected}
                        value={item.value}
                        time={item.time}
                        x0={item.x0}
                        y0={item.y0}
                        x1={item.x1}
                        y1={item.y1}
                    />
                })
            }</TimeMain>
    </>
}

export function TimeMain({ children, start, end, height = '100%' }) {
    const parentStyle = {
      position: 'relative',
      width: '100%',
      height: height
    };
    return <div className='time-main'>
        <TimeHead start={start} end={end}/>
        <div style={parentStyle}>{children}</div>
    </div>;
};

function TimeHead({ start = 0, end = 100, space = 30}) {
    const times = createArrayWithSpacing(start, end, space)
    return <div>
        {times.map((time) => {
            return(
                <div style={{height: `${time.height * 100}%`}} key = {time.key}>
                    {time.time}
                </div>
            )
        })}
    </div>;
};

export function TimeItem({ className, x0=0, y0=0, x1=10, y1=10, item, value, time, timeKey, itemRef, setItemSelected}) {
    const handleClick = () => {
        itemRef.current[item.key].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        setItemSelected(item.key, timeKey, value)
    }
    const width = `${(x1 - x0) * 100}%`;
    const height = `${(y1 - y0) * 100}%`;
    const childStyle = {
      position: 'absolute',
      left: `${x0 * 100}%`,
      top: `${y0 * 100}%`,
      width: width,
      height: height
    };
    return <div className={className} style={childStyle} onClick={handleClick}>
        <div>
            {/* <div>{`${time.from}-${time.to}`}</div>
            <div>{`${item.name.substring(0,6)}...`}</div>
            <div>{value}</div> */}
        </div>
    </div>;
};

export function StickyDefault({ children, className }) {
    return <StickyBox className={className}> {children} </StickyBox>
}