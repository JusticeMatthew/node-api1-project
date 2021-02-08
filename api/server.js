// BUILD YOUR SERVER HERE
const express = require('express');
const dbFunctions = require('./users/model');

const app = express();
app.use(express.json());

app.post('/users', (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res
      .status(400)
      .json({ message: 'Please provide name and bio for the user' });
  } else {
    dbFunctions
      .insert({ name, bio })
      .then((newUser) => {
        res.status(201).json(newUser);
      })
      .catch(() => {
        res.status(500).json({
          message: 'There was an error while saving the user to the database',
        });
      });
  }
});

app.get('/users', (req, res) => {
  dbFunctions
    .find()
    .then((users) => res.status(200).json(users))
    .catch(() =>
      res
        .status(500)
        .json({ message: 'The users information could not be retrieved' }),
    );
});

app.get('/users/:id', (req, res) => {
  const tarId = req.params.id;
  dbFunctions
    .findById(tarId)
    .then((user) => {
      user
        ? res.status(200).json(user)
        : res
            .status(404)
            .json({ message: `The user with the specified ID does not exist` });
    })
    .catch(() =>
      res
        .status(500)
        .json({ message: 'The users information could not be retrieved' }),
    );
});

app.delete('/users/:id', (req, res) => {
  const tarId = req.params.id;

  try {
    dbFunctions.remove(tarId).then((user) => {
      user === null
        ? res
            .status(404)
            .json({ message: 'The user with the specified ID does not exist' })
        : res.status(200).json(user);
    });
  } catch (e) {
    res.status(500).json({ message: 'The user could not be removed' });
  }
});

app.put('/users/:id', (req, res) => {
  const tarId = req.params.id;
  const { name, bio } = req.body;

  try {
    if (!name || !bio) {
      res
        .status(400)
        .json({ message: 'Please provide name and bio for the user' });
    } else {
      dbFunctions.update(tarId, { name, bio }).then((user) => {
        user === null
          ? res.status(404).json({
              message: 'The user with the specified ID does not exist',
            })
          : res.status(200).json(user);
      });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: 'The user information could not be modified' });
  }
});

app.use('*', (req, res) => {
  res.status(404).json({ message: '404 Not Found*:' });
});

module.exports = app; // EXPORT YOUR SERVER instead of {}
