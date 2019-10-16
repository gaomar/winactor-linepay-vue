<template>
  <div class="reserve">
    <h1>決済ページ</h1>
  </div>
</template>

<script>
export default {
  created () {
    this.payAction()
  },
  methods: {
    payAction: function () {
      var params = new URLSearchParams()
      params.set('type', 'reserve')
      axios.post(process.env.VUE_APP_LINE_PAY_FUNCTIONS_URL, params).then(response => 
      {
        // セッション情報に記憶させる
        sessionStorage.setItem(response.data.transactionId, JSON.stringify(response.data))
        // 決済ページへ遷移
        window.location.href = response.data.paymentUrl
      })
    }
  }
}
</script>