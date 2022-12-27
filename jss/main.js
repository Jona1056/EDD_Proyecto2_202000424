
//------------------------------------------------------------------
// FUNCIONES PARA PASAR DE OTRAS PANTALLAS A OTRAS

function crearcuenta(){
    document.getElementById("LOGIN").style.display = "none";
    document.getElementById("crearusuario").style.display="grid";
    document.getElementById("usuario").value = "";
    document.getElementById("password").value = "";
    document.getElementById("check1").checked ="";
}

function Home(){
    document.getElementById("LOGIN").style.display = "grid";
    document.getElementById("crearusuario").style.display="none";
}

function GOcreate(){
    document.getElementById("LOGIN").style.display = "grid";
    document.getElementById("crearusuario").style.display="none";

}
function goAdmin(){
    document.getElementById("LOGIN").style.display = "none";
    document.getElementById("admin").style.display="grid";
}
function Back(){
    document.getElementById("LOGIN").style.display = "grid";
    document.getElementById("admin").style.display="none";
}

function Back2(){
    document.getElementById("LOGIN").style.display = "grid";
    document.getElementById("VENTANA-USUARIO").style.display="none";
    document.getElementById("usuario").value = "";
    document.getElementById("password").value = "";
    document.getElementById("check1").checked ="";

}
class comentario{
    constructor(pelicula,comentario1){
        
        this.pelicula = pelicula;
        this.comentario1 = comentario1;
        this.next = null;
    }
}


//ARBOL AVL DE BUSQUEDA
class NodoAVL{

  constructor(data){

      this.data = data;
      this.altura = 0;
      this.izquierda = null;
      this.derecha = null;
      this.comentario = new comentario();
      this.next = null;
  
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
  //OBTENER ALTURA DEL NODO
  getAltura2(node){
      if(node == null){
          return -1;
      }else{
          return node.getAltura();
      }
  }

  //ROTACION SIMPLE A LA IZQUIERDA
  rotacionizquierda(node){

      let  temp = node.getIzquierda(); //guardamos el nodo que viene obtenemos su izquierdo
      node.setIzquierda(temp.getDerecha()); //al nodo que viene a la izquierda le mandamos el dato del temp derecha
      temp.setDerecha(node); // y a la derecha le mandamos el nodo que viene para hacer el cambio
      node.setAltura(Math.max(this.getAltura2(node.getIzquierda()), this.getAltura2(node.getDerecha()))+1); //mandamos a obtener la nueva altura
      temp.setAltura(Math.max(this.getAltura2(temp.getIzquierda()), this.getAltura2(temp.getDerecha()))+1)
 
      return temp;
  }

  //Simple Rotation Right
  rotacionderecha(node){
   //rotacion derecha es igual solo que inverso 
      let  temp = node.getDerecha();
      node.setDerecha(temp.getIzquierda());
      temp.setIzquierda(node);
      node.setAltura(Math.max(this.getAltura2(node.getIzquierda()), this.getAltura2(node.getDerecha()))+1);
      temp.setAltura(Math.max(this.getAltura2(temp.getIzquierda()), this.getAltura2(temp.getDerecha()))+1) //Math.max retorna el valor mas alto entre dos

      return temp;
  }

  doblerotacionizquierda(node){

      let temp;  
      node.setIzquierda(this.rotacionderecha(node.getIzquierda())); // el nodo que viene le setiamos al lado izquierdo una rotacion derecha con el lado izqueirdo
      temp = this.rotacionizquierda(node);
      return temp;
  }

  doblerotacionderecha(node){

      let temp;
      node.setDerecha(this.rotacionizquierda(node.getDerecha()));
      temp = this.rotacionderecha(node);

      return temp;
  }


  add(Nodo1, node){

      let newNode = node;
      if(Nodo1.getData().id_pelicula < node.getData().id_pelicula){ // si el nodo que viene es menor al nodo raiz 

          if(node.getIzquierda() == null){
              node.setIzquierda(Nodo1); // si el nodo izquierda es nulo agregamos al primer nodo izquierda

          }else{
            // de lo contrario hacemos lo siguiente
              node.setIzquierda(this.add(Nodo1, node.getIzquierda())); //mandamos a llamar la misma funcion para ver si es derecha o izquierda

              if((this.getAltura2(node.getIzquierda()) - this.getAltura2(node.getDerecha())) == 2){

                  if(Nodo1.getData().id_pelicula < node.getIzquierda().getData().id_pelicula){
                      newNode = this.rotacionizquierda(node);

                  }else{
                      newNode = this.doblerotacionizquierda(node);

                  }

              }   
          }
      }else if(Nodo1.getData().id_pelicula > node.getData().id_pelicula){

          if(node.getDerecha() == null){
              node.setDerecha(Nodo1);
          }else{
              node.setDerecha(this.add(Nodo1, node.getDerecha()));

              if((this.getAltura2(node.getDerecha()) - this.getAltura2(node.getIzquierda())) == 2){

                  if(Nodo1.getData().id_pelicula > node.getDerecha().getData().id_pelicula){
                      newNode = this.rotacionderecha(node);

                  }else{
                      newNode = this.doblerotacionderecha(node);

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

      return newNode;

  }

    _add(data){

      let newNode = new NodoAVL(data);
      if(this.raiz == null){
          this.raiz = newNode;
      }else{
          this.raiz = this.add(newNode, this.raiz);

      }

  }
  //Graphviz
  graph1(idDiv){

      this.grapho = '';
      this.grapho =         'digraph SimpleList{\nnode[shape= box, fillcolor="#FFFFFF", style= filled];\nbgcolor = "  #00ccff ";\nranksep = 0.5;\nnodesep = 0.5;\nsubgraph cluster_A{\nlabel = "Peliculas";\nbgcolor = "  #00ffad ";\nfontcolor ="black ";\nfontsize = 30;\n\n ';

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

}   

//ARBOL AVL DE BUSQUEDA
class alquilados{
    constructor(pelicula,alquilada){
        this.pelicula = pelicula;
        this.alquilada = alquilada;
        this.next = null;
        this.prev = null;

    }
}
class NodoAVL2{

    constructor(data){
  
        this.data = data;
        this.altura = 0;
        this.izquierda = null;
        this.derecha = null;
        this.comentario = new comentario();
        this.next = null;
    
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
  
  class ArbolAVL2{
  
  
    constructor(){
  
        this.raiz = null;
        this.grapho = ''
        this.head = null;
        this.tail = null;
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
  
    //OBTENER ALTURA DEL NODO
    getAltura2(node){
        if(node == null){
            return -1;
        }else{
            return node.getAltura();
        }
    }
  
    //ROTACION SIMPLE A LA IZQUIERDA
    rotacionizquierda(node){
  
        let  temp = node.getIzquierda(); //guardamos el nodo que viene obtenemos su izquierdo
        node.setIzquierda(temp.getDerecha()); //al nodo que viene a la izquierda le mandamos el dato del temp derecha
        temp.setDerecha(node); // y a la derecha le mandamos el nodo que viene para hacer el cambio
        node.setAltura(Math.max(this.getAltura2(node.getIzquierda()), this.getAltura2(node.getDerecha()))+1); //mandamos a obtener la nueva altura
        temp.setAltura(Math.max(this.getAltura2(temp.getIzquierda()), this.getAltura2(temp.getDerecha()))+1)
   
        return temp;
    }
  
    //Simple Rotation Right
    rotacionderecha(node){
     //rotacion derecha es igual solo que inverso 
        let  temp = node.getDerecha();
        node.setDerecha(temp.getIzquierda());
        temp.setIzquierda(node);
        node.setAltura(Math.max(this.getAltura2(node.getIzquierda()), this.getAltura2(node.getDerecha()))+1);
        temp.setAltura(Math.max(this.getAltura2(temp.getIzquierda()), this.getAltura2(temp.getDerecha()))+1) //Math.max retorna el valor mas alto entre dos
  
        return temp;
    }
  
    doblerotacionizquierda(node){
  
        let temp;  
        node.setIzquierda(this.rotacionderecha(node.getIzquierda())); // el nodo que viene le setiamos al lado izquierdo una rotacion derecha con el lado izqueirdo
        temp = this.rotacionizquierda(node);
        return temp;
    }
  
    doblerotacionderecha(node){
  
        let temp;
        node.setDerecha(this.rotacionizquierda(node.getDerecha()));
        temp = this.rotacionderecha(node);
  
        return temp;
    }
  
  
    add(Nodo1, node){
  
        let newNode = node;
        if(Nodo1.getData().nombre_pelicula< node.getData().nombre_pelicula){ // si el nodo que viene es menor al nodo raiz 
  
            if(node.getIzquierda() == null){
                node.setIzquierda(Nodo1); // si el nodo izquierda es nulo agregamos al primer nodo izquierda
  
            }else{
              // de lo contrario hacemos lo siguiente
                node.setIzquierda(this.add(Nodo1, node.getIzquierda())); //mandamos a llamar la misma funcion para ver si es derecha o izquierda
  
                if((this.getAltura2(node.getIzquierda()) - this.getAltura2(node.getDerecha())) == 2){
  
                    if(Nodo1.getData().nombre_pelicula < node.getIzquierda().getData().nombre_pelicula){
                        newNode = this.rotacionizquierda(node);
  
                    }else{
                        newNode = this.doblerotacionizquierda(node);
  
                    }
  
                }   
            }
        }else if(Nodo1.getData().nombre_pelicula > node.getData().nombre_pelicula){
  
            if(node.getDerecha() == null){
                node.setDerecha(Nodo1);
            }else{
                node.setDerecha(this.add(Nodo1, node.getDerecha()));
  
                if((this.getAltura2(node.getDerecha()) - this.getAltura2(node.getIzquierda())) == 2){
  
                    if(Nodo1.getData().nombre_pelicula> node.getDerecha().getData().nombre_pelicula){
                        newNode = this.rotacionderecha(node);
  
                    }else{
                        newNode = this.doblerotacionderecha(node);
  
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
  
        return newNode;
  
    }
  
      _add(data){
  
        let newNode = new NodoAVL2(data);
        if(this.raiz == null){
            this.raiz = newNode;
        }else{
            this.raiz = this.add(newNode, this.raiz);
  
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
  
  
    //Graphviz
    graph1(idDiv){
  
        this.grapho = '';
        this.grapho =         'digraph SimpleList{\nnode[shape= box, fillcolor="#FFFFFF", style= filled];\nbgcolor = "  #00ccff ";\nranksep = 0.5;\nnodesep = 0.5;\nsubgraph cluster_A{\nlabel = "Peliculas";\nbgcolor = "  #00ffad ";\nfontcolor ="black ";\nfontsize = 30;\n\n ';
  
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
  
            this._inordenCard(node.getIzquierda(), idDiv);
            
            //
            let card = document.querySelector(idDiv);
            
  
        
            card.innerHTML += `
  
  
            
            <div class="plan-card">
            <h2>${node.getData().nombre_pelicula}</h2>
            <span id="${node.getData().id_pelicula}">${node.getData().descripcion}</span>
            <div class="etiquet-price">
                <p>${node.getData().precio_Q}</p>
                <div></div>
            </div>
            <div class="benefits-list">
                <ul>
                    <li><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                            <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"></path>
                        </svg><span onclick="alquilar('${node.getData().nombre_pelicula}')">Alquilar</span></li>
                </ul>
            </div>
            <div class="button-get-plan">
                <a href="#"  onclick="pelis('${node.getData().id_pelicula}','${node.getData().nombre_pelicula}','${node.getData().precio_Q}')">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-rocket">
                        <path d="M156.6 384.9L125.7 353.1C117.2 345.5 114.2 333.1 117.1 321.8C120.1 312.9 124.1 301.3 129.8 288H24C15.38 288 7.414 283.4 3.146 275.9C-1.123 268.4-1.042 259.2 3.357 251.8L55.83 163.3C68.79 141.4 92.33 127.1 117.8 127.1H200C202.4 124 204.8 120.3 207.2 116.7C289.1-4.07 411.1-8.142 483.9 5.275C495.6 7.414 504.6 16.43 506.7 28.06C520.1 100.9 516.1 222.9 395.3 304.8C391.8 307.2 387.1 309.6 384 311.1V394.2C384 419.7 370.6 443.2 348.7 456.2L260.2 508.6C252.8 513 243.6 513.1 236.1 508.9C228.6 504.6 224 496.6 224 488V380.8C209.9 385.6 197.6 389.7 188.3 392.7C177.1 396.3 164.9 393.2 156.6 384.9V384.9zM384 167.1C406.1 167.1 424 150.1 424 127.1C424 105.9 406.1 87.1 384 87.1C361.9 87.1 344 105.9 344 127.1C344 150.1 361.9 167.1 384 167.1z"></path>
                    </svg>
                    <span >INFORMACION</span>
                </a>
            </div>
        </div>`;
  
            //console.log(node.getData() + ' ');
  
            //
            this._inordenCard(node.getDerecha(), idDiv);
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
  
            this._inordenCardR(node.getDerecha(), idDiv);
  
            //
            let card = document.querySelector(idDiv);
        
            
            card.innerHTML += `
  
  
            
            <div class="plan-card">
            <h2>${node.getData().nombre_pelicula}</h2>
            <span id="contenido11">${node.getData().descripcion}</span>
            <div class="etiquet-price">
                <p>${node.getData().precio_Q}</p>
                <div></div>
            </div>
            <div class="benefits-list">
                <ul>
                    <li><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                            <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"></path>
                            </svg><span onclick="alquilar('${node.getData().nombre_pelicula}')">Alquilar</span></li>
                </ul>
            </div>
            <div class="button-get-plan">
                <a href="#"  onclick="pelis('${node.getData().id_pelicula}','${node.getData().nombre_pelicula}','${node.getData().precio_Q}')">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-rocket">
                        <path d="M156.6 384.9L125.7 353.1C117.2 345.5 114.2 333.1 117.1 321.8C120.1 312.9 124.1 301.3 129.8 288H24C15.38 288 7.414 283.4 3.146 275.9C-1.123 268.4-1.042 259.2 3.357 251.8L55.83 163.3C68.79 141.4 92.33 127.1 117.8 127.1H200C202.4 124 204.8 120.3 207.2 116.7C289.1-4.07 411.1-8.142 483.9 5.275C495.6 7.414 504.6 16.43 506.7 28.06C520.1 100.9 516.1 222.9 395.3 304.8C391.8 307.2 387.1 309.6 384 311.1V394.2C384 419.7 370.6 443.2 348.7 456.2L260.2 508.6C252.8 513 243.6 513.1 236.1 508.9C228.6 504.6 224 496.6 224 488V380.8C209.9 385.6 197.6 389.7 188.3 392.7C177.1 396.3 164.9 393.2 156.6 384.9V384.9zM384 167.1C406.1 167.1 424 150.1 424 127.1C424 105.9 406.1 87.1 384 87.1C361.9 87.1 344 105.9 344 127.1C344 150.1 361.9 167.1 384 167.1z"></path>
                    </svg>
                    <span >INFORMACION</span>
                </a>
            </div>
        </div>`;
            //console.log(node.getData() + ' ');
  
  
            this._inordenCardR(node.getIzquierda(), idDiv);
        }
  
    }
    addalquilar(name){
        if(this.verificaralquiler(name)){
            swal("error","La pelicula ya fue alquilada","error")
            return false;
      
        }else{
          const newNode = new alquilados(name,true)
          if(this.head){
       
            newNode.next = this.head;
            this.head.prev= newNode;
            this.head = newNode;
          }else{
            this.head = newNode;
            this.tail = newNode;
          }
          swal("Exito","La pelicula fue alquilada con exito","success");
    
        }



          
        }

        verificaralquiler(name){
            let current = this.head;
            while(current != null){
              if(current.pelicula == name){
                return true;
              }else{
                current = current.next;
              }
            }
            return false;
        }

    }
  
  
  
    



//ARBOL BINARIO

class Arbol{

  constructor(contenido){

      this.contenido = contenido;
      this.left = null;
      this.right = null
  }
  //GETTERS Y SETTERS
  //del contenido y de derecha o izquierda

  getContenido(){
      return this.contenido;
  }
  getLeft(){
      return this.left;
  }
  getRight(){
      return this.right;
  }

  setContenido(contenido){
      this.contenido = contenido;
  }
  setLeft(left){
      this.left = left;
  }
  setRight(right){
      this.right = right;
  }
}
class ArbolBinario{

  constructor(){

      this.head = null;
      this.graphviz = ''; 

  }


  add(contenido){

      if(this.head== null){//si la cabeza esta null agrega el primer dato

          let newNode = new Arbol(contenido);
          this.head = newNode;
      }else{

          this._add(this.head, contenido); // si no mandamos a llamar el metodo para ir llenando el metodo de izquierda a derecha
      }


  }

  _add(node, contenido){

      if(contenido.dni < node.getContenido().dni){// si el dato que entra es menor que el primer dato que esta en cabeza se va a la izquierda

          if(node.getLeft() == null){ 
              let newNode =  new Arbol(contenido);
              node.setLeft(newNode);

          }else{
              this._add(node.getLeft(), contenido);
          }


      }else if(contenido.dni > node.getContenido().dni){ // si el dato es mayor hace lo inverso que el anterior paso

          if(node.getRight() == null){
              let newNode =  new Arbol(contenido);
              node.setRight(newNode);

          }else{
              this._add(node.getRight(), contenido);

          }

      }else{

          console.log('dato igual, no se agrega')
      }
  }
  //Graphviz
  graph(idDiv){

      this.graphviz = '';
      this.graphviz =         'digraph SimpleList{\nnode[shape= box, fillcolor="#FFFFFF", style= filled];\nbgcolor = "  #00ccff ";\nranksep = 0.5;\nnodesep = 0.5;\nsubgraph cluster_A{\nlabel = "Actores";\nbgcolor = "  #00ffad ";\nfontcolor ="black ";\nfontsize = 30;\n\n ';

      this.preordenGraph();

      this.graphviz += '}\n}';


      let id = '#'+idDiv;

      d3.select(id).graphviz()
          
          .width(2000)
          .height(1500)
          .zoom(true)
          .fit(true)
          .renderDot(this.graphviz)

  }

  preordenGraph(){

      if(this.head == null){

          console.log('No se ha insertado nada en el BSTree.');
      }else{

          this._preordenGraph(this.head);
      }
  }

  _preordenGraph(node){

      if(node != null){
 //comenzamos con el lado izquierdo ya es es preodrden
          if(node.getLeft() != null){

              this.graphviz += node.getContenido().dni+ '[label="' + node.getContenido().nombre_actor+ '"];\n';
              this.graphviz += node.getLeft().getContenido().dni + '[label="' + node.getLeft().getContenido().nombre_actor+ '"];\n';
              this.graphviz += node.getContenido().dni + ' -> ' + node.getLeft().getContenido().dni+ '\n';
          }
//terminamos con el derecho agregando los label en cada corrida que pasa 
          if(node.getRight() != null){
              
              this.graphviz += node.getContenido().dni + '[label="' + node.getContenido().nombre_actor+ '"];\n';
              this.graphviz += node.getRight().getContenido().dni + '[label="' + node.getRight().getContenido().nombre_actor+ '"];\n';
              this.graphviz += node.getContenido().dni + ' -> ' + node.getRight().getContenido().dni + '\n';
          }
          this._preordenGraph(node.getLeft());
          this._preordenGraph(node.getRight());
      }else{
        console.log("no existen datos")
      }


  }

  //Cards

  //Inorden
  inordenCard(idDiv){

      if(this.root == null){

          console.log('No se ha insertado nada en el BSTree.');
      }else{

          this._inordenCard(this.root, idDiv);
      }
  }

  _inordenCard(node, idDiv){

      if(node != null){

          this._inordenCard(node.getLeft(), idDiv);

          //
          
          let card = document.querySelector(idDiv);
          

          let newDiv = document.createElement("div");
          card.innerHTML += `
          <div class="card" id="cardsActorsUser">
              <div class="card-body">

                  <div id="movieName">
                      <img src="https://cdn-icons-png.flaticon.com/512/475/475283.png" id="imageP">
                      <h4>${node.getData().nombre_actor}</h4>

                  </div>  

                  <div id="description">
                      <h5 class="card-title">Descripción</h5>
                      <p class="card-text">${node.getData().descripcion}</p>

                  </div>
              </div>
          </div>`;

          //

          this._inordenCard(node.getRight(), idDiv);
      }

  }

  //Preorden
  preordenCard(idDiv){

      if(this.root == null){

          console.log('No se ha insertado nada en el BSTree.');
      }else{

          this._preordenCard(this.root, idDiv);
      }
  }

  _preordenCard(node, idDiv){

      if(node != null){

          //
          
          let card = document.querySelector(idDiv);
          

          let newDiv = document.createElement("div");
          card.innerHTML += `
          <div class="card" id="cardsActorsUser">
              <div class="card-body">

                  <div id="movieName">
                      <img src="https://cdn-icons-png.flaticon.com/512/475/475283.png" id="imageP">
                      <h4>${node.getData().nombre_actor}</h4>

                  </div>  

                  <div id="description">
                      <h5 class="card-title">Descripción</h5>
                      <p class="card-text">${node.getData().descripcion}</p>

                  </div>
              </div>
          </div>`;

          //
          this._preordenCard(node.getLeft(), idDiv);
          this._preordenCard(node.getRight(), idDiv);
      }


  }

  //PostOrden
  postordenCard(idDiv){

      if(this.root == null){

          console.log('No se ha insertado nada en el BSTree.');
      }else{

          this._postordenCard(this.root, idDiv);
      }
  }

  _postordenCard(node, idDiv){

      if(node != null){

          this._postordenCard(node.getLeft(), idDiv);
          this._postordenCard(node.getRight(), idDiv);
          //
          
          let card = document.querySelector(idDiv);
          

          let newDiv = document.createElement("div");
          card.innerHTML += `
          <div class="card" id="cardsActorsUser">
              <div class="card-body">

                  <div id="movieName">
                      <img src="https://cdn-icons-png.flaticon.com/512/475/475283.png" id="imageP">
                      <h4>${node.getData().nombre_actor}</h4>

                  </div>  

                  <div id="description">
                      <h5 class="card-title">Descripción</h5>
                      <p class="card-text">${node.getData().descripcion}</p>

                  </div>
              </div>
          </div>`;

          //
          
      }


  }
}
//------------------------------------------------------------------------

 //LISTA ENLAZADA PARA CLIENTES
 class Cliente {
    constructor(dpi, name, username, correo, contraseña, telefono, next) {
      this.dpi = dpi;
      this.name = name;
      this.username = username;
      this.correo = correo;
      this.contraseña= contraseña;
      this.telefono = telefono;
      this.next = next;
    }
  }
  
  class listaenlazada {
    constructor() {
      this.head = null;
      this.size = 0;
    }
    add(dpi1, name1, username1, correo1, contraseña1, telefono1) {
      const Nodo = new Cliente(
        dpi1,
        name1,
        username1,
        correo1,
        contraseña1,
        telefono1
      );
      if (!this.head) {
        this.head = Nodo;
      } else {
        let registro = this.head;
        while (registro.next) {
          registro = registro.next;
        }
        registro.next = Nodo;
      }
      this.size++;
      swal(
        "GUARDADO",
        "Cliente Cargado Correctamente" + " " + "Numero de Clientes: " + this.size,
        "success"
      );
    }
    login_us(user, passw) {
      if (!this.size) {
        swal("Error", "NO HAY USUARIOS", "error");
        return true;
      } else {
        let recorrido = this.head;
        while (recorrido) {
            if (user == recorrido.username && passw == recorrido.contraseña) {
              document.getElementById("VENTANA-USUARIO").style.display = "grid";
              document.getElementById("LOGIN").style.display = "none";
            
              return "dato enocntrado";
            } else {
              recorrido = recorrido.next;
            }
            if (!recorrido) {
              swal("Error", "USUARIO NO ENCONTRADO", "error");
              return "error";
            }
         
        }
      }
   
    }
  
    graph(idDiv) {

      let graphviz =
        'digraph SimpleList{\nnode[shape= box, fillcolor="#FFFFFF", style= filled];\nbgcolor = "  #00ccff ";\nranksep = 0.5;\nnodesep = 0.5;\nsubgraph cluster_A{\nlabel = "Clientes";\nbgcolor = "  #00ffad ";\nfontcolor ="black ";\nfontsize = 30;\n\n ';
      let current = this.head;
      let i = 1;
      while (current != null) {
        graphviz += "cliente" + i + '[label="' + current.name + '"];\n';
        i++;
        current = current.next;
      }
      graphviz += "\n";
  

      current = this.head;
      i = 1;
      while (current != null) {
        // aqui de igual manera hasta que sea null y agragemos el indice
        if (current.next != null) {
          graphviz += "cliente" + i + " -> cliente" + (i + 1) + "\n";
        }
        i++;
        current = current.next;
      }
  
      graphviz += "\n";
  

  
      current = this.head.next;
      i = 1;
      graphviz += "{rank = same; cliente" + i;
      i++;
      while (current != null) {
        // en esta parte agreagamos el valor de cliente con la posicion i
        graphviz += "; cliente" + i;
        i++;
        current = current.next;
      }
  
      graphviz += "};\n\n}\n}";
      console.log(graphviz);
      let id = "#" + idDiv;
      d3.select(id)
        .graphviz()
  
        .width(2000)
        .height(1500)
        .zoom(true)
        .fit(true)
        
        .renderDot(graphviz);

      

    


    
        

      
    }
  }



  //--------------------------


//VARIBLES----------------------------------------------------------------

const admin = {
    dpi: 2354168452525,
    nombre_completo: "Oscar Armin",
    nombre_usuario: "EDD",
    contrasenia: "12345678",
    correo:"ingenieira@usac.com",
    telefono: 12345678,
  };
let clientes = new listaenlazada();
let actors = new ArbolBinario();
let peliculas = new ArbolAVL();
let peliculas2 = new ArbolAVL2();

let  graphviz =""
let comentarios = [];

  //--------------------------------------------------------



 //INGRESO DE ADMINISTRADOR-----------
function loginadmin(){
    let user = document.getElementById("usuario").value;
    let password = document.getElementById("password").value;
    let check = document.getElementById("check1").checked;
    if (user == "" || password == "") {
        swal("Oops!", "LLENE TODOS LOS CAMPOS", "error");
      } else {
        if(check){
            if(user == admin.nombre_usuario && password == admin.contrasenia){
                goAdmin();
                document.getElementById("usuario").value = "";
                document.getElementById("password").value = "";
                document.getElementById("check1").checked ="";         
            }else{
                swal("Oops!", "ADMINISTRADOR ERRONEO", "error");
            }
        }else{ 
            clientes.login_us(user,password);
        }
      }
}
//---------------------------------
// FUNCIONAMIENTO CLIENTES

//cargar CLIENTES
function cargar_clientes(e) {
  var archivo = e.target.files[0];
  document.getElementById("fichero-usuarios").files[0];

  if (!archivo) {
    return;
  }
  let lector = new FileReader();
  lector.onload = function (e) {
    let contenido = e.target.result;

    const _clients = JSON.parse(contenido);

    for (const i in _clients) {
      let client1 = _clients[i];
      clientes.add(
        client1.dpi,
        client1.nombre_completo,
        client1.nombre_usuario,
        client1.correo,
        client1.contrasenia,
        client1.telefono
      );
    }
  };
  lector.readAsText(archivo);
}
document
  .getElementById("fichero-usuarios")
  .addEventListener("change", cargar_clientes, false);

//GRAFO CLIENTES

function grafoclientes(){
  clientes.graph("showlist");
  document.getElementById("showlist").style.display="grid";
  document.getElementById("showactores").style.display="none";
  document.getElementById("showpeliculas").style.display="none";

}

//CREAR CLIENTE UNO POR UNO
function create_cliente1(){
  let user = document.getElementById("usuario1").value;
  let nombre =  document.getElementById("nombre1").value;
  let correo = document.getElementById("correo1").value;
  let telefono=  document.getElementById("telefono1").value;
  let password = document.getElementById("password1").value;
  let dpi = document.getElementById("DPI1").value;
 
  if(user == "" || nombre == "" || correo == "" || telefono == ""   || password == "" || dpi ==""){
    swal("!Oops","Llene todos los campos","error")
  }else{
    clientes.add(dpi,nombre,user,correo,password,telefono);
    GOcreate();
  }

}

//DESCARGAR GRAFOCLIENTE
function downloadcliente(){


  html2canvas($('#showlist')[0]).then(function (canvas) {
      return Canvas2Image.saveAsPNG(canvas);
      $(".response").append(canvas);
  });


}
function donwloadpeliculas(){
    html2canvas($('#showpeliculas')[0]).then(function (canvas) {
        return Canvas2Image.saveAsPNG(canvas);
        $(".response").append(canvas);
    });

}
function donwloadactores(){
    html2canvas($('#showactores')[0]).then(function (canvas) {
        return Canvas2Image.saveAsPNG(canvas);
        $(".response").append(canvas);
    });

}


///FUNCIONAMIENTOS ACTOres
function Cargar_actores(e) {
  var archivo = e.target.files[0];

  if (!archivo) {
      return;
  }

  let lector = new FileReader();
  lector.onload = function(e) {
      let contenido = e.target.result;

      const _actors = JSON.parse(contenido);
     

      for (const i in _actors) {
          let actor = _actors[i];

          actors.add(actor);
          
      }

      // actors.inordenCard('#in');
      // actors.preordenCard('#pre');
      // actors.postordenCard('#post');
      
  }
  lector.readAsText(archivo);
  
}
document.getElementById("fichero-actores").addEventListener("change", Cargar_actores, false);


function grafoactores(){
  actors.graph("showactores");
  document.getElementById("showlist").style.display="none";
  document.getElementById("showactores").style.display="grid";
  document.getElementById("showpeliculas").style.display="none";

}



//_-------------------------------------

function Cargar_peliculas(e) {
  var archivo = e.target.files[0];

  if (!archivo) {
      return;
  }

  let lector = new FileReader();
  lector.onload = function(e) {
      let contenido = e.target.result;

      const _movies = JSON.parse(contenido);
     

      for (const i in _movies) {
          let movie = _movies[i];

          peliculas._add(movie);
          peliculas2._add(movie);
          
      }

  
      // peliculas.inordenCardR('#moviesUserD');
      
  }
  lector.readAsText(archivo);
  
}
document.getElementById("fichero-peliculas").addEventListener("change", Cargar_peliculas, false);

function grafopeliculas(){
  peliculas.graph1("showpeliculas");
  document.getElementById("showlist").style.display="none";
  document.getElementById("showactores").style.display="none";
  document.getElementById("showpeliculas").style.display="grid";

}

function movies2(){
    document.getElementById("botones-asdes").style.display="grid";
    document.getElementById("movies-container").style.display="flex";


}
function actors2(){
    document.getElementById("botones-asdes").style.display="none";
    document.getElementById("movies-container").style.display="none";
}

function pelis(id,nombre,precio){
    document.getElementById("container").style.display="flex";
    document.getElementById("movies-container").style.display="none";
    document.getElementById("botones-asdes").style.display="none";
    let x = document.getElementById(id).innerHTML
    swal("error"," "+x,"success");
}

function mostraras(){
    document.getElementById('movies-container').innerHTML=""
    peliculas2.inordenCard('#movies-container');
}
function mostrardes(){
    document.getElementById('movies-container').innerHTML=""
    peliculas2.inordenCardR('#movies-container');
}

function alquilar(nombre){

    peliculas2.addalquilar(nombre);
}