import { Input } from './utilComponents'

export function UserForm({ setFormInfoDict, refDict}) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormInfoDict((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    return <div ref={(element) => refDict.current['user-form'] = element} className='flex-col item'>
        <div className='header-lvl1'>Kontaktinė Informacija</div>
        <Input label='Vardas ir Pavardė' name='fullName' onChange={handleChange}/>
        <Input label='El. pašto adresas' name='email' onChange={handleChange}/>
        <Input label='Telefono numeris' name='phoneNumber' onChange={handleChange}/>
        <Input label='Miestas' name='city' onChange={handleChange}/>
        <Input label='Mokykla' name='school' onChange={handleChange}/>
        <Input label='Vidutinis amžius arba/ir klasė' name='ageOrGrade' onChange={handleChange}/>
        <Input label='Kiek dalyvių registuojate?' name='participantCount' onChange={handleChange}/>
    </div>
}