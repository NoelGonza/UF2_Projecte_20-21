var Element = function(ocupa, pos1){
    this.ocupa = ocupa;
    this.pos1 = pos1;
    estat = "g";
    ocupa = 0;

    this.ModificaArray = function(){
        return estat;
    }

    this.Descobert = function(){
        estat = estat.toUpperCase();
        return estat;
    }

    this.PillaOcup = function(){
        return ocupa;
    }
        
    this.PillaPos = function(){
        return pos1;
    }
}