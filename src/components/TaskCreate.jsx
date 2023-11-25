import React, { useState, useEffect } from 'react';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import './style/Categories.css';


function TaskCreate({ onTaskCreated }) {
    const [places, setPlace] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [apikey, setApiKey] = useState([]);
    const [coordinates, setCoordinates] = useState([]);

    const [selectedPlaces, setSelectedPlaces] = useState([]);
    const [selectedApikey, setSelectedApiKey] = useState('');
    const [selectedSchedule, setSelectedSchedule] = useState('');
    const [selectedCoordinates, setSelectedCoordinates] = useState('');

    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleParentChange = (categoryName) => {
      const category = places.find((cat) => cat.category_name === categoryName);

      if (!category) {
        console.error(`Nie znaleziono kategorii o nazwie: ${categoryName}`);
        return;
      }

      const isCategorySelected = selectedCategories.includes(categoryName);
      const newSelectedCategories = isCategorySelected
        ? selectedCategories.filter((cat) => cat !== categoryName)
        : [...selectedCategories, categoryName];

      setSelectedCategories(newSelectedCategories);

      const newSelectedPlaces = isCategorySelected
        ? selectedPlaces.filter((place) => !category.places.some((p) => p.value === place))
        : [
            ...new Set([
              ...selectedPlaces,
              categoryName,
              ...category.places.map((p) => p.value),
            ]),
          ];

      setSelectedPlaces(newSelectedPlaces);
    };

    const handlePlaceChange = (placeId) => {
      const newSelectedPlaces = [...selectedPlaces];

      const index = newSelectedPlaces.indexOf(placeId);

      if (index !== -1) {
        newSelectedPlaces.splice(index, 1);
      } else {
        newSelectedPlaces.push(placeId);
      }

      setSelectedPlaces(newSelectedPlaces);
    };


    useEffect(() => {
    
              // Pobierz token z sessionStorage
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);

        // Sprawdź, czy token istnieje
        if (!userToken) {
          console.error('Brak tokenu użytkownika.');
          return;
        }
        const fetchTasks = async () => {
          try {
            const response = await fetch('https://15minadmin.1213213.xyz/gmaps/place/', {
              method: 'GET',
              headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${userToken}`, // Dodaj token do nagłówka Authorization
              },
            });
            console.log(response)
            if (response.ok) {
              const data = await response.json();
              setPlace(data);
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
    
              // Pobierz token z sessionStorage
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);

        // Sprawdź, czy token istnieje
        if (!userToken) {
          console.error('Brak tokenu użytkownika.');
          return;
        }
        const fetchTasks = async () => {
          try {
            const response = await fetch('https://15minadmin.1213213.xyz/gmaps/schedule/', {
              method: 'GET',
              headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${userToken}`, // Dodaj token do nagłówka Authorization
              },
            });
            console.log(response)
            if (response.ok) {
              const data = await response.json();
              setSchedule(data);
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
        // Pobierz token z sessionStorage
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);

        // Sprawdź, czy token istnieje
        if (!userToken) {
          console.error('Brak tokenu użytkownika.');
          return;
        }
    
        const fetchTasks = async () => {
          try {
            const response = await fetch('https://15minadmin.1213213.xyz/gmaps/credential/', {
              method: 'GET',
              headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${userToken}`, // Dodaj token do nagłówka Authorization
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
        // Pobierz token z sessionStorage
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);

        // Sprawdź, czy token istnieje
        if (!userToken) {
          console.error('Brak tokenu użytkownika.');
          return;
        }
        const fetchTasks = async () => {
          try {
            const response = await fetch('https://15minadmin.1213213.xyz/gmaps/coordinates/', {
              method: 'GET',
              headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${userToken}`, // Dodaj token do nagłówka Authorization
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


        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
    
        // Sprawdź, czy token istnieje
        if (!userToken) {
          console.error('Brak tokenu użytkownika.');
          return;
        }


        const templateData = {
          place: selectedPlaces.id,
          credentials: selectedApikey.id,
          coordinates: selectedCoordinates.id,
          schedule: selectedSchedule.id,
      };
      
      try {
          const tokenRefreshString = localStorage.getItem('refreshToken');
          const userRefreshToken = JSON.parse(tokenRefreshString);
    
          const tokenString = localStorage.getItem('token');
          const userToken = JSON.parse(tokenString);
    
          const tokenRefresh = {
            refresh: userRefreshToken,
          };
    
          const responseToken = await fetch('https://15minadmin.1213213.xyz/users//token/refresh/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(tokenRefresh),
          });
    
          console.log(responseToken);
          if (responseToken.ok) {
            const data = await responseToken.json();
            localStorage.setItem('refreshToken', JSON.stringify(data.refresh));
            localStorage.setItem('token', JSON.stringify(data.access));
          } else {
            console.error('Błąd podczas refresh token');
          }
  
          const taskResponse = await fetch('https://15minadmin.1213213.xyz/gmaps/template/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${userToken}`,
              },
              body: JSON.stringify(templateData),
          });
      
          if (taskResponse.ok) {
              const templateResponseData = await taskResponse.json(); // Pobierz dane z odpowiedzi
              const templateId = templateResponseData.id; // Pobierz id z odpowiedzi
      
              console.log('Pomyślnie utworzono zadanie.');
      
              // Następnie użyj templateId w drugim żądaniu POST
              const taskData = {
                  template: templateId,
              };
      
              try {
                  const taskResponse = await fetch('https://15minadmin.1213213.xyz/gmaps/task/', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${userToken}`,
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
          } else {
              console.error('Błąd podczas tworzenia zadania.');
          }
      } catch (error) {
          console.error('Błąd podczas komunikacji z serwerem', error);
      }
      
      onTaskCreated();
      setSelectedPlaces([]);
      setSelectedCoordinates([]);
      setSelectedApiKey([]);
      setSelectedSchedule([]);
      


    };
  
  
  
    return (
        <div style={{width: '100%'}}>
        <p className='borderer'>
        <h3 className='auto-center'>Create New Task</h3>
        <form onSubmit={handleFormSubmit}>
            <div className='column'>
              <div className='checkbox-categories'>
                {/* Wyświetl checkboxy dla miejsc */}
                {places.map((category) => (
                  <div key={category.category_name}>
                    <FormControlLabel
                      label={category.category_name}
                      control={
                        <Checkbox
                          checked={selectedCategories.includes(category.category_name)}
                          onChange={() => handleParentChange(category.category_name)}
                        />
                      }
                    />
                    <div className='checkbox-places' style={{ marginLeft: '20px' }}>
                      {/* Wyświetl checkboxy dla miejsc w danej kategorii */}
                      {category.places.map((place) => (
                        <FormControlLabel
                          key={place.id}
                          label={place.value}
                          control={
                            <Checkbox
                              checked={selectedPlaces.includes(place.value)}
                              onChange={() => handlePlaceChange(place.value)}
                            />
                          }
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Select
                  label="Apikey"
                  value={selectedApikey}
                  onChange={(e) => setSelectedApiKey(e.target.value)}
                  variant="outlined"
                  style={{ width: '40%', marginRight: '20px', marginBottom: '10px' }}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Choose an API key
                  </MenuItem>
                  {apikey.map((apikey) => (
                    <MenuItem key={apikey.id} value={apikey}>
                      {apikey.name}
                    </MenuItem>
                  ))}
                </Select>

                <Select
                  label="Coordinates"
                  value={selectedCoordinates}
                  onChange={(e) => setSelectedCoordinates(e.target.value)}
                  variant="outlined"
                  style={{ width: '40%', marginRight: '20px', marginBottom: '10px' }}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Choose coordinates
                  </MenuItem>
                  {coordinates.map((coordinates) => (
                    <MenuItem key={coordinates.id} value={coordinates}>
                      {coordinates.name}
                    </MenuItem>
                  ))}
                </Select>

                <Select
                  label="Schedule"
                  value={selectedSchedule}
                  onChange={(e) => setSelectedSchedule(e.target.value)}
                  variant="outlined"
                  style={{ width: '40%', marginRight: '20px', marginBottom: '10px' }}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Choose Schedule
                  </MenuItem>
                  {schedule.map((schedule) => (
                    <MenuItem key={schedule.id} value={schedule}>
                      {schedule.every} {schedule.period}
                    </MenuItem>
                  ))}
                </Select>
              </div>
          <div className='auto-center'>
          <Button variant="contained" color="primary" type="submit" style={{ margin: '2% auto 0', backgroundColor: 'darkblue' }}>
            Add Task
          </Button>
          
        </div>
        
        </div>
        </form>
        </p>
        </div>
        
  );
}

export default TaskCreate;



            

            