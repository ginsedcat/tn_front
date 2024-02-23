export function ItemMenu({item, items_dict, topItem}) {
    const handleClick = () => {
        item.ref.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    const item_dict = items_dict[item.key]
    return (
        <div className={`item-menu-item ${topItem == item.key ? 'highlight' : ''}`} onClick={handleClick}>
            <div>{item_dict.name}</div>
        </div>
    );
}