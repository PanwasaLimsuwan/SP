<template>
    <div id="monthly-employee-hiring-rate"></div>
  </template>
  
  <script>
  import Plotly from "plotly.js";
  
  export default {
    name: "MonthlyEmployeeHiringRate",
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
        const { months, hiringRate } = this.data;
  
        const chartData = [
          {
            x: months,
            y: hiringRate,
            type: "scatter",
            mode: "lines+markers",
            marker: {
              color: "green",
              size: 8,
            },
            line: {
              color: "green",
            },
          },
        ];
  
        const layout = {
          title: "Monthly Employee Hiring Rate",
          xaxis: { title: "Months" },
          yaxis: { title: "Hiring Rate (%)" },
          height: 400,
        //   width: 800,
          paper_bgcolor: "rgba(0,0,0,0)",
        //   plot_bgcolor: "rgba(0,0,0,0)",
          responsive: true,
        };
  
        Plotly.newPlot("monthly-employee-hiring-rate", chartData, layout);
      },
    },
  };
  </script>
  
  <style scoped>
  #monthly-employee-hiring-rate {
    width: 100%;
    height: 100%;
  }
  </style>
  