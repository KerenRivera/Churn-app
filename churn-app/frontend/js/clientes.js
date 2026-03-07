let clientes = JSON.parse(localStorage.getItem("clientes"));

if(!clientes){

clientes = [

{nombre:"Juan Perez",email:"juan@gmail.com",compras:5},

{nombre:"Maria Lopez",email:"maria@gmail.com",compras:1},

{nombre:"Carlos Diaz",email:"carlos@gmail.com",compras:2}

];

localStorage.setItem("clientes", JSON.stringify(clientes));

}

let indiceEditar = null;

function guardar(){

localStorage.setItem("clientes",JSON.stringify(clientes));

}

function cargarTabla(){

let tbody=document.querySelector("#tablaClientes tbody");

tbody.innerHTML="";

clientes.forEach((c,i)=>{

tbody.innerHTML+=`

<tr>

<td>${c.nombre}</td>

<td>${c.email}</td>

<td>${c.compras}</td>

<td>

<button class="btn btn-warning btn-sm" onclick="editar(${i})">
Editar
</button>

<button class="btn btn-danger btn-sm" onclick="eliminar(${i})">
Eliminar
</button>

<button class="btn btn-info btn-sm" onclick="predecir(${i})">
Predecir
</button>

</td>

</tr>

`;

});

}

function eliminar(i){

if(confirm("¿Eliminar cliente?")){

clientes.splice(i,1);

guardar();

cargarTabla();

}

}

function predecir(i){

let c=clientes[i];

let riesgo=c.compras<3?"⚠ Cliente en riesgo de abandono":"✅ Cliente estable";

alert(riesgo);

}

function abrirModal(){

indiceEditar=null;

document.getElementById("nombre").value="";
document.getElementById("email").value="";
document.getElementById("compras").value="";

let modal=new bootstrap.Modal(document.getElementById("modalCliente"));

modal.show();

}

function guardarCliente(){

let nombre=document.getElementById("nombre").value;
let email=document.getElementById("email").value;
let compras=parseInt(document.getElementById("compras").value);

if(nombre==""||email==""||isNaN(compras)){

alert("Complete todos los campos");

return;

}

if(indiceEditar==null){

clientes.push({nombre,email,compras});

}else{

clientes[indiceEditar]={nombre,email,compras};

}

guardar();

cargarTabla();

bootstrap.Modal.getInstance(document.getElementById("modalCliente")).hide();

}

function editar(i){

indiceEditar=i;

let c=clientes[i];

document.getElementById("nombre").value=c.nombre;
document.getElementById("email").value=c.email;
document.getElementById("compras").value=c.compras;

let modal=new bootstrap.Modal(document.getElementById("modalCliente"));

modal.show();

}

function buscarCliente(){

let input=document.getElementById("buscador").value.toLowerCase();

let filas=document.querySelectorAll("#tablaClientes tbody tr");

filas.forEach(f=>{

f.style.display=f.innerText.toLowerCase().includes(input)?"":"none";

});

}

cargarTabla();
