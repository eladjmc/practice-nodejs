
import chalk from 'chalk';
import { readFileSync, writeFileSync } from 'fs';


// Define the path to the JSON file where we will store the users
const USERS_FILE_PATH = './users.json';

// Define a function to read the users from the file
function readUsers() {
  try {
    const data = readFileSync(USERS_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Define a function to write the users to the file
function writeUsers(users) {
  try {
    const data = JSON.stringify(users, null, 2);
    writeFileSync(USERS_FILE_PATH, data);
    console.log(chalk.green('Users saved to file'));
  } catch (err) {
    console.error(err);
  }
}

// Define a function to create a new user
function createUser(id, name, email) {
  const users = readUsers();
  const existingUser = users.find(u => u.id === id);
  if(existingUser){
    console.log(chalk.red(`User ${id} Already exist`));
    return;
  }
  const user = { id, name, email };
  users.push(user);
  writeUsers(users);
  console.log(chalk.green(`User ${id} created`));
}

// Define a function to read a user by id
function readUser(id) {
  const users = readUsers();
  const user = users.find(u => u.id === id);
  if (user) {
    console.log(`User ${user.id}: ${user.name} (${user.email})`);
  } else {
    console.log(`User ${id} not found`);
  }
}

// Define a function to update a user by id
function updateUser(id, name, email) {
  const users = readUsers();
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    const user = { id, name, email };
    users[index] = user;
    writeUsers(users);
    console.log(chalk.yellow(`User ${id} updated`));
  } else {
    console.log(chalk.red(`User ${id} not found`));
  }
}

// Define a function to delete a user by id
function deleteUser(id) {
  const users = readUsers();
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    writeUsers(users);
    console.log(chalk.blue(`User ${id} deleted`));
  } else {
    console.log(chalk.red(`User ${id} not found`));
  }
}

// Create a few sample users
createUser(1, 'Alice', 'alice@example.com');
createUser(2, 'Bob', 'bob@example.com');
createUser(3, 'Charlie', 'charlie@example.com');

// Read, update, and delete a user
readUser(2);
updateUser(2, 'Bobby', 'bobby@example.com');
readUser(2);
deleteUser(2);
readUser(2);