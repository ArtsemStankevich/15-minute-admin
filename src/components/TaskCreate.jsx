import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import './style/Categories.css';


function TaskCreate() {

    

    const [places, setPlaces] = useState([])
    const [apikey, setApiKey] = useState([])
    const [coordinates, setCoordinates] = useState([])

    const [taskName, setTaskName] = useState('');
    const [selectedPlaces, setselectedPlaces] = useState([]);
    const [selectedApikey, setSelectedApiKey] = useState('');
    const [selectedCoordinates, setSelectedCoordinates] = useState('');



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

      useEffect(() => {
    
        const fetchTasks = async () => {
          try {
            const response = await fetch('https://15minadmin.1213213.xyz/gmaps/credential/', {
              method: 'GET',
              headers: {
                "Content-Type": "application/json",
              },
            });
            console.log(response)
            if (response.ok) {
              const data = await response.json();
              setApiKey(data);
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

      useEffect(() => {
    
        const fetchTasks = async () => {
          try {
            const response = await fetch('https://15minadmin.1213213.xyz/gmaps/coordinates/', {
              method: 'GET',
              headers: {
                "Content-Type": "application/json",
              },
            });
            console.log(response)
            if (response.ok) {
              const data = await response.json();
              setCoordinates(data);
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


      // ...

      const handleFormSubmit = async (e) => {
        e.preventDefault();

        const places = selectedPlaces.map(place => place.id);

        const taskData = {
            places: places,
            name: taskName,
            credentials: selectedApikey.id,
            coordinates: selectedCoordinates.id,
        };
        try{
            const taskResponse = await fetch('https://15minadmin.1213213.xyz/gmaps/task/', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });

            if (taskResponse.ok) {
                console.log('Pomyślnie utworzono zadanie.');
            } else {
                console.error('Błąd podczas tworzenia zadania.');
            }
            } catch (error) {
            console.error('Błąd podczas komunikacji z serwerem', error);
            }

        setselectedPlaces([])
        setSelectedCoordinates([])
        setSelectedApiKey([])

    };
  
  
  
    return (
        <div style={{ margin: '0 auto', width: '100%', height: '100%' }}>
        <p className='border' style={{width: '100%', height: '93%'}}>
        <h3 style={{textAlign: 'center', marginTop: 'auto'}}>New Task</h3>
        <form onSubmit={handleFormSubmit}>
            <TextField
            label="Name"
            multiline
            rows={1}
            variant="outlined"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className='pad'
            style={{ marginRight: '20px', marginBottom: '10px' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
              <label>Choose a place:   </label>
              <Select
                label="Places"
                value={selectedPlaces} // Zmienione na tablicę
                onChange={(e) => setselectedPlaces(e.target.value)} // Zmienione na tablicę
                multiple // Pozwala na wybieranie wielu opcji
                variant="outlined"
                style={{ width: '40%', marginRight: '20px', marginBottom: '10px' }}
                id="category"
              >
                {places.map((place) => (
                  <MenuItem key={place.id} value={place}>
                    {place.value}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div>
              <label>Choose an API key:   </label>
              <Select
                label="Apikey"
                value={selectedApikey}
                onChange={(e) => setSelectedApiKey(e.target.value)}
                variant="outlined"
                style={{ width: '40%', marginRight: '20px', marginBottom: '10px' }}
              >
                {apikey.map((apikey) => (
                  <MenuItem key={apikey.id} value={apikey}>
                    {apikey.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div>
              <label>Choose coordinates:   </label>
              <Select
                label="Coordinates"
                value={selectedCoordinates}
                onChange={(e) => setSelectedCoordinates(e.target.value)}
                variant="outlined"
                style={{ width: '40%', marginRight: '20px' }}
              >
                {coordinates.map((coordinates) => (
                  <MenuItem key={coordinates.id} value={coordinates}>
                    {coordinates.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <Button variant="contained" color="primary" type="submit" style={{ margin: '5% auto 0', backgroundColor: 'darkblue'}}>
            Add Task
            </Button>
          </div>

        </form>
        </p>
        </div>
        
  );
}

export default TaskCreate;



            

            