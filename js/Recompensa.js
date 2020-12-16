var Recompensa = function(x, y, casella, id){
    Element.apply(this, arguments);
};

Recompensa.prototype = Object.create(Element.prototype);
Recompensa.prototype.constructor = Recompensa;