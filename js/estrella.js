var Estrella = function(x, y, casella, id){
    Element.apply(this, arguments);
};

Estrella.prototype = Object.create(Element.prototype);
Estrella.prototype.constructor = Estrella;