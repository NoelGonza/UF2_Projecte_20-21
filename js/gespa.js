//Clase gespa para saber que es gespa
var Gespa = function(){
    Element.apply(this, arguments);
};

Gespa.prototype = Object.create(Element.prototype);
Gespa.prototype.constructor = Gespa;