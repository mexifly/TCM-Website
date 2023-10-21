const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;

// Create MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "rachel",
  password: "940326",
  database: "tcm_admin",
});

// connect MySQL
db.connect((err) => {
  if (err) {
    console.error("无法连接到数据库 Unable to connect Database:", err);
    return;
  }
  console.log("已连接到数据库 Connect Database successfully");
});

// 中间件，用于解析请求体中的 JSON 数据
app.use(express.json());

// Get all questions
app.get("/questions", (req, res) => {
  const query = "SELECT * FROM questions";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Get question failed:", err);
      res.status(500).json({ error: "Unable to get question" });
      return;
    }
    res.json(results);
  });
});

// Get one question by questionId
app.get("/questions/:questionId", (req, res) => {
  const questionId = req.params.questionId;
  const query = "SELECT * FROM questions WHERE questionId = ?";
  db.query(query, [questionId], (err, results) => {
    if (err) {
      console.error("Get question failed:", err);
      res.status(500).json({ error: "Unable to get question" });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "问题不存在" });
      return;
    }
    res.json(results[0]);
  });
});

// Update question
app.put("/questions/:questionId", (req, res) => {
  const questionId = req.params.questionId;
  const { questionContent } = req.body;
  const query = "UPDATE questions SET questionContent = ? WHERE questionId = ?";
  db.query(query, [questionContent, questionId], (err, result) => {
    if (err) {
      console.error("Update question failed:", err);
      res.status(500).json({ error: "无法更新问题 Unable to update question" });
      return;
    }
    res.json({ message: "更新成功 Update question successfully" });
  });
});

// Get all constitution_results
app.get("/constitution_results", (req, res) => {
  const query = "SELECT * FROM constitution_results";
  db.query(query, (err, results) => {
    if (err) {
      console.error("获取失败 Get constitution_results failed:", err);
      res.status(500).json({ error: "无法更新 Unable to get constitution_results" });
      return;
    }
    res.json(results);
  });
});

// 获取单个constitution_results
app.get("/constitution_results/:consId", (req, res) => {
  const consId = req.params.consId;
  const query = "SELECT * FROM constitution_results WHERE consId = ?";
  db.query(query, [consId], (err, results) => {
    if (err) {
      console.error("获取失败 Get constitution_results failed:", err);
      res.status(500).json({ error: "无法获取constitution_results Unable to get constitution_results" });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "记录不存在" });
      return;
    }
    res.json(results[0]);
  });
});

// Update constitution_results
app.put("/constitution_results/:consId", (req, res) => {
  const consId = req.params.consId;
  const {
    consType,
    definition,
    disturbance,
    cause,
    vigilant,
    improvement,
    recommondRecipe,
  } = req.body;

  const query =
    "UPDATE constitution_results SET consType = ?, definition = ?, disturbance = ?, cause = ?, vigilant = ?, improvement = ?, recommondRecipe = ? WHERE consId = ?";
  db.query(
    query,
    [
      consType,
      definition,
      disturbance,
      cause,
      vigilant,
      improvement,
      recommondRecipe,
      consId,
    ],
    (err, result) => {
      if (err) {
        console.error("更新失败 Update constitution_results failed:", err);
        res
          .status(500)
          .json({
            error:
              "Unable to Update constitution_results 无法更新constitution_results",
          });
        return;
      }
      res.json({ message: "记录已成功更新" });
    }
  );
});

// Start Server
app.listen(port, () => {
  console.log(`服务器正在监听端口 Listening port: ${port}`);
});
