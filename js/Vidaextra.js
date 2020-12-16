var Vidaextra = function(x, y, casella, id){
    Recompensa.apply(this, arguments);
};

Vidaextra.prototype = Object.create(Recompensa.prototype);
Vidaextra.prototype.constructor = Vidaextra;