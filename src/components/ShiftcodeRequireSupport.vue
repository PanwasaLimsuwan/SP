<template>
  <div id="shiftcode-support-chart"></div>
</template>

<script>
import Plotly from "plotly.js";

export default {
  name: "ShiftcodeRequireSupport",
  props: {
    data: Object,
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      const { processes, shiftA, shiftB, shiftC } = this.data;

      const chartData = [
        {
          x: processes,
          y: shiftA,
          type: "bar",
          name: "Shiftcode : A",
          marker: { color: "yellow" },
        },
        {
          x: processes,
          y: shiftB,
          type: "bar",
          name: "Shiftcode : B",
          marker: { color: "pink" },
        },
        {
          x: processes,
          y: shiftC,
          type: "bar",
          name: "Shiftcode : C",
          marker: { color: "lightgreen" },
        },
      ];

      const layout = {
        title: "Weekly Shiftcode Require Support",
        barmode: "stack",
        height: 300,
        xaxis: { title: "Process" },
        yaxis: { title: "Count", range: [0, 20] },
        responsive: true,
      };

      Plotly.newPlot("shiftcode-support-chart", chartData, layout).then(() => {
        document
          .getElementById("shiftcode-support-chart")
          .on("plotly_click", this.onBarClick);
      });
    },
    onBarClick(eventData) {
      if (eventData.points && eventData.points.length > 0) {
        const clickedShiftcode = eventData.points[0].data.name.split(" ")[2];
        console.log("Selected Shiftcode:", clickedShiftcode);
        this.$emit("filterShift", clickedShiftcode);
      }
    },
  },
};
</script>
