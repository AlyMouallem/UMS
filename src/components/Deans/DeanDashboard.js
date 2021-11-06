import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import GaugeChart from "react-gauge-chart/dist";

const DeanDashboard = ({ maxPC }) => {
  const length = maxPC.length;
  useEffect(async () => {}, []);

  const code = [];
  const student = [];
  const mark = [];
  const colors = [];
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
                key={i}
                width="400"
                height="400"
                data={{
                  labels: student[i],
                  datasets: [
                    {
                      label: `${instructor[i][0]}'s ${code[i][0]}  `,
                      data: mark[i],
                      color: colors,
                    },
                  ],
                  options: {
                    scales: {
                      y: {
                        max: 100,
                        min: 0,
                        ticks: {
                          stepSize: 5,
                        },
                      },
                    },
                  },
                }}
              />
              <GaugeChart
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
