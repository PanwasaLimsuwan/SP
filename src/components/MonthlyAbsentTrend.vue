<template>
    <div id="monthly-absent-trend"></div>
  </template>
  
  <script>
  import Plotly from "plotly.js";
  
  export default {
    name: "MonthlyAbsentTrend",
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
    mounted() {
      this.drawChart();
    },
    watch: {
      data: {
        deep: true,
        handler() {
          this.drawChart();
        },
      },
    },
    methods: {
      drawChart() {
        const { months, absentTrend } = this.data;
  
        const chartData = [
          {
            x: months,
            y: absentTrend,
            type: "scatter",
            mode: "lines+markers",
            marker: {
              color: "orange",
              size: 8,
            },
            line: {
              color: "orange",
            },
          },
        ];
  
        const layout = {
          title: "Monthly Absent Trend",
          xaxis: { title: "Months" },
          yaxis: { title: "Absent (%)" },
          height: 400,
        //   width: 800,
          paper_bgcolor: "rgba(0,0,0,0)",
        //   plot_bgcolor: "rgba(0,0,0,0)",
          responsive: true,
        };
  
        Plotly.newPlot("monthly-absent-trend", chartData, layout);
      },
    },
  };
  </script>
  
  <style scoped>
  #monthly-absent-trend {
    width: 100%;
    height: 100%;
  }
  </style>
  