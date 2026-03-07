// verificar sesión
let pagina = window.location.pathname;

if(!localStorage.getItem("login") && !pagina.includes("index.html")){
    window.location.href = "index.html";
}
function registro(){

let user=document.getElementById("regUser").value.trim();
let pass=document.getElementById("regPass").value.trim();

let msg=document.getElementById("registerMsg");

if(user==="" || pass===""){

msg.className="alert alert-danger";
msg.innerText="Complete todos los campos";
msg.classList.remove("d-none");

return;

}

let usuarios=JSON.parse(localStorage.getItem("usuarios"))||[];

// evitar usuarios duplicados
let existe=usuarios.find(u=>u.user===user);

if(existe){

msg.className="alert alert-danger";
msg.innerText="El usuario ya existe";
msg.classList.remove("d-none");

return;

}

usuarios.push({user,pass});

localStorage.setItem("usuarios",JSON.stringify(usuarios));

msg.className="alert alert-success";
msg.innerText="Usuario registrado correctamente";
msg.classList.remove("d-none");

document.getElementById("regUser").value="";
document.getElementById("regPass").value="";

}

function login(){

let user=document.getElementById("loginUser").value.trim();
let pass=document.getElementById("loginPass").value.trim();

let error=document.getElementById("loginError");

let usuarios=JSON.parse(localStorage.getItem("usuarios"))||[];

let valido=usuarios.find(u=>u.user===user && u.pass===pass);

if(valido){

localStorage.setItem("login",true);

window.location="dashboard.html";

}else{

error.innerText="Usuario o contraseña incorrectos";
error.classList.remove("d-none");

}

}

function logout(){

localStorage.removeItem("login");

window.location="index.html";

}
