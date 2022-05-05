import React from "react";
import "./Leaderboard.css";
function Leaderboard() {
  const data = [
    {
      id: 1,
      username: "Sidar",
      score: 20,
      frequency: 30,
    },
    { id: 2, username: "Luiz", score: 25, frequency: 27 },
  ];

  const column = Object.keys(data[0]).slice(1);

  const thData = () => {
    return column.map((header, i) => {
      if (header === "frequency") {
        return (
          <th className={header} key={i}>
            Games Played
          </th>
        );
      }
      return (
        <th className={header} key={i}>
          {header}
        </th>
      );
    });
  };

  const tdData = () => {
    console.log(data[0].score);
    return data.map((user) => {
      return (
        <tr>
          {column.map((eachDataColumn) => {
            return <td>{user[eachDataColumn]}</td>;
          })}
        </tr>
      );
    });
  };

  return (
    <div>
      <h1 className="leaderboard-title">Leaderboards</h1>
      <div className="table-main">
        <table className="leaderboard-table">
          <thead>
            <tr>{thData()}</tr>
          </thead>
          <tbody>{tdData()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
