function App() {
  return (
    <div>
      <h1>Simple Intrest Calculater</h1>
      <label for="money">Enter the principle Amount</label>
      <br />
      <input id="money" type="number" />
      <br />
      <label for="date1">Select starting date</label>
      <br />
      <input id="date1" type="date" />
      <br />
      <label for="date2">Select The Eniding date</label>
      <br />
      <input id="date2" type="date" />
      <br />
      <button>claculte Intrest</button>
    </div>
  );
}

export default App;
