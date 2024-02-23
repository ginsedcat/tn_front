import { Items } from "./items"
import { ItemMenu } from "./itemMenu"
import { ItemItem } from "./itemItem"

export function Item({item, items_dict, type, topItem, modSelectedItem}) {
    return (
        <div className={"item-"+type}>
            {type == 'menu' && <ItemMenu item={item} items_dict={items_dict} topItem={topItem}></ItemMenu>}
            {type == 'items' && <ItemItem item={item} items_dict={items_dict} modSelectedItem={modSelectedItem}></ItemItem>}
            {item.items && <Items items={item.items} items_dict={items_dict} type={type} topItem={topItem} modSelectedItem={modSelectedItem}></Items>}
        </div>
    );
}