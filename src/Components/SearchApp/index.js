import { useState } from "react";
import UserCard from "../UserCard";

import "./index.css";

const SearchApp = () => {
  const [searchArr, setSearchArr] = useState([]);
  const [len, setLen] = useState(true);

  const sbmitFunction = async (e) => {
    e.preventDefault();
    const value = document.getElementById("search").value;
    const url = `https://veera-caluculater.onrender.com/api/search/${value}`;

    const respo = await fetch(url);
    const data = await respo.json();
    const dt = data.data;
    // console.log();
    setSearchArr(dt);
    setLen(true);
    if (dt.length === 0) {
      setLen(false);
    }
  };
  return (
    <div className="search-bg">
      <form onSubmit={sbmitFunction}>
        <h1 className="heading">Web Search Application</h1>
        <input
          required
          id="search"
          className="search-bar"
          placeholder="Search data by name / occupation  / city / country / email / phone"
          type="search"
        />

        <button type="submit" className="search-but">
          Search
        </button>
      </form>
      <div>
        {len === false && <p>No data availble......</p>}
        {searchArr.map((item) => (
          <UserCard data={item} />
        ))}
      </div>
    </div>
  );
};
export default SearchApp;
