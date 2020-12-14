let Partida = {
    mida_tauler: 5,
    mida_caselles_tauler: 25,
    tauler: [],
    zombis: [],
    estrelles: [],

    inicialitzar_tauler: function(mida){
        for (let i=0;i < mida; i++){
            this.tauler[i]=["X"];
            for(let j=0;j < mida; j++){
                this.tauler[i][j]=["X"];
            }
        }
    },

    mostrar_tauler: function(){
        let tablero = "<table id='tau'>";
        for (let i=0;i < 8; i++){
            tablero += "<tr id='"+i+"'>";
            for(let j=0;j < 8; j++){
                tablero += "<td id='"+j+"'>"+this.tauler[i][j]+"</td>";
            }
            tablero +="</tr>";
        }
        tablero += "</table>";
        document.getElementById("tauler").innerHTML = tablero;
    },

    /* crear_estrellas: function(){
        let estrellas_creadas = 0;
        while (estrellas_creadas < 5) {
            let estrella = new Estrella();
            //estrella.
            this.estrelles.push(estrella);
            estrellas_creadas++;
            this.setPosicio(i,j);
        }
    }, */

    /* getPosicio: function(x,y){
        return tauler[x][y];
    },

    setPosicio: function(valor,x,y){
        return tauler[x][y] = valor;
    }, */

    iniciar: function(mida){
        this.mida_tauler = mida;
        this.mida_caselles_tauler = mida * mida;
        this.inicialitzar_tauler();
        /* this.crear_estrellas(); */
    }
}