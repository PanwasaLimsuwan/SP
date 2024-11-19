<template>
    <div v-if="employee" class="employee-section">
      <h3>{{ employee.Firstname }} {{ employee.Lastname }}</h3>
      <div v-for="skill in skills" :key="skill">
        <p>{{ skill }}: Level {{ employee[skill] }}</p>
        <div
          class="skill-bar"
          :style="{ 
            background: `linear-gradient(to right, ${getSkillColor(employee[skill])} ${(employee[skill] / 3) * 100}%, #ddd ${(employee[skill] / 3) * 100}%)`,
            width: '100%'
          }"
        ></div>
      </div>
    </div>
    <p v-else>กรุณาเลือกพนักงาน</p>
  </template>
  
  <script>
  export default {
    props: {
      employee: {
        type: Object,
        required: true,
      },
      skills: {
        type: Array,
        required: true,
      },
    },
    methods: {
      getSkillColor(level) {
        if (level === 3) return "green";
        if (level === 2) return "yellow";
        if (level === 1) return "red";
        if (level === 0) return "gray";
        return "transparent";
      },
    },
  };
  </script>
  
  <style scoped>
  .employee-section {
    margin-top: 20px;
  }
  
  .skill-bar {
    height: 20px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: gray; /* Default */
  }
  </style>
  