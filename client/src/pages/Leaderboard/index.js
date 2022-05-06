import React, { useEffect, useState } from "react";
import "./Leaderboard.css";
function Leaderboard() {
  const [fullData, setFullData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetch("http://localhost:3005/users");
      const completeData = await userData.json();
      setFullData(completeData);
    };
    fetchData();
  }, []);

  function fetchUserScores() {
    console.log(fullData);

    const tdData = () => {
      return fullData.map((user, i) => {
        return (
          <tr>
            <td>{`${i + 1}`}</td>
            <td>{`${user.username}`}</td>
            <td>{`${user.score}`}</td>
            <td>{`${user.frequency}`}</td>
          </tr>
        );
      });
    };

    return (
      <>
        <thead>
          <tr>
            <th className="username">Rank</th>
            <th>Username</th>
            <th>Score</th>
            <th>Questions answered</th>
          </tr>
        </thead>
        <tbody>{tdData()}</tbody>
      </>
    );
  }

  return (
    <div>
      <h1 className="leaderboard-title">Leaderboards</h1>
      <div className="table-main">
        <table className="leaderboard-table">
          {fullData.length > 1 && fetchUserScores()}
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
