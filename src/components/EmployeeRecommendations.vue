<template>
  <div class="employee-recommendations">
    <h3>แนะนำพนักงาน</h3>
    <table>
      <thead>
        <tr>
          <th>No.</th>
          <th>EmpID</th>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Work Time</th>
          <!-- <th>Allocate</th> -->
           <th>Skill</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(employee, index) in employees" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ employee.EmpID }}</td>
          <td>{{ employee.Firstname }}</td>
          <td>{{ employee.Lastname }}</td>
          <td>{{ employee.WorkTime }}</td>
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
  </div>
</template>

<script>
export default {
  name: "EmployeeRecommendations",
  props: {
    employees: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.employee-recommendations {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}

button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

th:nth-child(6),
td:nth-child(6) {
  width: 80px; /* กำหนดความกว้างเฉพาะคอลัมน์ Skill */
}


  .skill-icon {
  width: 30px;
  height: 30px;
  padding: 5px; /* เพิ่มระยะห่างรอบ ๆ ไอคอน */
}
</style>
