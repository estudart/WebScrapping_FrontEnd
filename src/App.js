import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/scrape?query=${query}`
      );
      const result = await response.json();

      // Convert price strings to numbers and sort the data
      const sortedData = Object.values(result).sort(
        (a, b) => parseFloat(a[1]) - parseFloat(b[1])
      );

      setData(sortedData);
      console.log(sortedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="App">
      <h1 style={{ color: "#2a6e61" }}>Easy Search</h1>
      <div className="search-container">
        <label className="search-label">
          Query:{" "}
          <input type="text" value={query} onChange={handleQueryChange} />
        </label>
        <button className="search-button" onClick={fetchData}>
          Fetch Data
        </button>
      </div>

      {data && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <table className="styled-table">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Product</th>
                <th style={{ textAlign: "center" }}>Price</th>
                <th style={{ textAlign: "center" }}>Source</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr className="active-row" key={index + 1}>
                  <td style={{ textAlign: "left", width: "40%" }}>{item[0]}</td>
                  <td>R$ {item[1]}</td>
                  <td>{item[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;
