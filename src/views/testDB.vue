<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const response = ref("");

const testConnection = async () => {
  try {
    const res = await axios.get("https://tu-backend-en-railway.com/test");
    response.value = res.data.message + " - Hora del servidor: " + res.data.time;
  } catch (error) {
    response.value = "Error en la conexión: " + error.message;
  }
};

onMounted(() => {
  testConnection();
});
</script>

<template>
  <div>
    <h2>Prueba de conexión</h2>
    <p>{{ response }}</p>
  </div>
</template>
