var Estrella = function(ocupa,pos1,estat){
    Element.apply(this, arguments);
    estat = "e";
    puntuacio = 200;
};

Estrella.prototype = Object.create(Element.prototype);
Estrella.prototype.constructor = Estrella;