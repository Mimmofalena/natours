/*eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibWltbW9mYWxlbmEiLCJhIjoiY2t4a3lyZXhlNHhmYTJ4bzVtaG03a2ozeiJ9.x5peppL9reZDKG5Ogmy51Q';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mimmofalena/ckxkzcz9q4otu14mrjr7dd4x5',
    scrollZoom: false,
    //   center: [-118.113491, 34.111745],
    //   zoom: 10,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    //create Marker

    const el = document.createElement('div');
    el.className = 'marker';

    //add Marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    //add popup

    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    //extends map bounds to current locations
    bounds.extend(loc.coordinates);
  });

  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav, 'top-right');

  map.fitBounds(bounds, {
    paddin: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
