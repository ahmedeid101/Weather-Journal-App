/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apikey = '&appid=db21d21b19d01d3ee91d9a0800906cbb';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const postCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeather(baseURL, postCode, apikey)
        .then(function (data) {
            console.log(data);
            // Add data to POST request
            postData('http://localhost:8000/addData', {
                date: newDate,
                temp: data.main.temp,
                content: feelings
            })
                // Function which updates UI
                .then(function () {
                    updateUI()
                })
        })
};

// function to GET web API data 
const getWeather = async (baseURL, code, key) => {
    const res = await fetch(baseURL + code + key);
    console.log(res);
    try {
        const data = await res.json();
        return data;
    }
    catch (error) {
        console.log('error', error);
    }
}

// function to POST Data
const postData = async (url = '', data = {}) => {
    console.log(data);
    const postRequest = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await postRequest.json();
        console.log(newData);
        return newData;
    }
    catch (error) {
        console.log('Error', error);
    }
}

//function to GET Project Data
const updateUI = async () => {
    const request = await fetch('http://localhost:8000/allData')
    try {
        const allData = await request.json();
        console.log(allData)
        document.getElementById('date').innerHTML = `Date:${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature:${allData.temp}`;
        document.getElementById('content').innerHTML = ` I feel:${allData.content}`;
    } catch (error) {
        console.log('error', error);
    }
}















































