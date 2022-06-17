const fs = require("fs");


function initCasoFeria() {
    console.log("Ingrese nombre del archivo: ");
    process.stdin.on('data', function(data){
        var files = data.toString().trim();
        let index = 3;
        console.log(files);
        var texto =  fs.readFileSync("./instancias/"+files, "utf-8");
        var texto = texto.split('\n');
        //console.log(texto)
        var n = parseInt(texto[0]);
        var tamanio_ferias = new Array();
        var texto_split = texto[1].split(',');
        //console.log(texto_split);
        for (let i = 0 ; i < texto_split.length ; i++) {
            tamanio_ferias[i] = parseInt(texto_split[i]);
        }
        console.log("Iniciando Lectura de archivos........................");
        console.log("Caso con "+n+" ferias");
        console.log("n:");
        console.log(n);
        console.log("tamanio_ferias");
        console.log(tamanio_ferias);
        var cant_clientes_por_ambos_puestos = new Array();
        var result = new Array()
        cont = 0;
        for (let i = 2 ; i < texto.length-1 ; i++) {
            columnas = texto[i].split(',');
            for (j = 0 ; j < columnas.length ; j++) {
                result[cont] = parseInt(columnas[j]);
                cont++;
            }
        }
        //console.log(result);
        cont = 0
        for (let i = 0 ; i < n ; i++) {
            cant_clientes_por_ambos_puestos[i] = new Array();
            //console.log("-----------");
            for (let j = 0 ; j < n ; j++) {
                cant_clientes_por_ambos_puestos[i][j] = result[cont];
                //console.log(cant_clientes_por_ambos_puestos[i][j]);
                cont++;
            }
        }
        console.log("matriz: "+(cant_clientes_por_ambos_puestos.length*cant_clientes_por_ambos_puestos.length))
        console.log("cant_clientes_por_ambos_puestos:");
        console.log(cant_clientes_por_ambos_puestos);
        var resultado = iniciarBusqueda(n, tamanio_ferias, cant_clientes_por_ambos_puestos);
        console.log("Resultado: "+resultado);
        process.exit();
    })
    

}
function iniciarBusqueda(n, tamanio_ferias, cant_clientes_por_ambos_puestos) {
    var sumatoria = 0;
    for (let i = 0 ; i < (n-1) ; i++) {
        for (let j = (i+1) ; j < n ; j++) {
            sumatoria = sumatoria + calcularDistancia(i,j, tamanio_ferias) * cant_clientes_por_ambos_puestos[i][j];
        }
    }
    return sumatoria;
}
function calcularDistancia(i,j, tamanio_ferias) {
    sumatoria = 0;
    for (let k = (i+1); k < (j-1) ; k++) {
        sumatoria = sumatoria + tamanio_ferias[k];
    }
    //console.log((tamanio_ferias[i]/2) + sumatoria + (tamanio_ferias[j]/2));
    return ((tamanio_ferias[i]/2) + sumatoria + (tamanio_ferias[j]/2));
}
initCasoFeria();