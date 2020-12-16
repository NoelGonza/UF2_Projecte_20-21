var Zombi = function(x, y, casella, id){
    Element.apply(this, arguments);
};

Zombi.prototype = Object.create(Element.prototype);
Zombi.prototype.constructor = Zombi;