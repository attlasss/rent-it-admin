<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h3>Datos desde la base de datos</h3>
        <ul>
          <li v-for="item in data" :key="item.id">{{ item.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      data: [],
    };
  },
  mounted() {
  },
  methods: {
    
  },
};
</script>
