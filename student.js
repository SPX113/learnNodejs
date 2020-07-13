/**
 * 职责 : 操作文件中的数据，只处理数据，不关心业务
 */

 var fs = require('fs')
const { rejects } = require('assert')
const { resolve } = require('path')
const { resolve4 } = require('dns')
 var dbpath = './db.json'
 /**
  * 获取所有学生列表
  */
 exports.find = () => {
     return new Promise((resolve,rejects) => {
         fs.readFile(dbpath,'utf8',(err,data) => {
             if(err){
                 rejects(err)
             }else{
                 resolve(data)
             }
         })
     })
 }

 /**
  * 根据ID获取单个学生
  */
 exports.findById = id =>{
     return new Promise((resolve,rejects) => {
        fs.readFile(dbpath,'utf8',(err,data) => {
            if(err){
                return rejects(err)
            }
            var students = JSON.parse(data).students
            var stu = students.find(item => { return item.id === id})
            resolve(stu)
        })
    })
 }

 /**
  * 添加保存学生
  */
 exports.save = (student) => {
     return new Promise((resolve,rejects) => {
         fs.readFile(dbpath,'utf8',(err , data) => {
            if(err){
                rejects(err)
            }else{
                var students = JSON.parse(data).students
                if(students[students.length - 1]){
                    student.id = students[students.length - 1].id +1
                }else{
                    student.id = 1
                }
                students.push(student)
                var add = JSON.stringify({
                    students : students
                })
                fs.writeFile(dbpath,add, err => {
                    if(err){
                        rejects(err)
                    }else{
                        resolve()
                    }
                })
            }
         })
     })
 }

 /**
  * 更新学生
  */
 exports.update = (student) => {
     return new Promise((resolve,rejects) => {
         fs.readFile(dbpath, (err,data) => {
             if(err){
                 return rejects(err)
             }
             var students = JSON.parse(data).students
             student.id = parseInt(student.id)
             var stu = students.find( item => { return item.id === student.id })
             for (var key in student){
                 stu[key] = student[key]
             }
             var fileDate = JSON.stringify({
                 students : students
             })
             fs.writeFile(dbpath,fileDate,err => {
                 if(err){
                     return rejects(err)
                 }
                 resolve()
             })
         })
     })

 }

 /**
  * 删除学生
  */
 exports.deleteById = (id) => {
    return new Promise((resolve,rejects) => {
        fs.readFile(dbpath,'utf8',(err,data) => {
            if(err){
                return rejects(err)
            }else{
                var students = JSON.parse(data).students
                var deleteID = students.findIndex( item => {
                    return item.id === parseInt(id)
                })
                students.splice(deleteID,1)
                var filedata = JSON.stringify({students:students})
                fs.writeFile(dbpath,filedata,err => {
                    if(err){
                        rejects(err)
                    }else{
                        resolve()
                    }
                })
            }
        })
    })
 }