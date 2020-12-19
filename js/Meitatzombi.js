var Meitatzombi = function(){
    Recompensa.apply(this, arguments);
};

Meitatzombi.prototype = Object.create(Recompensa.prototype);
Meitatzombi.prototype.constructor = Meitatzombi;