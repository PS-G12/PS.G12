import React, { useState } from "react";
import "./añadirAlimento.css";

const AñadirAlimento = () => {
    const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [amount, setAmount] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="add-food">..
      <button onClick={handleToggleForm}>Add My Own Food</button>
      {showForm && (
        <form>
          <div>
            <label htmlFor="name">Food Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="calories">Calories:</label>
            <input
              type="text"
              id="calories"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="amount">Amount in grams:</label>
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default AñadirAlimento;
