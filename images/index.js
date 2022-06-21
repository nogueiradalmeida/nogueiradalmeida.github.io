window.onload = () => {
    let method = 'dynamic';

    // if you want to statically add places, de-comment following line:
    method = 'static';
    if (method === 'static') {
        let places = staticLoadPlaces();
        return renderPlaces(places);
    }

    if (method !== 'static') {
        // first get current user location
        return navigator.geolocation.getCurrentPosition(function (position) {

            // than use it to load from remote APIs some places nearby
            dynamicLoadPlaces(position.coords)
                .then((places) => {
                    renderPlaces(places);
                })
        },
            (err) => console.error('Error in retrieving position', err),
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 27000,
            }
        );
    }
};

function staticLoadPlaces() {
    return [
        {
            name: "Teatro Municipal",
            location: {
                lat: -22.908946906837084, // change here latitude if using static data
                lng: -43.1765680709474, // change here longitude if using static data
            },
            link: "http://theatromunicipal.rj.gov.br/",
            img: "./theatro_plateia.jpg"
        },
        {
            name: "Arcos da Lapa",
            location: {
                lat: -22.912769562737516, // change here latitude if using static data
                lng: -43.1799963698298, // change here longitude if using static data
            },
            link: "https://freewalkertours.com/pt-br/arcos-da-lapa-rio-de-janeiro/",
            img: "Arcos_da_Lapa.jpg"
        }
    ];
}

// getting places from REST APIs
function dynamicLoadPlaces(position) {
    let params = {
        radius: 300,    // search places not farther than this value (in meters)
        clientId: 'HZIJGI4COHQ4AI45QXKCDFJWFJ1SFHYDFCCWKPIJDWHLVQVZ',
        clientSecret: '',
        version: '20300101',    // foursquare versioning, required but unuseful for this demo
    };

    // CORS Proxy to avoid CORS problems
    // NOTE this no longer works - please replace with your own proxy
    let corsProxy = 'https://cors-anywhere.herokuapp.com/';

    // Foursquare API
    let endpoint = `${corsProxy}https://api.foursquare.com/v2/venues/search?intent=checkin
        &ll=${position.latitude},${position.longitude}
        &radius=${params.radius}
        &client_id=${params.clientId}
        &client_secret=${params.clientSecret}
        &limit=15
        &v=${params.version}`;
    return fetch(endpoint)
        .then((res) => {
            return res.json()
                .then((resp) => {
                    return resp.response.venues;
                })
        })
        .catch((err) => {
            console.error('Error with places API', err);
        })
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        // add place name
        /*
        let text = document.createElement('a-link');
        text.setAttribute('gps-projected-entity-place', {latitude,longitude});
        text.setAttribute('title', place.name);
        text.setAttribute('href', place.link);
        text.setAttribute('scale', '15 15 15');
        */

        let imagem = document.createElement('a-image')
        imagem.setAttribute('gps-projected-entity-place', {latitude,longitude});
        imagem.setAttribute('look-at', '[gps-projected-camera]');
        imagem.setAttribute('src', place.img)
        imagem.setAttribute('scale', '20, 20');
        imagem.setAttribute('clickhandler','')

        imagem.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-projected-entity-place-loaded', { detail: { component: this.el }}))
        });

        const clickListener = function (ev) {
            ev.stopPropagation();
            ev.preventDefault();

            alert('Internal click listener!')
            // const name = ev.target.getAttribute('name');

            // const el = ev.detail.intersection && ev.detail.intersection.object.el;

            // if (el && el === ev.target) {
            //     const label = document.createElement('span');
            //     const container = document.createElement('div');
            //     container.setAttribute('id', 'place-label');
            //     label.innerText = name;
            //     container.appendChild(label);
            //     document.body.appendChild(container);

            //     setTimeout(() => {
            //         container.parentElement.removeChild(container);
            //     }, 1500);
            // }
        };

        imagem.addEventListener('click', clickListener);

        scene.appendChild(imagem);
    });

}