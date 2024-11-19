<template>
  <div id="monthly-overtime"></div>
</template>

<script>
import Plotly from "plotly.js";

export default {
  name: "MothlyOvertime",
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
      const { months, overtimeHours } = this.data;

      const chartData = [
        {
          x: months,
          y: overtimeHours,
          type: "bar",
          marker: {
            color: "blue",
          },
        },
      ];

      const layout = {
        title: "Weekly Overtime (OT)",
        xaxis: {
          title: "Months",
        },
        yaxis: {
          title: "Overtime Hours",
        },
        height: 400,
        //   width: 800,
        paper_bgcolor: "rgba(0,0,0,0)",
        //   plot_bgcolor: "rgba(0,0,0,0)",
        responsive: true,
      };

      Plotly.newPlot("monthly-overtime", chartData, layout);
    },
  },
};
</script>

<style scoped>
#monthly-overtime {
  width: 100%;
  height: 100%;
}
</style>
