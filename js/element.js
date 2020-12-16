var Element = function(ocupa, pos1){
    this.ocupa = ocupa;
    this.pos1 = pos1;
    estat = "g";
    ocupa = 0;
    
    this.PillaOcup = function(){
        return ocupa;
    }
        
    this.PillaPos = function(){
        return pos1;
    }
}