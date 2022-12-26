class NodoAVL{

    constructor(data){

        this.data = data;
        this.altura = 0;
        this.izquierda = null;
        this.derecha = null;
    
    }

    //Getters
    getData(){

        return this.data;
    }

    getIzquierda(){

        return this.izquierda;
    }

    getDerecha(){

        return this.derecha;
    }

    getAltura(){

        return this.altura;
    }

    //Setters
    setData(data){

        this.data = data;
    }

    setIzquierda(izquierda){

        this.izquierda = izquierda;
    }

    setDerecha(derecha){

        this.derecha = derecha;
    }

    setAltura(altura){

        this.altura = altura;
    }
}

class ArbolAVL{


    constructor(){

        this.raiz = null;
        this.grapho = ''
    }

    //search
    search(data){

        if(this.raiz == null){

            console.log('no se ha insertado nada en el AVLTree.')

            return null;
        }else if(data < this.raiz.getData().id_pelicula){

            return this._search(data, this.raiz.getLeft());
        }else if(data > this.raiz.getData().id_pelicula){

            return this._search(data, this.raiz.getRight());
        }else{

            console.log(data + this.raiz.getData().id_pelicula);
            console.log('Si esta retornando dato');
            return this.raiz.getData();
        }

    }

    _search(data, node){

        
        if(data < node.getData().id_pelicula){
            return this._search(data, node.getLeft());

        }else if(data > node.getData().id_pelicula){
            return this._search(data, node.getRight());

        }else if(node == null){
            return  null;

        }else{
            console.log(data + node.getData().id_pelicula);
            console.log('Si esta retornando dato');
            return node.getData();
        }
    }

    //find h
    getAltura2(node){

        if(node == null){

            return -1;
        }else{

            return node.getAltura();
        }
    }

    //Simple Rotation Left
    rotationLeft(node){

        let  temp = node.getIzquierda();
        node.setIzquierda(temp.getDerecha());
        temp.setDerecha(node);
        node.setAltura(Math.max(this.getAltura2(node.getIzquierda()), this.getAltura2(node.getDerecha()))+1);
        temp.setAltura(Math.max(this.getAltura2(temp.getIzquierda()), this.getAltura2(temp.getDerecha()))+1)

        return temp;
    }

    //Simple Rotation Right
    rotationRight(node){

        let  temp = node.getDerecha();
        node.setDerecha(temp.getIzquierda());
        temp.setIzquierda(node);
        node.setAltura(Math.max(this.getAltura2(node.getIzquierda()), this.getAltura2(node.getDerecha()))+1);
        temp.setAltura(Math.max(this.getAltura2(temp.getIzquierda()), this.getAltura2(temp.getDerecha()))+1)

        return temp;
    }

    //Double Rotation Left
    rotationLeftD(node){

        let temp;
        node.setIzquierda(this.rotationRight(node.getIzquierda()));
        temp = this.rotationLeft(node);

        return temp;
    }

    //Double Rotation Right
    rotationRightD(node){

        let temp;
        node.setDerecha(this.rotationLeft(node.getDerecha()));
        temp = this.rotationRight(node);

        return temp;
    }

    //insert
    _insert(Nodo1, node){

        let subTree = node;

        if(Nodo1.getData().id_pelicula < node.getData().id_pelicula){

            if(node.getIzquierda() == null){
                node.setIzquierda(Nodo1);

            }else{
                node.setIzquierda(this._insert(Nodo1, node.getIzquierda()));

                if((this.getAltura2(node.getIzquierda()) - this.getAltura2(node.getDerecha())) == 2){

                    if(Nodo1.getData().id_pelicula < node.getIzquierda().getData().id_pelicula){
                        subTree = this.rotationLeft(node);

                    }else{
                        subTree = this.rotationLeftD(node);

                    }

                }   
            }
        }else if(Nodo1.getData().id_pelicula > node.getData().id_pelicula){

            if(node.getDerecha() == null){
                node.setDerecha(Nodo1);
            }else{
                node.setDerecha(this._insert(Nodo1, node.getDerecha()));

                if((this.getAltura2(node.getDerecha()) - this.getAltura2(node.getIzquierda())) == 2){

                    if(Nodo1.getData().id_pelicula > node.getDerecha().getData().id_pelicula){
                        subTree = this.rotationRight(node);

                    }else{
                        subTree = this.rotationRightD(node);

                    }
                }
            }
        }else{

            console.log('Insercción fallida por duplicación');
        }


        if((node.getIzquierda() == null) && (node.getDerecha() != null)){

            node.setAltura(node.getDerecha().getAltura()+1);

        }else if((node.getIzquierda() != null) && (node.getDerecha() == null)){

            node.setAltura(node.getIzquierda().getAltura()+1);

        }else{

            node.setAltura(Math.max(this.getAltura2(node.getIzquierda()), this.getAltura2(node.getDerecha())) + 1);
        }

        return subTree;

    }

    insert(data){

        let newNode = new NodoAVL(data);

        if(this.raiz == null){

            this.raiz = newNode;
        }else{

            this.raiz = this._insert(newNode, this.raiz);
        }

    }

    //Tours 
    //Inorden
    inorden(){

        if(this.raiz == null){

            console.log('No se ha insertado nada en el BSTree.');
        }else{

            this._inorden(this.raiz);
        }
    }

    _inorden(node){

        if(node != null){

            this._inorden(node.getIzquierda());
            console.log(node.getData() + ' ');
            this._inorden(node.getDerecha());
        }

    }

    inordenR(){

        if(this.raiz == null){

            console.log('No se ha insertado nada en el BSTree.');
        }else{

            this._inordenR(this.raiz);
        }
    }

    _inordenR(node){

        if(node != null){

            this._inordenR(node.getDerecha());
            console.log(node.getData() + ' ');
            this._inordenR(node.getIzquierda());
        }

    }

    //Preorden
    preorden(){

        if(this.raiz == null){

            console.log('No se ha insertado nada en el BSTree.');
        }else{

            this._preorden(this.raiz);
        }
    }

    _preorden(node){

        if(node != null){

            console.log(node.getData() + ' ');
            this._preorden(node.getIzquierda());
            this._preorden(node.getDerecha());
        }


    }

    //PostOrden
    postorden(){

        if(this.raiz == null){

            console.log('No se ha insertado nada en el BSTree.');
        }else{

            this._postorden(this.raiz);
        }
    }

    _postorden(node){

        if(node != null){

            this._postorden(node.getIzquierda());
            this._postorden(node.getDerecha());
            console.log(node.getData() + ' ');
            
        }


    }

    //Graphviz
    graph(idDiv){

        this.grapho = '';
        this.grapho = 'digraph AVL{\nnode[shape= box, fillcolor="#FFFFFF", style= filled];\nbgcolor = "#00FF7F";\nranksep = 0.5;\nnodesep = 0.5;\nsubgraph cluster_A{\nlabel = "Peliculas";\nbgcolor = "#20B2AA";\nfontcolor = white;\nfontsize = 30;\n\n ';

        this.preordenGraph();

        this.grapho += '}\n}';


        let id = '#'+idDiv;

        console.log(this.grapho)

        d3.select(id).graphviz()
            .width(2000)
            .height(1500)
            .zoom(true)
            .fit(true)
            .renderDot(this.grapho)



    }

    preordenGraph(){

        if(this.raiz == null){

            console.log('No se ha insertado nada en el BSTree.');
        }else{

            this._preordenGraph(this.raiz);
        }
    }

    _preordenGraph(node){

        if(node != null){

            if(node.getIzquierda() != null){

                this.grapho += node.getData().id_pelicula + '[label="' + node.getData().nombre_pelicula + '"];\n';
                this.grapho += node.getIzquierda().getData().id_pelicula + '[label="' + node.getIzquierda().getData().nombre_pelicula + '"];\n';
                this.grapho += node.getData().id_pelicula + ' -> ' + node.getIzquierda().getData().id_pelicula + ';\n';
            }
            if(node.getDerecha() != null){
                
                this.grapho += node.getData().id_pelicula + '[label="' + node.getData().nombre_pelicula + '"];\n';
                this.grapho += node.getDerecha().getData().id_pelicula + '[label="' + node.getDerecha().getData().nombre_pelicula + '"];\n';
                this.grapho += node.getData().id_pelicula + ' -> ' + node.getDerecha().getData().id_pelicula + '\n';
            }
            this._preordenGraph(node.getIzquierda());
            this._preordenGraph(node.getDerecha());
        }


    }

    //inorden Cards

    inordenCard(idDiv){

        if(this.raiz == null){

            console.log('No se ha insertado nada en el BSTree.');
        }else{

            this._inordenCard(this.raiz, idDiv);
        }
    }

    _inordenCard(node, idDiv){

        if(node != null){

            this._inordenCard(node.getLeft(), idDiv);
            
            //
            let card = document.querySelector(idDiv);
            

            let newDiv = document.createElement("div");
            card.innerHTML += `
            <div class="card" id="cardsMovieUser">
                <div class="card-body">

                    <div id="movieName">
                        <img src="https://cdn-icons-png.flaticon.com/512/2809/2809590.png" id="imageP">
                        <h4>${node.getData().nombre_pelicula}</h4>

                    </div>  

                    <div id="description">
                        <h5 class="card-title">Descripción</h5>
                        <p class="card-text">${node.getData().descripcion}</p>

                    </div>
          
                    <div id="optionBM">
                        <button type="button" class="btn btn-primary" id="${node.getData().id_pelicula}" style="float: left;  margin-left: 1rem; margin-right: 1rem;" onclick="info(this.id)">información</button>
                        <button type="button" class="btn btn-primary" id="${node.getData().id_pelicula}" style="float: left;  margin-left: 1rem; margin-right: 1rem;" onclick="alquiler(this.id)">Alquilar</button>
                        <p id="precio">Q. ${node.getData().precio_Q}.00</p>

                    </div>
          
                </div>
            </div>`;

            //console.log(node.getData() + ' ');

            //
            this._inordenCard(node.getRight(), idDiv);
        }

    }

    inordenCardR(idDiv){

        if(this.raiz == null){

            console.log('No se ha insertado nada en el BSTree.');
        }else{

            this._inordenCardR(this.raiz, idDiv);
        }
    }

    _inordenCardR(node, idDiv){

        if(node != null){

            this._inordenCardR(node.getRight(), idDiv);

            //
            let card = document.querySelector(idDiv);
            

            let newDiv = document.createElement("div");
            card.innerHTML += `
            <div class="card" id="cardsMovieUser">
                <div class="card-body">

                    <div id="movieName">
                        <img src="https://cdn-icons-png.flaticon.com/512/2809/2809590.png" id="imageP">
                        <h4>${node.getData().nombre_pelicula}</h4>

                    </div>  

                    <div id="description">
                        <h5 class="card-title">Descripción</h5>
                        <p class="card-text">${node.getData().descripcion}</p>

                    </div>
          
                    <div id="optionBM">
                        <button type="button" class="btn btn-primary" id="${node.getData().id_pelicula}" style="float: left;  margin-left: 1rem; margin-right: 1rem;" onclick="info(this.id)">información</button>
                        <button type="button" class="btn btn-primary" id="${node.getData().id_pelicula}" style="float: left;  margin-left: 1rem; margin-right: 1rem;" onclick="alquiler(this.id)">Alquilar</button>
                        <p id="precio">Q. ${node.getData().precio_Q}.00</p>

                    </div>
          
                </div>
            </div>`;

            //console.log(node.getData() + ' ');


            this._inordenCardR(node.getLeft(), idDiv);
        }

    }



}   
