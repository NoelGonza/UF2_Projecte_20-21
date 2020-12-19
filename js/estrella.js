var Estrella = function(ocupa,pos1){
    Element.apply(this, arguments);
    estat = "e";
};

Estrella.prototype = Object.create(Element.prototype);
Estrella.prototype.constructor = Estrella;