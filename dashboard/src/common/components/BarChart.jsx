import React from "react";
import { Chart } from "react-google-charts";
import { useEffect, useState } from 'react';
import User from "common/apis/authUserLink";


export function Barchart() {
  const [doctors, setDoctors] = useState([]);
  const [patient, setPatient] = useState([]);
  const [admin, setAdmin] = useState([]);

  const options = {
    chart: {
      title: "Total Users",
      subtitle: "Admin, Doctors, and Patients",
    },
    bars: "horizontal",
    axes: {
      y: {
        0: { side: "left" },
      },
    },
  };

  const data = [
    ["Total User", " Total User"],
    ["Patients", patient],
    ["Doctors", doctors],
    ["Admins", admin]
  ];

  useEffect(() => {
    User.getAllUSer().then(
      (response) => {
        console.log(response)
        setDoctors(response.data.total_doctors);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  useEffect(() => {
    User.getAllUSer().then(
      (response) => {
        console.log(response)
        setAdmin(response.data.total_admins);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  useEffect(() => {
    User.getAllUSer().then(
      (response) => {
        console.log(response)
        setPatient(response.data.total_patients);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <Chart
      chartType="Bar"
      width={"100%"}
      height={"400px"}
      data={data}
      options={options}
    />
  );
}