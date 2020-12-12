window.onload = function(){
    /* prompt("Mida del tauler? 5<->20")
    partida.iniciar(mida); */
    document.getElementById("estats").style.display = "none";
    document.getElementById("tauler").style.display = "none";
}

document.getElementById("mostra").addEventListener("click", mostra_numeros);

let num1;
let num2;
function mostra_numeros(){
    num1 = document.getElementById("t1").value;
    num2 = document.getElementById("t2").value;
    num1 = validar(num1);
    num2 = validar(num2);
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