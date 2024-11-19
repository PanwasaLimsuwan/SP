<template>
    <div id="overtime-chart"></div>
  </template>
  
  <script>
  import Plotly from "plotly.js";
  
  export default {
    name: "WeeklyOvertime",
    props: {
      data: Object,
    },
    mounted() {
      this.drawChart();
    },
    methods: {
      drawChart() {
        const { processes, overtime } = this.data;
  
        const chartData = [
          {
            x: processes,
            y: overtime,
            type: "bar",
            marker: { color: "purple" },
          },
        ];
  
        const layout = {
          title: "Weekly Overtime (OT)",
          height: 300,
          xaxis: { title: "Process" },
          yaxis: { title: "Hours", range: [0, 40] },
          responsive: true,
        };
  
        Plotly.newPlot("overtime-chart", chartData, layout);
      },
    },
  };
  </script>
  