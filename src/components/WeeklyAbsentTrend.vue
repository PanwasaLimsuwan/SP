<template>
    <div id="weekly-absent-trend"></div>
  </template>
  
  <script>
  import Plotly from "plotly.js";
  
  export default {
    name: "WeeklyAbsentTrend",
    props: {
      data: Object,
    },
    mounted() {
      this.drawChart();
    },
    methods: {
      drawChart() {
        const chartData = [
          {
            x: this.data.days,
            y: this.data.absences,
            type: "scatter",
            mode: "lines+markers",
            line: { color: "red" },
          },
        ];
  
        const layout = {
        title: "Weekly Absent Trend",
        height: 300,
        margin: { l: 50, r: 20, t: 50, b: 50 },
        xaxis: { title: "Days", automargin: true },
        yaxis: {
          title: "Absences",
          range: [0, 50], // กำหนดช่วงแกน y
          tick0: 0,
          dtick: 10, // ให้แสดง tick ทุก 10 หน่วย
        },
        responsive: true,
      };
  
        Plotly.newPlot("weekly-absent-trend", chartData, layout);
      },
    },
  };
  </script>
  
  <style scoped>
  #weekly-absent-trend {
    width: 100%;
    height: 100%;
  }
  </style>
  