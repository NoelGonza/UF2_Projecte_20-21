let Partida = {
    min_tauler: 5,
    max_tauler: 25,
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
        let tablero = "<div id='tau'>";
        for (let i=0;i < num1; i++){
            aux1 = abc[i];
            tablero += "<div id='"+aux1+" class='pepe''>";
            for(let j=0;j < num2; j++){
                aux2 = abc[j];
                tablero += "<div id='"+aux1+aux2+"' class='pope'>"+this.tauler[i][j]+"</div>";
            }
            tablero +="</div>";
        }
        tablero += "</div>";
        document.getElementById("tablero").innerHTML = tablero;
        /* this.zombis = new Zombi(1,1);
        var wololo = this.zombis.PillaPos();
        console.log(wololo);
        console.log(this.zombis);
        this.tauler[0][wololo] = this.zombis
        console.log(this.tauler[0][1])
        console.log(this.tauler) */
    },

    clicar_div: function(event){
        var elide = event.target;
        document.getElementById("owo").innerHTML = "Esta id esta ocupado: "+ elide.id;
    },

    insertar_valores: function(){
        let valor = Math.floor(this.max_tauler / 4)
        console.log(valor)
        for(let i=0;i<this.tauler.length;i++){
            for(let j=0;j<this.tauler.length;j++){
                console.log(this.tauler[i][j] == this.zombis[1])
            }
        }
        
    },

    crear_objetos: function(){
        
    },

    random_matriz: function(PosX,PosY){
        for(let i=0;i < 2;i++){
            PosX = Math.floor(Math.random()*(this.tauler.length));
            PosY = Math.floor(Math.random()*(this.tauler.length));
            console.log(PosX);
            console.log(PosY);
            if(this.tauler[PosX][PosY] == this.zombis[i]){
                console.log("No puedes")
            }
            else{
            this.tauler[PosX][PosY] = new Zombi(null,PosY);
            console.log(this.tauler);
            this.zombis.push(this.tauler[PosX][PosY]);
            }
        }
        console.log(this.zombis)
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
        this.max_tauler = mida1 * mida2;
        this.inicialitzar_tauler(mida1,mida2);
        this.mostrar_tauler(mida1,mida2);
        this.random_matriz(mida1,mida2);
        console.log(this.tauler);
        this.insertar_valores();
        
        /* this.crear_estrellas(); */
    }
}