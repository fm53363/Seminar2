import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2'; // Import Bar component from react-chartjs-2

import {
    Chart as ChartJS,
    BarElement, 
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale
} from 'chart.js'


ChartJS.register(BarElement,Tooltip,Legend,CategoryScale,LinearScale);


function CountryCheckboxForm({ countries }) {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [chartData, setChartData] = useState(null);



  useEffect(() => {
    console.log("useeffeec",selectedCountries)

    let newChartData = null;
    
    if(selectedCountries.length > 0) {
        console.log("aaaaaaaaaaaaa");
        newChartData = {
            labels: selectedCountries,
            datasets: [
              {
                label: `Data`,
                data: selectedCountries.map(selected => countries[selected]), // Example data
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              },
            ],
        };

    }

    console.log("chartData", chartData)
    setChartData(newChartData);
  }, [selectedCountries]);



  const handleCheckboxChange = (event) => {
    //console.log("event");
    const { value, checked } = event.target;
    let updatedSelectedCountries = [...selectedCountries];

    if (checked) {
      updatedSelectedCountries.push(value);
    } else {
      updatedSelectedCountries = updatedSelectedCountries.filter((country) => country !== value);
    }

    setSelectedCountries(updatedSelectedCountries);

  };

  return (
    <div>
    <form>
      {Object.keys(countries).map((country, index) => (
        <div key={index}>
          <label>
            <input
              type="checkbox"
              value={country}
              checked={selectedCountries.includes(country)}
              onChange={handleCheckboxChange}
            />
            {country}
          </label>
        </div>

      ))}
      
    </form>
    <div>{chartData  && <Bar data={chartData} />}</div>
    
    </div>

  );
};

export default CountryCheckboxForm;
