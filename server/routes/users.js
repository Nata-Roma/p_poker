import express from 'express';
import { getUsers, getUser, addNewUser } from '../src/models/users.js';

export const router = express.Router();

router.get('/', (req, res) => {
  const users = getUsers();
  res.status(200).json(users);
});

router.get('/:id', (req, res) => {
  const user = getUser(req.params.id);
  if(user === null) {
    res.status(404).json({message: 'No user found'});
  } else {
    res.status(200).json(user);
  }
  
});

router.post('/', (req, res) => {
  const user = addNewUser(req.body)
  res.status(201).json(getUsers());
})
