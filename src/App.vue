<template>
  <div id="app">
<Navigation />
    <section>
      <div class="container section">
    <router-view/>
      </div>
    </section>
  </div>
</template>

<script>
  import Navigation from "./components/Navigation";

  export default {
    components: { Navigation }
  }
</script>

<style>

</style>
