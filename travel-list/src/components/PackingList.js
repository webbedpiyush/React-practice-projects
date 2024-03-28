import { useState } from "react";
import Item from "./Item";

export default function PackingList({ itemList, onDeleteItem, onToggleItem ,onClearList}) {
  const [sortBy, setSortBy] = useState("input");

  let SortedItems;

  if (sortBy === "input") SortedItems = itemList;
  if (sortBy === "description")
    SortedItems = itemList
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    SortedItems = itemList
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  console.log(SortedItems);
  return (
    <div className="list">
      <ul>
        {SortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by Input Order</option>
          <option value="description">Sort by Description Order</option>
          <option value="packed">Sort by Packed Order</option>
        </select>
        <button onClick={onClearList}>Clear</button>
      </div>
    </div>
  );
}