//local storage
localStorage.setItem("pizzas", JSON.stringify(pizzas));
//Traigo contenedor
const container = document.querySelector(".container");
//Muestro todas las pizzas
window.addEventListener("load", () => muestroHTML());
function muestroHTML() {
    container.innerHTML = pizzas.map((pizza) => {
    return `
				<div class="tarjeta">
					<h2>${pizza.nombre}</h2>
					<img src="./img/${pizza.imagen}" alt="" />
				</div>
			`;
    })
    .join("");
}

//Traigo para la busqueda
const form = document.getElementById("form");
const input = document.querySelector(".search-input");
const gustos = document.querySelector(".gustos");

//Formulario
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const pizzaElejida = input.value.trim();
  if (pizzaElejida === "") {
    alert("Por favor, ingresa una pizza");
    return;
  } else {
    pintarHTMLElejida(pizzaElejida);
  }
});

//Funcionalidad antes de grafica
function pintarHTMLElejida(pizzaElejida) {
    let pizzaOk = false;
    //antes de mostrar
    let pizzasMostrar = [];
    for (let i in pizzas) {
    if (pizzas[i].nombre.toLowerCase().includes(pizzaElejida.toLowerCase())) {
        pizzaOk = true;
        pizzasMostrar.push(pizzas[i]);
    }
    }

//Muestro pizza elejida correctamente
    if (pizzaOk) {
    //Boton para traer todos los gustos
    gustos.classList.remove("hidden");
    //Reset espacio
    container.innerHTML = "";
    //Muestro
    container.innerHTML = pizzasMostrar.map((pizza) => {
        return `
				<div class="tarjeta">
					<h2>${pizza.nombre}</h2>
					<img src="./img/${pizza.imagen}" alt="" />
					<h2>$ ${pizza.precio}</h2>
					<h3>Ingredientes:</h3>
					<p>${pizza.ingredientes.join(", ")}</p>
				</div>
			`;
    })
    .join("");
    } else {
    //No es un nombre perteneciente a nuestros gustos
    alert("No hay un nombre de pizza que contenga esa palabra.");
    }
}

gustos.addEventListener("click", () => {
    gustos.classList.add("hidden");
    muestroHTML();
});