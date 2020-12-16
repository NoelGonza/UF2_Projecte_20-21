var Doblepunts = function(x, y, casella, id){
    Recompensa.apply(this, arguments);
};

Doblepunts.prototype = Object.create(Recompensa.prototype);
Doblepunts.prototype.constructor = Doblepunts;