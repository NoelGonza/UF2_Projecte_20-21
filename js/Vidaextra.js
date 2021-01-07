var Vidaextra = function(){
    Recompensa.apply(this, arguments);
    //Suma una vida
    this.Sumarvida = function(){
        return Partida.vidas++;
    }
};

Vidaextra.prototype = Object.create(Recompensa.prototype);
Vidaextra.prototype.constructor = Vidaextra;