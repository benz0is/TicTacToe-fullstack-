import React, { useState, useEffect } from "react";

// export default function Data(props)
export default function Data(props) {
  const [gameData, setGameData] = useState([]);
  var histori = [];
  useEffect(() => {
    fetch("/todos")
      .then((res) => res.json())
      .then((data) => setGameData(data));
  });

  return (
    <div>
      <h1>Console:</h1>
      <div>
        {gameData.rows !== undefined
          ? console.log(
              Object.values(gameData.rows[0].description).map((i) => {
                if (i === "x" || i === "o") {
                  histori.push(i);
                }
              })
            )
          : console.log("neveikia")}
      </div>
      <ul>
        {gameData.rows !== undefined
          ? histori.map((result) => <li>{result} moved</li>)
          : console.log("neveikia")}
      </ul>
      <div>{console.log(histori)}</div>
    </div>
  );
}
