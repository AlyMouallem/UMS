import React from "react";
import { Bar } from "react-chartjs-2";
import GaugeChart from "react-gauge-chart/dist";

const DeanDashboard = ({ maxPC }) => {
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
    instructor[i] = maxPC[i].map(({ instructor }) => instructor);
    average[i] = mark[i].reduce((a, b) => a + b) / mark[i].length;
  }

  const GetBars = () => {
    return (
      <>
        {[...Array(length)].map((x, i) => (
          <>
            <div>
              <Bar
                key={i + 1 + i * i}
                width="400"
                height="400"
                data={{
                  labels: student[i],
                  datasets: [
                    {
                      label: `${instructor[i][0]}'s ${code[i][0]}  `,
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
                key={i * i}
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
      <h4>Below is a representation of top 5 students in all classes.</h4>
      <div className="chart">
        <>
          <GetBars />
        </>
      </div>
    </>
  );
};

export default DeanDashboard;
