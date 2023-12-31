import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import classes from "../ContentPage.module.css";
import { Doughnut, Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  BarController,
} from "chart.js";
Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  BarController
);

interface Question {
  qid: number;
  groupId: number;
  id: number;
  textEn: string;
  textCn: string;
  type: string;
}

interface ConstitutionStat {
  constitution: string;
  count: number;
}

interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    hoverBackgroundColor: string[];
  }[];
}

interface LineChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
  }[];
  options?: {
    scales: {
      y: {
        min?: number;
        max?: number;
        beginAtZero: boolean;
        title?: {
          display: boolean;
          text: string;
        };
      };
      x?: {
        title?: {
          display: boolean;
          text: string;
        };
      };
    };
  };
}

interface DataPoint {
  date: string;
  count: number;
}
function StatisticsPage() {
  const [questionOptions, setQuestionOptions] = useState<Question[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<(number | null)[]>(
    [null, null, null]
  );
  const [histogramData, setHistogramData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [], // 预先定义为空的字符串数组
        hoverBackgroundColor: [], // 预先定义为空的字符串数组
      },
    ],
  });

  const tooltipOptions = {
    plugins: {
      tooltip: {
        bodyFontSize: 160, // 主体文字大小
        titleFontSize: 180, // 标题文字大小
        footerFontSize: 160, // 脚注文字大小

        // 调整 tooltip 框的内边距
        padding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        },

        // 自定义样式（如有必要）
        backgroundColor: "#FFF", // 背景颜色
        titleColor: "#000", // 标题颜色
        bodyColor: "#000", // 主体文字颜色
        footerColor: "#000", // 脚注文字颜色
        borderColor: "#DDD", // 边框颜色
        borderWidth: 1, // 边框宽度
        callbacks: {
          label: function (context: any) {
            const labelIndex = context.dataIndex;
            const datasetIndex = context.datasetIndex;
            const data = context.chart.data;

            const dataset = data.datasets[datasetIndex];
            const total = dataset.data.reduce(
              (sum: number, value: number) => sum + value,
              0
            );
            const currentValue = dataset.data[labelIndex];
            const percentage = ((currentValue / total) * 100).toFixed(2);
            const label = data.labels[labelIndex] || "";

            return `${label}: ${currentValue} (${percentage}%)`;
          },
        },
      },
    },
  };

  const [activeButton, setActiveButton] = useState<number>(1); // 新增状态

  useEffect(() => {
    fetchQuestions();
    axios
      .get<ConstitutionStat[]>("http://localhost:3000/api/statistics")
      .then((response) => {
        const data = response.data;
        const labels = data.map((item: ConstitutionStat) => item.constitution);
        const counts = data.map((item: ConstitutionStat) => item.count);

        setChartData({
          labels: labels,
          datasets: [
            {
              data: counts,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#E7E9ED",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
                "#FFCD56",
                "#C9CBCF",
              ],
              hoverBackgroundColor: [
                // 颜色数组，可根据需要调整
              ],
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    // 不需要清理函数
  }, []);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // 添加用于折线图的状态
  const [lineChartData, setLineChartData] = useState<LineChartData>({
    labels: [],
    datasets: [],
  });

  const handleFilterClick = () => {
    // ...之前的过滤逻辑...
    axios
      .get<DataPoint[]>("http://localhost:3000/api/getAccessByDate", {
        params: { startDate, endDate },
      })
      .then((response) => {
        const data = response.data;
        setLineChartData({
          labels: data.map((item: DataPoint) => item.date),
          datasets: [
            {
              label: "Traffic",
              data: data.map((item: DataPoint) => item.count),
              borderColor: "blue",
              backgroundColor: "rgba(0, 123, 255, 0.5)",
              fill: true,
            },
          ],
          options: {
            scales: {
              y: {
                beginAtZero: true,
                min: 0,
                title: {
                  display: true,
                  text: "Number of Tests",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Date",
                },
              },
            },
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const handleButtonClick = (buttonNumber: number) => {
    setActiveButton(buttonNumber);
  };

  const buttonNames = ["Proportion", "Traffic", "Histogram"];

  const handleRefreshClick = () => {
    // 重置时间选择器状态
    setStartDate("");
    setEndDate("");

    // 清空折线图数据
    setLineChartData({
      labels: [],
      datasets: [],
    });
  };

  const fetchQuestions = () => {
    axios
      .get("http://localhost:3000/api/Retrivequestions")
      .then((response) => {
        if (response.data && Array.isArray(response.data.questions)) {
          setQuestionOptions(response.data.questions);
        } else {
          console.error("Invalid response format:", response.data);
        }
      })
      .catch((error) => console.error("Error fetching questions: ", error));
  };

  // 处理问题选择的变化
  const handleQuestionSelect = (index: number, questionId: number) => {
    const newSelection = [...selectedQuestions];
    newSelection[index] = questionId;
    setSelectedQuestions(newSelection);
  };

  function handleRefreshHistogram() {
    // 重置问题选择器状态
    setSelectedQuestions([null, null, null]);

    // 重置直方图数据
    setHistogramData({
      labels: [],
      datasets: [],
    });
  }

  const fetchHistogramData = () => {
    axios
      .post("http://localhost:3000/api/histogram", {
        questions: selectedQuestions.filter((q) => q),
      })
      .then((response) => {
        // 假设后端返回的数据结构为 { datasets: [...] }
        setHistogramData({
          labels: ["No", "Seldom", "Sometimes", "Often", "Always"],
          datasets: response.data.datasets,
        });
      })
      .catch((error) =>
        console.error("Error fetching histogram data: ", error)
      );
  };

  const renderContent = () => {
    switch (activeButton) {
      case 1:
        return (
          <div
            style={{
              width: "600px", // 宽度值
              height: "600px", // 高度值
              marginTop: "100px",
            }}
          >
            <Doughnut data={chartData} options={tooltipOptions} />
          </div>
        );
      case 2:
        return (
          <div>
            <div style={{ marginTop: "40px" }}>
              <label style={{ marginLeft: "250px" }}>Select start time: </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{ marginLeft: "10px" }}
              />
              <label style={{ marginLeft: "40px" }}>Select end time: </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={{ marginLeft: "10px" }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "40px",
                  marginLeft: "450px",
                }}
              >
                {/* Filter按钮 */}
                <button
                  onClick={handleFilterClick}
                  style={{
                    backgroundColor: "#2256F0",
                    width: "100px",
                    textAlign: "center",
                    height: "25px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Filter
                </button>

                {/* Refresh按钮 */}
                <button
                  onClick={handleRefreshClick}
                  style={{
                    backgroundColor: "#4CAF50",
                    width: "100px",
                    marginLeft: "20px",
                    textAlign: "center",
                    height: "25px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Refresh
                </button>
              </div>

              <div
                style={{
                  width: "1100px", // 宽度值
                  height: "800px", // 高度值
                  marginTop: "40px",
                }}
              >
                {/* 条件渲染折线图，如果没有数据则显示空白div */}
                {lineChartData.labels.length > 0 ? (
                  <Line data={lineChartData} />
                ) : (
                  <div style={{ width: "100%", height: "100%" }}></div>
                )}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <div>
              {selectedQuestions.map((_, index: number) => (
                <select
                  style={{
                    marginBottom: "5px",
                    width: "400px",
                    marginRight: "30px",
                    marginTop: "20px",
                  }}
                  key={index}
                  value={selectedQuestions[index] || ""}
                  onChange={(e) =>
                    handleQuestionSelect(index, parseInt(e.target.value))
                  }
                >
                  <option value="">Select a question</option>
                  {questionOptions.map((question: Question) => (
                    <option key={question.qid} value={question.qid}>
                      {question.textEn}
                    </option>
                  ))}
                </select>
              ))}
              <button
                style={{ width: "100px", backgroundColor: "red" }}
                onClick={fetchHistogramData}
              >
                Compare
              </button>
              <button
                onClick={handleRefreshHistogram}
                style={{
                  width: "100px",
                  backgroundColor: "green",
                  marginLeft: "20px",
                }}
              >
                Refresh
              </button>
            </div>
            <div
              style={{
                width: "1300px", // 宽度值
                height: "800px", // 高度值
                marginTop: "40px",
                marginLeft: "50px",
              }}
            >
              {Object.keys(histogramData).length > 0 && (
                <Bar data={histogramData} />
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const mainContentStyle: React.CSSProperties = {
    padding: "0",
    display: "flex",
    flexDirection: "column" as "column", // 使用类型断言
    alignItems: "center",
    width: "calc(100% - 200px)",
  };

  const topBarStyle: React.CSSProperties = {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    padding: "10px 0",
  };
  const buttonStyle = {
    cursor: "pointer",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "white",
  };

  const buttonHoverStyle = {
    backgroundColor: "#F3F044",
    color: "white",
  };

  return (
    <div>
      <Header />
      <div className={classes.content}>
        <div className={classes.sidebarandmaincontent}>
          <Sidebar />
          <div style={mainContentStyle}>
            <div style={topBarStyle}>
              {buttonNames.map((name, index) => (
                <button
                  key={index}
                  onClick={() => handleButtonClick(index + 1)}
                  style={
                    activeButton === index + 1 ? buttonHoverStyle : buttonStyle
                  }
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#F3F044")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      activeButton === index + 1 ? "#F3F044" : "white")
                  }
                >
                  <span style={{ color: "black" }}>{name}</span>
                </button>
              ))}
            </div>
            <div>{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticsPage;
