//Definimos donde se guardan todas las variables en el padre i las funciones
//Las variables las ponemos a la hora de crear el objeto
var Element = function(pos2,pos1,estat,puntuacio,img){
    this.pos1 = pos1;
    this.pos2 = pos2;
    this.estat = estat;
    this.puntuacio = puntuacio;
    
    //Devuelve la puntuacion assignada a cada clase
    this.Puntuaciones = function(){
        return puntuacio;
    }

    this.ModificaArray = function(){
        return estat;
    }

    this.Descobert = function(objetoz){
        objetoz.estat = estat.toUpperCase();
        return objetoz.estat;
    }

    this.PillaOcup = function(){
        return ocupa;
    }
        
    this.PillaPos = function(){
        return pos1;
    }
    
    this.MuestraIMG = function(){
        return img;
    }
}