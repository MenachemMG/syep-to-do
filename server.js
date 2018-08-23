const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.json());

let currentIndex = 4;

let todoDatabase = {
	1: {task: 'this is a freebie', status: true},
	2: {task: 'populate list dynamically', status: false},
	3: {task: 'toggle task to complete', status: false},
	4: {task: 'Add new tasks', status: false}
};

//populate initial tasks
app.get('/tasks', (req, res)=> {
	res.send(todoDatabase);
});

//toogle task completion status
app.post('/tasks/:id', (req, res)=> {
	const status = todoDatabase[req.params.id].status;
	todoDatabase[req.params.id].status = !status;
	res.send(todoDatabase);
});

//add new task
app.post('/tasks', (req, res)=> {
	// console.log(req.body);
	// let index = Object.keys(todoDatabase).length + 1; This will have an error
	// console.log(index);
	todoDatabase[++currentIndex] = {task: req.body.task, status: false};
	res.send(todoDatabase);
});

//delete a task
app.delete('/tasks/:id', (req, res)=> {
	delete todoDatabase[req.params.id];
	res.send(todoDatabase);
});

//open port
 const port = process.env.PORT || 3000;
app.listen(port, ()=> {
	console.log('server is listening on http://localhost:3000');
});