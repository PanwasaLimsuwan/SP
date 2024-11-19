<template>
    <div id="fully-skilled-pie-chart"></div>
  </template>
  
  <script>
  import Plotly from "plotly.js";
  
  export default {
    name: "FullySkilledPieChart",
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
    mounted() {
      this.drawChart();
    },
    methods: {
      drawChart() {
        const chartData = [
          {
            values: this.data.values, // เช่น [80, 20]
            labels: this.data.labels, // เช่น ["Fully Skilled", "Need Training"]
            type: "pie",
            marker: {
              colors: ["green", "red"], // สีสำหรับ Fully Skilled และ Need Training
            },
          },
        ];
  
        const layout = {
          title: "Skill Competency Overview", // ชื่อกราฟ
          height: 450,
          width: 450,
          paper_bgcolor: 'rgba(0,0,0,0)', // พื้นหลังด้านนอกเป็น transparent
        };
  
        Plotly.newPlot("fully-skilled-pie-chart", chartData, layout).then(() => {
          document
            .getElementById("fully-skilled-pie-chart")
            .on("plotly_click", this.onSliceClick);
        });
      },
      onSliceClick(eventData) {
      if (eventData.points && eventData.points.length > 0) {
        const sliceLabel = eventData.points[0].label;
        this.$emit("filter", sliceLabel);
      }
    },
  },
  };
  </script>
  
  <style scoped>
  #fully-skilled-pie-chart {
    width: 100%;
    height: 100%;
  }
  </style>
  