import StickyBox from "react-sticky-box";
import { Item } from "./item"

export function Items({items, items_dict, type, topItem, isSticky, modSelectedItem, className}) {
    const html_items = items.map((item) => {
        return(<Item key={item.key} item={item} items_dict={items_dict} type={type} topItem={topItem} modSelectedItem={modSelectedItem}></Item>)
    })
    let res = null
    if (isSticky) {
        res = <StickyBox style={{height:"100%"}} offsetTop={20} offsetBottom={20}><div style={{height: '90vh'}} className={`${className} items-${type}`}>{html_items}</div></StickyBox>
    } else {
        res = <div className={`${className} items-${type}`}>{html_items}</div>
    }

    return (res);
}