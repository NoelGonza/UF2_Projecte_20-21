//Clase estrella para saber que es estrella
var Estrella = function(){
    Element.apply(this, arguments);
};

Estrella.prototype = Object.create(Element.prototype);
Estrella.prototype.constructor = Estrella;