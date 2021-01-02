let Partida = {
    tauler: [],
    tauler2: [],
    zombis: [],
    estrelles: [],
    gespa: [],
    doble: [],
    meitat: [],
    vidaex: [],
    mostrado: [],
    aux: [],
    vidas: 3,
    punts: 0,
    victoria: 0,
    contador_vid: 0,

    inicialitzar_tauler: function(ample,llarg){
        for (let i=0;i < ample; i++){
            this.tauler[i]=[];
            this.tauler2[i]=[];
            this.mostrado[i]=[];
            for (let j=0;j < llarg; j++){
                //Definimos gespa i la guardamos en la array gespa i la añadimos en la array tauler tambien
                var gespa1 = new Gespa(null,null, [i,j],"g",50,"<img src='img/gespa.png' id='"+i+"-"+j+"'>");
                this.gespa.push(gespa1);
                var posicionar = gespa1.ModificaArray();
                this.tauler[i][j]=posicionar;
                var imagen = gespa1.MuestraIMG();
                this.tauler2[i][j]=imagen;
                this.mostrado[i][j]=imagen;
            }
        }
    },

    mostrar_tauler: function(num1,num2){
        let tablero = "<div id='tau'>";
        for (let i=0;i < num1; i++){
            tablero += "<div id='"+i+"' class='pepe'>";
            for (let j=0;j < num2; j++){
                tablero += "<div id='"+i+"-"+j+"' class='pope'>"+this.tauler2[i][j]+"</div>";
            }
            tablero +="</div>";
        }
        tablero += "</div>";
        document.getElementById("tablero").innerHTML = tablero;
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
                this.crear_VidaExtra(PosX,PosY);
                Por25 = Por25 - 3;
            }
            if(Por25 >= 2){
                this.crear_Meitat(PosX,PosY);
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
            while (this.tauler[PosX][PosY] !== "g");
            var pivote = new Zombi(null,null, [PosX,PosY],"z",100,"<img src='img/zombi1.png'>");
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
            while (this.tauler[PosX][PosY] !== "g");
            var pivote = new Estrella(null,null, [PosX,PosY],"e",200,"<img src='img/estrella.png'>");
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
            while (this.tauler[PosX][PosY] !== "g");
            var pivote = new Doblepunts(null,null,[PosX,PosY],"d",null,"<img src='img/doble.png'>");
            this.doble.push(pivote);
            var cambia = pivote.ModificaArray();
            this.tauler[PosX][PosY] = cambia;
        }
    },

    crear_Meitat: function(PosX,PosY){
        direccion = true;
        direccion = (Math.random() < 0.5);
        console.log(direccion);
        if (direccion){
            do{
                PosX = Math.floor(Math.random()*(this.tauler.length));
                PosY = Math.floor(Math.random()*(this.tauler[0].length-1));
            }
            while (this.tauler[PosX][PosY] !== "g" || this.tauler[PosX][PosY+1] !== "g");
            var pivote = new Meitatzombi(null,[PosX,PosY+1], [PosX,PosY],"m",null,"<img src='img/meitatz.png'>");
            this.meitat.push(pivote);
            var cambia = pivote.ModificaArray();
            this.tauler[PosX][PosY] = cambia;
            this.tauler[PosX][PosY+1] = cambia;
        }
        else{
            do{
                PosX = Math.floor(Math.random()*(this.tauler.length-1));
                PosY = Math.floor(Math.random()*(this.tauler[0].length));
            }
            while (this.tauler[PosX][PosY] !== "g" || this.tauler[PosX+1][PosY] !== "g");
            var pivote = new Meitatzombi(null,[PosX+1,PosY], [PosX,PosY],"m",null,"<img src='img/meitatz.png'>");
            console.log(pivote);
            this.meitat.push(pivote);
            var cambia = pivote.ModificaArray();
            this.tauler[PosX][PosY] = cambia;
            this.tauler[PosX+1][PosY] = cambia;
        }
    },

    crear_VidaExtra: function(PosX,PosY){
        direccion = true;
        direccion = (Math.random() < 0.5);
        console.log(direccion);
        if (direccion){
            do{
                PosX = Math.floor(Math.random()*(this.tauler.length));
                PosY = Math.floor(Math.random()*(this.tauler[0].length-2));
            }
            while (this.tauler[PosX][PosY] !== "g" || this.tauler[PosX][PosY+1] !== "g" || this.tauler[PosX][PosY+2] !== "g");
            var pivote = new Vidaextra([PosX,PosY+2],[PosX,PosY+1], [PosX,PosY],"v",null,"<img src='img/vida.png'>");
            this.vidaex.push(pivote);
            var cambia = pivote.ModificaArray();
            this.tauler[PosX][PosY] = cambia;
            this.tauler[PosX][PosY+1] = cambia;
            this.tauler[PosX][PosY+2] = cambia;
        }
        else{
            do{
                PosX = Math.floor(Math.random()*(this.tauler.length-2));
                PosY = Math.floor(Math.random()*(this.tauler[0].length));
            }
            while (this.tauler[PosX][PosY] !== "g" || this.tauler[PosX+1][PosY] != "g" || this.tauler[PosX+2][PosY] !== "g");
            var pivote = new Vidaextra([PosX+2,PosY],[PosX+1,PosY], [PosX,PosY],"v",null,"<img src='img/vida.png'>");
            this.vidaex.push(pivote);
            var cambia = pivote.ModificaArray();
            this.tauler[PosX][PosY] = cambia;
            this.tauler[PosX+1][PosY] = cambia;
            this.tauler[PosX+2][PosY] = cambia;
        }
    },

    mostrar_momento: function(){
        for (let i=0;i < this.tauler.length; i++){
            for (let j=0;j < this.tauler[0].length; j++){
                if(this.tauler[i][j] == "z" || this.tauler[i][j] == "Z"){
                    for (let n=0; n < this.zombis.length; n++) {
                        if(this.zombis[n].pos1[0] == i && this.zombis[n].pos1[1] == j){
                            this.mostrado[i][j] = this.zombis[n].MuestraIMG(this.zombis[n]);
                        }
                    }
                }
                if(this.tauler[i][j] == "g" || this.tauler[i][j] == "G"){
                    for (let n=0; n < this.gespa.length; n++) {
                        if(this.gespa[n].pos1[0] == i && this.gespa[n].pos1[1] == j){
                            this.mostrado[i][j] = this.gespa[n].MuestraIMG2(this.gespa[n]);
                        }
                    }
                }
                if(this.tauler[i][j] == "e" || this.tauler[i][j] == "E"){
                    for (let n=0; n < this.estrelles.length; n++) {
                        if(this.estrelles[n].pos1[0] == i && this.estrelles[n].pos1[1] == j){
                            this.mostrado[i][j] = this.estrelles[n].MuestraIMG(this.estrelles[n]);
                        }
                    }
                }
                if(this.tauler[i][j] == "d" || this.tauler[i][j] == "D"){
                    for (let n=0; n < this.doble.length; n++) {
                        if(this.doble[n].pos1[0] == i && this.doble[n].pos1[1] == j){
                            this.mostrado[i][j] = this.doble[n].MuestraIMG(this.doble[n]);
                        }
                    }
                }
                if(this.tauler[i][j] == "m" || this.tauler[i][j] == "M"){
                    for (let n=0; n < this.meitat.length; n++) {
                        if(this.meitat[n].pos1[0] == i && this.meitat[n].pos1[1] == j){
                            this.mostrado[i][j] = this.meitat[n].MuestraIMG(this.meitat[n]);
                        }
                        if(this.meitat[n].pos2[0] == i && this.meitat[n].pos2[1] == j){
                            this.mostrado[i][j] = this.meitat[n].MuestraIMG(this.meitat[n]);
                        }
                    }
                }
                if(this.tauler[i][j] == "v" || this.tauler[i][j] == "V"){
                    for (let n=0; n < this.vidaex.length; n++) {
                        if(this.vidaex[n].pos1[0] == i && this.vidaex[n].pos1[1] == j){
                            this.mostrado[i][j] = this.vidaex[n].MuestraIMG(this.vidaex[n]);
                        }
                        if(this.vidaex[n].pos2[0] == i && this.vidaex[n].pos2[1] == j){
                            this.mostrado[i][j] = this.vidaex[n].MuestraIMG(this.vidaex[n]);
                        }
                        if(this.vidaex[n].pos3[0] == i && this.vidaex[n].pos3[1] == j){
                            this.mostrado[i][j] = this.vidaex[n].MuestraIMG(this.vidaex[n]);
                        }
                    }
                }
            }
        }
        this.aux = this.tauler2;
        this.tauler2 = this.mostrado;
        this.mostrar_tauler(this.tauler2.length,this.tauler2[0].length);
    },

    reiniciar_valores: function(){
        this.tauler = [];
        this.tauler2 = [];
        this.zombis = [];
        this.estrelles = [];
        this.gespa = [];
        this.doble = [];
        this.meitat = [];
        this.vidaex = [];
        this.vidas = 3;
        this.punts = 0;
        this.victoria = 0;
        this.contador_vid = 0;
    },

    iniciar: function(mida1,mida2){
        //Ponemos los valores de vida i puntos
        this.reiniciar_valores();
        document.getElementById("vid").innerHTML = this.vidas;
        document.getElementById("punt").innerHTML = this.punts;
        this.max_tauler = mida1 * mida2;
        this.inicialitzar_tauler(mida1,mida2);
        this.mostrar_tauler(mida1,mida2);
        this.crear_objetos(mida1,mida2);
        console.log(this.tauler);
    }
}

var elDiv = document.getElementById("tablero");
elDiv.onclick = function(event){
    var elide = event.target;
    document.getElementById("owo").innerHTML = "Esta id esta ocupado: "+ elide.id;
    let palabro = [];
    palabro = elide.id.split("");
    let PosX;
    let PosY;
    console.log(palabro)
    if(palabro.length > 3){
        if(palabro[2] == "-" && palabro.length == 4){
            PosX = palabro[0] + palabro[1];
            PosY = palabro[3];
            console.log(PosX+"-"+PosY);
            buscar_obj(PosX,PosY);
        }
        else if(palabro[2] == "-" && palabro.length == 5){
            PosX = palabro[0] + palabro[1];
            PosY = palabro[3] + palabro[4];
            console.log(PosX+"-"+PosY);
            buscar_obj(PosX,PosY);
        }
        else if(palabro[1] == "-" && palabro.length == 4){
            PosX = palabro[0];
            PosY = palabro[2] + palabro[3];
            console.log(PosX+"-"+PosY);
            buscar_obj(PosX,PosY);
        }
    }
    else{
        PosX = palabro[0];
        PosY = palabro[2];
        console.log(PosX+"-"+PosY);
        buscar_obj(PosX,PosY);
    }
};

var buscar = document.getElementById("busca");
buscar.addEventListener("click",buscar_obj);

function buscar_obj(posX,posY){
    let boleo = true;
    if(document.getElementById("z1").value != "" && document.getElementById("z1").value != ""){
        posX = document.getElementById("z1").value;
        posY = document.getElementById("z2").value;
        console.log(posX+"-"+posY);
    }
    if(posX == undefined && posY == undefined){
        alert("Aquesta casella ja esta destapada");
        boleo = false;
    }
    if(boleo == true){
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
                        perdudes ++;
                        document.getElementById("perd").innerHTML = perdudes;
                        crearCookie("perduda",perdudes,25);
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
                    if(Partida.victoria == 1){
                        Partida.mostrar_momento();
                        function espera(){
                            Partida.tauler2 = Partida.aux;
                            Partida.mostrar_tauler(Partida.tauler2.length,Partida.tauler2[0].length);
                            console.log(Partida.tauler2)
                        }
                        setTimeout(espera,5000);
                    }
                    Partida.punts = Partida.punts + Partida.estrelles[i].Puntuaciones();
                    document.getElementById("punt").innerHTML = Partida.punts;
                }
            }
            if (Partida.victoria == ganar){
                alert("Has ganado mi niño");
                acertades ++;
                document.getElementById("acert").innerHTML = acertades;
                crearCookie("acertada",acertades,25);
            }
        }
        //Else if para si encuentras doblar los puntos se doblen.
        else if (Partida.tauler[posX][posY] == "d"){
            for (let i=0; i < Partida.doble.length; i++){
                if (Partida.doble[i].pos1[0] == posX && Partida.doble[i].pos1[1] == posY){
                    Partida.tauler[posX][posY] = Partida.doble[i].Descobert(Partida.doble[i]);
                    Partida.tauler2[posX][posY] = Partida.doble[i].MuestraIMG(Partida.doble[i]);
                    Partida.mostrar_tauler(Partida.tauler.length,Partida.tauler[0].length);
                    Partida.punts = Partida.doble[i].Doblar();
                    console.log(Partida.punts)
                    document.getElementById("punt").innerHTML = Partida.punts;
                }
            }
        }
        //Else if para si encuentras todos meitat zombis se hagan a la mitat.
        else if (Partida.tauler[posX][posY] == "m"){
            for (let i=0; i < Partida.meitat.length; i++){
                if (Partida.meitat[i].pos1[0] == posX && Partida.meitat[i].pos1[1] == posY){
                    Partida.tauler[posX][posY] = Partida.meitat[i].Descobert(Partida.meitat[i]);
                    Partida.tauler2[posX][posY] = Partida.meitat[i].MuestraIMG(Partida.meitat[i]);
                    Partida.mostrar_tauler(Partida.tauler.length,Partida.tauler[0].length);
                    if (Partida.tauler[Partida.meitat[i].pos1[0]][Partida.meitat[i].pos1[1]] == "M" 
                    && Partida.tauler[Partida.meitat[i].pos2[0]][Partida.meitat[i].pos2[1]] == "M"){
                        contador_z = [];
                        for(let i=0;i < Partida.zombis.length;i++){
                            console.log(Partida.zombis);
                            let zz = Partida.zombis[i];
                            if (zz.estat == "z"){
                                contador_z.push(zz);
                            }
                        }
                        largo_z = contador_z.length;
                        for(let i=0;i < Math.floor(largo_z.length/2);i++){
                            console.log(contador_z.length);
                            let r = Math.floor(Math.random()*(contador_z.length - 1));
                            let pep = contador_z[r];
                            Partida.tauler[pep.pos1[0]][pep.pos1[1]] = "g";
                            Partida.mostrar_tauler(Partida.tauler.length,Partida.tauler[0].length);
                            QuitarValor(contador_z, pep);
                            QuitarValor(Partida.zombis, pep);
                        }
                        contador_z = [];
                        alert("Se pusieron a la mitat los zombis");
                    }
                }
                if (Partida.meitat[i].pos2[0] == posX && Partida.meitat[i].pos2[1] == posY){
                    Partida.tauler[posX][posY] = Partida.meitat[i].Descobert(Partida.meitat[i]);
                    Partida.tauler2[posX][posY] = Partida.meitat[i].MuestraIMG(Partida.meitat[i]);
                    Partida.mostrar_tauler(Partida.tauler.length,Partida.tauler[0].length);
                    if (Partida.tauler[Partida.meitat[i].pos1[0]][Partida.meitat[i].pos1[1]] == "M" 
                    && Partida.tauler[Partida.meitat[i].pos2[0]][Partida.meitat[i].pos2[1]] == "M"){
                        contador_z = [];
                        for(let i=0;i < Partida.zombis.length;i++){
                            console.log(Partida.zombis);
                            let zz = Partida.zombis[i];
                            if (zz.estat == "z"){
                                contador_z.push(zz);
                            }
                        }
                        largo_z = contador_z.length;
                        for(let i=0;i < Math.floor(largo_z/2);i++){
                            let r = Math.floor(Math.random()*(contador_z.length - 1));
                            let pep = contador_z[r];
                            Partida.tauler[pep.pos1[0]][pep.pos1[1]] = "g";
                            Partida.mostrar_tauler(Partida.tauler.length,Partida.tauler[0].length);
                            QuitarValor(contador_z, pep);
                            QuitarValor(Partida.zombis, pep);
                        }
                        contador_z = [];
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
                    if (Partida.tauler[Partida.vidaex[i].pos1[0]][Partida.vidaex[i].pos1[1]] == "V" 
                    && Partida.tauler[Partida.vidaex[i].pos2[0]][Partida.vidaex[i].pos2[1]] == "V"
                    && Partida.tauler[Partida.vidaex[i].pos3[0]][Partida.vidaex[i].pos3[1]] == "V"){
                        Partida.vidaex[i].Sumarvida();
                        console.log(Partida.vidas);
                        Partida.mostrar_tauler(Partida.tauler.length,Partida.tauler[0].length);
                    }
                }
                if (Partida.vidaex[i].pos2[0] == posX && Partida.vidaex[i].pos2[1] == posY){
                    Partida.tauler[posX][posY] = Partida.vidaex[i].Descobert(Partida.vidaex[i]);
                    Partida.tauler2[posX][posY] = Partida.vidaex[i].MuestraIMG(Partida.vidaex[i]);
                    Partida.mostrar_tauler(Partida.tauler.length,Partida.tauler[0].length);
                    if (Partida.tauler[Partida.vidaex[i].pos1[0]][Partida.vidaex[i].pos1[1]] == "V" 
                    && Partida.tauler[Partida.vidaex[i].pos2[0]][Partida.vidaex[i].pos2[1]] == "V"
                    && Partida.tauler[Partida.vidaex[i].pos3[0]][Partida.vidaex[i].pos3[1]] == "V"){
                        Partida.vidaex[i].Sumarvida();
                        document.getElementById("vid").innerHTML = Partida.vidas;
                        Partida.mostrar_tauler(Partida.tauler.length,Partida.tauler[0].length);
                    }
                }
                if (Partida.vidaex[i].pos3[0] == posX && Partida.vidaex[i].pos3[1] == posY){
                    Partida.tauler[posX][posY] = Partida.vidaex[i].Descobert(Partida.vidaex[i]);
                    Partida.tauler2[posX][posY] = Partida.vidaex[i].MuestraIMG(Partida.vidaex[i]);
                    Partida.mostrar_tauler(Partida.tauler.length,Partida.tauler[0].length);
                    if (Partida.tauler[Partida.vidaex[i].pos1[0]][Partida.vidaex[i].pos1[1]] == "V" 
                    && Partida.tauler[Partida.vidaex[i].pos2[0]][Partida.vidaex[i].pos2[1]] == "V"
                    && Partida.tauler[Partida.vidaex[i].pos3[0]][Partida.vidaex[i].pos3[1]] == "V"){
                        Partida.vidaex[i].Sumarvida();
                        document.getElementById("vid").innerHTML = Partida.vidas;
                        Partida.mostrar_tauler(Partida.tauler.length,Partida.tauler[0].length);
                    }
                }
            }
        }
        else{
            alert("Aquesta casella ja esta destapada");
        }

        function QuitarValor ( arr, item ) {
            var i = arr.indexOf( item );
            arr.splice( i, 1 );
        }
        document.getElementById("z1").value = "";
        document.getElementById("z2").value = "";
    }
}

let acertades = 0;
let perdudes = 0;
let abandonades = 0;

comprobarCookie("abandonada");

function crearCookie(clave, valor, data) {
    var d = new Date();
    d.setTime(d.getTime() + (data * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = clave + "=" + valor + ";" + expires;
}

//FUNCION PARA OBTENER EL VALOR DE UNA COOKIE
function obtenerCookie(clave) {
    var name = clave + "=";
    var ca = document.cookie.split(';');
    for(let i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

/*FUNCION PARA COMPROBAR SI EXISTE UNA COOKIE, SI NO EXISTE SE CREAN TODAS Y SE ASIGNAN Y SI
EXISTE ASIGNA LOS VALORES DE LAS COOKIES*/ 
function comprobarCookie(clave) {
    var clave = obtenerCookie(clave);
    if (clave!="") {
        acertades = parseInt(obtenerCookie("acertada"));
        perdudes = parseInt(obtenerCookie("perduda"));
        abandonades = parseInt(obtenerCookie("abandonada"));
    }else{
        crearCookie("acertada",acertades,25);
        acertades = parseInt(obtenerCookie("acertada"));
        crearCookie("perduda",perdudes,25);
        perdudes = parseInt(obtenerCookie("perduda"));
        crearCookie("abandonada",abandonades,25);
        abandonades = parseInt(obtenerCookie("abandonada"));
    }
}

function abandonar_partida(){
    alert("Has abandonat la partida.");
        abandonades ++;
        document.getElementById("aban").innerHTML = abandonades;
        crearCookie("abandonada",abandonades,25);
}
document.getElementById("abandona").addEventListener("click", abandonar_partida);
