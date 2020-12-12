window.onload = function(){
    /* prompt("Mida del tauler? 5<->20")
    partida.iniciar(mida); */
    document.getElementById("estats").style.display = "none";
    document.getElementById("tauler").style.display = "none";
}

document.getElementById("mostra").addEventListener("click", mostra_numeros);

function mostra_numeros(){
    num1 = document.getElementById("t1").value;
    num2 = document.getElementById("t2").value;

    document.getElementById("num1").innerHTML = num1;
    document.getElementById("num2").innerHTML = num2;
}