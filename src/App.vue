<template>
  <div id="app">
    age: {{ $store.state.age }} <br>
    getAge: {{ $store.getters.getAge }} <br>
    <button @click="increase">increase</button>
    <button @click="minus">minus</button>
    <button @click="asyncIncrease">asyncIncrease</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  methods: {
    increase () {
      this.$store.commit('increase', 1)
    },
    minus () {
      this.$store.commit('minus', 1)
    },
    asyncIncrease () {
      this.$store.dispatch('asyncIncrease', 2)
    }
  }
}
</script>
