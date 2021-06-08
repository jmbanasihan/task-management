const express = require('express')

const app = express()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`))

// register template engine
app.set('view engine', 'ejs')
app.use(express.static('public'))

// get homepage
app.get('/', (req, res) => {
  res.render('index')
})
