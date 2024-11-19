<template>
    <div id="worked-time-chart"></div>
  </template>
  
  <script>
  import Plotly from "plotly.js";
  
  export default {
    name: "WorkedTimeChart",
    props: {
      data: Array,
    },
    mounted() {
      this.drawChart();
    },
    methods: {
      drawChart() {
        const chartData = [
          {
            x: this.data.map(emp => emp.hours),
            y: this.data.map(emp => `${emp.firstname} ${emp.lastname}`),
            type: "bar",
            orientation: "h",
            marker: {
              color: this.data.map(emp => (emp.hours > 60 ? "red" : "yellow")),
            },
          },
        ];
  
        const layout = {
        title: "Worked Time (60hrs./week)",
        height: 300,
        margin: { l: 150, r: 20, t: 50, b: 50 },
        xaxis: { title: "Hours", automargin: true },
        yaxis: { automargin: true },
        responsive: true,
      };
  
        Plotly.newPlot("worked-time-chart", chartData, layout);
      },
    },
  };
  </script>
  
  <style scoped>
  #worked-time-chart {
    width: 100%;
    height: 100%;
  }
  </style>
  