var Doblepunts = function(){
    Recompensa.apply(this, arguments);

    this.Doblar = function(){
        Partida.punts = Partida.punts * 2;
        document.getElementById("punt").innerHTML = Partida.punts;
    }
};

Doblepunts.prototype = Object.create(Recompensa.prototype);
Doblepunts.prototype.constructor = Doblepunts;