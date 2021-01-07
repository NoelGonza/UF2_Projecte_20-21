let Partida = {
    //Definim totes les variables globals que farem servir dintre de Partida
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
    w: 100,
    h: 100,
    x: 0,
    y: 0,

    /* Inicialitzador del tauler on fem un if per reduir la mida del tauler si el numero de casellas es major a 5
    i un for que recorreix la I i la J per omplir les matrius que em fet, guardem les gespes en una array apart,
    en tauler guardem apartir del objecte creat de gespa el estat que es g per fer comprovacions més endevant,
    tauler2 el fem servir per mostrar les imatges de cada objecte i mostrado tambe guardem les imatges per utilitzar
    la funcio de al tocar la primera estrella mostri tot el tauler desxifrat */
    inicialitzar_tauler: function(ample,llarg){
        this.x = ample;
        this.y = llarg;
        if (ample > 5 || llarg > 5){
            let reducir = Math.floor((parseInt(ample) + parseInt(llarg)) / 2);
            pcent = (500 / reducir);
            this.w = pcent;
            this.h = pcent;
        }
        for (let i=0;i < ample; i++){
            this.tauler[i]=[];
            this.tauler2[i]=[];
            this.mostrado[i]=[];
            for (let j=0;j < llarg; j++){
                var gespa1 = new Gespa(null,null, [i,j],"g",50,"<img src='img/gespa.png' id='"+i+"-"+j+"' height='"+ this.h +"px' width='"+ this.w +"px'>");
                this.gespa.push(gespa1);
                var posicionar = gespa1.ModificaArray();
                this.tauler[i][j]=posicionar;
                var imagen = gespa1.MuestraIMG();
                this.tauler2[i][j]=imagen;
                this.mostrado[i][j]=imagen;
            }
        }
    },

    /* mostrar_tauler fem una variable on concatenem text html que en aquest cas el fem atraves de divs per crear
    el tauler amb id i tambe dintre de cada div del segon for posem la imatge que tingui la posicio del tauler2 
    i printem el resultat en el html del index */
    mostrar_tauler: function(num1,num2){
        let tablero = "<div id='tau'>";
        for (let i=0;i < num1; i++){
            tablero += "<div id='"+i+"' class='pepe'>";
            for (let j=0;j < num2; j++){
                tablero += "<div id='"+i+"-"+j+"' class='pope' height='"+ this.h +"px' width='"+ this.w +"px'>"+this.tauler2[i][j]+"</div>";
            }
            tablero +="</div>";
        }
        tablero += "</div>";
        document.getElementById("tablero").innerHTML = tablero;
    },

    /* Atraves de les mides que ens donan al crear el tauler creem els objectes on tenim dos variables una per saber el
    porcentatge de objectes que podem fer per tenir el 25% de les caselles de recompenses i un altre 25% de zombis,
    despres tenim una variable apart per estrellas per posar tantes estrelles com el numero de filas o columnas te
    el tauler. 
    A continuació creem els objectes amb les midas i els porcentatges*/
    crear_objetos: function(mida1, mida2){
        let porcentaje = Math.round((mida1 * mida2)/4);
        let estrellas = Math.round((parseInt(mida1)+parseInt(mida2))/2);
        this.crear_Recompensas(mida1,mida2,porcentaje);
        this.crear_zombies(mida1,mida2,porcentaje);
        this.crear_estrellas(mida1,mida2,estrellas);       
    },

    /* Aquesta funcio es per crear la cuantitat de recompenses que es poden fer, amb un do while que comproba que mentres
    el porcentatge no sigui 0 segeixi recorrent, dintre fem 3 if que comproban si la variable Por25 es major o igual al
    numero indicat executa una altra funcio per crear el objecte en concret i li resta a la variable el numero definit 
    dintre del if i salta al seguent if fins terminar */
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

    /* Aquesta funcio es per crear el objecte zombi, primer fem un for que vagi recorrent mentres sigui mes petit que Por25,
    dintre fem un do while que agafa una posicio random sempre i cuan estiguin ocupades per una g, despres guardem
    en la array de zombis el objecte creat i canviem en tauler la lletra del estat del zombi en la posicio random */
    crear_zombies: function(PosX,PosY,Por25){
        for (let i=0;i < Por25;i++){
            do{
                PosX = Math.floor(Math.random()*(this.tauler.length));
                PosY = Math.floor(Math.random()*(this.tauler[0].length));
            }
            while (this.tauler[PosX][PosY] !== "g");
            var pivote = new Zombi(null,null, [PosX,PosY],"z",100,"<img src='img/zombi1.png' height='"+ this.h +"px' width='"+ this.w +"px'>");
            this.zombis.push(pivote);
            var cambia = pivote.ModificaArray();
            this.tauler[PosX][PosY] = cambia;
        }
    },

    /* Aquesta funcio es per crear el objecte estrella, primer fem un for que vagi recorrent mentres sigui mes petit que
    Por25, dintre fem un do while que agafa una posicio random sempre i cuan estiguin ocupades per una g, despres
    guardem en la array de estrelles el objecte creat i canviem en tauler la lletra del estat del estrella en la posicio
    random */
    crear_estrellas: function(PosX,PosY,Por25){
        for (let i=0;i < Por25;i++){
            do{
                PosX = Math.floor(Math.random()*(this.tauler.length));
                PosY = Math.floor(Math.random()*(this.tauler[0].length));
            }
            while (this.tauler[PosX][PosY] !== "g");
            var pivote = new Estrella(null,null, [PosX,PosY],"e",200,"<img src='img/estrella.png' height='"+ this.h +"px' width='"+ this.w +"px'>");
            this.estrelles.push(pivote);
            var cambia = pivote.ModificaArray();
            this.tauler[PosX][PosY] = cambia;
        }
    },

    /* Aquesta funcio es per crear el objecte Doblepunts, primer fem un for que vagi recorrent mentres sigui mes petit que
    Por25, dintre fem un do while que agafa una posicio random sempre i cuan estiguin ocupades per una g, despres
    guardem en la array de doble el objecte creat i canviem en tauler la lletra del estat de doblarpuntuacio en la posicio
    random */
    crear_DoblePuntuacion: function(PosX,PosY,Por25){
        for (let i=0;i < Por25;i++){
            do{
                PosX = Math.floor(Math.random()*(this.tauler.length));
                PosY = Math.floor(Math.random()*(this.tauler[0].length));
            }
            while (this.tauler[PosX][PosY] !== "g");
            var pivote = new Doblepunts(null,null,[PosX,PosY],"d",null,"<img src='img/doble.png' height='"+ this.h +"px' width='"+ this.w +"px'>");
            this.doble.push(pivote);
            var cambia = pivote.ModificaArray();
            this.tauler[PosX][PosY] = cambia;
        }
    },
    /* Per crear el objecte de la meitat de zombis fem servir un boleano per si es true o fara en horitzontal i si no o fara
    en vertical, dintre agafem dos posicions random que estiguin ocupades per una g i introduim el objecte MeitatZombi en
    el seu array i posem en les dues posicions el estat que seria m en tauler*/
    crear_Meitat: function(PosX,PosY){
        direccion = true;
        direccion = (Math.random() < 0.5);
        if (direccion){
            do{
                PosX = Math.floor(Math.random()*(this.tauler.length));
                PosY = Math.floor(Math.random()*(this.tauler[0].length-1));
            }
            while (this.tauler[PosX][PosY] !== "g" || this.tauler[PosX][PosY+1] !== "g");
            var pivote = new Meitatzombi(null,[PosX,PosY+1], [PosX,PosY],"m",null,"<img src='img/meitatz.png' height='"+ this.h +"px' width='"+ this.w +"px'>");
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
            var pivote = new Meitatzombi(null,[PosX+1,PosY], [PosX,PosY],"m",null,"<img src='img/meitatz.png' height='"+ this.h +"px' width='"+ this.w +"px'>");
            this.meitat.push(pivote);
            var cambia = pivote.ModificaArray();
            this.tauler[PosX][PosY] = cambia;
            this.tauler[PosX+1][PosY] = cambia;
        }
    },

    /* Per crear el objecte de vidaextra fem servir un boleano per si es true o fara en horitzontal i si no o fara
    en vertical, dintre agafem tres posicions random que estiguin ocupades per una g i introduim el objecte Vidaextra en
    el seu array i posem en les tres posicions el estat que seria v en tauler*/
    crear_VidaExtra: function(PosX,PosY){
        direccion = true;
        direccion = (Math.random() < 0.5);
        if (direccion){
            do{
                PosX = Math.floor(Math.random()*(this.tauler.length));
                PosY = Math.floor(Math.random()*(this.tauler[0].length-2));
            }
            while (this.tauler[PosX][PosY] !== "g" || this.tauler[PosX][PosY+1] !== "g" || this.tauler[PosX][PosY+2] !== "g");
            var pivote = new Vidaextra([PosX,PosY+2],[PosX,PosY+1], [PosX,PosY],"v",null,"<img src='img/vida.png' height='"+ this.h +"px' width='"+ this.w +"px'>");
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
            var pivote = new Vidaextra([PosX+2,PosY],[PosX+1,PosY], [PosX,PosY],"v",null,"<img src='img/vida.png' height='"+ this.h +"px' width='"+ this.w +"px'>");
            this.vidaex.push(pivote);
            var cambia = pivote.ModificaArray();
            this.tauler[PosX][PosY] = cambia;
            this.tauler[PosX+1][PosY] = cambia;
            this.tauler[PosX+2][PosY] = cambia;
        }
    },

    /* Aquesta funcio recorreix mostrado amb dos for i amb if que comproba la lletra que hi ha en la posicio i canvia
    el contingut de la posicio agafada per la imatge de l'objecte de la lletra especificada fent un for que recorreix
    l'array on em guardat el objecte en concret. El resultat es tot el tauler amb totes les caselles destapades en img
    i que fem mostrar en el tauler*/
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

    /* Aquesta funcio es per reiniciar totes les variables globals de Partida */
    reiniciar_valores: function(){
        this.tauler = [];
        this.tauler2 = [];
        this.zombis = [];
        this.estrelles = [];
        this.gespa = [];
        this.doble = [];
        this.meitat = [];
        this.vidaex = [];
        this.mostrado= [];
        this.aux= [];
        this.vidas = 3;
        this.punts = 0;
        this.victoria = 0;
        this.contador_vid = 0;
        this.w = 100;
        this.h = 100;
        this.x = 0;
        this.y = 0;
    },

    /* La funcio iniciar serveix per começar la partida */
    iniciar: function(mida1,mida2){
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

/* elDiv sirveix per cuan fas click dintre del tauler agafi la id de la casella que ha clicat el usuari
i depenent de on esta situat el gio i quant medeix la array que conte la id separada de un valor a un,
guarda les posicions en PosX i PosY i crida a la funcio buscar_obj amb aquestes posicions */
var elDiv = document.getElementById("tablero");
elDiv.onclick = function(event){
    var elide = event.target;
    let palabro = [];
    palabro = elide.id.split("");
    let PosX;
    let PosY;
    if(palabro.length > 3){
        if(palabro[2] == "-" && palabro.length == 4){
            PosX = palabro[0] + palabro[1];
            PosY = palabro[3];
            buscar_obj(PosX,PosY);
        }
        else if(palabro[2] == "-" && palabro.length == 5){
            PosX = palabro[0] + palabro[1];
            PosY = palabro[3] + palabro[4];
            buscar_obj(PosX,PosY);
        }
        else if(palabro[1] == "-" && palabro.length == 4){
            PosX = palabro[0];
            PosY = palabro[2] + palabro[3];
            buscar_obj(PosX,PosY);
        }
    }
    else{
        PosX = palabro[0];
        PosY = palabro[2];
        buscar_obj(PosX,PosY);
    }
};

//Crida a la funcio buscar_obj al clicar al boto amb id busca
var buscar = document.getElementById("busca");
buscar.addEventListener("click",buscar_obj);

/* Aquesta funcio busca el objecte que hi ha asignat en la casella de les coordenades que posem */
function buscar_obj(posX,posY){
    let boleo = true;
    /* Primer fem un if que comproba que si en posar les coordenades de manera manual hi ha contingut guardem en posX
    i posY els valors que tinguin */
    if(document.getElementById("z1").value != "" && document.getElementById("z1").value != ""){
        posX = document.getElementById("z1").value;
        posY = document.getElementById("z2").value;
    }
    /* Despres fem un if que si les dos posisions son undefined es que aquesta casella ya a estat descoberta i el bolea
    que em fet al principi el pasem a false aixo fara que no sexecuti la cerca de la casella ja que esta destapada*/
    if(posX == undefined && posY == undefined){
        alert("Aquesta casella ja esta destapada");
        boleo = false;
    }
    /* Si el bolea es true s'executa tot el progrma que hi ha dintre per buscar la casella i fer els canvis corresponents
    en cada tipus d'objecte que trobi */
    if(boleo == true){
        if (Partida.tauler[posX][posY] == "z"){
            for (let i=0; i < Partida.zombis.length; i++) {
                //Restem una vida cada vegada que s'executa aquest if perque em trobat un zombie
                if (Partida.zombis[i].pos1[0] == posX && Partida.zombis[i].pos1[1] == posY){
                    Partida.tauler[posX][posY] = Partida.zombis[i].Descobert(Partida.zombis[i]);
                    Partida.tauler2[posX][posY] = Partida.zombis[i].MuestraIMG(Partida.zombis[i]);
                    Partida.mostrar_tauler(Partida.tauler2.length,Partida.tauler2[0].length);
                    Partida.vidas--;
                    document.getElementById("vid").innerHTML = Partida.vidas;
                    //Si els punts son més grans o igual a 100 li restem els 100 que estan definits en zombie
                    if (Partida.punts >= 100){
                        Partida.punts = Partida.punts - Partida.zombis[i].Puntuaciones();
                        document.getElementById("punt").innerHTML = Partida.punts;
                    }
                    //Si no els posem els punts a 0 perque quedaria negatiu si restem a -100 si es més petit
                    else{
                        Partida.punts = 0;
                        document.getElementById("punt").innerHTML = Partida.punts;
                    }
                    /*Si les vides arriban a 0 perds i surt un prompt de que has perdut, tambe mostrara el tauler destapat
                    i es sumara en les estadistiques una partida perduda*/
                    if (Partida.vidas == 0){
                        alert("Has perdut la partida :(");
                        Partida.mostrar_momento();
                        perdudes ++;
                        document.getElementById("perd").innerHTML = perdudes;
                        crearCookie("perduda",perdudes,25);
                    }
                }
            }
        }
        //Else if de gespa que si la troba la canvia a mayus i suma 50 punts a puntuacio
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
        //Else if per a buscar si es una estrella i sumar 200 punts i si consegueixes totes guanyas la partida
        else if (Partida.tauler[posX][posY] == "e"){
            let ganar = Partida.estrelles.length;
            for (let i=0; i < Partida.estrelles.length; i++){
                if (Partida.estrelles[i].pos1[0] == posX && Partida.estrelles[i].pos1[1] == posY){
                    Partida.tauler[posX][posY] = Partida.estrelles[i].Descobert(Partida.estrelles[i]);
                    Partida.tauler2[posX][posY] = Partida.estrelles[i].MuestraIMG(Partida.estrelles[i]);
                    Partida.victoria++;
                    Partida.mostrar_tauler(Partida.tauler.length,Partida.tauler[0].length);
                    /* Si es destapa la primera casella es mostrara durant 300milisegons el tauler destapat i despres
                    tornara a estar com estava abans de premer la primera estrella pero amb aquesta ja mostrada */
                    if(Partida.victoria == 1){
                        Partida.mostrar_momento();
                        function espera(){
                            Partida.tauler2 = Partida.aux;
                            Partida.mostrar_tauler(Partida.tauler2.length,Partida.tauler2[0].length);
                        }
                        setTimeout(espera,300);
                    }
                    Partida.punts = Partida.punts + Partida.estrelles[i].Puntuaciones();
                    document.getElementById("punt").innerHTML = Partida.punts;
                }
            }
            if (Partida.victoria == ganar){
                alert("Has guanyat la partida :)");
                Partida.mostrar_momento();
                acertades ++;
                document.getElementById("acert").innerHTML = acertades;
                crearCookie("acertada",acertades,25);
                if (localStorage.getItem(""+ (Partida.x) +"-"+ (Partida.y) +"") == null || localStorage.getItem(""+ (Partida.x) +"-"+ (Partida.y) +"") < Partida.punts){
                    localStorage.setItem(""+ (Partida.x) +"-"+ (Partida.y) +"", Partida.punts);
                    alert("Has superat la puntuació máxima d'aquest tauler");
                }
            }
        }
        //Else if para si trobas doblar la puntuacio es dobla la puntuacio.
        else if (Partida.tauler[posX][posY] == "d"){
            for (let i=0; i < Partida.doble.length; i++){
                if (Partida.doble[i].pos1[0] == posX && Partida.doble[i].pos1[1] == posY){
                    Partida.tauler[posX][posY] = Partida.doble[i].Descobert(Partida.doble[i]);
                    Partida.tauler2[posX][posY] = Partida.doble[i].MuestraIMG(Partida.doble[i]);
                    Partida.mostrar_tauler(Partida.tauler.length,Partida.tauler[0].length);
                    Partida.punts = Partida.doble[i].Doblar();
                    document.getElementById("punt").innerHTML = Partida.punts;
                }
            }
        }
        /* Else if para si trobas tots meitat zombis es posin a la meitat.
        Per fer-ho fem un if que comprova les posicions de meitat i fa els canvis en el tauler i si les dos posicions
        arriben a estar destapades fa un contador on amb un for guarda els zombis que no estan destapats i fa un for
        de la meitat de la array que agafa una posicio random i la canvia per una gespa i treu els valors del contador
        i de Partida.zombis perque ja no existeix */
        else if (Partida.tauler[posX][posY] == "m"){
            for (let i=0; i < Partida.meitat.length; i++){
                if (Partida.meitat[i].pos1[0] == posX && Partida.meitat[i].pos1[1] == posY){
                    Partida.tauler[posX][posY] = Partida.meitat[i].Descobert(Partida.meitat[i]);
                    Partida.tauler2[posX][posY] = Partida.meitat[i].MuestraIMG(Partida.meitat[i]);
                    Partida.mostrar_tauler(Partida.tauler.length,Partida.tauler[0].length);
                    if (Partida.tauler[Partida.meitat[i].pos1[0]][Partida.meitat[i].pos1[1]] == "M" 
                    && Partida.tauler[Partida.meitat[i].pos2[0]][Partida.meitat[i].pos2[1]] == "M"){
                        let contador_z = [];
                        for(let i=0;i < Partida.zombis.length;i++){
                            let zz = Partida.zombis[i];
                            if (zz.estat == "z"){
                                contador_z.push(zz);
                            }
                        }
                        let largo_z = contador_z.length;
                        for(let i=0;i < Math.floor(largo_z.length/2);i++){
                            let r = Math.floor(Math.random()*(contador_z.length - 1));
                            let pep = contador_z[r];
                            Partida.tauler[pep.pos1[0]][pep.pos1[1]] = "g";
                            Partida.mostrar_tauler(Partida.tauler.length,Partida.tauler[0].length);
                            QuitarValor(contador_z, pep);
                            QuitarValor(Partida.zombis, pep);
                        }
                        contador_z = [];
                        alert("S'han posat a la meitat els zombis");
                    }
                }
                if (Partida.meitat[i].pos2[0] == posX && Partida.meitat[i].pos2[1] == posY){
                    Partida.tauler[posX][posY] = Partida.meitat[i].Descobert(Partida.meitat[i]);
                    Partida.tauler2[posX][posY] = Partida.meitat[i].MuestraIMG(Partida.meitat[i]);
                    Partida.mostrar_tauler(Partida.tauler.length,Partida.tauler[0].length);
                    if (Partida.tauler[Partida.meitat[i].pos1[0]][Partida.meitat[i].pos1[1]] == "M" 
                    && Partida.tauler[Partida.meitat[i].pos2[0]][Partida.meitat[i].pos2[1]] == "M"){
                        let contador_z = [];
                        for(let i=0;i < Partida.zombis.length;i++){
                            let zz = Partida.zombis[i];
                            if (zz.estat == "z"){
                                contador_z.push(zz);
                            }
                        }
                        let largo_z = contador_z.length;
                        for(let i=0;i < Math.floor(largo_z/2);i++){
                            let r = Math.floor(Math.random()*(contador_z.length - 1));
                            let pep = contador_z[r];
                            Partida.tauler[pep.pos1[0]][pep.pos1[1]] = "g";
                            Partida.mostrar_tauler(Partida.tauler.length,Partida.tauler[0].length);
                            QuitarValor(contador_z, pep);
                            QuitarValor(Partida.zombis, pep);
                        }
                        contador_z = [];
                        alert("S'han posat a la meitat els zombis");
                    }
                }
            }
        }
        //Else if de si tobas totes les videsextra es suma una vida més fent comprobacions amb if.
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
        /* Si totes les posibilitats no funcionan es que la casella ja esta destapada */
        else{
            alert("Aquesta casella ja esta destapada");
        }

        /* Aquesta funcio elimina els valors que indiquis */
        function QuitarValor ( arr, item ) {
            var i = arr.indexOf( item );
            arr.splice( i, 1 );
        }
        /* Per no crear errors s'elimina el contingut de dintre de les coordenades manuals */
        document.getElementById("z1").value = "";
        document.getElementById("z2").value = "";
    }
}

/* Creacio de les cookies */
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

//FUNCIO PER OBTENIR EL VALOR D'UNA COOKIE
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

/*FUNCIO PER COMPROVAR SI EXISTEIX UNA COOKIE, SI NO EXISTEIX ES CREAN TOTES Y S'ASIGNAN Y SI
EXISTEIX ASIGNA ELS VALORS DE LES COOKIES*/ 
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

/* Funcio per abandonar la partida on surt un alert de que has abandonat i mostrara tot el contingut del tauler i es
sumara una partida abandonada */
function abandonar_partida(){
    alert("Has abandonat la partida.");
        Partida.mostrar_momento();
        abandonades ++;
        document.getElementById("aban").innerHTML = abandonades;
        crearCookie("abandonada",abandonades,25);
}
document.getElementById("abandona").addEventListener("click", abandonar_partida);

/* Creació d'una finestra filla per les estadistiques */
var ventana1 = null;
function ventanas(){
    ventana1 = window.open("finestra1s.html", "finestra1", "top=0, left=700, width=660, height=765");
    ventana1.document.write("<h2 align='center'>Maxima puntuación por tablero</h2>");
    ventana1.document.write("<p id='prueba'></p>");
}

document.getElementById("stats").addEventListener("click", tauler_stats);

/* Guardem els resultats i creem el tauler on es guarden i el mostrem */
function tauler_stats(){
    ventanas();
    let tablero = "<link rel='stylesheet' href='css/ventana.css'><table border='' cellspacing='0'>";
    for (let i=0;i < 16; i++){
        tablero += "<tr>";
        for (let j=0;j < 16; j++){
            tablero += "<td bgcolor='green'><b>"+ (i+5) +"-"+ (j+5) +"</b></td>";
        }
        tablero +="</tr>";
        tablero += "<tr>";
        for (let j=0;j < 16; j++){
            tablero += "<td bgcolor='31e240' id='"+ (i+5) +"-"+ (j+5) +"'></td>";
        }
        tablero +="</tr>";
    }
    tablero += "</table>";
    ventana1.document.getElementById("prueba").innerHTML = tablero;
    for (let i=0;i < 16; i++) {
        for (let j=0;j < 16; j++) {
            if (localStorage.getItem(""+ (i+5) +"-"+ (j+5) +"") != null){
                ventana1.document.getElementById(""+ (i+5) +"-"+ (j+5) +"").innerHTML = localStorage.getItem(""+ (i+5) +"-"+ (j+5) +"");
            }
            else{
                ventana1.document.getElementById(""+ (i+5) +"-"+ (j+5) +"").innerHTML = "<p>0</p>";
            }
        }       
    }
}