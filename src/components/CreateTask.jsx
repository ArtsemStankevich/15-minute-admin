import React, { useState, useEffect } from 'react';
import categories from './data/placesTypes.json'; // Importuj dostępne kategorie z pliku JSON
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import './style/Categories.css';


function CreateTask() {

    
    const [category, setCategory] = useState('');
    const [newTask, setNewTask] = useState('');


    useEffect(() => {
    setCategory(categories[0]); 
    }, []);

    const handleFormSubmit = (e) => {
    e.preventDefault();
    // Tutaj możesz dodać logikę obsługi przesłanego zadania
    // np. wysłanie go do serwera lub lokalne zapisanie
    };
    return (
        <div>
        <p className='border'>
        <h3 style={{textAlign: 'center' }}>New Task</h3>
        <form onSubmit={handleFormSubmit}>
            <TextField
            label="Name"
            multiline
            rows={2}
            variant="outlined"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className='pad'
            style={{ marginRight: '20px' }}
            />
            <FormControl className='pad'>
            <Select
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                variant="outlined"
            >
                {categories.map((type) => (
                <MenuItem key={type} value={type}>
                    {type}
                </MenuItem>
                ))}
            </Select>
            </FormControl>
            <Button variant="contained" color="primary" type="submit" style={{ display: 'block', float:"right"}}>
            Add Task
            </Button>
        </form>
        </p>
        </div>
  );
}

export default CreateTask;
