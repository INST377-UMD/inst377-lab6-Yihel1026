var map = L.map('map').setView([32.5, -95], 3);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

const coords = [
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) },
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) },
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) }
];

function fetchLocalityData(lat, lng, markerTextId) {
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
        .then(response => response.json())
        .then(data => {
            const locality = data.locality || 'Unknown location';
            document.getElementById(markerTextId).innerHTML += `<br>Locality: ${locality}`;
        })
        .catch(error => console.error('Error fetching locality data:', error));
}

coords.forEach((coord, index) => {
    const marker = L.marker([coord.lat, coord.lng]).addTo(map);
    const markerTextId = `marker${index + 1}`;
    document.getElementById(markerTextId).textContent += ` (${coord.lat}, ${coord.lng})`;
    fetchLocalityData(coord.lat, coord.lng, markerTextId);
});
