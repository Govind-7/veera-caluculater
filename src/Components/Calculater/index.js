const Calculater = () => {
  const calculate = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <h1>Simple Intrest Calculater</h1>
      <form onSubmit={calculate}>
        <label for="money">Enter the principle Amount</label>
        <br />
        <input required id="money" type="number" />
        <br />
        <label for="date1">Select starting date</label>
        <br />
        <input required id="date1" type="date" />
        <br />
        <label for="date2">Select The Eniding date</label>
        <br />
        <input required id="date2" type="date" />
        <br />
        <button type="submit">claculte Intrest</button>
      </form>
    </div>
  );
};

export default Calculater;
