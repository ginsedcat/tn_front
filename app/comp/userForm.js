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
    return <ContainerDefault itemRef={itemRef} className={className}>
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
    return <div className="input-default">
        <div className="input-default-label">{label}</div>
        <input className="input-default-input" name={name} onChange={onChange} value={value}/>
    </div>
}

export function Fit({ children }) {
    return <div className="fit">
        {children}
    </div>
}

export function ItemList({ children, className, itemsKeys, itemsDict, refsDict, participantCount, itemsSelected, setItemSelected, yyy }) {
    return <>
            {children}
            {itemsKeys.map((key) => {
                return <Item key={key.key} item={itemsDict[key.key]} itemRef={refsDict[key.key]} participantCount={participantCount} itemSelected={itemsSelected[key.key]} setItemSelected={setItemSelected}/>
            })}
    </>
}

export function Item({ className, item, itemRef, participantCount, itemSelected, setItemSelected }) {
    //  ref={itemRef}
    return <ContainerDefault className={className} itemRef={itemRef}> 
        <Fit>
            {item.type === 'title' && <ItemTitle item={item}/>}
            {item.type === 'lecture' && <ItemLecture item={item}/>}
            {item.type === 'activities' && <ItemActivities item={item}/>}
            {['lecture', 'activities'].includes(item.type) &&
                <ItemFooter item={item} participantCount={participantCount} itemSelected={itemSelected} setItemSelected={setItemSelected}/>
            }
        </Fit>
    </ContainerDefault>
}

export function ItemTitle({ item }) {
    return <HeaderLvl1>{item.name}</HeaderLvl1>
}

export function ItemLecture({ item }) {
    return <HeaderLvl1>{item.name}</HeaderLvl1>
}

export function ItemActivities({ item }) {
    return <HeaderLvl1>{item.name}</HeaderLvl1>
}

export function ItemFooter({ item, participantCount, itemSelected, setItemSelected }) {
    // FIXME: PROOPER FIELD LOAD
    const [index, setIndex] = useState(0)
    const time = item.times[index];
    const [participantsNum, setParticipantsNum] = useState(participantCount)
    useEffect(() => {
        if(itemSelected && itemSelected.times[time.key]) return
        setParticipantsNum(participantCount)
    }, [participantCount]);
    useEffect(() => {
        if(!itemSelected) return
        setParticipantsNum(itemSelected.times[itemSelected.active])
        setIndex(item.times.findIndex(item => item.key === itemSelected.active))
    }, [itemSelected]);
    const handleSelect = (event) => {
        setIndex(event.target.value)
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setParticipantsNum(value)
    };
    const handleSubmit = (e) => {
        setItemSelected(item.key, time.key, participantsNum)
    }; 
    return <div>
        <SelectDefault label='Pasirinkite laiką' options={item.times} onChange={handleSelect} value={index}/>
        <InputDefault label={`Kiek dalyvių registruojate? (Liko ${time.free_participants} vietų)`} value={participantsNum} onChange={handleChange}/>
        <ButtonDefault label='Pridėti veiklą' onClick={handleSubmit}></ButtonDefault>
    </div>
}

export function SelectDefault({ label, onChange, name, value, options=[] }) {
    return <div className="input-default">
        <div className="input-default-label">{label}</div>
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

export function ButtonDefault({ label, onClick }) {
    return <button onClick={onClick}>{label}</button>
}

export function Menu({ className, itemsKeys, itemsDict, refsDict }) {
    return <ContainerDefault className={className}> 
        <Fit>
            {itemsKeys.map((key) => {
                return <MenuItem key={key.key} item={itemsDict[key.key]} itemRef={refsDict[key.key]}/>
            })}
        </Fit>
    </ContainerDefault>
}

export function MenuItem({ item, itemRef }) {
    const handleClick = () => {
        itemRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    return <div onClick={handleClick}>{item.name}</div>
}

export function TimeLine({ className, refsDict, itemsSelected, itemsDict, setItemSelected }) {
    return <ContainerDefault className={className}>
        <Fit>
            {
                Object.entries(itemsSelected).map(([key, value]) => {
                    return Object.entries(value.times).map(([key2, value2]) => {
                        const handleClick = () => {
                            refsDict[key].current.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                            setItemSelected(key, key2, value2)
                        }
                        return <div onClick={handleClick} key={key2}>{key2} {value2}</div>
                    })
                })
            }
        </Fit>
    </ContainerDefault>
}

export function StickyDefault({ children }) {
    return <StickyBox className="fit"> {children} </StickyBox>
}