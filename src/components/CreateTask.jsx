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
    };
    return (
        <div style={{ margin: '0 auto', width: '100%', height: '100%' }}>
        <p className='border' style={{width: '100%', height: '97%'}}>
        <h3 style={{textAlign: 'center', marginTop: 'auto'}}>New Task</h3>
        <form onSubmit={handleFormSubmit}>
            <TextField
            label="Name"
            multiline
            rows={1}
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
            <Button variant="contained" color="primary" type="submit" style={{ display: 'block', margin: '25% auto 0', backgroundColor: 'darkblue'}}>
            Add Task
            </Button>
        </form>
        </p>
        </div>
  );
}

export default CreateTask;
