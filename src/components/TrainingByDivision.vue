<template>
    <div>
      <div>
        <!-- Dropdown สำหรับเลือก Division -->
        <select v-model="selectedDivision" @change="filterChart">
          <!-- <option value="ALL">ALL</option> -->
          <option v-for="division in Object.keys(data)" :key="division" :value="division">
            {{ division }}
          </option>
        </select>
      </div>
      <div id="training-by-division"></div>
    </div>
  </template>
  
  <script>
  import Plotly from "plotly.js";
  
  export default {
    name: "TrainingByDivision",
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        selectedDivision: "ALL", // ค่าเริ่มต้นคือ ALL
        filteredData: {}, // เก็บข้อมูลที่ถูกกรองแล้ว
      };
    },
    watch: {
      // หากมีการเปลี่ยนแปลงข้อมูล ให้วาดกราฟใหม่
      data: {
        deep: true,
        handler() {
          this.filterChart();
        },
      },
    },
    methods: {
      filterChart() {
        // ดึงข้อมูลตาม Division ที่เลือก
        if (this.selectedDivision in this.data) {
          this.filteredData = { ...this.data[this.selectedDivision] };
        } else {
          console.error("Invalid Division selected");
        }
        this.drawChart(); // อัปเดตกราฟ
      },
      drawChart() {
        const chartData = [
          {
            x: this.filteredData.labels,
            y: this.filteredData.values,
            type: "bar",
            marker: {
              color: "blue",
            },
          },
        ];
  
        const layout = {
          title: `Training Employee by Division: ${this.selectedDivision}`,
          xaxis: { title: "Department" },
          yaxis: { title: "Employee Count" },
          paper_bgcolor: "rgba(0,0,0,0)", // พื้นหลังโปร่งใส
        };
  
        Plotly.newPlot("training-by-division", chartData, layout);
      },
    },
    mounted() {
      this.filterChart(); // เรียกใช้เมื่อโหลดคอมโพเนนต์
    },
  };
  </script>
  
  <style scoped>
  #training-by-division {
    width: 100%;
    height: 100%;
  }
  </style>
  