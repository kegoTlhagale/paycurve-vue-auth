 <template>
  <section class="vh-100" v-if="auth">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-8 col-lg-6 col-xl-4">
          <div class="text-center space" v-if="!auth">
            <h1>☀🌈☔🌤⛈</h1>
            <h2>Please Sign-in to check the weather in your city</h2>
          </div>
          <h3 class="mb-4 pb-2 fw-normal text-center">Check the current weather forecast in your area</h3>
           <!-- <img alt="Vue logo" src="../assets/weather.png" width="100"> -->
          <form  @submit.prevent="search">
            <div class="input-group p-4 d-flex flex-row mb-3">
              <input
                v-model="data.area"
                type="search"
                class="form-control rounded"
                placeholder="City"
                aria-label="Search"
                aria-describedby="search-addon"
              />
              <button class="btn btn-vue btn-lg">Check</button>
            </div>
          </form>

          <div class="card" style="color: #4b515d; border-radius: 35px" v-if="temp">
            <div class="card-body p-4">
              <div class="d-flex">
                <h6 class="flex-grow-1">{{city}}</h6>
                <h6>15:07</h6>
              </div>

              <div class="d-flex flex-column text-center mt-5 mb-4">
                <h6
                  class="display-4 mb-0 font-weight-bold"
                  style="color: #1c2331"
                >
                  {{temp}} °C
                </h6>
                <span class="small" style="color: #868b94">{{description}}</span>
              </div>

              <div class="d-flex align-items-center">
                <div class="flex-grow-1" style="font-size: 1rem">
                  <div>
                    <i class="fas fa-wind fa-fw" style="color: #868b94"></i>
                    <span class="ms-1"> Humidity: {{humidity}}% </span>
                  </div>
                  <div>
                    <i class="fas fa-tint fa-fw" style="color: #868b94"></i>
                    <span class="ms-1"> Pressure: {{pressure}}% </span>
                  </div>
                  <div>
                    <i class="fas fa-sun fa-fw" style="color: #868b94"></i>
                    <span class="ms-1"> Rain: {{rain}}% </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center space p-3" v-if="temp">
            <h4>{{notice}}</h4>
          </div>

          <div class="col-12 d-flex h-50 justify-content-center mt-4 p-2" v-if="adminUser">
            <form class="w-100" @submit.prevent="postConcern">
              <h6>Add alert</h6>
          <div class="col-12 mb-2 form-group">
            <label class="col-form-label col-form-label-lg"
              >City <span class="text-danger">*</span></label
            >
            <input
              v-model="adminData.place"
              type="text"
              class="form-control form-control-lg"
            />
          </div>
              <textarea class="form-control h-100" style="height: 100%" v-model="adminData.concern"></textarea>
                        <div class="col-12 form-group text-center">
            <button class="btn btn-vue btn-lg col-2 p-2">Post</button>
          </div>
            </form>
          </div>

          <div class="col-12 d-flex h-50 justify-content-center mt-4 p-2">
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="text-center">
    {{ auth ? "" : message }}
  </div>
</template>

<script lang="ts">
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Home',

  setup () {
    const message = ref('You are not logged in! Please log back in! ☀🌈☔🌤⛈')
    const notice = ref('There are no concerning weather conditions in your area curerent ☀')
    const humidity = ref(0)
    const pressure = ref(0)
    const rain = ref(0)
    const description = ref('')
    const temp = ref(0)

    const store = useStore()
    const city = ref('Hogwarts')

    const auth = computed(() => store.state.authenticated)
    const adminUser = computed(() => store.state.adminUser)

    const data = reactive({
      area: ''
    })

    const adminData = reactive({
      place: '',
      concern: ''
    })

    // fetches the weather report for an area and weather concernsalerts if any
    const search = async () => {
      const url = 'http://localhost:4001/'
      const { area } = data
      console.log('area', area)

      //  request to node server to get the weather
      const weatherResponse = await fetch(url + 'get-weather', {
        method: 'post',
        headers: {
          Accepts: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ area })
      })
      const jsonResponse = await weatherResponse.json()
      const sanitizedArea = area.toLowerCase()
      //  request to node server to get alert
      const alertResponse = await fetch(url + `get-alert?city=${sanitizedArea}`, {
        method: 'get',
        headers: {
          Accepts: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      const alertJson = await alertResponse.json()
      console.log('alertJson', alertJson)

      console.log('jsonResponse', jsonResponse)
      // check if request was success (returned status 200)
      if (weatherResponse.status === 200 && jsonResponse?.success) {
        await store.dispatch('setAuth', true)
        const { smart } = jsonResponse.data

        city.value = area
        humidity.value = smart.humidity
        rain.value = smart.rain
        pressure.value = smart.pressure
        temp.value = smart.temp
        description.value = smart.description
      } else {
        // show error message from the server if unsuccessful
        alert(
          `${jsonResponse.message}` || 'Something went wrong. Please try again'
        )
      }

      if (alertResponse.status === 200 && alertJson?.success) {
        if (alertJson.data.message !== '') {
          notice.value = alertJson.data.message
        }
      }
    }

    // admin user only. Posts an alert or concern for an area
    const postConcern = async () => {
      const url = 'http://localhost:4001/'
      const { place, concern } = adminData
      //  request to node server to get the weather

      const sanitizedPlace = place.toLowerCase()
      const params = { message: concern, city: sanitizedPlace }
      const response = await fetch(url + 'alert', {
        method: 'post',
        headers: {
          Accepts: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(params)
      })

      const jsonResponse = await response.json()
      if (response.status === 200 && jsonResponse.success) {
        alert('Successful upload alert')
      } else {
        alert(`${jsonResponse.message}` || 'Something went wrong. Please try again')
      }
    }

    return {
      message,
      data,
      search,
      postConcern,
      auth,
      adminUser,
      humidity,
      city,
      temp,
      rain,
      description,
      pressure,
      notice,
      adminData
    }
  }
}
</script>

<style>
.btn-vue {
  background: #53b985;
  color: #31485d;
  font-weight: bold;
}

.vue-bg {
  background: white;
}
</style>
