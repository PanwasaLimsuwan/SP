<template>
  <div class="DashboardHR">
    <header class="header">
      <img src="logo.png" alt="Sony Logo" class="logo" />
      <div class="filters">
        <select>
          <option>Division : ALL</option>
        </select>
        <select>
          <option>Department : ALL</option>
        </select>
        <select>
          <option>Section : ALL</option>
        </select>
        <select>
          <option>Biz : ALL</option>
        </select>
        <select>
          <option>Process : ALL</option>
        </select>
        <input type="text" placeholder="Search" />
      </div>
    </header>

    <!-- สถิติ -->
    <section class="stats">
      <div class="stat-card" v-for="(card, index) in stats" :key="index">
        <div class="icon-container">
          <!-- ใช้ dot แทน icon -->
          <span
            v-if="card.dotColor"
            :style="{ backgroundColor: card.dotColor }"
            class="status-dot"
          ></span>
          <img v-else-if="card.icon" :src="card.icon" alt="Icon" class="icon" />
        </div>
        <div class="content">
          <!-- เปลี่ยนสีของตัวเลขเฉพาะช่องที่ label คือ 'ต้องการพนักงาน' -->
          <h3
            :style="{
              color: card.label === 'ต้องการพนักงาน' ? '#ff0000' : '#000',
            }"
          >
            {{ card.value }}
          </h3>
          <p>{{ card.label }}</p>
          <p v-if="card.subLabel" class="sub-label">{{ card.subLabel }}</p>
        </div>
      </div>
    </section>

    <!-- โซน Pie Chart และ Employee Table -->
    <section class="charts">
      <div class="chart">
        <button @click="resetFilters">
          <img src="refresh.png" alt="Refresh" class="refresh-icon" />
        </button>
        <PieChart :data="pieChartData" @filter="filterEmployeesByStatus" />
      </div>
      <div class="table">
        <EmployeeTable
          :employees="
            filteredEmployees.length > 0 ? filteredEmployees : sortedEmployees
          "
        />
      </div>
    </section>

    <!-- โซน EmployeeSkillSection -->
    <section class="charts">
      <div class="table">
        <!-- ตารางพนักงานไม่ถูกฟิลเตอร์ -->
        <EmployeeSkillTable
          :employees="employees"
          :skills="skills"
          @selectEmployee="selectEmployee"
        />
      </div>
      <div class="table" ref="skillSection">
        <!-- แสดงข้อมูลพนักงานที่เลือก -->
        <EmployeeSkillSection
          v-if="selectedEmployee"
          :employee="selectedEmployee"
          :skills="skills"
        />
      </div>
    </section>

    <section class="charts">
      <div class="chart">
        <button @click="resetFilters">
          <img src="refresh.png" alt="Refresh" class="refresh-icon" />
        </button>
        <fullySkilledPieChart
          :data="fullySkilled"
          @filter="filterEmployeesBySkill2"
        />
      </div>
      <div class="table">
        <EmployeeSkillTable
          :employees="filteredFullySkilled"
          :skills="skills"
          @selectEmployee="selectEmployee"
        />
      </div>
    </section>

    <!-- โซน TrainingByDivision และ TrainingByBiz -->
    <section class="charts">
      <div class="chart">
        <TrainingByDivision :data="filteredDivisionData" />
      </div>
      <div class="chart">
        <TrainingByBiz :data="bizData" />
      </div>
    </section>

    <!-- โซน HeadcountByDivision -->
    <section class="charts">
      <div class="chart">
        <button @click="resetFilters">
          <img src="refresh.png" alt="Refresh" class="refresh-icon" />
        </button>
        <HeadcountByDivision
          :data="headcountDataDivision"
          @filter="filterEmployeesByDivision"
        />
      </div>
      <div class="table">
        <EmployeeTable
          :employees="
            filteredEmployeesDivision.length > 0
              ? filteredEmployeesDivision
              : employeesSorted
          "
        />
      </div>
    </section>

    <section class="charts">
      <div class="chart">
        <button @click="resetFilters">
          <img src="refresh.png" alt="Refresh" class="refresh-icon" />
        </button>
        <HeadcountByBiz
          :data="headcountDataBiz"
          @filter="filterEmployeesByBiz"
        />
      </div>
      <div class="table">
        <EmployeeTable
          :employees="
            filteredEmployeesBiz.length > 0
              ? filteredEmployeesBiz
              : employeesSorted
          "
        />
      </div>
    </section>

    <section class="charts">
      <div class="chart">
        <button @click="resetFilters">
          <img src="refresh.png" alt="Refresh" class="refresh-icon" />
        </button>
        <HeadcountByWorkGroup
          :data="headcountWorkGroup"
          @filter="filterEmployeesByWorkGroup"
        />
      </div>
      <div class="table">
        <EmployeeTable
          :employees="
            filteredEmployeesWorkGroup.length > 0
              ? filteredEmployeesWorkGroup
              : employeesSorted
          "
        />
      </div>
    </section>

    <section class="charts">
      <div class="chart">
        <button @click="resetFilters">
          <img src="refresh.png" alt="Refresh" class="refresh-icon" />
        </button>
        <HeadcounTransition :data="headcountTransition" />
      </div>
    </section>

    <section class="charts">
      <div class="chart">
        <MonthlyAbsentTrend :data="monthlyAbsent" />
      </div>
    </section>

    <section class="charts">
      <div class="chart">
        <MonthlyEmployeeExitRate :data="monthlyExitRate" />
      </div>
    </section>

    <section class="charts">
      <div class="chart">
        <MonthlyEmployeeHiringRate :data="monthlyHiringRate" />
      </div>
    </section>

    <section class="charts">
      <div class="chart">
        <MonthlyWorkedTimeOverload :data="monthlyWorkTimeOverload" />
      </div>
    </section>

    <section class="charts">
      <div class="chart">
        <MonthlyWorkTime :data="monthlyOvertime" />
      </div>
    </section>
  </div>
</template>

<script>
import PieChart from "./../components/PieChart.vue";
import EmployeeTable from "./../components/EmployeeTable.vue";
import EmployeeSkillTable from "./../components/EmployeeSkillTable.vue";
import EmployeeSkillSection from "./../components/EmployeeSkillSection.vue";
import fullySkilledPieChart from "./../components/fullySkilledPieChart.vue";
import TrainingByDivision from "./../components/TrainingByDivision.vue";
import TrainingByBiz from "./../components/TrainingByBiz.vue";
import HeadcountByDivision from "./../components/HeadcountByDivision.vue";
import HeadcountByBiz from "./../components/HeadcountByBiz.vue";
import HeadcountByWorkGroup from "./../components/HeadcountByWorkGroup.vue";
import HeadcounTransition from "./../components/HeadcounTransition.vue";
import MonthlyWorkedTimeOverload from "./../components/MonthlyWorkedTimeOverload.vue";
import MonthlyWorkTime from "./../components/MonthlyWorkTime.vue";
import MonthlyAbsentTrend from "./../components/MonthlyAbsentTrend.vue";
import MonthlyEmployeeExitRate from "./../components/MonthlyEmployeeExitRate.vue";
import MonthlyEmployeeHiringRate from "./../components/MonthlyEmployeeHiringRate.vue";

export default {
  components: {
    PieChart,
    EmployeeTable,
    EmployeeSkillTable,
    EmployeeSkillSection,
    fullySkilledPieChart,
    TrainingByDivision,
    TrainingByBiz,
    HeadcountByDivision,
    HeadcountByBiz,
    HeadcountByWorkGroup,
    HeadcounTransition,
    MonthlyWorkedTimeOverload,
    MonthlyWorkTime,
    MonthlyAbsentTrend,
    MonthlyEmployeeExitRate,
    MonthlyEmployeeHiringRate,
  },
  data() {
    return {
      stats: [
        {
          value: "7:15",
          label: "SHIFT : DAY",
          subLabel: "3/10/2024",
          icon: "clock.png",
        },
        { value: 150, label: "พนักงานทั้งหมด", subLabel: "คน" },
        {
          value: 85,
          label: "In Cleanroom",
          subLabel: "คน",
          dotColor: "#00cc66",
        },
        {
          value: 33,
          label: "Out Cleanroom",
          subLabel: "คน",
          dotColor: "#ffcc00",
        },
        { value: 0, label: "ขาดงาน", subLabel: "คน", dotColor: "#ff6666" },
        { value: 11, label: "ต้องการพนักงาน", subLabel: "คน" },
      ],

      pieChartData: {
        values: [85, 33, 5],
        labels: ["In Cleanroom", "Out Cleanroom", "ขาดงาน"],
        type: "pie",
      },
      employees: [
        {
          EmpID: "202035",
          Firstname: "Patchara",
          Lastname: "Khuneept",
          Datetime: "2023-09-01 07:15:00",
          GateNo: "D01",
          WorkGroup: "FTE",
          Division: "ISM",
          Department: "MF2",
          Biz: "IS",
          Process: "ASSY",
          CourseGroup: "Injection",
          Status: "In Cleanroom",
          Material: 3,
          Operation: 3,
          "Machine:SAB#1": 3,
          "Machine:SAB#2": 3,
          "Machine:SAB#3": 3,
          Inspection: 3,
          WorkTime: "20/60 hrs", // Work Time
        },
        {
          EmpID: "202034",
          Firstname: "Tanwaruth",
          Lastname: "Papapai",
          Datetime: "2023-09-01 07:12:00",
          GateNo: "D02",
          WorkGroup: "FTE",
          Division: "ISM",
          Department: "MF1",
          Biz: "HTPS",
          Process: "CSAT",
          CourseGroup: "OJT",
          Status: "Out Cleanroom",
          Material: 3,
          Operation: 2,
          "Machine:SAB#1": 3,
          "Machine:SAB#2": 1,
          "Machine:SAB#3": 3,
          Inspection: 3,
          WorkTime: "50/60 hrs", // Work Time
        },
        {
          EmpID: "202033",
          Firstname: "Sudaporn",
          Lastname: "Sena",
          Datetime: "-",
          GateNo: "-",
          WorkGroup: "FTE",
          Division: "ISM",
          Department: "MF2",
          Biz: "MOLED",
          Process: "JUNB",
          CourseGroup: "OJT",
          Status: "ขาดงาน",
          Material: 3,
          Operation: 3,
          "Machine:SAB#1": 0,
          "Machine:SAB#2": 2,
          "Machine:SAB#3": 1,
          Inspection: 1,
          WorkTime: "40/60 hrs", // Work Time
        },
      ],
      skills: [
        "Material",
        "Operation",
        "Machine:SAB#1",
        "Machine:SAB#2",
        "Machine:SAB#3",
        "Inspection",
      ],
      // ข้อมูลต้นฉบับ
      divisionData: {
        ALL: {
          labels: ["ISM", "DDM", "LDM"],
          values: [40, 30, 30],
        },
        ISM: {
          labels: ["MF1", "MF2"],
          values: [10, 20],
        },
        DDM: {
          labels: ["MF1", "MF2"],
          values: [25, 30],
        },
        LDM: {
          labels: ["MF1", "MF2"],
          values: [20, 35],
        },
      },

      bizData: {
        ALL: {
          labels: ["IS", "IS-BMS", "HTPS", "MOLED", "SMOLED"],
          values: [50, 30, 20, 25, 15],
        },
        ISBMS: {
          labels: ["ASSY", "MOKU", "CSAT", "JUNB"],
          values: [20, 15, 10, 5],
        },
        HTPS: {
          labels: ["ASSY", "MOKU", "CSAT", "JUNB"],
          values: [10, 23, 38, 12],
        },
        MOLED: {
          labels: ["ASSY", "MOKU", "CSAT", "JUNB"],
          values: [5, 10, 15, 20],
        },
        SMOLED: {
          labels: ["ASSY", "MOKU", "CSAT", "JUNB"],
          values: [8, 9, 8, 7],
        },
      },
      headcountDataDivision: {
        labels: ["ISM", "DDM", "LDM"],
        values: [40, 30, 20],
        // colors: ["#33FF57", "#3357FF"],
        type: "pie",
      },
      headcountDataBiz: {
        labels: ["IS", "IS-BMS", "HTPS", "MOLED", "SMOLED"],
        values: [50, 30, 20, 25, 15],
        // colors: ["#33FF57", "#3357FF"],
        type: "pie",
      },
      headcountWorkGroup: {
        labels: ["FTE", "Shift", "Office", "Mananger"],
        values: [50, 30, 20, 25],
        // colors: ["#33FF57", "#3357FF"],
        type: "pie",
      },
      headcountTransition: {
        months: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUNE",
          "JULY",
          "AUG",
          "SEPT",
          "OCT",
          "NOV",
          "DEC",
        ], // Months on the x-axis
        newEmployees: [12, 15, 18, 20, 10, 8, 7, 5, 12, 15, 18, 20], // New employees for each month
        resignedEmployees: [10, 15, 13, 18, 10, 7, 5, 8, 10, 15, 13, 18], // Resigned employees for each month
      },
      monthlyWorkTimeOverload: {
        months: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUNE",
          "JULY",
          "AUG",
          "SEPT",
          "OCT",
          "NOV",
          "DEC",
        ],
        workedTimeOverload: [5, 10, 8, 7, 15, 20, 5, 2, 7, 10, 15, 8],
      },
      monthlyOvertime: {
        months: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUNE",
          "JULY",
          "AUG",
          "SEPT",
          "OCT",
          "NOV",
          "DEC",
        ],
        overtimeHours: [30, 30, 35, 25, 40, 45, 20, 30, 20, 25, 35, 50],
      },
      monthlyExitRate: {
        months: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUNE",
          "JULY",
          "AUG",
          "SEPT",
          "OCT",
          "NOV",
          "DEC",
        ],
        exitRate: [10, 15, 8, 12, 20, 5, 25, 2, 15, 10, 12, 8],
      },
      monthlyHiringRate: {
        months: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUNE",
          "JULY",
          "AUG",
          "SEPT",
          "OCT",
          "NOV",
          "DEC",
        ],
        hiringRate: [8, 12, 15, 10, 18, 20, 25, 5, 10, 12, 15, 8],
      },
      monthlyAbsent: {
        months: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUNE",
          "JULY",
          "AUG",
          "SEPT",
          "OCT",
          "NOV",
          "DEC",
        ],
        absentTrend: [5, 10, 8, 15, 20, 18, 25, 2, 10, 8, 15, 5],
      },
      fullySkilled: {
        values: [80, 20],
        labels: ["Fully Skilled", "Need Training"],
      },
      monthlyData: {
        months: ["ASSY", "MOKU", "CSAT", "JUNB"],
        hours: [10, 15, 5, 7],
      },
      weeklyData: {
        days: ["MON", "TUE", "WED", "THR", "FRI"],
        absences: [20, 10, 17, 14, 12],
      },
      overtimeData: {
        processes: ["ASSY", "MOKU", "CSAT", "JUNB"],
        overtime: [10, 30, 20, 25],
      },
      recommendedEmployees: [], // เพิ่มส่วนนี้
      filteredEmployees: [],
      filteredEmployeesDivision: [],
      filteredEmployeesBiz: [],
      filteredEmployeesWorkGroup: [],
      filteredSkillEmployees: [],
      filteredFullySkilled: [],
      selectedEmployee: null, // พนักงานที่ถูกเลือก
      // selectedSkill: null, // สกิลที่ถูกเลือก
      // selectedShiftcode: "A",
      //   filteredShiftData: {},
      selectedDivision: "ALL",
      // ข้อมูลที่กรองแล้ว
      filteredDivisionData: {},
    };
  },
  methods: {
    sortEmployeesByStatus(employees) {
      // ระบุลำดับการจัดเรียงสถานะ
      const statusOrder = ["ขาดงาน", "Out Cleanroom", "In Cleanroom"];

      // ใช้ sort เพื่อจัดเรียงตามลำดับที่กำหนด
      return employees.slice().sort((a, b) => {
        const statusA = statusOrder.indexOf(a.Status);
        const statusB = statusOrder.indexOf(b.Status);
        return statusA - statusB; // เรียงลำดับตาม index ใน statusOrder
      });
    },
    filterEmployeesByStatus(status) {
      // console.log("Status Selected:", status); // ดูค่าที่ส่งมาจาก PieChart
      // กรองพนักงานที่มี Status ตรงกับที่เลือก
      this.filteredEmployees = this.employees.filter(
        (employee) => employee.Status === status
      );
      console.log("Filtered Employees:", this.filteredEmployees); // ดูพนักงานที่กรองได้
    },
    // filterEmployeesByDivision(division) {
    //   // กรองพนักงานตาม Division ที่เลือก
    //   console.log("Filtering by division:", division);  // ดูค่าที่กรอง
    //   this.filteredEmployeesDivision = this.employees.filter(
    //     (employee) => employee.Division === division
    //   );
    //   console.log("Filtered Employees by Division:", this.filteredEmployeesDivision);
    // },
    filterEmployeesByDivision(division) {
      this.filteredEmployeesDivision = this.sortEmployeesByStatus(
        this.employees.filter((employee) => employee.Division === division)
      );
    },

    // filterEmployeesByBiz(biz) {
    //   // กรองพนักงานตาม Biz ที่เลือก
    //   console.log("Filtering by Biz:", biz);
    //   this.filteredEmployees = this.sortEmployeesByStatus(
    //     (employee) => employee.Biz === biz
    //   );
    // },
    filterEmployeesByBiz(biz) {
      this.filteredEmployeesBiz = this.sortEmployeesByStatus(
        this.employees.filter((employee) => employee.Biz === biz)
      );
    },
    //     filterEmployeesByWorkGroup(workgroup) {
    //       // กรองพนักงานตาม WorkGroup ที่เลือก
    //       console.log("Filtering by WorkGroup:", workgroup);
    //       this.filteredEmployeesWorkGroup = this.employees.filter(
    //         (employee) => employee.WorkGroup === workgroup
    //       );
    //     },
    filterEmployeesByWorkGroup(workgroup) {
      this.filteredEmployeesWorkGroup = this.sortEmployeesByStatus(
        this.employees.filter((employee) => employee.WorkGroup === workgroup)
      );
    },
    filterEmployeesBySkillLevel(selectedLevel) {
      const levelMapping = {
        "Not Trained": 0,
        Basic: 1,
        Medium: 2,
        Expert: 3,
      };

      const levelValue = levelMapping[selectedLevel];

      if (levelValue === undefined) {
        console.error("Invalid skill level selected.");
        return;
      }

      this.filteredSkillEmployees = this.employees
        .map((employee) => {
          const filteredSkills = this.skills.reduce((result, skill) => {
            result[skill] =
              employee[skill] === levelValue ? employee[skill] : null;
            return result;
          }, {});
          return { ...employee, ...filteredSkills };
        })
        .filter((employee) =>
          this.skills.some((skill) => employee[skill] === levelValue)
        );
    },
    filterEmployeesBySkill2(label) {
      if (label === "Fully Skilled") {
        // กรองพนักงานที่มีทุก skill level เท่ากับ 3
        this.filteredFullySkilled = this.employees.filter((employee) =>
          this.skills.every((skill) => employee[skill] === 3)
        );
      } else if (label === "Need Training") {
        // กรองพนักงานที่มี skill level ใดๆ ต่ำกว่า 3
        this.filteredFullySkilled = this.employees.filter((employee) => {
          // นับจำนวนทักษะที่มีระดับ 0 หรือ 1
          const lowSkillsCount = this.skills.reduce((count, skill) => {
            return employee[skill] === 0 || employee[skill] === 1
              ? count + 1
              : count;
          }, 0);

          // เช็คว่ามีระดับทักษะ 0 หรือ 1 มากกว่า 2 ทักษะ
          return lowSkillsCount > 2;
        });
      }
    },

    updateDivisionFilter() {
      if (this.selectedDivision === "ALL") {
        this.filteredDivisionData = { ...this.divisionData }; // แสดงข้อมูลทั้งหมด
      } else {
        const index = this.divisionData.labels.indexOf(this.selectedDivision);
        this.filteredDivisionData = {
          labels: [this.divisionData.labels[index]],
          values: [this.divisionData.values[index]],
        };
      }
    },

    // onBarClick(eventData) {
    //   const selectedSkill = eventData.points[0].x; // Skill ที่เลือกจากแกน X ของกราฟ
    //   this.$emit("filterSkill", selectedSkill); // ส่ง Skill กลับไปยัง App.vue
    // },
    resetFilters() {
      this.filteredSkillEmployees = this.employees; // รีเซ็ตข้อมูลกลับไปที่ทั้งหมด
      this.filteredFullySkilled = this.employees;
      // this.filteredEmployees = [];
      this.filteredEmployeesDivision = this.sortEmployeesByStatus(
        this.employees
      );
      this.filteredEmployeesBiz = this.sortEmployeesByStatus(this.employees);
      this.filteredEmployeesWorkGroup = this.sortEmployeesByStatus(
        this.employees
      );
      this.filteredEmployees = this.sortEmployeesByStatus(this.employees);
      //     this.filteredEmployees = this.employees;  // รีเซ็ตกลับไปที่ทั้งหมด
      //    this.filteredEmployeesDivision = this.employees;
      //    this.filteredEmployeesBiz = this.employees;
      //    this.filteredEmployeesWorkGroup = this.employees;
      // this.recommendedEmployees = [];
      // this.selectedEmployee = null;
      console.log("Filters reset. Showing all employees.");
    },
    selectEmployee(employee) {
      this.selectedEmployee = employee; // ตั้งค่าพนักงานที่ถูกเลือก
      console.log("Selected Employee:", employee);
      // console.log("Skills:", this.skillSection)

      // ดึงหน้าจอไปยังส่วนที่แสดงผลข้อมูล
      this.$nextTick(() => {
        const section = this.$refs.skillSection;
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    },
  },
  computed: {
    // sortedEmployees() {
    //   return this.sortEmployeesByStatus([...this.employees]);
    // },
  },

  mounted() {
    // this.filteredEmployees = []; // เริ่มต้นให้ว่างเพื่อเรียกใช้ sortedEmployees
    // this.filteredEmployees = [...this.employees]; // รีเซ็ตข้อมูลพนักงาน
    // this.filteredEmployees = this.employees; // เริ่มต้นแสดงพนักงานทั้งหมด
    // this.filterShiftData();
    this.filteredDivisionData = { ...this.divisionData }; // ตั้งค่าข้อมูลเริ่มต้น

    this.filteredEmployeesDivision = this.sortEmployeesByStatus(this.employees);
    this.filteredEmployeesBiz = this.sortEmployeesByStatus(this.employees);
    this.filteredEmployeesWorkGroup = this.sortEmployeesByStatus(
      this.employees
    );
    this.filteredFullySkilled = this.employees;
    this.filteredEmployees = this.sortEmployeesByStatus(this.employees);
  },
};
</script>

<style>
.dashboardHR {
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f9f9f9;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 10px 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  width: 150px;
}

.filters select,
.filters input {
  margin-left: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.stats {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 20px;
}

.stat-card {
  flex: 1;
  text-align: center;
  padding: 10px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.charts {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 20px;
}

.chart {
  flex: 1;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.table {
  flex: 1;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

button {
  /* background-color: #007bff; */
  color: white;
  float: right; /* ปุ่มอยู่ชิดขวา */
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  /* position: absolute; วางตำแหน่งปุ่มให้อยู่บนสุด */
  z-index: 1000; /* ทำให้ปุ่มอยู่ด้านหน้า */
}

button:hover {
  background-color: #0056b3;
}

.refresh-icon {
  width: 20px;
  height: 20px;
  z-index: 1000; /* ทำให้ปุ่มอยู่ด้านหน้า */
}

.stats {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  margin-top: 20px;
}

.stat-card {
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  width: 180px;
  transition: transform 0.2s;
  justify-content: space-between;
}

/* .stat-card:hover {
    transform: translateY(-5px);
  } */

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-left: 20px;
}

.icon {
  width: 48px;
  height: 48px;
}

/* สไตล์สำหรับจุดสี */
.status-dot {
  width: 22px;
  height: 22px;
  border-radius: 50%;
}

.content {
  text-align: right;
}

h3 {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

h3.red {
  color: #ff0000;
}

p {
  font-size: 14px;
  margin: 4px 0 0;
}

.sub-label {
  font-size: 16px;
  color: #888;
}
</style>
