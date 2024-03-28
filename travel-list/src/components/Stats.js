export default function Stats({ itemList }) {
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
