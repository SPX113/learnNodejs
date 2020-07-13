
require('./student')

var express = require('express')
const { find, save, update, findById, deleteById } = require('./student')

//1.创建一个路由容器
var router = express.Router()

//2.把路由都挂载到 router 路由容器中
router.get('/',(req,res) => {
    res.redirect('/students')
})

router.get('/students',(req,res) => {
    find().then(
        data => {
            res.render('index.html',{
                students : JSON.parse(data).students
            })
        },
        err => {
            console.log(err)
            return res.status(500).send('404 Not Found')
        }
    )
})

router.get('/students/new',(req,res) => {
    res.render('new.html')
})


//添加学生
router.post('/students/new',(req,res) => {
    save(req.body).then(
        success => {
            return res.redirect('/students')
        },
        error => {
            return res.status(500).send('Server Error')
        }
    )
})

router.get('/students/edit',(req,res) => {
    findById(parseInt(req.query.id)).then(
        data => {
            res.render('edit.html',{
                data : data
            })
        },
        err => {
            return res.status(500).send('Server Error')
        }
    )
})

router.post('/students/edit',(req,res) => {
    update(req.body).then(
        success => {
            return res.redirect('/students')
        },
        err => {
            return res.status(500).send('404 Not Found')
        }
    )
})

router.get('/students/delete',(req,res) => {
    deleteById(req.query.id).then(
        success => {
            res.redirect('/students')
        },
        error => {
            return res.status(500).send('404 Not Found')
        }
    )
})

//3.把 router 导出
module.exports = router
