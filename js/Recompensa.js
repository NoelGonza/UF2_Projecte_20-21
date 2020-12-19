var Recompensa = function(){
    Element.apply(this, arguments);
};

Recompensa.prototype = Object.create(Element.prototype);
Recompensa.prototype.constructor = Recompensa;