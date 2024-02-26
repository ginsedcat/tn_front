import data from '../../misc/data.json'

export function getItemDictionary() {
    const items = JSON.parse(JSON.stringify(data['all_items']));
    Object.entries(items).map(([key, value]) => {
        value.times = modifyTimesToDict(value.times)
    })
    return items
}

function modifyTimesToDict(timesArray) {
    if (!timesArray) return {'dict': {}, 'array': []}
    const dict = {}
    const array = []
    timesArray.map((value) => {
        dict[value.key] = value;
        array.push(value.key);
    })
    return {'dict': dict, 'array': array}
}

export function getItemArray() {
    const itemsArray = flattenItemsArray(JSON.parse(JSON.stringify(data['items'])));
    return itemsArray
}

function flattenItemsArray(items, level = 0) {
    if (!items) return []
    let res = [];
    items.forEach((item) => {
        res.push({
            'key': item.key,
            'level': level
        })
        res.push(...flattenItemsArray(item.items, level + 1))
    });
    return res
}

export function setItemSelectedFunc(setItemsSelected) {
    return (key, timeKey, value) => {setItemSelected(key, timeKey, value, setItemsSelected)}
}

function setItemSelected(key, timeKey, value, setItemsSelected) {
    if (value) {
        setItemsSelected(prevItems => ({
            ...prevItems,
            [key]: {
                'key': key,
                'active': timeKey,
                'times': {
                    ...(prevItems[key] ? prevItems[key].times : {}),
                    [timeKey]: value
                }
            }
        }))
    } else {
        setItemsSelected(prevItems => {
            const newItems = { ...prevItems }
            if (newItems[key] && newItems[key].times[timeKey]) {
                delete newItems[key].times[timeKey]
                if (Object.keys(newItems[key].times).length == 0) {
                    delete newItems[key]
                }
            }
            return newItems
        });
    }
}

export function dict2Array(dict, keys) {
    const array = keys.map((key)=>{
        return dict[key]
    })
    return array
}