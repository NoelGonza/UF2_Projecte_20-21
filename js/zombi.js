var Zombi = function(ocupa,pos1){
    Element.apply(this, arguments);
    estat = "z";
};

Zombi.prototype = Object.create(Element.prototype);
Zombi.prototype.constructor = Zombi;