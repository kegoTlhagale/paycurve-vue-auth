<template>
  <div class="vue-bg justify-content-center">
      <div class="rounded shadow bg-white text-left p-5 container col-8">
      <form id="signin-form" @submit.prevent="submit">
        <div class="row">
          <div class="col-12 mb-4 form-group">
            <label class="col-form-label col-form-label-lg"
              >Name <span class="text-danger">*</span></label
            >
            <input
              v-model="userData.name"
              type="text"
              class="form-control form-control-lg"
            />
          </div>

          <div class="col-12 mb-4 form-group">
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

          <div
            class="col-12 mb-4 form-group text-center"
          >
            <button class="btn btn-vue btn-lg col-2">Sign Up</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'Register',

  setup () {
    //  data binding
    const userData = reactive({
      name: '',
      email: '',
      password: ''
    })

    const router = useRouter()
    const store = useStore()

    const submit = async () => {
      console.log('data', userData)
      const url = 'http://localhost:4001/register'
      const { name, email, password } = userData
      const user = { user_name: name, email, password }

      console.log('user', user)

      //  request to node server to register user
      const response = await fetch(url, {
        //  mode: 'no-cors',
        method: 'post',
        headers: { Accepts: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })
      const jsonResponse = await response.json()
      const { success } = jsonResponse

      // check if request was success (returned status 200)
      if (response.status === 200 && success) {
        await store.dispatch('setAuth', true)
        await router.push('/home')
      } else {
        // show error message from the server if unsuccessful
        alert(`${jsonResponse.message}` || 'Something went wrong. Please try again')
      }
      console.log(response)
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
  display: flex;
  padding: 20px;
}
</style>
function target(target: any, arg1: { name: string; email: string; password:
string }) { throw new Error('Function not implemented.') }
