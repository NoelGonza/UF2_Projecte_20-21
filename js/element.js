//Definim on es guarden totes les variables en el padre i les funcions
//Les variables les posem a l'hora de crear el objecte
var Element = function(pos3,pos2,pos1,estat,puntuacio,img){
    this.pos3 = pos3;
    this.pos2 = pos2;
    this.pos1 = pos1;
    this.estat = estat;
    this.puntuacio = puntuacio;
    
    //Retorna la puntuacio assignada a cada clase
    this.Puntuaciones = function(){
        return puntuacio;
    }

    //Retorna el estat de la clase
    this.ModificaArray = function(){
        return estat;
    }

    //Retorna el estat en mayuscula de la clase
    this.Descobert = function(objetoz){
        objetoz.estat = estat.toUpperCase();
        return objetoz.estat;
    }
    
    //Retorna la primera posicio de la clase
    this.PillaPos = function(){
        return pos1;
    }

    //Retorna la imatge de la clase
    this.MuestraIMG = function(){
        return img;
    }
}