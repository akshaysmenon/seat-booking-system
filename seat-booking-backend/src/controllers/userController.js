import * as userService from '../services/userService.js';

export async function listUsers(req, res) {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

export async function getUser(req, res) {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
}

export async function createUser(req, res) {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
}

export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const user = await userService.updateUser(id, req.body);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user' });
  }
}

export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const deleted = await userService.deleteUser(id);
    if (!deleted) return res.status(404).json({ error: 'User not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
}
