import { useState } from "react";

import "./index.css";

const Calculater = () => {
  const [intrestData, setTotalIntrest] = useState({});
  const [error, setErr] = useState("");
  const [inputData, setInputdata] = useState({});

  const calculate = async (event) => {
    event.preventDefault();
    const money = document.getElementById("money").value;
    let startDate = document.getElementById("date1").value;
    let endDate = document.getElementById("date2").value;
    const intrest = document.getElementById("intrest").value;

    const dat = {
      money,
      startDate,
      endDate,
      intrest,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(dat),
    };

    const response = await fetch(
      "https://veera-caluculater.onrender.com/api/calculator",
      options
    );
    const data = await response.json();
    if (data.totalDays < 0) {
      setErr("barrowed date should be prevour than return date");
      setTotalIntrest({});
      setInputdata({});
    } else {
      setTotalIntrest(data);
      setInputdata(dat);
      setErr("");
    }
  };

  return (
    <div className="claculator-bg">
      <div className="intrest-details-bg">
        <h1>Simple Intrest Calculater</h1>
        <form onSubmit={calculate}>
          <input
            required
            id="money"
            placeholder="Enter the principle Amount"
            type="number"
          />
          <br />

          <input
            required
            placeholder="Enter Intrest percentage"
            id="intrest"
            type="number"
          />
          <br />

          <label for="date1">Select The Borrowed date</label>
          <br />
          <input required id="date1" type="date" />
          <br />
          <label for="date2">Select The Return date</label>
          <br />
          <input required id="date2" type="date" />

          <br />
          {error && <p className="error-msg">{error}</p>}
          <button className="but" type="submit">
            claculte Intrest
          </button>
        </form>
      </div>

      <div className="intrest-details-bg">
        <h2>Simple Intrest Details</h2>
        <p>Toatal Intrest : {intrestData.totalIntrest}</p>
        <p>Money Taken : {inputData.money}</p>
        <p>Intrest percentage : {inputData.intrest} % </p>
        <p>Intrest for: {intrestData.totalDays} days</p>
      </div>
    </div>
  );
};

export default Calculater;
