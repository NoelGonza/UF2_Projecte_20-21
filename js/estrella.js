var Estrella = function(ocupa,pos1){
    Element.apply(this, arguments);
    estat = "e";
    this.PillaOcup = function(){
        return ocupa;
    }
        
    this.PillaPos = function(){
        return pos1;
    }
};

Estrella.prototype = Object.create(Element.prototype);
Estrella.prototype.constructor = Estrella;