<template>
    <div id="skill-level-pie-chart"></div>
  </template>
  
  <script>
  import Plotly from "plotly.js";
  
  export default {
    name: "SkillLevelPieChart",
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
            values: this.data.values,
            labels: this.data.labels, // ส่ง label เป็นชื่อ skill level เช่น "Expert", "Medium"
            type: "pie",
            marker: {
              colors: ["gray", "red", "yellow", "green"], // สีสำหรับแต่ละระดับ
            },
          },
        ];
  
        const layout = {
          title: "Skill Level Distribution",
          height: 450,
          width: 450,
        };
  
        Plotly.newPlot("skill-level-pie-chart", chartData, layout).then(() => {
          document
            .getElementById("skill-level-pie-chart")
            .on("plotly_click", this.onSliceClick);
        });
      },
      onSliceClick(eventData) {
        if (eventData.points && eventData.points.length > 0) {
          const sliceLabel = eventData.points[0].label; // ดึง label (ชื่อ skill level)
          console.log("Emitting Skill Level Label:", sliceLabel);
          this.$emit("filter", sliceLabel); // ส่ง label ไปยัง parent component
        } else {
          console.error("Invalid Plotly Event Data:", eventData);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  #skill-level-pie-chart {
    width: 100%;
    height: 100%;
  }
  </style>
  