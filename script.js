


window.addEventListener('load',()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature-section')
    const temperatureSpan = document.querySelector('.temperature-section span')
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/eafa91c65106494d183835e615810373/${lat},${long}`;
            fetch(api)
            .then(res =>{
                return res.json()
            })
            .then(data => {
                const {temperature, summary, icon } = data.currently;
                //set DOM Element from the API
                temperatureDegree.textContent = Math.floor(temperature);
                temperatureDescription.textContent = summary;
                locationTimezone.textContent= data.timezone;
                //formula for celius
                let celius = (temperature - 32) * (5/9)
                //set Icon
                setIcons(icon, document.querySelector(".icon"))

                //change temperature to Celius/Farenheit
                temperatureSection.addEventListener('click', ()=>{
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celius)
                    }else{
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = Math.floor(temperature)
                    }
                })
            })
        });

        
    }
    function setIcons(icon, iconId){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon])
    }


});