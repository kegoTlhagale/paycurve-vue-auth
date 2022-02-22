<template>
  <div class="vue-bg justify-content-center">
      <div class="rounded shadow bg-white text-left p-5 container col-8">
      <form id="signin-form" @submit.prevent="submit">
        <div class="row">
          <div class="col-12 mb-2 form-group">
            <label class="col-form-label col-form-label-lg"
              >Email <span class="text-danger">*</span></label
            >
            <input
              v-model="userData.email"
              type="email"
              class="form-control form-control-lg"
            />
          </div>
          <div class="col-12 mb-4 form-group">
            <label class="col-form-label col-form-label-lg"
              >Password <span class="text-danger">*</span></label
            >
            <input v-model="userData.password" type="password" class="form-control form-control-lg" />
          </div>
          <div class="col-12 form-group text-center">
            <button class="btn btn-vue btn-lg col-2">Sign In</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'Login',

  setup () {
    const userData = reactive({
      email: '',
      password: ''
    })

    const store = useStore()
    const router = useRouter()

    const submit = async () => {
      const url = 'http://localhost:4001/login'
      const { email, password } = userData
      const user = { email: email.toLowerCase(), password: password }

      console.log('user', user)
      //  request to node server to register user
      const response = await fetch(url, {
        method: 'post',
        headers: { Accepts: 'application/json', 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(user)
      })
      const jsonResponse = await response.json()
      const { success } = jsonResponse

      // check if request was success (returned status 200)
      if (response.status === 200 && success) {
        await store.dispatch('setAuth', true)

        if (jsonResponse?.data?.role === 'admin') {
          await store.dispatch('setAdminUser', true)
        }

        await router.push('/home')
      } else {
        // show error message from the server if unsuccessful
        alert(`${jsonResponse.message}` || 'Something went wrong. Please try again')
      }
    }
    return {
      userData,
      submit
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
  padding: 30px;
  display: flex;
}
</style>
