/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, you might want to read it really slow, don't worry be happy
in every line there may be trouble, but if you worry you make it double, don't worry, be happy
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, be happy
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just API…
I need this code, just don't know where, perhaps should make some middleware, don't worry, be happy

Go code!
*/

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const Projects = require('./data/helpers/projectModel');
const Actions = require('./data/helpers/actionModel');

const server = express();
server.use(express.json());

server.use(helmet());
server.use(morgan('dev'));

server.get('/', (req, res) => {
  res.send('TBH Lambda sprints make me more winded than doing actual sprints');
});

server.get('/projects', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error retrieving data',
            });
        });
});

server.get('/actions', (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error retrieving data',
            });
        });
});

server.get('/projects/:id/actions', (req, res) => {
    console.log(req.params.id)
    Projects.getProjectActions(req.params.id) 
    .then(project => {
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: "The project with the specified ID does not exist."})
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: "The project information could not be retrieved."})
    });
});

server.post('/projects', (req, res) => {
    if (!Object.keys(req.body).includes("name") || !Object.keys(req.body).includes("description")){
        return res.status(400).json({ errorMessage: "Please provide a name and description for the project." })
    }
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "There was an error while saving the project to the database"})
        });
});

server.post('/projects/:id/actions', (req, res) => {
    if (!Object.keys(req.body).includes("description") || !Object.keys(req.body).includes("notes")){
        return res.status(400).json({ errorMessage: "Please provide a descritption and notes for the action." })
    }
    const act = {...req.body, project_id: req.params.id}; 
    console.log(req.params.id)
    console.log(act)
    Actions.insert(act)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(error => {
            console.log(error);
            res.status(404).json({ message: "The project with the specified ID does not exist."})
        });
});

const port = 8888;
server.listen(port, () => console.log(`\n=== API on port ${port} ===\n`));
