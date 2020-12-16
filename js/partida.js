let Partida = {
    min_tauler: 5,
    max_tauler: 20,
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
                tablero += "<td id='"+aux1+aux2+"'><button id='"+i+j+"'>"+this.tauler[i][j]+"</button></td>";
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

    iniciar: function(mida1,mida2){
        this.inicialitzar_tauler(mida1,mida2);
        this.mostrar_tauler(mida1,mida2);
        /* this.crear_estrellas(); */
    }
}