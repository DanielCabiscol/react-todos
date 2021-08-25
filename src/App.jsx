import React, { Fragment, useState, useRef, useEffect } from 'react';
import { TodoList } from './components/TodoList';
import { v4 as uuidv4 } from 'uuid';

const KEY = 'TodoApp'

export const App = () => {
    const [todos, setTodos] = useState([{ id: 1, task: 'Tarea 1', completed: false }]);
    const todoTaskRef = useRef();

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        if (storedTodos) {
            setTodos(storedTodos);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos))
    }, [todos]);

    const toggleTodo = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    }

    const handleAddTodo = () => {
        const task = todoTaskRef.current.value;
        if (task === '') return;
        else {
            setTodos((prevTodos) => {
                return [...prevTodos, { id: uuidv4(), task, completed: false }]
            });
            todoTaskRef.current.value = null;
        }
    }
    const handleClearAll = () => {
        const newTodos = todos.filter((todo) => !todo.completed)
        setTodos(newTodos);
    }
    return (
        <Fragment>
            <TodoList todos={todos} toggleTodo={toggleTodo} />
            <input ref={todoTaskRef} type="text" placeholder="Nueva tarea" />
            <button onClick={handleAddTodo}>➕</button>
            <button onClick={handleClearAll}>🗑</button>
            <div>{todos.filter((todo) => !todo.completed).length} tasks to complete</div>
        </Fragment>

    )
};