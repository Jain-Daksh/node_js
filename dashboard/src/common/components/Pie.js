import React from "react";
import { Chart } from "react-google-charts";
import { useEffect, useState } from 'react';
import User from "common/apis/authUserLink";

export const options = {
  title: "Total Users",
  is3D: true,
};

export default function Pie() {
  const [doctors, setDoctors] = useState([]);
  const [patient, setPatient] = useState([]);

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
        setPatient(response.data.total_patients);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const data = [
    ["User", "Toal User"],
    ["Patients", patient],
    ["Doctors", doctors]
  ];

  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}
