import React from "react";

import CanvasJSReact from "../../../assets/canvasjs.react";

import classes from "./Chart.module.css";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Chart = ({ type, title, axisX, axisY, dataPoints }) => {
  const options = {
    title: {
      text: title,
    },
    axisX: {
      title: axisX,
    },
    axisY: {
      title: axisY,
    },
    data: [
      {
        type,
        dataPoints,
      },
    ],
  };
  return (
    <div className={classes.Chart}>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default Chart;
