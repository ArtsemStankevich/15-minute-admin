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

    const [subTasks, setSubTasks] = useState([]);


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
    
        const subTasksData = selectedPlaces.map((place) => {
            return {
                coordinates: {
                    name: selectedCoordinates.name, // Zakładam, że selectedCoordinates zawiera obiekt coordinates
                    lat: selectedCoordinates.lat,
                    lon: selectedCoordinates.lon,
                    radius: selectedCoordinates.radius,
                },
                place: {
                    value: place.value,
                },
                status: "waiting",
                start: "2019-08-24T14:15:22Z",
                finish: "2019-08-24T14:15:22Z",
                items_collected: -2147483648,
            };
        });
    
        try {
            for (const subTaskData of subTasksData) {
                console.log(subTaskData)
                const response = await fetch('https://15minadmin.1213213.xyz/gmaps/subtask/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(subTaskData),
                });

                console.log(JSON.stringify(subTaskData))
    
                if (response.ok) {
                    console.log('Pomyślnie utworzono subtask.');
                    setSubTasks((prevSubTasks) => [...prevSubTasks, subTaskData]);
                } else {
                    console.error('Błąd podczas tworzenia subtask.');
                }
            }
    
            // Po zakończeniu żądań POST dla subtasków utwórz obiekt taskData
            const taskData = {
                subTask: subTasksData,
                credentials: selectedApikey,
                name: taskName,
            };
    
            // Wyślij żądanie POST dla zadania
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
        // Po zakończeniu żądań POST dla subtasków utwórz obiekt taskData
        const taskData = {
            subTask: subTasks,
            credentials: selectedApikey,
            name: taskName,
        };
        try{
            // Wyślij żądanie POST dla zadania
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
    };
  
  // ...
  
  
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
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className='pad'
            style={{ marginRight: '20px' }}
            />
            <Select
                label="Places"
                value={selectedPlaces} // Zmienione na tablicę
                onChange={(e) => setselectedPlaces(e.target.value)} // Zmienione na tablicę
                multiple // Pozwala na wybieranie wielu opcji
                variant="outlined"
                style={{ width: '50%' }}
                id="category"
            >
                {places.map((place) => (
                    <MenuItem key={place} value={place}>
                        {place.value}
                    </MenuItem>
                ))}
            </Select>
            <Select
                label="Apikey"
                value={selectedApikey}
                onChange={(e) => setSelectedApiKey(e.target.value)}
                variant="outlined"
            >
                {apikey.map((apikey) => (
                <MenuItem key={apikey} value={apikey}>
                    {apikey.name}
                </MenuItem>
                ))}
            </Select>
            <Select
                label="Coordinates"
                value={selectedCoordinates}
                onChange={(e) => setSelectedCoordinates(e.target.value)}
                variant="outlined"
            >
                {coordinates.map((coordinates) => (
                <MenuItem key={coordinates} value={coordinates}>
                    {coordinates.name}
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
