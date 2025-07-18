<template>
  <div class="home-container">
    <h1>
      Bienvenido al ejercicio de nuestra aplicación de clima.
    </h1>
    <router-link to="/weather">
      <button class="btn">Ir a la vista del clima</button>
    </router-link>
  </div>
</template>

<script setup >


</script>
<style scoped>
.home-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height:100vh;
   /* De morado a azul */
}
.btn{
  padding: 10px 15px;
  border: 1px solid #a5b4fc;
  background: linear-gradient(135deg, #6366f1, #3b82f6); /* Indigo a azul */
  font-weight: 700;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}
h1{
  color: #ffff;
  font-weight: bold;
  font-size: xx-large;
  text-align: center;
}
</style>
