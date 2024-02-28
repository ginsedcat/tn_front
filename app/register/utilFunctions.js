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
    if (value >= 0) {
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

export function timeToMins(time) {
    const parts = time.split(':');
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    return hours * 60 + minutes;
}

export function minsToTime(mins) {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
}

export function createTimeArrayWithSpacing(start, end, space) {
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

export function itemsSelectedDictToTimesSelectedDict(itemsSelected, itemsDict, startTime, endTime) {
    const y0min = timeToMins(startTime);
    const y1max = timeToMins(endTime);
    const itemsSelectedRender = {};
    Object.entries(itemsSelected).map(([key, value]) => {
        Object.entries(value.times).map(([key2, value2]) => {
            const item = itemsDict[key]
            const time = item.times.dict[key2]
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
    return itemsSelectedRender
}