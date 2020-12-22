//Sumar vida suma una vida al llamarla
var Vidaextra = function(){
    Recompensa.apply(this, arguments);

    this.Sumarvida = function(){
        return Partida.vidas++;
    }
};

Vidaextra.prototype = Object.create(Recompensa.prototype);
Vidaextra.prototype.constructor = Vidaextra;