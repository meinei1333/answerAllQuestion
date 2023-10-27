import React, { useState, useEffect } from "react";
import axios from "axios";
import "./tailwind.css";
import XLSX from 'xlsx';
import CoffeeButton from "./CoffeeButton";

const App = () => {
  const [data, setData] = useState([]);
  const [result, setResult] = useState({});
  const [showWaiting, setShowWaiting] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    // Read the Excel file
    axios
      .get("./list.xlsx", { responseType: "arraybuffer" })
      .then((response) => {
        const data = new Uint8Array(response.data);
        const workbook = XLSX.read(data, { type: "array" });

        // Assuming you have a single sheet in your Excel file, if not, you can specify the sheet name or index
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert the worksheet data to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Set the JSON data to your state variable
        setData(jsonData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = () => {
    let temp = data[Math.ceil(Math.random() * data.length) - 1];
    setResult(temp);
    setShowWaiting(true);
    setShowResult(false);

    setTimeout(() => {
      setShowWaiting(false);
      setShowResult(true);
    }, 2000);
  };

  return (
    <div className="container">
      <div>心中默念問題，然後按下解答</div>
      <button onClick={handleSubmit} className="button mt-5">解答</button>
      <div className="result-container">
        {showWaiting && <img src="./waiting.gif" alt="Loading..." />}
        {(
          <div className="result">
            {showResult && <p>{`${result.sentense}`}</p>}
          </div>
        )}
        {result.author && (
          <div className="result">
            <br></br>
            {showResult && <p>{`by ${result.author}`}</p>}
          </div>
        )}
      </div>
      <div className="mt-20">
        <CoffeeButton />
      </div>
    </div>
  );
};

export default App;
