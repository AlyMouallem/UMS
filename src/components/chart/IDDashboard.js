import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import GaugeChart from "react-gauge-chart/dist";
import { Link } from "react-router-dom";
import Filter from "./../forms/Filter";
const IDDashboard = ({ maxPC, dean }) => {
  const length = maxPC.length;
  const [code, setCode] = useState([]);
  const student = [];
  const mark = [];
  const average = [];
  const instructor = [];
  const [item, setItem] = useState([]);
  const [header, setHeader] = useState(
    `Below is a representation of all classes.To get detailed info about a specific class, click on the class code above the chart.`
  );
  var indexF = [];

  for (let i = 0; i < maxPC.length; i++) {
    code[i] = maxPC[i].map(({ code }) => code).slice(0, 1);

    student[i] = maxPC[i].map(({ student }) => student);
    mark[i] = maxPC[i].map(({ grade }) => grade);
    average[i] = mark[i].reduce((a, b) => a + b) / mark[i].length;
    if (dean) {
      instructor[i] = maxPC[i].map(({ instructor }) => instructor).slice(0, 1);
    } else {
      instructor[i] = [""];
    }
  }
  const codes = [...Array(length)].map((x, i) => {
    return code[i][0];
  });

  const handleClick = (item) => {
    setCode(code.filter((code) => code === item));
    const codek = code.reduce((a, b) => a.concat(b), []);
    indexF = codek.indexOf(item);
    setItem(indexF);
    if (item !== "All") {
      setHeader(
        `Below is a representation of ${item} class. For detailed info, click on the class code.`
      );
    } else {
      setHeader(
        `Below is a representation of all classes.To get detailed info about a specific class, click on the class code above the chart.`
      );
    }
  };

  const GetBars = ({ item }) => {
    return (
      <>
        {item === -1 || item.length === 0
          ? [...Array(length)].map((x, i) => (
              <>
                <div key={i + 3 * Math.random() * 1000}>
                  <Link to={`instructor-students/${code[i]}`}>
                    <h1> {code[i]}</h1>
                  </Link>
                  <Bar
                    key={i + 5 * Math.random() * 12}
                    width="300"
                    height="300"
                    data={{
                      labels: student[i],
                      datasets: [
                        {
                          label: `${instructor[i]} ${code[i]} `,
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
                    }}
                  />
                  <GaugeChart
                    key={(i + 1) * Math.random() * 19}
                    id="gauge-chart2"
                    nrOfLevels={20}
                    colors={["red", "green"]}
                    textColor={"black"}
                    percent={average[i] / 100 || 0}
                  />

                  <h2>Average %</h2>
                </div>
              </>
            ))
          : [...Array(length)].map((x, i) => (
              <>
                {item === i && (
                  <>
                    <div>
                      <Link to={`instructor-students/${code[i]}`}>
                        <h1> {code[i]}</h1>
                      </Link>
                      <Bar
                        key={i + 5 * Math.random() * 12}
                        width="300"
                        height="300"
                        data={{
                          labels: student[i],
                          datasets: [
                            {
                              label: `${instructor[i]}'s ${code[i]} `,
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
                        }}
                      />
                    </div>
                    <div style={{ position: "relative", marginTop: "10%" }}>
                      <GaugeChart
                        key={(i + 1) * Math.random() * 19}
                        id="gauge-chart2"
                        nrOfLevels={20}
                        colors={["red", "green"]}
                        textColor={"black"}
                        percent={average[i] / 100 || 0}
                      />

                      <h2>Average %</h2>
                    </div>
                  </>
                )}
              </>
            ))}
      </>
    );
  };

  return (
    <>
      <h4>{header}</h4>
      <div className="row">
        <div className="col col-sm-2">
          <h4>Filter by code</h4>
          <Filter items={codes} handleClick={handleClick} />
        </div>
        <div className="col col-sm-10">
          <div key={Math.random() * 1948} className="chart">
            <GetBars item={item} />
          </div>
        </div>
      </div>
    </>
  );
};

export default IDDashboard;
