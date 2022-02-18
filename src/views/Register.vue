<template>
  <form @submit.prevent="submit">
    <h1 class="h3 mb-3 fw-normal">Please register</h1>

    <div class="form-floating">
      <input
        v-model="data.name"
        class="form-control"
        placeholder="Jane"
      />
      <label for="floatingInput">Name</label>
    </div>

    <div class="form-floating">
      <input
        v-model="data.email"
        type="email"
        class="form-control"
        placeholder="name@example.com"
      />
      <label for="floatingInput">Email</label>
    </div>

    <div class="form-floating">
      <input
        v-model="data.password"
        type="password"
        class="form-control"
        id="floatingPassword"
        placeholder="Password"
      />
      <label for="floatingPassword">Password</label>
    </div>

    <button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
    <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
  </form>
</template>

<script lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Register',

  setup () {
    //  data binding
    const data = reactive({
      name: '',
      email: '',
      password: ''
    })

    const router = useRouter()
    const submit = async () => {
      console.log('data', data)
      const url = 'http://localhost:4001/register'
      const { name, email, password } = data
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
        await router.push('/login')
      } else {
        // show error message from the server if unsuccessful
        alert(`${jsonResponse.message}` || 'Something went wrong. Please try again')
      }
      console.log(response)
    }

    return {
      data,
      submit
    }
  }
}
</script>

function target(target: any, arg1: { name: string; email: string; password:
string }) { throw new Error('Function not implemented.') }
