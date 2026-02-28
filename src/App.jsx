import "./App.css";
import ShoppingList from "./components/ShoppingList";

function App() {
  return (
    <div id="container">
      <div id="item-list">
        <h2>Browse Items</h2>
        <ShoppingList />
      </div>

      <div id="cart-area">
        Cart here
      </div>
    </div>
  );
}

export default App;