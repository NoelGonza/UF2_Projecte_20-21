var Gespa = function(ocupa,pos1,estat){
    Element.apply(this, arguments);
    estat = "g";
    puntuacio = 50;
};

Gespa.prototype = Object.create(Element.prototype);
Gespa.prototype.constructor = Gespa;