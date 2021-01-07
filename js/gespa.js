//Clase gespa para saber que es gespa
var Gespa = function(){
    Element.apply(this, arguments);
    //Retorna una segona imatge
    this.MuestraIMG2 = function(){
        return img = "<img src='img/gespa2.png' height='"+ Partida.h +"px' width='"+ Partida.w +"px'>";
    }
};

Gespa.prototype = Object.create(Element.prototype);
Gespa.prototype.constructor = Gespa;