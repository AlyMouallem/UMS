import React from "react";
import { Bar } from "react-chartjs-2";
import GaugeChart from "react-gauge-chart/dist";

const BarChart = ({ courses }) => {
  const grades = courses.map(({ grade }) => parseFloat(grade));
  const average =
    grades.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / grades.length;
  const codes = courses.map(({ code }) => code);

  const data = {
    labels: codes,
    datasets: [
      {
        label: "Average",
        data: grades,
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
          min: 0,
          max: 100,
          ticks: {
            stepSize: 10,
          },
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

  const getValue = () => {
    return calculateGpa(parseFloat(average));
  };
  return (
    <>
      <div className="chart ">
        <div>
          <Bar height="400" width="400" data={data} />
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
        </div>
        <div>
          <GaugeChart
            id="gauge-chart2"
            nrOfLevels={4}
            colors={["red", "green"]}
            textColor={"black"}
            formatTextValue={getValue}
            percent={average / 100 || 0}
          />
          <h2>GPA /4</h2>
        </div>
      </div>
    </>
  );
};

export default BarChart;
