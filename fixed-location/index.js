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
            name: 'Instituto de Filosofia e Ciências Humanas da UFRJ',
            location: {
                lat: -22.905396345798824, 
                lng: -43.1815796799838
            }
        },
        {
            name: 'Igreja de Santa Luzia',
            location: {
                lat: -22.909527151327826, 
                lng: -43.172616139001924
            }
        },
        {
            name: 'Paço Imperial',
            location: {
                lat: -22.90354089656319, 
                lng: -43.17424216480989
            }
        },
        {
            name: 'Igreja de N. Sra. da Lapa dos Mercadores',
            location: {
                lat: -22.90218021045175, 
                lng: -43.17526536061108
            }
        },
        {
            name: 'Museu Histórico Nacional',
            location: {
                lat: -22.905884426679346, 
                lng: -43.169510298277935
            }
        },
        {
            name: 'Convento de Santo Antônio',
            location: {
                lat: -22.90707366273329, 
                lng: -43.17923989105765
            }
        },
        {
            name: 'Arquivo Nacional (Antiga Casa da Moeda)',
            location: {
                lat: -22.906263705147236, 
                lng: -43.19071432234368
            }
        },
        {
            name: 'Igreja de N. Sra. da Glória do Outeiro',
            location: {
                lat: -22.921304963846488, 
                lng: -43.17531032314713
            }
        },
        {
            name: 'Igreja de N. Sra. do Carmo da Antiga Sé',
            location: {
                lat: -22.903346296964088, 
                lng: -43.175393019820746
            }
        },
        {
            name: 'Biblioteca Nacional',
            location: {
                lat: -22.90961418509681, 
                lng: -43.175408904212176
            }
        },
        {
            name: 'Museu Nacional de Belas Artes',
            location: {
                lat: -22.909011893964223, 
                lng: -43.17560334435782
            }
        },
        {
            name: 'Igreja N. Sra. de Montserrat (Mosteiro de São Bento)',
            location: {
                lat: -22.896959437768825, 
                lng: -43.178015629195315
            }
        },
        {
            name: 'Theatro Municipal do Rio de Janeiro',
            location: {
                lat: -22.909006575421554, 
                lng: -43.176559915700395
            }
        },
        {
            name: 'Igreja de N. Sra. da Candelária',
            location: {
                lat: -22.900875320358914, 
                lng: -43.17784753025281
            }
        },
        {
            name: 'Sala Cecília Meireles',
            location: {
                lat: -22.914462075656065, 
                lng: -43.178344381317864
            }
        },
        {
            name: 'Igreja N. Sra. do Carmo da Lapa do Desterro',
            location: {
                lat: -22.914771857443853, 
                lng: -43.17788580882848
            }
        },
        {
            name: 'Casa do Choro',
            location: {
                lat: -22.906496741460792, 
                lng: -43.180342659445316
            }
        },
        {
            name: 'Museu de Arte do Rio',
            location: {
                lat: -22.896643081552256, 
                lng: -43.18195606619462
            }
        },
        {
            name: 'Museu de Arte Moderna do Rio de Janeiro',
            location: {
                lat: -22.913734581005798, 
                lng: -43.171801644548
            }
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
        let text = document.createElement('a-link');
        text.setAttribute('gps-projected-entity-place', {latitude,longitude});
        text.setAttribute('title', place.name);
        text.setAttribute('href', "#");
        text.setAttribute('scale', '15 15 15');
        text.setAttribute('class', '15 15 15');
        text.classList.add('clickable');

        text.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded', { detail: { component: this.el }}))
        });

        const clickListener = function (ev) {
            ev.stopPropagation();
            ev.preventDefault();

            const camera = document.querySelector("[camera]");

            const frame = document.createElement("a-image");
            frame.setAttribute("width", "2");
            frame.setAttribute("height", "1");
            frame.setAttribute("position", "0 0 -1");
            frame.setAttribute("src", `#canal`);
            frame.classList.add("clickable");
            frame.addEventListener("click", () => {
                camera.removeChild(background);
                camera.removeChild(frame)
            });
            camera.appendChild(frame);

            const background = document.createElement("a-entity");
            background.setAttribute("id", "background");
            background.setAttribute("geometry", {primitive: "plane", height: 2, width: 4});
            background.setAttribute("material", {shader: "flat", color: "black", opacity: 0.7});
            background.setAttribute("position", "0 0 -1.1");
            background.classList.add("clickable");
            camera.appendChild(background);

            background.addEventListener("click", () => {
                camera.removeChild(background);
                camera.removeChild(frame)
            });
        };

        text.addEventListener('click', clickListener);
        scene.appendChild(text);
    });
}