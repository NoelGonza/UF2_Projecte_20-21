let Partida = {
    min_tauler: 5,
    max_tauler: 25,
    tauler: [],
    zombis: [],
    estrelles: [],
    gespa: [],
    vidas: 3,
    punts: 100,
    ancho: 0,
    largo: 0,

    inicialitzar_tauler: function(ample,llarg){
        for (let i=0;i < ample; i++){
            this.tauler[i]=[];
            for(let j=0;j < llarg; j++){
                var gespa1 = new Gespa(null, [i,j],"g");
                this.gespa.push(gespa1);
                var posicionar = gespa1.ModificaArray();
                this.tauler[i][j]=posicionar;
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
        for(let i=0;i < 3;i++){
            PosX = Math.floor(Math.random()*(this.tauler.length));
            PosY = Math.floor(Math.random()*(this.tauler.length));
            console.log(PosX);
            console.log(PosY);
            if(this.tauler[PosX][PosY] == this.zombis[i]){
                console.log("No puedes")
            }
            else{
                var pivote = new Zombi(null, [PosX,PosY],"z");
                this.zombis.push(pivote);
                var cambia = pivote.ModificaArray();
                this.tauler[PosX][PosY] = cambia;
                console.log(this.zombis);
                console.log(this.tauler);
            }
        }
        console.log(this.zombis)
    },

    iniciar: function(mida1,mida2){
        document.getElementById("vid").innerHTML = this.vidas;
        document.getElementById("punt").innerHTML = this.punts;
        ancho = mida1;
        largo = mida2;
        this.max_tauler = mida1 * mida2;
        this.inicialitzar_tauler(mida1,mida2);
        this.mostrar_tauler(mida1,mida2);
        this.random_matriz(mida1,mida2);
        console.log(this.tauler);
        this.insertar_valores();
    }
}

document.getElementById("busca").addEventListener("click", busca_zombie);

function busca_zombie(){
    let posX = document.getElementById("z1").value;
    let posY = document.getElementById("z2").value;
    if (Partida.tauler[posX][posY] == "z"){
        for (let i=0; i < Partida.zombis.length; i++) {
            if(Partida.zombis[i].pos1[0] == posX && Partida.zombis[i].pos1[1] == posY){
                Partida.tauler[posX][posY] = Partida.zombis[i].Descobert();
                Partida.mostrar_tauler(Partida.tauler.length,Partida.tauler[0].length);
                Partida.vidas--;
                console.log(Partida.vidas)
                document.getElementById("vid").innerHTML = Partida.vidas;
                if(Partida.punts >= 100){
                    Partida.punts = Partida.punts - Partida.zombis[i].Puntuaciones();
                    document.getElementById("punt").innerHTML = Partida.punts;
                }
                if(Partida.vidas == 0){
                    alert("Has perdido wey :(");
                }
            }
        }
    }
    else if (Partida.tauler[posX][posY] == "g"){
        for (let i=0; i < Partida.gespa.length; i++){
            if(Partida.gespa[i].pos1[0] == posX && Partida.gespa[i].pos1[1] == posY){
                Partida.tauler[posX][posY] = Partida.gespa[i].Descobert();
                console.log(Partida.gespa[i].Descobert())
                Partida.mostrar_tauler(Partida.tauler.length,Partida.tauler[0].length);
            }
        }
    }
}