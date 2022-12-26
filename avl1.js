class Nodo{
    constructor(id,name,descripcion,puntuacion,precio){
        this.id = id;
        this.name = name;
        this.descripcion= descripcion;
        this.puntuacion= puntuacion;
        this.precio = precio;
        this.izquierda = null;
        this.derecha = null;
        this.altura = 0;
    }
}

class AVL{
    constructor(){
        this.raiz = null;
        this.graphviz = ""
    }
    //maximo
    //RETORNA EL VALOR MAXIMO
    MAXIMO(valor1,valor2){
        if(valor1>valor2) {return valor1
        };
        return valor2;
    }
    //altura del arbol
    altura(nodo){
        if(nodo == null){
            return -1;
        } 
        return nodo.altura;
    }
    //insertar
    insertar(id,name,descripcion,puntuacion,precio){
        this.raiz = this.add(id,name,descripcion,puntuacion,precio,this.raiz)

    }
    //insertar recursivo
    add(id,name,descripcion,puntuacion,precio, nodo){
        if(nodo == null) { //retornamos el dato a la cabeza raiz
            return new Nodo(id,name,descripcion,puntuacion,precio);
        }
        else{
            if(id < nodo.id){ // si el nodo que viene es menor que el dato siguietne entra
                nodo.izquierda = this.add(id,name,descripcion,puntuacion,precio, nodo.izquierda) // se va a la izquierda ya que esta es la funcionalidad el arobl binario
                if(this.altura(nodo.derecha)-this.altura(nodo.izquierda) == 2){
                    //programar los casos 
                    //rsi
                    if(id < nodo.izquierda.id){
                        nodo = this.rotacionizquierda(nodo);
                    }//rdi}
                    else{
                        nodo = this.Rotaciondobleizquierda(nodo);
                    }
                    
                }
            }else if(id > nodo.id){
                nodo.derecha = this.add(id,name,descripcion,puntuacion,precio, nodo.derecha);
                if(this.altura(nodo.derecha)-this.altura(nodo.izquierda)== 2){
                    //otros dos casos
                    //rotacion simple derecha
                    if(id > nodo.derecha.id){
                        nodo = this.rotacionderecha(nodo);
                    }else{
                        nodo = this.Rotaciondoblederecha(nodo);
                    }
                    //rotacion doble derecha
                }
            }else{
                nodo.id =id;
            }
        }
        nodo.altura = this.MAXIMO(this.altura(nodo.izquierda),this.altura(nodo.derecha))+1
        return nodo;
    }


    //rotacion simple izquierda
    rotacionizquierda(nodo){
        var aux = nodo.izquierda;
        nodo.izquierda = aux.derecha;
        aux.derecha = nodo;
        //calculo de nueva altura
        nodo.altura = this.MAXIMO(this.altura(nodo.derecha),this.altura(nodo.izquierda))+1;
        aux.altura = this.MAXIMO(this.altura(aux.derecha), this.altura(aux.izquierda))+1;
        return aux;
    }
    //rotacion simple derecha
    rotacionderecha(nodo){
        var aux = nodo.derecha;
        nodo.derecha = aux.izquierda;
        aux.izquierda = nodo;
        //calcular de nuevo altura
        nodo.altura = this.MAXIMO(this.altura(nodo.derecha),this.altura(nodo.izquierda))+1;
        aux.altura = this.MAXIMO(this.altura(aux.derecha), this.altura(aux.izquierda))+1;
        return aux;
    }
    //rotacion dobles derecha
    Rotaciondoblederecha(nodo){
        nodo.derecho = this.rotacionizquierda(nodo.derecho);
        return this.rotacionderecha(nodo);
    }

    //rotaciones dobles izquierda
    Rotaciondobleizquierda(nodo){
        nodo.izquierda = this.rotacionderecha(nodo.izquierda);
        return this.rotacionizquierda(nodo);
    }

    //recorridos
    preorden(){
        this.pre_orden(this.raiz);
    }
    pre_orden(nodo){
        if(nodo!=null){
            console.log("valor=" +nodo.id + " " + nodo.name);
            this.pre_orden(nodo.izquierda);
            this.pre_orden(nodo.derecha);
        }
    }

    //postorden
    postorden(){
        this.post_orden(this.raiz);
    }
    post_orden(nodo){
        if(nodo!=null){
            this.post_orden(nodo.izquierda);
            this.post_orden(nodo.derecha);
            console.log("valor=" +nodo.id + " " + nodo.name);
        }
    }
    //inorden
    inorden(){
        this.in_orden(this.raiz);
    }
    in_orden(nodo){
        if(nodo!=null){
            this.in_orden(nodo.izquierda);
            console.log("valor=" +nodo.id + " " + nodo.name);
            this.in_orden(nodo.derecha);    
        }
    }

    graph(idDiv){

        this.graphviz = '';
        this.graphviz = 'digraph AVL{\nnode[shape= box, fillcolor="#FFFFFF", style= filled];\nbgcolor = "#00FF7F";\nranksep = 0.5;\nnodesep = 0.5;\nsubgraph cluster_A{\nlabel = "Peliculas";\nbgcolor = "#20B2AA";\nfontcolor = white;\nfontsize = 30;\n\n ';

        this.preordenGraph();

        this.graphviz += '}\n}';


        let id = '#'+idDiv;

        console.log(this.graphviz)

        d3.select(id).graphviz()
            .width(2000)
            .height(1500)
            .zoom(true)
            .fit(true)
            .renderDot(this.graphviz)



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

            if(node.izquierda != null){

                this.graphviz += node.id + '[label="' + node.name+ '"];\n';
                this.graphviz += node.izquierda.id + '[label="' + node.izquierda.name+ '"];\n';
                this.graphviz += node.id+ ' -> ' + node.izquierda.id+ ';\n';
            }
            if(node.derecha!= null){
                
                this.graphviz += node.id + '[label="' + node.name + '"];\n';
                this.graphviz += node.derecha.id + '[label="' + node.derecha.name + '"];\n';
                this.graphviz += node.id + ' -> ' + node.derecha.id + '\n';
            }
            this._preordenGraph(node.izquierda);
            this._preordenGraph(node.derecha);
        }


    }
}
console.log("Recorrido preorden")
var arbolavl = new AVL();
// arbolavl.insertar(400,"jona");
// arbolavl.insertar(300,"andres");
// arbolavl.insertar(200,"rutilio");
// arbolavl.insertar(250,"leonel");

arbolavl.insertar(9833425323037,"samuel");
arbolavl.insertar(6456106378318,"letty");
arbolavl.insertar(1807852273567,"samuel");
arbolavl.insertar(3377513707599,"letty");
arbolavl.insertar(1059706333876,"samuel");
arbolavl.insertar(6059242389901,"letty");

arbolavl.insertar(7018352391377,"letty");
arbolavl.insertar(4088137115218,"letty");


// console.log("Recorrido preorden")
// arbolavl.preorden()
// console.log("Recorrido inorden")
// arbolavl.inorden()
// console.log("Recorrido postorden")
// arbolavl.postorden()
arbolavl.graph();
