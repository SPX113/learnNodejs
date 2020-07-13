var express = require('express')
var router = require('./router')
var bodyparser = require('body-parser')
var app = express()

app.use('/node_modules/',express.static('./node_modules/'))

app.use(bodyparser.urlencoded({ extended:true }))

app.engine('html',require('express-art-template'))

app.use('/public/',express.static('./public/'))

// 把路由容器挂载到 app 服务中
app.use(router)


app.listen(3000,() =>{
    console.log('running')
})