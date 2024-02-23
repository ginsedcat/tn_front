import StickyBox from "react-sticky-box";

export function TimeLine({items, items_dict}) {
    // ADD y0 and y1
    const y0min = timeToMins("08:00");
    const y1max = timeToMins("18:00");
    Object.entries(items).map(([key, value]) => {
        value.y0 = (timeToMins(value.item.from) - y0min) / (y1max - y0min)
        value.y1 = (timeToMins(value.item.to) - y0min) / (y1max - y0min)
    })
    // ADD x
    let xmax = 0;
    Object.entries(items).forEach(([key, value], index, array) => {
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
    // ADD x0 and x1
    Object.entries(items).map(([key, value]) => {
        value.x0 = value.x / xmax
        value.x1 = (value.x + 1) / xmax
    })
    // RENDER items
    const style = {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '90%'
      };
    return (
        <StickyBox offsetTop={20} offsetBottom={20} style={{'height': '100%'}}>
            <div style={{height:'90vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}} className="time-line">
                <h1>Pasirinktos veiklos</h1>
                <div style={style}>
                    <TimeHeadDiv start = {y0min} end = {y1max} width={'100px'} height={'100%'}></TimeHeadDiv>
                    <ParentDiv height={'100%'}>
                        {
                            Object.entries(items).map(([key, value]) => {
                                return(
                                    <ChildDiv key={key} x0={value.x0} y0={value.y0} x1={value.x1} y1={value.y1} item={value} items_dict={items_dict}/>
                                )
                            })
                        }
                    </ParentDiv>
                </div>
                <button style={{width:"100%", bottom:0, position: 'realitive'}}>Registruotis!</button>
            </div>
        </StickyBox>
    );
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

function TimeHeadDiv({ start = 0, end = 100, space = 30, width = '100%', height = '100%' }) {
    const timeHeadStyle = {
      position: 'relative',
      height: height
    };
    const times = createArrayWithSpacing(start, end, space)
    return <div style={timeHeadStyle}>
        {times.map((time) => {
            return(
                <div className="time-text" style={{height: `${time.height * 100}%`}} key = {time.key}>
                    {time.time}
                </div>
            )
        })}
    </div>;
};

function ParentDiv({ children, width = '100%', height = '100%' }) {
    const parentStyle = {
      position: 'relative',
      width: width,
      height: height
    };
    return <div style={parentStyle}>{children}</div>;
};

const ChildDiv = ({ x0, y0, x1, y1, item, items_dict }) => {
    const handleClick = () => {
        item.parent.ref.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
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
    return <div className="time-cell" style={childStyle} onClick={handleClick}>
        <div>{`${item.item.from}-${item.item.to}`}</div>
        <div>{`${items_dict[item.parent.key].name.substring(0,6)}...`}</div>
        {/* <div>{item.value}</div> */}
    </div>;
  };