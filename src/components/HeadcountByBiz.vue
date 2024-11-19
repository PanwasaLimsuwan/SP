<template>
    <div id="headcount-biz"></div>
  </template>
  
  <script>
  import Plotly from "plotly.js";
  
  export default {
    name: "HeadcountByBiz",
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
          title: "Head Count by Biz",
          height: 450,
          width: 450,
          paper_bgcolor: "rgba(0,0,0,0)", // พื้นหลังด้านนอกเป็น transparent
        };
  
        Plotly.newPlot("headcount-biz", chartData, layout).then(() => {
          document
            .getElementById("headcount-biz")
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
  #headcount-biz {
    width: 100%;
    height: 100%;
  }
  </style>
  