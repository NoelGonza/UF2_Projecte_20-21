var Doblepunts = function(){
    Recompensa.apply(this, arguments);
    //Retorna el doble de punts
    this.Doblar = function(){
        return Partida.punts = Partida.punts * 2;
    }
};

Doblepunts.prototype = Object.create(Recompensa.prototype);
Doblepunts.prototype.constructor = Doblepunts;