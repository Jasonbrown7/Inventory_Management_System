<template>
  <body>
    <nav class="d-flex navbar">
        
    </nav>
 
    <section class="heroimage">
        <div class="d-flex flex-column align-items-center justify-content-center container-fluid">
            <h1 class="text-center">Bently Adventures</h1>
            <a href="/Browse" class="btn btn-primary btn-large">Begin your adventure</a>
        </div>
    </section>
  </body>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
