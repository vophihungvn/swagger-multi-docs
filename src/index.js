import path    from 'path'
import express from 'express'
import ejs     from 'ejs'

let app = express();

app
.engine('html', require('ejs').renderFile)
.set('view engine', 'html')
.set('views', path.join(__dirname, 'public'))
.get('/', (req, res, next) => {
	res.render(path.join(__dirname, 'public', 'index'),{
		project: '',
		projects: require('./projects.json')
	})
})
.use('/', express.static(path.join(__dirname, 'public')))


//Get Project
.get('/:project', (req, res, next) => {
	res.locals.project = req.params.project;
	res.render(path.join(__dirname, 'public', 'index'),{
		project: req.params.project,
		projects: require('./projects.json')
	})
})

// Get project's document
.get('/docs/:project', (req, res, next) => {
	res.json(require(path.join(__dirname, 'docs', req.params.project + '.json')))
})




module.exports = () => {
	app.listen(3000, () => {
    console.log('Server started at %s', 3000);
  })

  return app;
}