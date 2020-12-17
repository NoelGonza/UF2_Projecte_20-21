var Zombi = function(ocupa,pos1){
    Element.apply(this, arguments);
    estat = "z";

    this.PillaOcup = function(){
        return ocupa;
    }
        
    this.PillaPos = function(){
        return pos1;
    }
};

Zombi.prototype = Object.create(Element.prototype);
Zombi.prototype.constructor = Zombi;