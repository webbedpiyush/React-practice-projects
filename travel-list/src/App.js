import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItems} />
      <PackingList
        itemList={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats itemList={items} />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}

function PackingList({ itemList, onDeleteItem, onToggleItem }) {
  const [sortBy, setSortBy] = useState('input');

  let SortedItems;

  if(sortBy === 'input') return SortedItems=itemList;
  if(sortBy === 'description') return SortedItems=itemList.slice().sort((a,b)=>a.description.localeCompare(b.description));
  if(sortBy === 'packed') return SortedItems=itemList.slice().sort((a,b) => Number(a.packed) - Number(b.packed))
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
        <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
          <options value='input'>Sort by Input Order</options>
          <options value='description'>Sort by Description Order</options>
          <options value='packed'>Sort by Packed Order</options>
        </select>
      </div>
    </div>
  );
}

function Stats({ itemList }) {
  if (!itemList.length)
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </footer>
    );
  const numLen = itemList.length;
  const numPacked = itemList.filter((item) => item.packed).length;
  const percent = Math.round((numPacked / numLen) * 100);
  return (
    <footer className="stats">
      {percent === 100 ? (
        <em>You got everything! Ready to go ✈️</em>
      ) : (
        <em>
          you have {numLen} items in your list and you already have packed{" "}
          {numPacked} ({percent}%)
        </em>
      )}
    </footer>
  );
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [num, setNum] = useState(1);

  function handleSubmit(e) {
    e.preventDefault(); // to prevent from the default loading behaviour of js

    if (!description) return;

    const newItem = { description, num, packed: false, id: Date.now() };

    onAddItem(newItem);
    setDescription("");
    setNum(1);
  }

  return (
    <div className="add-form">
      <h3>what do you need for your trip ?</h3>
      <select value={num} onChange={(e) => setNum(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => (
          <option value={i} key={i}>
            {i}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setDescription(Number(e.target.value))}
      />
      <button onSubmit={handleSubmit}>Add</button>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
