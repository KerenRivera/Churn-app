// verificar sesión
if(!localStorage.getItem("login")){
window.location="index.html";
}

let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

let total = clientes.length;

let riesgo = 0;
let estables = 0;

clientes.forEach(c => {

if(c.compras < 3){
riesgo++;
}else{
estables++;
}

});

// evitar división por 0
let porcentaje = total > 0 ? Math.round((riesgo / total) * 100) : 0;

// actualizar tarjetas
document.getElementById("totalClientes").innerText = total;
document.getElementById("riesgoClientes").innerText = riesgo;
document.getElementById("establesClientes").innerText = estables;
document.getElementById("porcentajeRiesgo").innerText = porcentaje + "%";

// si no hay clientes no mostrar gráfica
if(total === 0){

document.getElementById("grafica").style.display = "none";

}

// gráfica
const ctx = document.getElementById('grafica');

if(ctx){

new Chart(ctx, {

type: 'bar',

data: {

labels: ['Clientes en Riesgo','Clientes Estables'],

datasets: [{

label:'Cantidad de Clientes',

data:[riesgo,estables],

backgroundColor:[
'#e74c3c',
'#2ecc71'
]

}]

},

options: {

responsive:true,

plugins:{
legend:{
display:false
}
}

}

});

}
