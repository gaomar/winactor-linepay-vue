<template>
  <div class="confirm">
    <h1>{{status}}</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      status: ''
    }
  },
  created () {
    this.confirmAction()
  },
  methods: {
    confirmAction: function () {
      if (!this.$route.query.transactionId){
        throw new Error("Transaction Id not found.")
      }

      // Retrieve the reservation from database.
      var reservation = JSON.parse(sessionStorage.getItem(this.$route.query.transactionId))
      if (!reservation){
          throw new Error("Reservation not found.")
      }

      var params = new URLSearchParams()

      params.set('type', 'confirm')
      params.set('transactionId', this.$route.query.transactionId)
      params.set('reservations', JSON.stringify(reservation))

      axios.post(process.env.VUE_APP_LINE_PAY_FUNCTIONS_URL, params)
        .then(response => {
          sessionStorage.clear()
          this.status = '決済完了しました！'

          // WinActor実行
          axios.get(process.env.VUE_APP_WINACTOR_URL)

        })
    }
  }
}
</script>