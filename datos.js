const fecha = document.querySelector(".fecha1");
const date = new Date;
fecha.textContent = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

const contenedor = document.querySelector(".resultados");

const crearEtiquetasHtml = (img, texto, precio, alt) => { //funcion para crear el HTML de las tarjetas que muestran el producto
    const tarjetaDiv = document.createElement("DIV");
    const divImg = document.createElement("DIV");
    const imagen = document.createElement("IMG");
    const divTexto = document.createElement("DIV");

    tarjetaDiv.classList.add("tarjeta");
    imagen.setAttribute("src", img);
    imagen.setAttribute("alt", `Imagen de ${alt}`);
    divTexto.textContent = `${texto} - $${precio} libra`;

    divImg.appendChild(imagen);
    tarjetaDiv.appendChild(divImg);
    tarjetaDiv.appendChild(divTexto);
    contenedor.appendChild(tarjetaDiv); //las tarjetas se agregan al DIV del html cuya clase es "resultados"
}

const obtenerDatos = async () => { //se usa AJAX para obtener informacion de la API de Unsplash
    let palabra = document.getElementById("buscador");
    let informacion = await consulta(palabra.value); //se espera a que la información sea consultada

    contenedor.innerHTML = "";
    
    informacion.results.map(result => { //se recorren los resultados y se obtiene la infomacion de cada uno
        let valor = generarPrecio();
        crearEtiquetasHtml(result.urls.small, result.tags[0].title, valor, result.alt_description); //se llama la funcion que crea las tarjetas para cada resultado
    });
}

const generarPrecio = () => { //esta funcion crea un precio al azar de entre 500 hasta 10000 pesos
    let precio = Math.round(Math.random() * (10000 - 500) + 500);
    return precio;
}

const consulta = async busqueda => {  //esta es la funcion con la que se consume la API y se consultan los datos
    return fetch(`https://api.unsplash.com/search/photos/?client_id=sygNXi7Tmj2r3cSpCI5ni5QKb5XDdiuFPb1jmg4r-dU&query=${busqueda}&per_page=20`)
        .then(res => res.json()) //se desencapsulan los datos pasandolos a JSON
        .then(datos => datos);
}

document.getElementById("buscador").addEventListener("keydown", k => { //este es un evento que esta atento a cuando el usuario oprima Enter en la barra de busqueda
    if(k.key == "Enter"){
        obtenerDatos(k.target.value); //al oprimir Enter se llama la funcion que obtiene los datos y se le pasa como parametro el texto que el usuario ha escrito
    }
});
