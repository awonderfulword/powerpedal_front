let express = require('express')
let app = express()

app.get('/getData', function (req, res) {
    const jsonData = [{
        id: 'no1',
        name: 'Jean',
        img: '',
        desc: '采购员',
        key: 11
    },{
        id: 'no2',
        name: 'Sophie',
        img: 'https://img1.baidu.com/it/u=906454135,3245522685&fm=253&fmt=auto&app=120&f=JPEG?w=900&h=600',
        desc: '销售',
        key: 22
    },{
        id: 'no3',
        name: 'Thomas',
        img: 'https://img1.baidu.com/it/u=1086508234,2377478587&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        desc: '仓库人员',
        key: 33
    }
]
res.send(jsonData)

})
app.listen(5678, ()=>{
    console.log('5678, 中间件端口已经执行')
})