var Zombi = function(ocupa,pos1,estat){
    Element.apply(this, arguments);
    estat = "z";
    puntuacio = 100;
};

Zombi.prototype = Object.create(Element.prototype);
Zombi.prototype.constructor = Zombi;