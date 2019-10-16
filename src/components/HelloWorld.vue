<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      <a href="/pay/reserve"><img src="../assets/pay_btn.png" /></a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>
