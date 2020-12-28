let Partida = {
    tauler: [],
    tauler2: [],
    zombis: [],
    estrelles: [],
    gespa: [],
    doble: [],
    meitat: [],
    vidaex: [],
    vidas: 3,
    punts: 0,
    victoria: 0,
    contador_mei: 0,
    contador_vid: 0,

    inicialitzar_tauler: function(ample,llarg){
        for (let i=0;i < ample; i++){
            this.tauler[i]=[];
            this.tauler2[i]=[];
            for (let j=0;j < llarg; j++){
                //Definimos gespa i la guardamos en la array gespa i la añadimos en la array tauler tambien
                var gespa1 = new Gespa(null, [i,j],"g",50,"<img src='img/gespa.png'>");
                this.gespa.push(gespa1);
                var posicionar = gespa1.ModificaArray();
                this.tauler[i][j]=posicionar;
                var imagen = gespa1.MuestraIMG();
                this.tauler2[i][j]=imagen;
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
                tablero += "<div id='"+aux1+aux2+"' class='pope'>"+this.tauler2[i][j]+"</div>";
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
        this.crear_Recompensas(mida1,mida2,porcentaje);
        this.crear_zombies(mida1,mida2,porcentaje);
        this.crear_estrellas(mida1,mida2,estrellas);       
    },

    crear_Recompensas: function(PosX,PosY,Por25){
        do{
            if(Por25 >= 3){
                this.crear_VidaExtra(PosX,PosY,3);
                Por25 = Por25 - 3;
            }
            if(Por25 >= 2){
                this.crear_Meitat(PosX,PosY,2);
                Por25 = Por25 - 2;
            }
            if(Por25 >= 1){
                this.crear_DoblePuntuacion(PosX,PosY,1);
                Por25 = Por25 - 1;
            }            
        }while(Por25 != 0);
    },

    crear_zombies: function(PosX,PosY,Por25){
        for (let i=0;i < Por25;i++){
            do{
                PosX = Math.floor(Math.random()*(this.tauler.length));
                PosY = Math.floor(Math.random()*(this.tauler[0].length));
            }
            while (this.tauler[PosX][PosY] != "g");
            var pivote = new Zombi(null, [PosX,PosY],"z",100,"<img src='img/zombi1.png'>");
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
            }
            while (this.tauler[PosX][PosY] != "g");
            var pivote = new Estrella(null, [PosX,PosY],"e",200,"<img src='img/estrella.png'>");
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
            }
            while (this.tauler[PosX][PosY] != "g");
            var pivote = new Doblepunts(null, [PosX,PosY],"d",null,"<img src='img/doble.png'>");
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
            }
            while (this.tauler[PosX][PosY] != "g");
            var pivote = new Meitatzombi(null, [PosX,PosY],"m",null,"<img src='img/meitatz.png'>");
            this.meitat.push(pivote);
            var cambia = pivote.ModificaArray();
            this.tauler[PosX][PosY] = cambia;
        }
    },

    crear_VidaExtra: function(PosX,PosY,Por25){
        for (let i=0;i < Por25;i++){
            do{
                PosX = Math.floor(Math.random()*(this.tauler.length));
                PosY = Math.floor(Math.random()*(this.tauler[0].length));
                console.log(PosX);
                console.log(PosY);
            }
            while (this.tauler[PosX][PosY] != "g");
            var pivote = new Vidaextra(null, [PosX,PosY],"v",null,"<img src='img/vida.png'>");
            this.vidaex.push(pivote);
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
                Partida.tauler[posX][posY] = Partida.zombis[i].Descobert(Partida.zombis[i]);
                Partida.tauler2[posX][posY] = Partida.zombis[i].MuestraIMG(Partida.zombis[i]);
                Partida.mostrar_tauler(Partida.tauler2.length,Partida.tauler2[0].length);
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
                Partida.tauler[posX][posY] = Partida.gespa[i].Descobert(Partida.gespa[i]);
                Partida.tauler2[posX][posY] = Partida.gespa[i].MuestraIMG2(Partida.gespa[i]);
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
                Partida.tauler[posX][posY] = Partida.estrelles[i].Descobert(Partida.estrelles[i]);
                Partida.tauler2[posX][posY] = Partida.estrelles[i].MuestraIMG(Partida.estrelles[i]);
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
            Partida.tauler[posX][posY] = Partida.doble[0].Descobert(Partida.doble[i]);
            Partida.tauler2[posX][posY] = Partida.doble[i].MuestraIMG(Partida.doble[i]);
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
                Partida.tauler[posX][posY] = Partida.meitat[i].Descobert(Partida.meitat[i]);
                Partida.tauler2[posX][posY] = Partida.meitat[i].MuestraIMG(Partida.meitat[i]);
                Partida.mostrar_tauler(Partida.tauler.length,Partida.tauler[0].length);
                Partida.contador_mei++;
                if (Partida.contador_mei == 2){
                    contador_z = [];
                    for(let i=0;i < Partida.zombis.length;i++){
                        console.log(Partida.zombis);
                        let zz = Partida.zombis[i];
                        if (zz.estat == "z"){
                            contador_z.push(zz);
                        }
                    }
                    for(let i=0;i < Math.floor(contador_z.length/2);i++){
                        console.log(contador_z.length);
                        let r = Math.floor(Math.random()*(contador_z.length));
                        let pep = contador_z[r];
                        Partida.tauler[pep.pos1[0]][pep.pos1[1]] = "g";
                        Partida.mostrar_tauler(Partida.tauler.length,Partida.tauler[0].length);
                    }
                    alert("Se pusieron a la mitat los zombis");
                }
            }
        }
    }
    //Else if para si encuentras todos vidaextra sumen una vida mas.
    else if (Partida.tauler[posX][posY] == "v"){
        for (let i=0; i < Partida.vidaex.length; i++){
            if (Partida.vidaex[i].pos1[0] == posX && Partida.vidaex[i].pos1[1] == posY){
                Partida.tauler[posX][posY] = Partida.vidaex[i].Descobert(Partida.vidaex[i]);
                Partida.tauler2[posX][posY] = Partida.vidaex[i].MuestraIMG(Partida.vidaex[i]);
                Partida.mostrar_tauler(Partida.tauler.length,Partida.tauler[0].length);
                Partida.contador_vid++;
                console.log(Partida.contador_vid)
                if(Partida.contador_vid == 3){
                    Partida.vidaex[i].Sumarvida();
                    document.getElementById("vid").innerHTML = Partida.vidas;
                    Partida.mostrar_tauler(Partida.tauler.length,Partida.tauler[0].length);
                }
            }
        }
    }
}