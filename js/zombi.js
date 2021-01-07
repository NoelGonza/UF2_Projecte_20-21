var Zombi = function(){
    Element.apply(this, arguments);
};

Zombi.prototype = Object.create(Element.prototype);
Zombi.prototype.constructor = Zombi;