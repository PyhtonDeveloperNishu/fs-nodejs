const fs = require('fs');
const path = require('path');
const readlineSync = require('readline-sync');

const filePath = path.join(__dirname, 'tasks.json');

// Function to load tasks from the file
function loadTasks() {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8');
        if (data.trim().length === 0) {
            // If the file is empty, return an empty array
            return [];
        } else {
            return JSON.parse(data);
        }
    }
    return [];
}


// Function to save tasks to the file
function saveTasks(tasks) {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

// Function to add a new task
function addTask() {
    const task = readlineSync.question('Enter a new task: ');
    const tasks = loadTasks();
    tasks.push({ task, completed: false });
    saveTasks(tasks);
    console.log('Task added successfully.');
}

// Function to view tasks
function viewTasks() {
    const tasks = loadTasks();
    if (tasks.length === 0) {
        console.log('No tasks found.');
    } else {
        console.log('\nTasks:');
        tasks.forEach((t, index) => {
            console.log(`${index + 1}. ${t.task} [${t.completed ? 'Completed' : 'Not Completed'}]`);
        });
    }
}

// Function to mark a task as complete
function markTaskAsComplete() {
    const tasks = loadTasks();
    viewTasks();  // Show tasks before asking which one to mark as complete
    const index = parseInt(readlineSync.question('Enter the number of the task to mark as complete: '), 10) - 1;
    if (tasks[index]) {
        tasks[index].completed = true;
        saveTasks(tasks);
        console.log('Task marked as complete.');
    } else {
        console.log('Invalid task number.');
    }
}

// Function to remove a task
function removeTask() {
    const tasks = loadTasks();
    viewTasks();  // Show tasks before asking which one to remove
    const index = parseInt(readlineSync.question('Enter the number of the task to remove: '), 10) - 1;
    if (tasks[index]) {
        tasks.splice(index, 1);
        saveTasks(tasks);
        console.log('Task removed.');
    } else {
        console.log('Invalid task number.');
    }
}

// Main menu function
function mainMenu() {
    console.log('\nTask Manager:');
    console.log('1. Add a new task');
    console.log('2. View tasks');
    console.log('3. Mark task as complete');
    console.log('4. Remove a task');
    console.log('5. Exit');

    const choice = readlineSync.question('Enter your choice (1-5): ');

    switch (choice) {
        case '1':
            addTask();
            break;
        case '2':
            viewTasks();
            break;
        case '3':
            markTaskAsComplete();
            break;
        case '4':
            removeTask();
            break;
        case '5':
            console.log('Goodbye!');
            process.exit(0);
            break;
        default:
            console.log('Invalid choice, please try again.');
    }
}

// Run the main menu in a loop
while (true) {
    mainMenu();
}
