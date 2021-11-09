import React from "react";
import { Bar } from "react-chartjs-2";
import GaugeChart from "react-gauge-chart/dist";

const StudentDashboard = ({ courses }) => {
  const grades = courses.map(({ grade }) => parseFloat(grade));
  const average =
    grades.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / grades.length;
  const codes = courses.map(({ code }) => code);

  const data = {
    labels: codes,
    datasets: [
      {
        label: "Total",
        data: grades,
        backgroundColor: (context) => {
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
  };
  const options = {
    scales: {
      yAxes: {
        min: 0,
        max: 100,
        ticks: {
          steps: 10,
          stepSize: 10,
        },
      },
    },
  };
  const calculateGpa = (average) => {
    switch (true) {
      case 60 <= average && average < 70:
        return parseFloat("1." + (`${average}` % 10), 2);
      case 70 <= average && average < 80:
        return parseFloat("2." + (`${average}` % 10), 2);
      case 80 <= average && average < 90:
        return parseFloat("3." + (`${average}` % 10), 2);
      case 90 <= average:
        return 4;
      default:
        return 0;
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-8">
          <div className="chart ">
            <div style={{ height: 500, width: 400 }}>
              <Bar height={300} data={data} options={options} />
              <h2>Total per course</h2>
            </div>
            <div>
              <GaugeChart
                id="gauge-chart2"
                nrOfLevels={20}
                colors={["red", "green"]}
                textColor={"black"}
                percent={average / 100 || 0}
              />
              <h2>Total average %</h2>

              <GaugeChart
                id="gauge-chart2"
                nrOfLevels={4}
                colors={["red", "green"]}
                textColor={"black"}
                formatTextValue={() => calculateGpa(parseFloat(average))}
                percent={average / 100 || 0}
              />
              <h2>GPA /4</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
