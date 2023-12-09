import React, { useState, useEffect, useCallback } from "react";
import TableContainer from "./TableContainer";
import { Container } from "reactstrap";
import { SelectColumnFilter } from "./Filters";
import "bootstrap/dist/css/bootstrap.min.css";
import TaskCreate from "./TaskCreate";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function TaskList() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [tasks, setTasks] = useState([]);

  const columns = React.useMemo(
    () => [
      {
        Header: t("Place name"),
        accessor: "place.value", // Dodaj tę linię
        sortable: true,
        disableFilters: true,
      },
      {
        Header: t("Coordinate"),
        accessor: "coordinates.name", // Dodaj tę linię
        sortable: true,
        disableFilters: true,
      },
      {
        Header: t("Repeat every"),
        accessor: "schedule.human_readable",
        sortable: true,
        disableFilters: true,
      },
      {
        Header: t("Token"),
        accessor: "credentials.name", // Dodaj tę linię
        sortable: true,
        disableFilters: true,
      },
      {
        Header: t("Start"),
        accessor: "actions.start",
        id: "startNow",
        disableFilters: true,
      },
      {
        Header: t("Latest status"),
        accessor: "last_status",
        sortable: true,
        Filter: SelectColumnFilter,
      },
    ],
    [t],
  );

  const fetchTasks = useCallback(async () => {
    try {
      const tokenRefreshString = localStorage.getItem("refreshToken");
      const userRefreshToken = JSON.parse(tokenRefreshString);

      const tokenRefresh = {
        refresh: userRefreshToken,
      };

      const responseToken = await fetch(
        "https://15minadmin.1213213.xyz/users//token/refresh/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tokenRefresh),
        },
      );

      console.log(responseToken);
      if (responseToken.ok) {
        const data = await responseToken.json();
        localStorage.setItem("refreshToken", JSON.stringify(data.refresh));
        localStorage.setItem("token", JSON.stringify(data.access));
      } else {
        console.error("Błąd podczas refresh token");
      }

      const tokenString = localStorage.getItem("token");
      const userToken = JSON.parse(tokenString);

      const response = await fetch(
        "https://15minadmin.1213213.xyz/gmaps/task/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      //  console.log(response)
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
        //  console.log(data)
      } else {
        console.error("Błąd pobierania danych z serwera");
        navigate("/login");
      }
    } catch (error) {
      console.error("Błąd pobierania danych z serwera", error);
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleTaskCreated = () => {
    // Po utworzeniu klucza API odśwież listę
    fetchTasks();
  };

  return (
    <Container>
      <TaskCreate onTaskCreated={handleTaskCreated} />
      <TableContainer columns={columns} data={tasks} />
    </Container>
  );
}

export default TaskList;
