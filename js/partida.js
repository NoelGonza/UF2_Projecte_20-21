let partida = {
    mida_tauler = 5,
    mida_caselles_tauler = 25,
    tauler: [],
    zombis: [],
    estrelles: [],

    inicialitzar_tauler: function(){
        for (let i=0;i < this.mida_tauler; i++){
            tauler[i]=[];
            for(let j=0;j < tauler.length; j++){
                /* tauler[i][j] = ; */
                /* Inicialitza tauler */
            }
        }
    },

    mostrar_tauler: function(){

    },

    crear_estrellas: function(){
        let estrellas_creadas = 0;
        while (estrellas_creadas < 5) {
            let estrella = new Estrella();
            //estrella.
            this.estrelles.push(estrella);
            estrellas_creadas++;
            this.setPosicio(i,j);
        }
    },

    getPosicio: function(x,y){
        return tauler[x][y];
    },

    setPosicio: function(valor,x,y){
        return tauler[x][y] = valor;
    },

    iniciar: function(mida){
        this.mida_tauler = mida;
        this.mida_caselles_tauler = mida * mida;
        this.inicialitzar_tauler();
        this.crear_estrellas();
    }
}