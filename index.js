const fs = require("fs");
const separator = "[Metaheuristica] - ------------------------------------------------------------------------------------------";


function initCasoFeria() {
    console.log("Ingrese nombre del archivo: ");
    process.stdin.on('data', function(data){
        var filename = data.toString().trim();
        console.log("[Metaheuristica] - ["+ filename + "]");
        console.log("[Metaheuristica] - Iniciando Lectura de archivo");
        console.log(separator)
        var texto = readFile(filename);
        if (texto) {
            // Lectura de N
            var n = parseInt(texto[0]);
            // Lectura de tamaño de las ferias
            var tamanio_ferias = new Array();
            tamanio_ferias = lecturaTamanioFerias(texto);
            
            console.log("[Metaheuristica] - Caso con "+n+" ferias");
            console.log(separator)
            // Lectura de la cantidad de clientes por ambos puestos (ferias)
            var cant_clientes_por_ambos_puestos = new Array();
            var lectura = new Array()
            lectura = lecturaDeClientesPorAmbosPuestos(texto);
            cant_clientes_por_ambos_puestos = llenadoDeMatrizClientesPorAmbosPuestos(lectura, n);
            
            //console.log(n);
            //console.log(tamanio_ferias);
            //console.log(cant_clientes_por_ambos_puestos);
            
            console.log(separator);
            console.log("[Metaheuristica] - Matriz clientes por ambos puestos: "+(cant_clientes_por_ambos_puestos.length*cant_clientes_por_ambos_puestos.length))
            console.log(separator);
            //var resultado = iniciarBusqueda(n, tamanio_ferias, cant_clientes_por_ambos_puestos);
            //console.log("Resultado: "+resultado);
        }
        console.log("[Metaheuristica] - Fin del proceso");
        process.exit();
    })
    

}
function readFile(file) {
    try {
        var texto =  fs.readFileSync("./instancias/"+file, "utf-8");
        return texto = texto.split('\n');
    } catch(err) {
        console.log("[Metaheuristica] - No se encuentra el archivo en la carpeta instancias");
    }
    
}
function lecturaTamanioFerias(texto) {
    var lectura = new Array();
    var texto_split = texto[1].split(',');
    for (let i = 0 ; i < texto_split.length ; i++) {
        lectura[i] = parseInt(texto_split[i]);
    }
    return lectura;
}
function lecturaDeClientesPorAmbosPuestos(texto) {
    var result = new Array();
    cont = 0;
    for (let i = 2 ; i < texto.length-1 ; i++) {
        columnas = texto[i].split(',');
        for (j = 0 ; j < columnas.length ; j++) {
            result[cont] = parseInt(columnas[j]);
            cont++;
        }
    }
    return result;
}
function llenadoDeMatrizClientesPorAmbosPuestos(cant_clientes, n) {
    var matriz = new Array();
    cont = 0
    for (let i = 0 ; i < n ; i++) {
        matriz[i] = new Array();
        for (let j = 0 ; j < n ; j++) {
            matriz[i][j] = cant_clientes[cont];
            cont++;
        }
    }
    return matriz;
}
function iniciarBusqueda(n, tamanio_ferias, cant_clientes_por_ambos_puestos) {
    var sumatoria = 0;
    var distancia = 0;
    for (let i = 0 ; i < (n-1) ; i++) {
        for (let j = (i+1) ; j < n ; j++) {
            //console.log("calculo()");
            //console.log(`i = ${i} , j = ${j}`);
            distancia = calcularDistancia(i,j, tamanio_ferias)
            var suma = sumatoria;
            sumatoria = sumatoria + (distancia * cant_clientes_por_ambos_puestos[i][j]);
            //console.log(`(${distancia} * ${cant_clientes_por_ambos_puestos[i][j]}) + ${suma} = ${sumatoria}`);
        }
    }
    return sumatoria;
}
function calcularDistancia(i,j, tamanio_ferias) {
    sumatoria = 0;
    n = j-1;
    for (let k = (i+1); k <= n ; k++) {
        var suma = sumatoria
        sumatoria = sumatoria + tamanio_ferias[k];
        //console.log("calcularDistancia()");
        //console.log(`k = ${k}, n = ${n}`);
        //console.log(`(${suma} + ${tamanio_ferias[k]}) = ${sumatoria}`);
    }
    var result = ((tamanio_ferias[i]/2) + sumatoria + (tamanio_ferias[j]/2));
    //console.log(`${tamanio_ferias[i]/2} + ${sumatoria} + ${tamanio_ferias[j]/2} = ${result}`);
    return result;
}
initCasoFeria();