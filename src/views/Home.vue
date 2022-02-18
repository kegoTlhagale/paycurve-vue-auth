<template>
  {{message}}
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Home',

  setup () {
    const message = ref('You are not logged in!')
    const store = useStore()

    onMounted(async () => {
      //  connect to open api
      //  request to node server to register user
      try {
        const url = 'http://localhost:4001/welcome'

        const response = await fetch(url, {
          //  mode: 'no-cors',
          method: 'get',
          headers: { Accepts: 'application/json', 'Content-Type': 'application/json' },
          credentials: 'include'
        })

        console.log('res home', response)

        if (response.status === 200) {
          const content = await response.text()

          console.log('content', content)
          message.value = content
          await store.dispatch('setAuth', true)
        }
      } catch (e) {
        await store.dispatch('setAuth', false)
      }

      return {
        message
      }
    })
  }
}
</script>
