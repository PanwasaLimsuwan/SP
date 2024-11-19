<template>
    <div id="headcount-division"></div>
  </template>
  
  <script>
  import Plotly from "plotly.js";
  
  export default {
    name: "HeadcountByDivision",
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
        const chartData = [
          {
            values: this.data.values,
            labels: this.data.labels,
            type: "pie",
            marker: {
              colors: ["#33FF57", "#3357FF"],
            },
          },
        ];
  
        console.log("Chart Data to Plotly:", chartData);
  
        const layout = {
          title: "Head Count by Division",
          height: 450,
          width: 450,
          paper_bgcolor: "rgba(0,0,0,0)", // พื้นหลังด้านนอกเป็น transparent
        };
  
        Plotly.newPlot("headcount-division", chartData, layout).then(() => {
          document
            .getElementById("headcount-division")
            .on("plotly_click", this.onSliceClick);
        });
      },
  
      onSliceClick(eventData) {
        if (eventData.points && eventData.points.length > 0) {
          const sliceData = eventData.points[0];
          const label = sliceData.label || sliceData.text;
          if (label) {
            this.$emit("filter", label);
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  #headcount-division {
    width: 100%;
    height: 100%;
  }
  </style>
  