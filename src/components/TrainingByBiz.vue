<template>
    <div>
      <div>
        <!-- Dropdown สำหรับเลือก Business Unit -->
        <select v-model="selectedBiz" @change="filterChart">
          <!-- <option value="ALL">ALL</option> -->
          <option v-for="biz in Object.keys(data)" :key="biz" :value="biz">
            {{ biz }}
          </option>
        </select>
      </div>
      <div id="training-by-biz"></div>
    </div>
  </template>
  
  <script>
  import Plotly from "plotly.js";
  
  export default {
    name: "TrainingByBiz",
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        selectedBiz: "ALL", // ค่าเริ่มต้นเป็น ALL
        filteredData: {}, // เก็บข้อมูลที่กรองแล้ว
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
        // ดึงข้อมูลตาม Business Unit ที่เลือก
        if (this.selectedBiz in this.data) {
          this.filteredData = { ...this.data[this.selectedBiz] };
        } else {
          console.error("Invalid Business Unit selected");
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
              color: "purple",
            },
          },
        ];
  
        const layout = {
          title: `Training Employee by Biz: ${this.selectedBiz}`,
          xaxis: { title: "Business Unit" },
          yaxis: { title: "Employee Count" },
          paper_bgcolor: "rgba(0,0,0,0)", // พื้นหลังโปร่งใส
        };
  
        Plotly.newPlot("training-by-biz", chartData, layout);
      },
    },
    mounted() {
      this.filterChart(); // เรียกใช้เมื่อโหลดคอมโพเนนต์
    },
  };
  </script>
  
  <style scoped>
  #training-by-biz {
    width: 100%;
    height: 100%;
  }
  </style>
  