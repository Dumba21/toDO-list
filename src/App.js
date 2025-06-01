import React, {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import SearchInput from "./Components/SearchInput";
import SelectInput from "./Components/SelectInput";
import Task from "./Components/Task";
import AddTaskBtn from "./Components/AddTaskBtn";
import './App.css'


function App() {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [editId, setEditId] = useState(null);
    const [filterParam, setFilterParam] = useState('');
    const [searchParam, setSearchParams] = useState('');
    const [idTask, setIdTask] = useState(1);

    useEffect(() => {
        const localTasks = JSON.parse(localStorage.getItem("tasks"));
        if (localTasks.length > 0) {
            setTasks(localTasks);
            const id = localTasks[localTasks.length - 1].id + 1;
            setIdTask(id);
        }
    }, [])

    useEffect(() => {
        let test = tasks;
        if (searchParam.length > 0) {
            test = tasks.filter(task => task.content.includes(searchParam));
        }
        if (filterParam === 'complete') {
            setFilteredTasks(test.filter(task => task.completed === true));
        } else if (filterParam === 'incomplete') {
            setFilteredTasks(test.filter(task => task.completed === false));
        } else {
            setFilteredTasks(test)
        }
    }, [filterParam, tasks, searchParam]);
    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks])

    const updateTask = (obj) => {
        const task = obj
        setTasks(tasks.map(t => t.id === task.id ? {
            id: task.id,
            completed: task.completed,
            content: task.content,
            inProgress: task.inProgress,
        } : t));
    }
    const deleteTask = (obj) => {
        const newTasksArray = tasks.filter(task => task.id !== obj.id);
        if (newTasksArray.length === 0) {
            localStorage.setItem('tasks', JSON.stringify(newTasksArray));
        }
        setTasks(newTasksArray);

    }
    const editTask = (id) => {
        if (editId !== id) {
            setEditId(id);
        } else {
            setEditId(null);
        }
    }
    const createTask = (task) => {
        const newTask = {id: idTask, completed: false, content: task,inProgress: false};
        setIdTask(idTask + 1);
        setTasks(prevState => [...prevState, newTask]);
    }

    return (
        <Grid
            container
            direction='column'
            sx={{
                justifyContent: "center",
                alignItems: "center",
            }}>
            <p className={'title'}>todo list</p>
            <div className={'search-bar'}>
                <SearchInput changeFunc={(e) => setSearchParams(e)}/>
                <SelectInput filterParam={filterParam} setFilterParam={setFilterParam}/>
                <AddTaskBtn value={e => createTask(e)}/>
            </div>
            {filteredTasks.length > 0 ?
                <div className={'tasksBlock'}>{filteredTasks.map((task) => (
                    <Task
                        task={task}
                        updateFunc={() => updateTask(task)}
                        key={task.id}
                        deleteFunc={() => deleteTask(task)}
                        editFunc={() => editTask(task.id)}
                        isEdit={editId === task.id}
                    />))}
                </div>
                :
                <div className={'emptyBlock'}>
                    <p>empty...</p>
                </div>
            }
            <div>
            </div>
        </Grid>
    );
}

export default App;
