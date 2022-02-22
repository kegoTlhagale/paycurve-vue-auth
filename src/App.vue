<template>
  <Nav />
  <main class="form-signin">
    <div class="text-center space" v-if="!auth">
      <h1>☀🌈☔🌤⛈</h1>
      <h2>Please Sign-in to check the weather in your city</h2>
    </div>
    <div>
      <router-view/>
    </div>
  </main>
</template>

<script>
import Nav from '@/components/Nav'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  components: { Nav },
  setup () {
    const store = useStore()
    const auth = computed(() => store.state.authenticated)

    return {
      auth
    }
  }
}
</script>

<style>
.form-signin {
  width: 100%;
  margin: auto;
}

/*
.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
} */
</style>
