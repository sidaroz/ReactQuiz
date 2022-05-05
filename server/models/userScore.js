const db = require("../db_config/config");

class userScore {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.score = data.score;
    this.frequency = data.frequency;
  }

  static get all() {
    return new Promise(async (res, rej) => {
      try {
        const result = await db.query(`SELECT * FROM userscores;`);
        const topScore = result.rows.map((a) => new userScore(a));
        res(topScore);
      } catch (err) {
        rej(`Error retrieving all scores`);
      }
    });
  }

  static newQuiz(data) {
    return new Promise(async (res, rej) => {
      try {
        let { username, score, frequency } = data;
        console.log(username, score, frequency);
        let result = await db.query(
          `INSERT INTO userscores (username, score, frequency) VALUES ($1, $2, $3) RETURNING *;`,
          [username, score, frequency]
        );
        let quiz = new userScore(result.rows[0]);
        res(quiz);
      } catch (err) {
        rej("Error logging score!");
      }
    });
  }

  static findByUsername(data) {
    return new Promise(async (res, rej) => {
      try {
        const { username } = data;
        let result = await db.query(
          `SELECT * FROM userscores WHERE username = $1 ORDER BY username DESC;`,
          [username]
        );
        let userScore = result.rows[0];
        res(userScore);
      } catch (err) {
        rej("Could not receive this user's scores");
      }
    });
  }

  static updateScore(data) {
    return new Promise(async (res, rej) => {
      try {
        const { score, frequency, username } = data;
        const increaseFrequency = await db.query(
          `UPDATE userscores SET frequency = frequency + $1 WHERE username = $2;`,
          [frequency, username]
        );
        const increaseScore = await db.query(
          `UPDATE userscores SET score = score + $1 WHERE username = $2;`,
          [score, username]
        );
        res("Quiz updated");
      } catch (err) {
        rej("Failed to update database");
      }
    });
  }
}

module.exports = userScore;
