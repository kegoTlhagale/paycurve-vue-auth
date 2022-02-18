<template>
  <form @submit.prevent="submit">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <input
        v-model="userData.email"
        type="email"
        class="form-control"
        id="floatingInput"
        placeholder="name@example.com"
      />
      <label for="floatingInput">Email</label>
    </div>
    <div class="form-floating">
      <input
        v-model="userData.password"
        type="password"
        class="form-control"
        id="floatingPassword"
        placeholder="Password"
      />
      <label for="floatingPassword">Password</label>
    </div>

    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
    <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
  </form>
</template>

<script lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Login',

  setup () {
    const userData = reactive({
      email: '',
      password: ''
    })

    const router = useRouter()
    const submit = async () => {
      const url = 'http://localhost:4001/login'
      const { email, password } = userData
      const user = { email, password }

      //  request to node server to register user
      const response = await fetch(url, {
        //  mode: 'no-cors',
        method: 'post',
        headers: { Accepts: 'application/json', 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(user)
      })
      const jsonResponse = await response.json()
      const { success } = jsonResponse

      // check if request was success (returned status 200)
      if (response.status === 200 && success) {
        await router.push('/')
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
