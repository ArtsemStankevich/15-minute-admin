import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import './style/Categories.css';


function TaskCreate() {

    
    const [newTask, setNewTask] = useState('');
    const [places, setPlaces] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([]);


    useEffect(() => {
    
        const fetchTasks = async () => {
          try {
            const response = await fetch('https://15minadmin.1213213.xyz/gmaps/place/', {
              method: 'GET',
              headers: {
                "Content-Type": "application/json",
              },
            });
            console.log(response)
            if (response.ok) {
              const data = await response.json();
              setPlaces(data);
              console.log(data)
            } else {
              console.error('Błąd pobierania danych z serwera');
            }
          } catch (error) {
            console.error('Błąd pobierania danych z serwera', error);
          }
        };
    
        fetchTasks();
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
            <Select
                label="Categories"
                value={selectedCategories} // Zmienione na tablicę
                onChange={(e) => setSelectedCategories(e.target.value)} // Zmienione na tablicę
                multiple // Pozwala na wybieranie wielu opcji
                variant="outlined"
                style={{ width: '50%' }}
                id="category"
            >
                {places.map((place) => (
                    <MenuItem key={place.value} value={place.value}>
                        {place.value}
                    </MenuItem>
                ))}
            </Select>
            <Button variant="contained" color="primary" type="submit" style={{ display: 'block', margin: '25% auto 0', backgroundColor: 'darkblue'}}>
            Add Task
            </Button>
        </form>
        </p>
        </div>
        
  );
}

export default TaskCreate;
