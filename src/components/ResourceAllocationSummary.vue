<template>
    <div id="resource-allocation-summary"></div>
  </template>
  
  <script>
  import Plotly from "plotly.js";
  
  export default {
    name: "ResourceAllocationSummary",
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
            x: this.data.processes,
            y: this.data.resources,
            type: "scatter",
            mode: "lines+markers",
            line: { color: "blue" },
          },
        ];
  
        const layout = {
        title: "Resource Allocation Summary",
        height: 300,
        margin: { l: 50, r: 20, t: 50, b: 50 },
        xaxis: { title: "Process", automargin: true },
        yaxis: {
          title: "Resources",
          range: [0, 25], // กำหนดช่วงแกน y
          tick0: 0,
          dtick: 5, // ให้แสดง tick ทุก 10 หน่วย
        },
        responsive: true,
      };
  
        Plotly.newPlot("resource-allocation-summary", chartData, layout);
      },
    },
  };
  </script>
  
  <style scoped>
  #resource-allocation-summary {
    width: 100%;
    height: 100%;
  }
  </style>
  