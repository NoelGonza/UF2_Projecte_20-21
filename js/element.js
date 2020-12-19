var Element = function(ocupa, pos1,estat,puntuacio){
    this.ocupa = ocupa;
    this.pos1 = pos1;
    this.estat = estat;
    this.puntuacio = puntuacio;

    this.Puntuaciones = function(){
        return puntuacio;
    }

    this.ModificaArray = function(){
        return estat;
    }

    this.Descobert = function(){
        return estat.toUpperCase();
    }

    this.PillaOcup = function(){
        return ocupa;
    }
        
    this.PillaPos = function(){
        return pos1;
    }
}