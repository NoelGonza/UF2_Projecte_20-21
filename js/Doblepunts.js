var Doblepunts = function(){
    Recompensa.apply(this, arguments);

    this.Doblar = function(){
        return Partida.punts = Partida.punts * 2;
    }
};

Doblepunts.prototype = Object.create(Recompensa.prototype);
Doblepunts.prototype.constructor = Doblepunts;