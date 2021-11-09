import React from "react";
import { Bar } from "react-chartjs-2";
import GaugeChart from "react-gauge-chart/dist";
import { Link } from "react-router-dom";
const IDDashboard = ({ maxPC, dean }) => {
  const length = maxPC.length;
  const code = [];
  const student = [];
  const mark = [];
  const average = [];
  const instructor = [];

  for (let i = 0; i < maxPC.length; i++) {
    code[i] = maxPC[i].map(({ code }) => code);
    student[i] = maxPC[i].map(({ student }) => student);
    mark[i] = maxPC[i].map(({ grade }) => grade);
    average[i] = mark[i].reduce((a, b) => a + b) / mark[i].length;
    if (dean) {
      instructor[i] = maxPC[i].map(({ instructor }) => instructor);
    } else {
      instructor[i] = ["", ""];
    }
  }

  const GetBars = () => {
    return (
      <>
        {[...Array(length)].map((x, i) => (
          <>
            <div key={i + 1 * Math.random() * 1000}>
              <Link to={`instructor-students/${code[i][0]}`}>
                <h1> {code[i][0]}</h1>
              </Link>
              <Bar
                key={i + 1 * Math.random() * 1000}
                width="400"
                height="350"
                data={{
                  labels: student[i],
                  datasets: [
                    {
                      label: `${instructor[i][0]} ${code[i][0]} `,
                      data: mark[i],
                      backgroundColor: function (context) {
                        const index = context.dataIndex;
                        const value = context.dataset.data[index];
                        return value < 60
                          ? "red"
                          : value >= 60 && value < 70
                          ? "orangered"
                          : value >= 70 && value < 80
                          ? "lightgreen"
                          : value >= 80 && "green";
                      },
                    },
                  ],
                  options: {
                    scales: {
                      y: {
                        max: 100,
                        min: 0,
                        ticks: {
                          stepSize: 10,
                        },
                      },
                    },
                  },
                }}
              />
              <GaugeChart
                key={i + 1 * i}
                id="gauge-chart2"
                nrOfLevels={20}
                colors={["red", "green"]}
                textColor={"black"}
                percent={average[i] / 100 || 0}
              />

              <h2>Average %</h2>
            </div>
          </>
        ))}
      </>
    );
  };

  return (
    <>
      <div className="chart">
        <>
          <GetBars />
        </>
      </div>
    </>
  );
};

export default IDDashboard;
