"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let todos = []; //1
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const d = new Date();
    const newTodo = {
        id: d.toString(),
        text: req.body.text,
    };
    todos.push(newTodo);
    res.status(201).json({ message: 'Added todo', todo: newTodo, todos: todos });
});
router.put('/todo/:id', (req, res) => {
    const id = req.params.id;
    const todoIndex = todos.findIndex(item => item.id === id);
    if (todoIndex >= 0) {
        todos[todoIndex] = {
            id: todos[todoIndex].id,
            text: req.body.text
        };
        return res.status(200).json({ message: "Updated todos", todos: todos });
    }
    res.status(404).json({ message: "Could not find dodos from id" });
});
router.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    const del = todos.filter(item => item.id !== id);
    res.status(200).json({ message: 'Deleted todo', todos: todos });
});
exports.default = router;
