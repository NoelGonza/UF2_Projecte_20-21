window.onload = function(){
    /* document.getElementById("estats").style.display = "none"; */
    /* document.getElementById("tauler").style.display = "none"; */
}

document.getElementById("mostra").addEventListener("click", mostra_numeros);
/* document.getElementById("tauler").onclick(Partida.clicar_div(event)); */

function mostra_numeros(){
    let num1 = validar(document.getElementById("t1").value);
    let num2 = validar(document.getElementById("t2").value);
    if (num1 == 0 || num2 == 0){
        alert("Els valors han de tenir un valor entre 5 i 20");
    }
    else{
        Partida.iniciar(num1,num2);
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