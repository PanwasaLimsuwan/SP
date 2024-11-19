<template>
  <div id="shift-support-chart"></div>
</template>

<script>
import Plotly from "plotly.js";

export default {
  name: "ShiftRequireSupport",
  props: {
    data: Object,
  },
  mounted() {
    this.drawChart();
  },
  watch: {
    data() {
      this.drawChart();
    },
  },
  methods: {
    drawChart() {
      if (!this.data) return;

      const { processes, dayShift, nightShift } = this.data;

      const chartData = [
        {
          x: processes,
          y: dayShift,
          type: "bar",
          name: "Shift : Day",
          marker: { color: "blue" },
        },
        {
          x: processes,
          y: nightShift,
          type: "bar",
          name: "Shift : Night",
          marker: { color: "red" },
        },
      ];

      const layout = {
        title: "Weekly Shift Require Support",
        barmode: "group",
        height: 300,
        xaxis: { title: "Process" },
        yaxis: { title: "Count", range: [0, 15] },
        responsive: true,
      };

      Plotly.newPlot("shift-support-chart", chartData, layout);
    },
  },
};
</script>
