<script setup>
import { computed } from 'vue'

const props = defineProps({
  weather: {
    type: Object,
    default: null
  }
})

const weatherData = computed(() => {
  if (!props.weather) return null
  
  const { name, sys, main } = props.weather
  const { temp } = main
  const { country } = sys || {}
  
  return {
    name,
    country,
    temp
  }
})

// Función para el mensaje de temperatura
const getTemperatureMessage = computed(() => {
  if (!props.weather?.main) return ''
  
  const temp = props.weather.main.temp
  if (temp < 10) {
    // remove class
    document.body.classList.remove('mild-weather', 'hot')
    document.body.classList.add('cold')
    return "It's cold 🧥"
  }
  if (temp >= 10 && temp <= 25) {
    document.body.classList.remove('cold', 'hot')
    document.body.classList.add('mild-weather')
    return "Mild weather 🌤"
  }
  if (temp > 25) {
    document.body.classList.remove('cold', 'mild-weather')
    document.body.classList.add('hot')
    return "It's hot ☀️"
  }
  return ''
})
</script>

<template>
  <div v-if="weather" class="weather-info">
    <h2 class="location">🌍 {{ weatherData.name }}, {{ weatherData.country }}</h2>
    <div class="temp-info">
      <span class="temp-value">{{ Math.round(weatherData.temp) }}°C</span>
      <span class="temp-message">{{ getTemperatureMessage }}</span>
    </div>
  </div>
</template>

<style scoped>
.weather-info {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
}

.location {
  color: #ffff;
  font-weight: bold;
  font-size: xx-large;
}

.temp-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffff;
  font-weight: bold;
  font-size: x-large;
}

.temp-value {
  font-size: 6rem;
}
</style>