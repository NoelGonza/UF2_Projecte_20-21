var Doblepunts = function(){
    Recompensa.apply(this, arguments);
};

Doblepunts.prototype = Object.create(Recompensa.prototype);
Doblepunts.prototype.constructor = Doblepunts;