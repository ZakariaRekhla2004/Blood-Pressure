"use client";
import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function WeightHeightBMIChart() {
    const years = [
        new Date(1990, 10, 11),
        new Date(1991, 9, 12),
        new Date(1992, 8, 21),
        new Date(1993, 12, 22),
        new Date(1994, 3, 1),
        new Date(1995, 4, 1),
        new Date(1996, 8, 1),
        new Date(1997, 4, 1),
        new Date(1998, 4, 1),
      ];

//   const formatDate = (dateString :String) => {
//     const [year, month, day] = dateString.split('-');
//     return `${month}-${day}`;
//   };

//   const formattedXAxisData = xAxisData.map(formatDate);

  return (
    <LineChart
    xAxis={[
      {
        id: 'Years',
        data: years,
        scaleType: 'time',
        valueFormatter: (date) => {
          const month = date.getMonth() + 1;
          const day = date.getDate();
          return `${month}/${day}`;
        },
      },
    ]}
      series={[
        {
          data: [65, 66, 67, 68, 69, 70, 71, 72, 40], // Weight data
          label: 'Weight',
          valueFormatter: (value) => (value == null ? 'NaN' : value.toString()),
        },
        {
          data: [170, 171, 172, 182, 174, 175, 176, 177, 178], // Height data
          label: 'Height',
          valueFormatter: (value) => (value == null ? 'NaN' : value.toString()),
        },
        {
          data: [23.7, 24.5, 25.1, 24.6, 25.7, 25.0, 24.8, 25.2, 24.9], // BMI data
          label: 'BMI',
          valueFormatter: (value) => (value == null ? 'NaN' : value.toString()),
        },
      ]}
      height={200}
      margin={{ top: 10, bottom: 20 }}
    />
  );
}
