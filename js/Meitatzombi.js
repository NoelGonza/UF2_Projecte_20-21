var Meitatzombi = function(x, y, casella, id){
    Recompensa.apply(this, arguments);
};

Meitatzombi.prototype = Object.create(Recompensa.prototype);
Meitatzombi.prototype.constructor = Meitatzombi;