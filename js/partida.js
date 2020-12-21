let Partida = {
    tauler: [],
    zombis: [],
    estrelles: [],
    gespa: [],
    doble: [],
    meitat: [],
    vidas: 3,
    punts: 0,
    victoria: 0,

    inicialitzar_tauler: function(ample,llarg){
        for (let i=0;i < ample; i++){
            this.tauler[i]=[];
            for (let j=0;j < llarg; j++){
                //Definimos gespa i la guardamos en la array gespa i la añadimos en la array tauler tambien
                var gespa1 = new Gespa(null, [i,j],"g",50);
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
            tablero += "<div id='"+aux1+"' class='pepe'>";
            for (let j=0;j < num2; j++){
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
        for (let i=0;i<this.tauler.length;i++){
            for (let j=0;j<this.tauler.length;j++){
                console.log(this.tauler[i][j] == this.zombis[1])
            }
        }
    },

    crear_objetos: function(mida1, mida2){
        porcentaje = Math.round((mida1 * mida2)/4);
        estrellas = Math.round((parseInt(mida1)+parseInt(mida2))/2);
        Doblep = 1;
        Meitatz = 2;
        this.crear_zombies(mida1,mida2,porcentaje);
        this.crear_estrellas(mida1,mida2,estrellas);
        this.crear_DoblePuntuacion(mida1,mida2,Doblep);
        this.crear_Meitat(mida1,mida2,Meitatz);
    },

    crear_zombies: function(PosX,PosY,Por25){
        for (let i=0;i < Por25;i++){
            do{
                PosX = Math.floor(Math.random()*(this.tauler.length));
                PosY = Math.floor(Math.random()*(this.tauler[0].length));
                console.log(PosX);
                console.log(PosY);
            }
            while (this.tauler[PosX][PosY] != "g");
            var pivote = new Zombi(null, [PosX,PosY],"z",100);
            this.zombis.push(pivote);
            var cambia = pivote.ModificaArray();
            this.tauler[PosX][PosY] = cambia;
        }
    },

    crear_estrellas: function(PosX,PosY,Por25){
        for (let i=0;i < Por25;i++){
            do{
                PosX = Math.floor(Math.random()*(this.tauler.length));
                PosY = Math.floor(Math.random()*(this.tauler[0].length));
                console.log(PosX);
                console.log(PosY);
            }
            while (this.tauler[PosX][PosY] != "g");
            var pivote = new Estrella(null, [PosX,PosY],"e",200);
            this.estrelles.push(pivote);
            var cambia = pivote.ModificaArray();
            this.tauler[PosX][PosY] = cambia;
        }
    },

    crear_DoblePuntuacion: function(PosX,PosY,Por25){
        for (let i=0;i < Por25;i++){
            do{
                PosX = Math.floor(Math.random()*(this.tauler.length));
                PosY = Math.floor(Math.random()*(this.tauler[0].length));
                console.log(PosX);
                console.log(PosY);
            }
            while (this.tauler[PosX][PosY] != "g");
            var pivote = new Doblepunts(null, [PosX,PosY],"d",null);
            this.doble.push(pivote);
            var cambia = pivote.ModificaArray();
            this.tauler[PosX][PosY] = cambia;
        }
    },

    crear_Meitat: function(PosX,PosY,Por25){
        for (let i=0;i < Por25;i++){
            do{
                PosX = Math.floor(Math.random()*(this.tauler.length));
                PosY = Math.floor(Math.random()*(this.tauler[0].length));
                console.log(PosX);
                console.log(PosY);
            }
            while (this.tauler[PosX][PosY] != "g");
            var pivote = new Meitatzombi(null, [PosX,PosY],"m",null);
            this.meitat.push(pivote);
            var cambia = pivote.ModificaArray();
            this.tauler[PosX][PosY] = cambia;
        }
    },

    iniciar: function(mida1,mida2){
        //Ponemos los valores de vida i puntos
        document.getElementById("vid").innerHTML = this.vidas;
        document.getElementById("punt").innerHTML = this.punts;
        this.max_tauler = mida1 * mida2;
        this.inicialitzar_tauler(mida1,mida2);
        this.mostrar_tauler(mida1,mida2);
        this.crear_objetos(mida1,mida2);
        console.log(this.tauler);
        this.insertar_valores();
    }
}

document.getElementById("busca").addEventListener("click", buscar_obj);

function buscar_obj(){
    let posX = document.getElementById("z1").value;
    let posY = document.getElementById("z2").value;
    if (Partida.tauler[posX][posY] == "z"){
        for (let i=0; i < Partida.zombis.length; i++) {
            //Restamos una vida cada vez que se ejecuta este if porque emos encontrado un zombie
            if (Partida.zombis[i].pos1[0] == posX && Partida.zombis[i].pos1[1] == posY){
                Partida.tauler[posX][posY] = Partida.zombis[i].Descobert();
                Partida.mostrar_tauler(Partida.tauler.length,Partida.tauler[0].length);
                Partida.vidas--;
                document.getElementById("vid").innerHTML = Partida.vidas;
                //Si los puntos son mas grandes o igual a 100 le restamos los 100 que estan definidos en zombie
                if (Partida.punts >= 100){
                    Partida.punts = Partida.punts - Partida.zombis[i].Puntuaciones();
                    document.getElementById("punt").innerHTML = Partida.punts;
                }
                //Si no le ponemos 0 porque quedaria negativo si restamos a -100 si es mas pequeño
                else{
                    Partida.punts = 0;
                    document.getElementById("punt").innerHTML = Partida.punts;
                }
                //Si las vidas llegan a 0 pierdes
                if (Partida.vidas == 0){
                    alert("Has perdido wey :(");
                }
            }
        }
    }
    //Else if de gespa que si la encuentra la canvia a mayus i suma 50 puntos a puntuacion
    else if (Partida.tauler[posX][posY] == "g"){
        for (let i=0; i < Partida.gespa.length; i++){
            if (Partida.gespa[i].pos1[0] == posX && Partida.gespa[i].pos1[1] == posY){
                Partida.tauler[posX][posY] = Partida.gespa[i].Descobert();
                Partida.mostrar_tauler(Partida.tauler.length,Partida.tauler[0].length);
                Partida.punts = Partida.punts + Partida.gespa[i].Puntuaciones();
                document.getElementById("punt").innerHTML = Partida.punts;
            }
        }
    }
    //Else if para buscar si es una estrella i sumar 200 puntos i si consigues todas ganas la partida
    else if (Partida.tauler[posX][posY] == "e"){
        let ganar = Partida.estrelles.length;
        for (let i=0; i < Partida.estrelles.length; i++){
            if (Partida.estrelles[i].pos1[0] == posX && Partida.estrelles[i].pos1[1] == posY){
                Partida.tauler[posX][posY] = Partida.estrelles[i].Descobert();
                Partida.victoria++;
                Partida.mostrar_tauler(Partida.tauler.length,Partida.tauler[0].length);
                Partida.punts = Partida.punts + Partida.estrelles[i].Puntuaciones();
                document.getElementById("punt").innerHTML = Partida.punts;
            }
        }
        if (Partida.victoria == ganar){
            alert("Has ganado mi niño");
        }
    }
    //Else if para si encuentras doblar los puntos se doblen.
    else if (Partida.tauler[posX][posY] == "d"){
        if (Partida.doble[0].pos1[0] == posX && Partida.doble[0].pos1[1] == posY){
            Partida.tauler[posX][posY] = Partida.doble[0].Descobert();
            Partida.mostrar_tauler(Partida.tauler.length,Partida.tauler[0].length);
            Partida.punts = Partida.doble[0].Doblar();
            console.log(Partida.punts)
            document.getElementById("punt").innerHTML = Partida.punts;
        }
    }
    //Else if para si encuentras todos meitat zombis se hagan a la mitat.
    else if (Partida.tauler[posX][posY] == "m"){
        for (let i=0; i < Partida.meitat.length; i++){
            if (Partida.meitat[i].pos1[0] == posX && Partida.meitat[i].pos1[1] == posY){
                Partida.tauler[posX][posY] = Partida.meitat[i].Descobert();
                Partida.mostrar_tauler(Partida.tauler.length,Partida.tauler[0].length);
                if (Partida.meitat.length == 2){
                    alert("Se pusieron a la mitat los zombis");
                    for(let i=0;i > Math.floor(Partida.zombis.length/2);i++){
                        let r = Math.floor(Math.random()*(this.zombis.length));
                        let pep = this.zombis[r];
                        this.Partida.tauler[pep.pos1[0]][pep.pos1[1]] = this.gespa[pep.pos1[0]][pep.pos1[1]];
                        Partida.mostrar_tauler(Partida.tauler.length,Partida.tauler[0].length);
                    }
                }
            }
        }
    }
}