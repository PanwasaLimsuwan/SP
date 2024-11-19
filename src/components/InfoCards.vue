<template>
    <div class="info-cards">
      <div class="info-card" v-for="(card, index) in cards" :key="index">
        <h2>{{ card.value }}</h2>
        <p>{{ card.label }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      cards: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .info-cards {
    display: flex;
    gap: 10px;
  }
  .info-card {
    background: white;
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
  }
  </style>
  