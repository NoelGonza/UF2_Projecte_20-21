let Partida = {
    mida_tauler: 5,
    mida_caselles_tauler: 25,
    tauler: [],
    zombis: [],
    estrelles: [],

    inicialitzar_tauler: function(ample,llarg){
        for (let i=0;i < ample; i++){
            this.tauler[i]=["X"];
            for(let j=0;j < llarg; j++){
                this.tauler[i][j]=["X"];
            }
        }
    },

    mostrar_tauler: function(num1,num2){
        let abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 
        'O', 'P', 'Q', 'R', 'S', 'T'];
        let tablero = "<table id='tau'>";
        for (let i=0;i < num1; i++){
            aux1 = abc[i];
            tablero += "<tr id='"+aux1+"'>";
            for(let j=0;j < num2; j++){
                aux2 = abc[j];
                tablero += "<td id='"+aux1+aux2+"'>"+this.tauler[i][j]+"</td>";
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