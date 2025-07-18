<template>
  <div class="weather-container">
    <div class="input-container">
      <input
        type="text"
        class="city-input"
        @keypress.enter="fetchweather"
        v-model="city"
        placeholder="Enter city name"
        :disabled="isLoading"
        ref="cityInput"
      >
      <button
        class="search-button"
        @click="fetchweather"
        :disabled="isLoading || !city.trim()"
      >
        {{ isLoading ? 'Searching...' : 'Get Weather' }}
      </button>
    </div>

    <div >
      <div v-if="isLoading">
        <p class="loading-message">🔍 Searching weather data...</p>
      </div>
      <div v-else-if="messageError" class="error-message">
        <p>❌ {{ messageError }}</p>
      </div>
      <div v-else-if="weather">
        <WeatherDataComponent :weather="weather" />
      </div>
      <div v-else class="no-data">
        <p>🏙 Enter a city name to get weather information</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, watch, nextTick, computed} from 'vue'
import {API_URL} from '../constant.js'
import WeatherDataComponent from '../components/WeatherDataComponent.vue'

const cityInput = ref(null)
const city = ref('')
const weather = ref(null)
const messageError = ref('')
const isLoading = ref(false)

watch(city, (newCity) => {
  if (newCity.length === 1) {
    weather.value = null
    messageError.value = ''
  }
})

const validateCity = (cityName) => {
  const trimmedCity = cityName.trim()
  
  if (!trimmedCity) {
    return "Please enter a city name"
  }
  
  if (trimmedCity.length < 2) {
    return "City name must be at least 2 characters long"
  }
  
  if (trimmedCity.length > 50) {
    return "City name is too long"
  }
  
  if (!/^[a-zA-Z\s\-']+$/.test(trimmedCity)) {
    return "City name should only contain letters, spaces, hyphens and apostrophes"
  }
  
  return null
}

const fetchweather = async () => {
  const validationError = validateCity(city.value)
  
  if (validationError) {
    messageError.value = validationError
    return
  }

  isLoading.value = true
  messageError.value = ''
  weather.value = null

  try {
    const response = await fetch(`${API_URL(city.value.trim())}`)
    
    if (!response.ok) {
      if (response.status === 404) {
        messageError.value = `City "${city.value}" not found. Please check the spelling.`
      } else if (response.status === 401) {
        messageError.value = "API key error. Please contact support."
      } else {
        messageError.value = `Error: ${response.status} - ${response.statusText}`
      }
      return
    }

    const data = await response.json()
    weather.value = data
    
    city.value = ''
    
  } catch (error) {
    console.error("Error fetching weather data:", error)
    messageError.value = "Network error. Please check your connection and try again."
  } finally {
    isLoading.value = false
    
    await nextTick()
    cityInput.value?.focus()
  }
}
</script>

<style scoped>
.weather-container{
  padding: 20px;
  max-width: 600px;
  margin: 0 auto; /* Centrado horizontal */
  min-height: 100vh; /* Altura mínima de la viewport */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centrado vertical */
  align-items: center; /* Centrado horizontal adicional */
}
.input-container {
  display: flex;
  margin-bottom: 20px;
}

.city-input {
  outline: none;
  flex: 1;
  padding: 10px;
  border: 1px solid #a5b4fc;
  border-radius: 5px 0 0 5px;
  background: rgba(255, 255, 255, 0.9);
}

.search-button {
  padding: 10px 15px;
  border: 1px solid #a5b4fc;
  background: linear-gradient(135deg, #6366f1, #3b82f6); /* Indigo a azul */
  font-weight: 700;
  color: white;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-button:disabled {
  background: linear-gradient(135deg, #9ca3af, #6b7280);
  color: rgba(255, 255, 255, 0.6);
  cursor: not-allowed;
  border-color: #9ca3af;
  opacity: 0.6;
}

.no-data {
  color: #ffff;
  font-weight: bold;
  font-size: large;
}
.loading-message{
  color: #0bb78c; /* Rojo oscuro */
  background: rgba(242, 254, 249, 0.95); /* Fondo muy claro */
  font-weight: 500;
  font-size: 0.9rem;
  text-align: center;
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid #a5fcef;
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(68, 239, 239, 0.1);
}
.error-message {
  color: #991b1b; /* Rojo oscuro */
  background: rgba(254, 242, 242, 0.95); /* Fondo muy claro */
  font-weight: 500;
  font-size: 0.9rem;
  text-align: center;
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid #fca5a5;
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(239, 68, 68, 0.1);
}
</style>