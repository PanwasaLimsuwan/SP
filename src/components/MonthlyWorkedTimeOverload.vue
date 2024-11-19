<template>
  <div id="monthly-worked-time-overload"></div>
</template>

<script>
import Plotly from "plotly.js";

export default {
  name: "MonthlyWorkedTimeOverload",
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
      const { months, workedTimeOverload } = this.data;

      const chartData = [
        {
          x: months,
          y: workedTimeOverload,
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
        title: "Monthly Worked Time Overload",
        xaxis: {
          title: "Months",
        },
        yaxis: {
          title: "Overload Hours",
        },
        height: 400,
        // width: 800,
        paper_bgcolor: "rgba(0,0,0,0)",
        // plot_bgcolor: "rgba(0,0,0,0)",
        responsive: true,
      };

      Plotly.newPlot("monthly-worked-time-overload", chartData, layout);
    },
  },
};
</script>

<style scoped>
#monthly-worked-time-overload {
  width: 100%;
  height: 100%;
}
</style>
