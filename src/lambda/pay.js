// LINE Pay処理を実装する
"use strict"

import { URLSearchParams } from 'url'
const uuid = require("uuid/v4")

const line_pay = require("line-pay")
const pay = new line_pay({
  channelId: process.env.VUE_APP_LINE_PAY_CHANNEL_ID,
  channelSecret: process.env.VUE_APP_LINE_PAY_CHANNEL_SECRET,
  isSandbox: true  // サンドボックス環境
})

exports.handler = function(event, context, callback) {
  const body = event.body
  let params = new URLSearchParams(body)
  const type = params.get('type')

  const headers = {
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Content-Type': 'application/json'
  }

  if (type === 'reserve') {
    // 決済予約
    let options = {
      productName: "WinActor起動",
      amount: 1,                 // 金額（この場合は1円）
      currency: "JPY",           // 日本円
      orderId: uuid(),
      productImageUrl: process.env.VUE_APP_LINE_PAY_IMAGE_URL,
      confirmUrl: process.env.VUE_APP_LINE_PAY_CONFIRM_URL
    }
    pay.reserve(options).then((response) => {
      let reservation = options
      reservation.transactionId = response.info.transactionId
      reservation.paymentUrl = response.info.paymentUrl.web
  
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(reservation),
        headers: headers
      })  
    })
  } else if (type === 'confirm') {
    // 決済処理
    const transactionId = params.get('transactionId')
    const reservations = JSON.parse(params.get('reservations'))

    let confirmation = {
      transactionId: transactionId,
      amount: reservations.amount,
      currency: reservations.currency
    }

    pay.confirm(confirmation).then((response) => {
      callback(null, {
        statusCode: 200,
        body: '決済完了しました！',
        headers: headers
      })
    })
  } else {
    callback(null, {
      statusCode: 400,
      body: 'APIエラー',
      headers: headers
    })
  }
}