<template>
  <div id="app">
    <nav>
      <!-- ใช้ router-link เพื่อเปลี่ยนหน้า -->
      <router-link to="/mfg">Dashboard MFG</router-link> |
      <router-link to="/hr">Dashboard HR</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}
</style>
