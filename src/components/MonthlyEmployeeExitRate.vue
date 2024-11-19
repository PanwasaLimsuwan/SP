<template>
  <div id="monthly-employee-exit-rate"></div>
</template>

<script>
import Plotly from "plotly.js";

export default {
  name: "MonthlyEmployeeExitRate",
  props: {
    data: {
      type: Object,
      required: true,
      default: () => ({
        months: [],
        exitRate: [],
      }),
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
      const { months, exitRate } = this.data;

      const chartData = [
        {
          x: months,
          y: exitRate,
          type: "scatter",
          mode: "lines+markers",
          marker: {
            color: "red",
            size: 8,
          },
          line: {
            color: "red",
          },
        },
      ];

      const layout = {
        title: "Monthly Employee Exit Rate",
        xaxis: { title: "Months" },
        yaxis: { title: "Exit Rate (%)" },
        height: 400,
        // width: 800,
        paper_bgcolor: "rgba(0,0,0,0)",
        responsive: true,
      };

      Plotly.newPlot("monthly-employee-exit-rate", chartData, layout);
    },
  },
};
</script>

<style scoped>
#monthly-employee-exit-rate {
  width: 100%;
  height: 100%;
}
</style>
