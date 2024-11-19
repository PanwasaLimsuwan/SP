<template>
    <div class="employee-skill-table">
      <h3>Employee Skill</h3>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>EmpID</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th v-for="skill in skills" :key="skill">{{ skill }}</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(employee, index) in employees" :key="employee.EmpID">
            <td>{{ index + 1 }}</td>
            <td>{{ employee.EmpID }}</td>
            <td>{{ employee.Firstname }}</td>
            <td>{{ employee.Lastname }}</td>
            <td
              v-for="skill in skills"
              :key="skill"
              :class="getSkillLevelClass(employee[skill])"
            >
              {{ employee[skill] }}
            </td>
            <td>
            <button @click="$emit('selectEmployee', employee)">
                <img src="skill.png" alt="Skill" class="skill-icon" />
            </button>
          </td>
          </tr>
        </tbody>
      </table>
      <div class="legend">
        <span v-for="(level, index) in skillLevels" :key="index">
          <span :class="'legend-dot level-' + level.value"></span> {{ level.label }}
        </span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "EmployeeSkillTable",
    props: {
      employees: {
        type: Array,
        required: true,
      },
      skills: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        skillLevels: [
          { label: "Not Trained (0)", value: 0 },
          { label: "Basic (1)", value: 1 },
          { label: "Medium (2)", value: 2 },
          { label: "Expert (3)", value: 3 },
        ],
      };
    },
    methods: {
      getSkillLevelClass(level) {
        return `level-${level}`;
      },
    },
  };
  </script>
  
  <style scoped>
  .employee-skill-table {
    margin-top: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th,
  td {
    padding: 10px;
    text-align: center;
    border: 1px solid #ddd;
  }
  
  th {
    background-color: #f4f4f4;
  }
  
  /* .level-0 {
    background-color: gray;
  }
  
  .level-1 {
    background-color: #ffcccc;
  }
  
  .level-2 {
    background-color: #fff4cc;
  }
  
  .level-3 {
    background-color: #ccffcc;
  } */
  
  .legend {
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
  }
  
  .legend-dot {
    width: 15px;
    height: 15px;
    display: inline-block;
    border-radius: 50%;
    margin-right: 5px;
  }
  
  .level-0 {
    background: #ddd;
  }
  
  .level-1 {
    background: red;
  }
  
  .level-2 {
    background: yellow;
  }
  
  .level-3 {
    background: green;
  }

  button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

  .skill-icon {
  width: 30px;
  height: 30px;
}
  </style>
  