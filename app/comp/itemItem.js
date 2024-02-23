import FIXMELogo from '../../public/activity.webp'
import { ItemItemHeader } from "./itemItemHeader"
import { ItemItemItem } from "./itemItemItem"

export function ItemItem({item, items_dict, modSelectedItem}) {
    const item_dict = items_dict[item.key]
    return (
        <div ref={item.ref}>
            {item_dict.type == 'title' && <ItemItemHeader item={item} items_dict={items_dict}></ItemItemHeader>}
            {(item_dict.type == 'activities' || item_dict.type == 'lecture') && <ItemItemItem item={item} items_dict={items_dict} modSelectedItem={modSelectedItem}></ItemItemItem>}
        </div>
    );
}