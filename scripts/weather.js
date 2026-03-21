const url = "https://api.openweathermap.org/data/2.5/weather?lat=6.5483694&lon=3.1191445&units=imperial&appid=dbb66438b2c409fa04ef5af5d3ce6714";

// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption')


const apiFetch = async () => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // testing only
            // displayResults(data); // uncomment when ready
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error(error)
    }
}

apiFetch();