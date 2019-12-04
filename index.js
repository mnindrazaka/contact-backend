const express = require('express')
const app = express()
const cors = require('cors')
const shortid = require('shortid')

let data = [
  {
    id: 'pg674kf',
    name: 'M. Nindra Zaka',
    phone: '085335473895'
  },
  {
    id: '04khd6i',
    name: 'Raka Ardianata',
    phone: '085331247098'
  },
  {
    id: 'jf64odj',
    name: 'Budi',
    phone: '087564326777'
  }
]

app.use(express.json())
app.use(cors())

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.get('/contact', function(req, res) {
  res.send(data)
})

app.get('/contact/:id', function(req, res) {
  const item = data.find(function(item) {
    return item.id === req.params.id
  })
  res.send(item)
})

app.post('/contact', function(req, res) {
  data.push({
    id: shortid.generate(),
    name: req.body.name,
    phone: req.body.phone
  })
  res.send({ success: true })
})

app.put('/contact/:id', function(req, res) {
  const item = data.find(function(item) {
    return item.id === req.params.id
  })

  if (item) {
    item.name = req.body.name
    item.phone = req.body.phone
  }
  res.send({ success: true })
})

app.delete('/contact/:id', function(req, res) {
  data = data.filter(function(item) {
    return item.id !== req.params.id
  })
  res.send({ success: true })
})

app.listen(process.env.PORT || 3000, function() {
  console.log('server started')
})
