<template>
  <section>
    <h1>App</h1>
    <router-link to="/about">About</router-link>
    <p>
      <router-view></router-view>
    </p>
  </section>
</template>

<script>
export default {
  name: 'App'
};
</script>
