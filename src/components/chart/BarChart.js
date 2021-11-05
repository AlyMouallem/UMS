import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import GaugeChart from "react-gauge-chart/dist";

const BarChart = ({ courses }) => {
  const colors = [];
  const grades = courses.map(({ grade }) => parseFloat(grade));
  const average =
    grades.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / grades.length;
  const codes = courses.map(({ code }) => code);

  useEffect(async () => {
    await getColors(grades);
  }, []);

  const getColors = async (grades) => {
    for (let i = 0; i < grades.length; i++) {
      console.log(grades[i]);
      switch (true) {
        case parseInt(grades[i]) < 60:
          colors[i] = "red";
          break;
        case 60 <= parseInt(grades[i]) && parseInt(grades[i]) < 70:
          colors[i] = "orangered";
          break;
        case 70 <= parseInt(grades[i]) && parseInt(grades[i]) < 80:
          colors[i] = "lightgreen";
          break;
        case parseInt(grades[i]) >= 80:
          colors[i] = "green";
          break;
      }
    }
  };
  const data = {
    labels: codes,
    datasets: [
      {
        label: "Average",
        data: grades,
        color: colors,
        backgroundColor: colors,
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
