const NASA_URL = "https://images-api.nasa.gov/search?q={{search_word}}";

document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("btnBuscar");
  const input = document.getElementById("inputBuscar");

  boton.addEventListener("click", (e) => {
    const textoInput = input.value.trim().toLowerCase();

    if (textoInput == "") {
      return;
    }

    const fetchUrl = NASA_URL.replace("{{search_word}}", textoInput);

    const container = document.getElementById("contenedor");
    container.innerHTML = 'Cargando...';

    fetch(fetchUrl)
      .then(response => response.json())
      .then(data => agregarCards(data.collection.items));
  });

});

function agregarCards(listaDeDatos) {
  const container = document.getElementById("contenedor");
  container.innerHTML = '';
  
  listaDeDatos.forEach(data => {
    const itemLink = data.links?.[0];
    const itemData = data.data?.[0];
    
    const imagen = itemLink?.href?.trim();
    const titulo = itemData?.title?.trim();
    const desc = itemData?.description?.trim();
    const fecha = itemData?.date_created?.trim();

    const maxDescriptionLength = 100;
    const truncatedDesc = desc.length > maxDescriptionLength 
      ? desc.substring(0, maxDescriptionLength) + '...' 
      : desc;

    const columna = document.createElement('div');
    columna.className = 'col-md-3 card-container';

    const tarjeta = document.createElement('div');
    tarjeta.className = 'card mb-2 cursor-pointer';

    const imagenElement = document.createElement('img');
    imagenElement.src = imagen || '#';
    imagenElement.className = 'card-img-top img-fluid';
    imagenElement.alt = titulo;

    const cuarpoTarjeta = document.createElement('div');
    cuarpoTarjeta.className = 'card-body';

    const tituloTarjeta = document.createElement('h5');
    tituloTarjeta.className = 'card-title card-custom-title';
    tituloTarjeta.textContent = titulo;

    const descriptionTarjeta = document.createElement('p');
    descriptionTarjeta.className = 'm-0';
    descriptionTarjeta.innerHTML = truncatedDesc;

    const fechaTarjeta = document.createElement('p');
    fechaTarjeta.className = 'm-0 text-secondary fs-6';
    fechaTarjeta.innerHTML = fecha;

    cuarpoTarjeta.appendChild(tituloTarjeta);
    cuarpoTarjeta.appendChild(descriptionTarjeta);
    cuarpoTarjeta.appendChild(fechaTarjeta);
    tarjeta.appendChild(imagenElement);
    tarjeta.appendChild(cuarpoTarjeta);
    columna.appendChild(tarjeta);
    container.appendChild(columna);
  });
}
