window.onload = function(){
    /* prompt("Mida del tauler? 5<->20")
    partida.iniciar(mida); */
    document.getElementById("estats").style.display = "none";
    /* document.getElementById("tauler").style.display = "none"; */
    Partida.inicialitzar_tauler(8);
    Partida.mostrar_tauler();
}

document.getElementById("mostra").addEventListener("click", mostra_numeros);

function mostra_numeros(){
    let num1 = validar(document.getElementById("t1").value);
    let num2 = validar(document.getElementById("t2").value);
    if (num1 == 0 || num2 == 0){
        alert("Els valors han de tenir un valor entre 5 i 20");
    }
    else{
        document.getElementById("num1").innerHTML = num1;
        document.getElementById("num2").innerHTML = num2;
    }
}

function validar(num){
    if (num<=20 && num>=5){
        return num;
    }
    else{
        return 0;
    }
}