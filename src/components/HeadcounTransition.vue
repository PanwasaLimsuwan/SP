<template>
    <div id="headcount-transition-chart"></div>
  </template>
  
  <script>
  import Plotly from "plotly.js";
  
  export default {
    name: "HeadcountTransitionChart",
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
        const months = this.data.months || []; // X-axis: Months
        const newEmployees = this.data.newEmployees || []; // Y-axis: New employees
        const resignedEmployees = this.data.resignedEmployees || []; // Y-axis: Resigned employees
  
        const chartData = [
          {
            x: months,
            y: newEmployees,
            name: "พนักงานใหม่", // New employees
            type: "bar",
            marker: {
              color: "blue",
            },
          },
          {
            x: months,
            y: resignedEmployees.map((value) => -value), // Negative values for resigned employees
            name: "พนักงานที่ลาออก", // Resigned employees
            type: "bar",
            marker: {
              color: "red",
            },
          },
        ];
  
        const layout = {
          title: "Headcount Transition",
          barmode: "relative",
          height: 500,
        //   width: 1000,
          xaxis: {
            title: "Months",
            showgrid: false,
          },
          yaxis: {
            title: "Number of Employees",
          },
          legend: {
            x: 1,
            y: 1,
          },
          paper_bgcolor: "rgba(0,0,0,0)",
        //   plot_bgcolor: "rgba(0,0,0,0)",
          responsive: true,
        };
  
        Plotly.newPlot("headcount-transition-chart", chartData, layout);
      },
    },
  };
  </script>
  
  <style scoped>
  #headcount-transition-chart {
    width: 100%;
    height: 100%;
  }
  </style>
  