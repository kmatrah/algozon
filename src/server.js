const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')
const client = require('./client')

const app = express()

app.use(express.static(__dirname + '/../public'))
app.use(bodyParser.json())
app.set('port', (process.env.PORT || 5000))

const index = client.initIndex('apps');

app.post('/api/1/apps', (req, res) => {
  let appObject = _.pick(req.body, [ 'name', 'image', 'link', 'category', 'rank'])

  index.addObject(appObject).then(response => {
    res.json(_.merge({ status: 'indexed' }, response))
  }).catch(err => {
    res.json({ status: 'error', error: err.message })
  })
})

app.delete('/api/1/apps/:id', (req, res) => {
  index.deleteObject(req.params.id).then(response => {
    res.json(_.merge({ status: 'deleted' }, response))
  }).catch(err => {
    res.json({ status: 'error', error: err.message })
  })
})

app.all('*', (req, res, next) => {
  res.status(404)
  res.json({ error: 'not_found', message: `no routes match ${req.method} ${req.originalUrl}` })
})

const start = () => {
  app.listen(app.get('port'), function() {
    console.log('Algozon is running on port', app.get('port'))
  });
}

module.exports = { start }