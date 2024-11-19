<template>
  <div id="bar-chart"></div>
</template>

<script>
import Plotly from "plotly.js";

export default {
  name: "BarChart",
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
          x: ["ASSY", "MOKU", "CSAT", "JUNB"],
          y: [2, 2, 2, 1],
          name: "Material",
          type: "bar",
          text: [2, 2, 2, 1], // ตัวเลขที่จะแสดง
          textposition: "auto", // แสดงบน bar
          marker: { color: "#76c7c0" },
        },
        {
          x: ["ASSY", "MOKU", "CSAT", "JUNB"],
          y: [1, 0, 1, 0],
          name: "Operation",
          type: "bar",
          text: [1, 0, 1, 0], // ตัวเลขที่จะแสดง
          textposition: "auto",
          marker: { color: "#ff9800" },
        },
        {
          x: ["ASSY", "MOKU", "CSAT", "JUNB"],
          y: [0, 0, 1, 0],
          name: "Machine:SAB#1",
          type: "bar",
          text: [0, 0, 1, 0],
          textposition: "auto",
          marker: { color: "#ffc107" },
        },
        {
          x: ["ASSY", "MOKU", "CSAT", "JUNB"],
          y: [0, 0, 1, 0],
          name: "Machine:SAB#2",
          type: "bar",
          text: [0, 0, 1, 0],
          textposition: "auto",
          marker: { color: "#8bc34a" },
        },
        {
          x: ["ASSY", "MOKU", "CSAT", "JUNB"],
          y: [0, 0, 1, 0],
          name: "Machine:SAB#3",
          type: "bar",
          text: [0, 0, 1, 0],
          textposition: "auto",
          marker: { color: "#2196f3" },
        },
        {
          x: ["ASSY", "MOKU", "CSAT", "JUNB"],
          y: [1, 0, 0, 1],
          name: "Inspection",
          type: "bar",
          text: [1, 0, 0, 1],
          textposition: "auto",
          marker: { color: "#e91e63" },
        },
      ];

      const layout = {
        title: "Require Support (Process)",
        barmode: "stack",
        height: 400,
        width: 700,
        legend: { orientation: "v", x: 1.1, y: 1 },
        xaxis: { title: "Process" },
        yaxis: { title: "Employees" },
      };

      Plotly.newPlot("bar-chart", chartData, layout).then((chart) => {
  chart.on("plotly_click", (data) => {
    if (data.points && data.points.length > 0) {
      const clickedSkill = data.points[0].data.name; // ชื่อ skill
      this.$emit("filterSkill", clickedSkill); // ส่ง event กลับไปที่ parent
      console.log("Clicked Skill:", clickedSkill); // Debug
    } else {
      console.warn("No points clicked!");
    }
  });
});

    },
  },
};
</script>

<style scoped>
#bar-chart {
  width: 100%;
  height: 100%;
}
</style>
