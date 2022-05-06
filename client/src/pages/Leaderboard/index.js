import React from "react";
import "./Leaderboard.css";
function Leaderboard() {
  // const data = [
  //   {
  //     id: 1,
  //     username: "Sidar",
  //     score: 20,
  //     frequency: 30,
  //   },
  //   { id: 2, username: "Luiz", score: 25, frequency: 27 },
  // ];
  async function fetchUserScores() {
    const userData = await fetch("http://localhost:3005/users");
    const fullData = await userData.json();
    console.log(fullData);
    const column = Object.keys(fullData[0]).slice(1);
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
      console.log(fullData[0].score);
      return fullData.map((user) => {
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
      <>
        <thead>
          <tr>{thData()}</tr>
        </thead>
        <tbody>{tdData()}</tbody>
      </>
    );
  }

  return (
    <div>
      <h1 className="leaderboard-title">Leaderboards</h1>
      <div className="table-main">
        <table className="leaderboard-table">{fetchUserScores()}</table>
      </div>
    </div>
  );
}

export default Leaderboard;
