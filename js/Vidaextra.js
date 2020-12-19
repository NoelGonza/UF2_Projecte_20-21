var Vidaextra = function(){
    Recompensa.apply(this, arguments);
};

Vidaextra.prototype = Object.create(Recompensa.prototype);
Vidaextra.prototype.constructor = Vidaextra;