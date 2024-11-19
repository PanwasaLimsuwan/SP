<template>
    <header class="header">
      <!-- <img src="@/assets/logo.png" alt="Sony Logo" class="logo" /> -->
      <div class="filters">
        <select v-model="selectedDivision">
          <option value="ALL">Division: ALL</option>
        </select>
        <select v-model="selectedDepartment">
          <option value="ALL">Department: ALL</option>
        </select>
        <input type="text" placeholder="Search" class="search" />
      </div>
    </header>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedDivision: "ALL",
        selectedDepartment: "ALL",
      };
    },
  };
  </script>
  
  <style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    background-color: #f4f4f4;
  }
  .filters select, .search {
    margin: 0 5px;
  }
  </style>
  