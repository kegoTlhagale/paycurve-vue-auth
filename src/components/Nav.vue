<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div class="container-fluid">
        <router-link to='/' class="navbar-brand">Home</router-link>
        <div>
            <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="!auth">
            <li class="nav-item">
                <router-link to="/login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/register" class="nav-link">Register</router-link>
            </li>
            </ul>
            <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="auth">
            <li class="nav-item">
                <router-link to="/login" class="nav-link" @click="logout">Log out</router-link>
            </li>
            </ul>
        </div>
        </div>
    </nav>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'Nav',

  setup () {
    const store = useStore()
    const auth = computed(() => store.state.authenticated)
    const router = useRouter()

    const logout = async () => {
      //  request to node server to logout user
      const url = 'http://localhost:4001/logout'

      const response = await fetch(url, {
        method: 'post',
        headers: { Accepts: 'application/json', 'Content-Type': 'application/json' },
        credentials: 'include'
      })

      if (response.status === 200) {
        await store.dispatch('setAuth', false)
        await router.push('/login')
      } else {
        alert('Something went wrong. Please try again')
      }
    }
    return {
      auth,
      logout
    }
  }
}
</script>
