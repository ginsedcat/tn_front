export function ItemItemHeader({item, items_dict}) {
    const item_dict = items_dict[item.key]
    return (
        <div className='item-item-item' ref={item.ref}>
            <h1>{item_dict.name}</h1>
        </div>
    );
}