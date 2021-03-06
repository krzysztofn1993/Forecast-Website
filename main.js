window.onload = function () {
    var key = '174be33436b5ac8a0340d573ab8f6d96'; // klucz do API
    //----------------------------------------------
    var btn = document.querySelector('button'); // button do szukania
    console.log(btn);
    var input = document.querySelector('input'); // do kasowania wartości w input-search
    btn.onclick = function(){
        var cityName = document.querySelector('.search-input').value;// input
        if(cityName === ''){
            cityName = 'Poznań';
        }
        var degree = document.querySelector('#degrees').value ? document.querySelector('#degrees').value : 'metric'; // wybrane stopnie C K lub F
        var forecasts = document.querySelector('#forecasts').value ? document.querySelector('#forecasts').value : 5// wybrana ilość prognoz, jeśli nic nie jest wybrane to i tak bierze 5
        var url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&lang=pl&cnt=' + forecasts + '&units='
        + degree + '&appid=' + key;
    
        if(cityName !== '' && cityName !== undefined){
        getData(url, degree);
        input.value = '';
        }else{
            console.log('Wpisz nazwę miasta');
            console.log('Error!' + url); // wrong url
            input.value = ''; // input reset
        }
        console.log('Good!!!' + url) // correct url
    }
    
    function checkForecast(dataFromServer, degree){
        let format = formats(degree); 
        let chosenCity = document.querySelector('.forecast__for');
        chosenCity.innerHTML = dataFromServer.city.name + ", " + dataFromServer.city.country;
        let results = document.querySelector('.choosen__results');
        while(results.firstChild){
            results.removeChild(results.firstChild);
        }
        for(let index = 0; index<dataFromServer.cnt; index++){
            let iconDiv = document.createElement('div');
            iconDiv.setAttribute('class', 'iconDiv');
            let icon = document.createElement('img');
            let forecastInfo = document.createElement('div');
            forecastInfo.setAttribute('class', 'forecastInfo');
            let forecastText = document.createElement('div');
            let pInfo = document.createElement('p');
            pInfo.setAttribute('class', 'forecastRow pInfo');
            let p = document.createElement('p');
            p.setAttribute('class', 'forecastDescription');
            icon.setAttribute('src', 'assets/img/' + dataFromServer.list[index].weather[0].icon + '.png');
           
            pInfo.innerHTML = 'Data i godzina: ' + dataFromServer.list[index].dt_txt;
            p.innerHTML = '<span>Temperatura: </span>' + dataFromServer.list[index].main.temp + ' ' + format +'<br>' +
                        '<span>Ciśnienie:</span>' + dataFromServer.list[index].main.pressure + ' hPa<br>' + 
                        '<span>Wilgotność: </span>' + dataFromServer.list[index].main.humidity + '%' + '<br>' +
                        '<span>Opis: </span>' + dataFromServer.list[index].weather[0].description;
            if(index == 0){
                forecastInfo.setAttribute('class', 'pierwsza');
                forecastText.appendChild(pInfo);
                forecastInfo.appendChild(forecastText);
                forecastInfo.appendChild(iconDiv);
                pInfo.appendChild(p);
                iconDiv.appendChild(icon);
                results.appendChild(forecastInfo);
            }
            forecastText.appendChild(pInfo);
            forecastText.appendChild(p);
            forecastInfo.appendChild(forecastText);
            results.appendChild(forecastInfo);
        }
    }
    
    function formats(degree){
        switch(degree){
            case 'K':           
            return 'K';
            break;
            case "metric":
            return '&#8451;';
            break;
            case "F":
            return 'F';
            break;
        }
    }
    
    function getData(url, degree){
        fetch(url)
        .then( function(response){
            return response.json();
        })
        .then(function(dataFromServer){
            if(dataFromServer.cod === '200'){
            checkForecast(dataFromServer, degree);
        }
        else{
        alert('Coś poszło nie tak :(');
        }   
    })}

}
