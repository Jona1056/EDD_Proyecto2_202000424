//------------------------------------------------------------------
// FUNCIONES PARA PASAR DE OTRAS PANTALLAS A OTRAS

function crearcuenta() {
  document.getElementById("LOGIN").style.display = "none";
  document.getElementById("crearusuario").style.display = "grid";
  document.getElementById("usuario").value = "";
  document.getElementById("password").value = "";
  document.getElementById("check1").checked = "";
}

function Home() {
  document.getElementById("LOGIN").style.display = "grid";
  document.getElementById("crearusuario").style.display = "none";
}

function GOcreate() {
  document.getElementById("LOGIN").style.display = "grid";
  document.getElementById("crearusuario").style.display = "none";
}
function goAdmin() {
  document.getElementById("LOGIN").style.display = "none";
  document.getElementById("admin").style.display = "grid";
}
function Back() {
  document.getElementById("LOGIN").style.display = "grid";
  document.getElementById("admin").style.display = "none";
}

function Back2() {
  document.getElementById("LOGIN").style.display = "grid";
  document.getElementById("VENTANA-USUARIO").style.display = "none";
  document.getElementById("usuario").value = "";
  document.getElementById("password").value = "";
  document.getElementById("check1").checked = "";
}
class comentario {
  constructor(usuario, comentario1) {
    this.usuario = usuario;
    this.comentario1 = comentario1;
    this.next = null;
  }
}

//ARBOL AVL DE BUSQUEDA
class NodoAVL {
  constructor(data) {
    this.data = data;
    this.altura = 0;
    this.izquierda = null;
    this.derecha = null;
    this.comentario = new comentario();
    this.next = null;
  }

  //Getters
  getData() {
    return this.data;
  }

  getIzquierda() {
    return this.izquierda;
  }

  getDerecha() {
    return this.derecha;
  }

  getAltura() {
    return this.altura;
  }

  //Setters
  setData(data) {
    this.data = data;
  }

  setIzquierda(izquierda) {
    this.izquierda = izquierda;
  }

  setDerecha(derecha) {
    this.derecha = derecha;
  }

  setAltura(altura) {
    this.altura = altura;
  }
}

class ArbolAVL {
  constructor() {
    this.raiz = null;
    this.grapho = "";
  }
  //OBTENER ALTURA DEL NODO
  getAltura2(node) {
    if (node == null) {
      return -1;
    } else {
      return node.getAltura();
    }
  }

  //ROTACION SIMPLE A LA IZQUIERDA
  rotacionizquierda(node) {
    let temp = node.getIzquierda(); //guardamos el nodo que viene obtenemos su izquierdo
    node.setIzquierda(temp.getDerecha()); //al nodo que viene a la izquierda le mandamos el dato del temp derecha
    temp.setDerecha(node); // y a la derecha le mandamos el nodo que viene para hacer el cambio
    node.setAltura(
      Math.max(
        this.getAltura2(node.getIzquierda()),
        this.getAltura2(node.getDerecha())
      ) + 1
    ); //mandamos a obtener la nueva altura
    temp.setAltura(
      Math.max(
        this.getAltura2(temp.getIzquierda()),
        this.getAltura2(temp.getDerecha())
      ) + 1
    );

    return temp;
  }

  //Simple Rotation Right
  rotacionderecha(node) {
    //rotacion derecha es igual solo que inverso
    let temp = node.getDerecha();
    node.setDerecha(temp.getIzquierda());
    temp.setIzquierda(node);
    node.setAltura(
      Math.max(
        this.getAltura2(node.getIzquierda()),
        this.getAltura2(node.getDerecha())
      ) + 1
    );
    temp.setAltura(
      Math.max(
        this.getAltura2(temp.getIzquierda()),
        this.getAltura2(temp.getDerecha())
      ) + 1
    ); //Math.max retorna el valor mas alto entre dos

    return temp;
  }

  doblerotacionizquierda(node) {
    let temp;
    node.setIzquierda(this.rotacionderecha(node.getIzquierda())); // el nodo que viene le setiamos al lado izquierdo una rotacion derecha con el lado izqueirdo
    temp = this.rotacionizquierda(node);
    return temp;
  }

  doblerotacionderecha(node) {
    let temp;
    node.setDerecha(this.rotacionizquierda(node.getDerecha()));
    temp = this.rotacionderecha(node);

    return temp;
  }

  add(Nodo1, node) {
    let newNode = node;
    if (Nodo1.getData().id_pelicula < node.getData().id_pelicula) {
      // si el nodo que viene es menor al nodo raiz

      if (node.getIzquierda() == null) {
        node.setIzquierda(Nodo1); // si el nodo izquierda es nulo agregamos al primer nodo izquierda
      } else {
        // de lo contrario hacemos lo siguiente
        node.setIzquierda(this.add(Nodo1, node.getIzquierda())); //mandamos a llamar la misma funcion para ver si es derecha o izquierda

        if (
          this.getAltura2(node.getIzquierda()) -
            this.getAltura2(node.getDerecha()) ==
          2
        ) {
          if (
            Nodo1.getData().id_pelicula <
            node.getIzquierda().getData().id_pelicula
          ) {
            newNode = this.rotacionizquierda(node);
          } else {
            newNode = this.doblerotacionizquierda(node);
          }
        }
      }
    } else if (Nodo1.getData().id_pelicula > node.getData().id_pelicula) {
      if (node.getDerecha() == null) {
        node.setDerecha(Nodo1);
      } else {
        node.setDerecha(this.add(Nodo1, node.getDerecha()));

        if (
          this.getAltura2(node.getDerecha()) -
            this.getAltura2(node.getIzquierda()) ==
          2
        ) {
          if (
            Nodo1.getData().id_pelicula >
            node.getDerecha().getData().id_pelicula
          ) {
            newNode = this.rotacionderecha(node);
          } else {
            newNode = this.doblerotacionderecha(node);
          }
        }
      }
    } else {
      console.log("Insercción fallida por duplicación");
    }

    if (node.getIzquierda() == null && node.getDerecha() != null) {
      node.setAltura(node.getDerecha().getAltura() + 1);
    } else if (node.getIzquierda() != null && node.getDerecha() == null) {
      node.setAltura(node.getIzquierda().getAltura() + 1);
    } else {
      node.setAltura(
        Math.max(
          this.getAltura2(node.getIzquierda()),
          this.getAltura2(node.getDerecha())
        ) + 1
      );
    }

    return newNode;
  }

  _add(data) {
    let newNode = new NodoAVL(data);
    if (this.raiz == null) {
      this.raiz = newNode;
    } else {
      this.raiz = this.add(newNode, this.raiz);
    }
  }
  //Graphviz
  graph1(idDiv) {
    this.grapho = "";
    this.grapho =
      'digraph SimpleList{\nnode[shape= box, fillcolor="#FFFFFF", style= filled];\nbgcolor = "  #00ccff ";\nranksep = 0.5;\nnodesep = 0.5;\nsubgraph cluster_A{\nlabel = "Peliculas";\nbgcolor = "  #00ffad ";\nfontcolor ="black ";\nfontsize = 30;\n\n ';

    this.preordenGraph();

    this.grapho += "}\n}";

    let id = "#" + idDiv;

    console.log(this.grapho);

    d3.select(id)
      .graphviz()
      .width(2000)
      .height(1500)
      .zoom(true)
      .fit(true)
      .renderDot(this.grapho);
  }

  preordenGraph() {
    if (this.raiz == null) {
      console.log("No se ha insertado nada en el BSTree.");
    } else {
      this._preordenGraph(this.raiz);
    }
  }

  _preordenGraph(node) {
    if (node != null) {
      if (node.getIzquierda() != null) {
        this.grapho +=
          node.getData().id_pelicula +
          '[label="' +
          node.getData().nombre_pelicula +
          '"];\n';
        this.grapho +=
          node.getIzquierda().getData().id_pelicula +
          '[label="' +
          node.getIzquierda().getData().nombre_pelicula +
          '"];\n';
        this.grapho +=
          node.getData().id_pelicula +
          " -> " +
          node.getIzquierda().getData().id_pelicula +
          ";\n";
      }
      if (node.getDerecha() != null) {
        this.grapho +=
          node.getData().id_pelicula +
          '[label="' +
          node.getData().nombre_pelicula +
          '"];\n';
        this.grapho +=
          node.getDerecha().getData().id_pelicula +
          '[label="' +
          node.getDerecha().getData().nombre_pelicula +
          '"];\n';
        this.grapho +=
          node.getData().id_pelicula +
          " -> " +
          node.getDerecha().getData().id_pelicula +
          "\n";
      }
      this._preordenGraph(node.getIzquierda());
      this._preordenGraph(node.getDerecha());
    }
  }
}

//ARBOL AVL DE BUSQUEDA
class alquilados {
  constructor(pelicula, alquilada) {
    this.pelicula = pelicula;
    this.alquilada = alquilada;
    this.next = null;
    this.prev = null;
  }
}
class star {
  constructor(pelicula, estrella) {
    this.pelicula = pelicula;
    this.estrellas = estrella;
    this.comentario = new comentario();
    this.next = null;
    this.prev = null;
  }
}
class NodoAVL2 {
  constructor(data) {
    this.data = data;
    this.altura = 0;
    this.izquierda = null;
    this.derecha = null;

    this.next = null;
    this.puntuacion = 0;
  }

  //Getters
  getData() {
    return this.data;
  }
  getPuntuacion() {
    return this.puntuacion;
  }

  getIzquierda() {
    return this.izquierda;
  }

  getDerecha() {
    return this.derecha;
  }

  getAltura() {
    return this.altura;
  }

  //Setters
  setData(data) {
    this.data = data;
  }
  setPuntuacion(punteo) {
    this.puntuacion = punteo;
  }

  setIzquierda(izquierda) {
    this.izquierda = izquierda;
  }

  setDerecha(derecha) {
    this.derecha = derecha;
  }

  setAltura(altura) {
    this.altura = altura;
  }
}

class ArbolAVL2 {
  constructor() {
    this.raiz = null;
    this.grapho = "";
    this.head = null;
    this.tail = null;
    this.star1 = null;
    this.star2 = null;
  }

  //search
  search(data) {
    if (this.raiz == null) {
      return null;
    } else if (data < this.raiz.getData().nombre_pelicula) {
      return this._search(data, this.raiz.getIzquierda());
    } else if (data > this.raiz.getData().nombre_pelicula) {
      return this._search(data, this.raiz.getDerecha());
    } else {
      return this.raiz.getData();
    }
  }

  _search(data, node) {
    if (data < node.getData().nombre_pelicula) {
      return this._search(data, node.getIzquierda());
    } else if (data > node.getData().nombre_pelicula) {
      return this._search(data, node.getDerecha());
    } else if (node == null) {
      return null;
    } else {
      return node.getData();
    }
  }

  //OBTENER ALTURA DEL NODO
  getAltura2(node) {
    if (node == null) {
      return -1;
    } else {
      return node.getAltura();
    }
  }

  //ROTACION SIMPLE A LA IZQUIERDA
  rotacionizquierda(node) {
    let temp = node.getIzquierda(); //guardamos el nodo que viene obtenemos su izquierdo
    node.setIzquierda(temp.getDerecha()); //al nodo que viene a la izquierda le mandamos el dato del temp derecha
    temp.setDerecha(node); // y a la derecha le mandamos el nodo que viene para hacer el cambio
    node.setAltura(
      Math.max(
        this.getAltura2(node.getIzquierda()),
        this.getAltura2(node.getDerecha())
      ) + 1
    ); //mandamos a obtener la nueva altura
    temp.setAltura(
      Math.max(
        this.getAltura2(temp.getIzquierda()),
        this.getAltura2(temp.getDerecha())
      ) + 1
    );

    return temp;
  }

  //Simple Rotation Right
  rotacionderecha(node) {
    //rotacion derecha es igual solo que inverso
    let temp = node.getDerecha();
    node.setDerecha(temp.getIzquierda());
    temp.setIzquierda(node);
    node.setAltura(
      Math.max(
        this.getAltura2(node.getIzquierda()),
        this.getAltura2(node.getDerecha())
      ) + 1
    );
    temp.setAltura(
      Math.max(
        this.getAltura2(temp.getIzquierda()),
        this.getAltura2(temp.getDerecha())
      ) + 1
    ); //Math.max retorna el valor mas alto entre dos

    return temp;
  }

  doblerotacionizquierda(node) {
    let temp;
    node.setIzquierda(this.rotacionderecha(node.getIzquierda())); // el nodo que viene le setiamos al lado izquierdo una rotacion derecha con el lado izqueirdo
    temp = this.rotacionizquierda(node);
    return temp;
  }

  doblerotacionderecha(node) {
    let temp;
    node.setDerecha(this.rotacionizquierda(node.getDerecha()));
    temp = this.rotacionderecha(node);

    return temp;
  }

  add(Nodo1, node) {
    let newNode = node;
    if (Nodo1.getData().nombre_pelicula < node.getData().nombre_pelicula) {
      // si el nodo que viene es menor al nodo raiz

      if (node.getIzquierda() == null) {
        node.setIzquierda(Nodo1); // si el nodo izquierda es nulo agregamos al primer nodo izquierda
      } else {
        // de lo contrario hacemos lo siguiente
        node.setIzquierda(this.add(Nodo1, node.getIzquierda())); //mandamos a llamar la misma funcion para ver si es derecha o izquierda

        if (
          this.getAltura2(node.getIzquierda()) -
            this.getAltura2(node.getDerecha()) ==
          2
        ) {
          if (
            Nodo1.getData().nombre_pelicula <
            node.getIzquierda().getData().nombre_pelicula
          ) {
            newNode = this.rotacionizquierda(node);
          } else {
            newNode = this.doblerotacionizquierda(node);
          }
        }
      }
    } else if (
      Nodo1.getData().nombre_pelicula > node.getData().nombre_pelicula
    ) {
      if (node.getDerecha() == null) {
        node.setDerecha(Nodo1);
      } else {
        node.setDerecha(this.add(Nodo1, node.getDerecha()));

        if (
          this.getAltura2(node.getDerecha()) -
            this.getAltura2(node.getIzquierda()) ==
          2
        ) {
          if (
            Nodo1.getData().nombre_pelicula >
            node.getDerecha().getData().nombre_pelicula
          ) {
            newNode = this.rotacionderecha(node);
          } else {
            newNode = this.doblerotacionderecha(node);
          }
        }
      }
    } else {
      console.log("Insercción fallida por duplicación");
    }

    if (node.getIzquierda() == null && node.getDerecha() != null) {
      node.setAltura(node.getDerecha().getAltura() + 1);
    } else if (node.getIzquierda() != null && node.getDerecha() == null) {
      node.setAltura(node.getIzquierda().getAltura() + 1);
    } else {
      node.setAltura(
        Math.max(
          this.getAltura2(node.getIzquierda()),
          this.getAltura2(node.getDerecha())
        ) + 1
      );
    }

    return newNode;
  }

  _add(data) {
    let newNode = new NodoAVL2(data);
    if (this.raiz == null) {
      this.raiz = newNode;
    } else {
      this.raiz = this.add(newNode, this.raiz);
    }
  }

  //Graphviz
  graph1(idDiv) {
    this.grapho = "";
    this.grapho =
      'digraph SimpleList{\nnode[shape= box, fillcolor="#FFFFFF", style= filled];\nbgcolor = "  #00ccff ";\nranksep = 0.5;\nnodesep = 0.5;\nsubgraph cluster_A{\nlabel = "Peliculas";\nbgcolor = "  #00ffad ";\nfontcolor ="black ";\nfontsize = 30;\n\n ';

    this.GRAFOPRE();

    this.grapho += "}\n}";

    let id = "#" + idDiv;

    console.log(this.grapho);

    d3.select(id)
      .graphviz()
      .width(2000)
      .height(1500)
      .zoom(true)
      .fit(true)
      .renderDot(this.grapho);
  }

  GRAFOPRE() {
    if (this.raiz == null) {
      console.log("No se ha insertado nada en el BSTree.");
    } else {
      this.GRAFOPRE1(this.raiz);
    }
  }

  GRAFOPRE1(node) {
    if (node != null) {
      if (node.getIzquierda() != null) {
        this.grapho +=
          node.getData().id_pelicula +
          '[label="' +
          node.getData().nombre_pelicula +
          '"];\n';
        this.grapho +=
          node.getIzquierda().getData().id_pelicula +
          '[label="' +
          node.getIzquierda().getData().nombre_pelicula +
          '"];\n';
        this.grapho +=
          node.getData().id_pelicula +
          " -> " +
          node.getIzquierda().getData().id_pelicula +
          ";\n";
      }
      if (node.getDerecha() != null) {
        this.grapho +=
          node.getData().id_pelicula +
          '[label="' +
          node.getData().nombre_pelicula +
          '"];\n';
        this.grapho +=
          node.getDerecha().getData().id_pelicula +
          '[label="' +
          node.getDerecha().getData().nombre_pelicula +
          '"];\n';
        this.grapho +=
          node.getData().id_pelicula +
          " -> " +
          node.getDerecha().getData().id_pelicula +
          "\n";
      }
      this.GRAFOPRE1(node.getIzquierda());
      this.GRAFOPRE1(node.getDerecha());
    }
  }

  //inorden Cards

  ORDENCARD(idDiv) {
    if (this.raiz == null) {
    } else {
      this.ORDENCARD2(this.raiz, idDiv);
    }
  }

  ORDENCARD2(node, idDiv) {
    if (node != null) {
      this.ORDENCARD2(node.getIzquierda(), idDiv);

      //
      let card = document.querySelector(idDiv);

      card.innerHTML += `
  
  
            
            <div class="plan-card">
            <h2>${node.getData().nombre_pelicula}</h2>
            <span id="${node.getData().id_pelicula}">${
        node.getData().descripcion
      }</span>
            <div class="etiquet-price">
                <p>${node.getData().precion_Q}</p>
                <div></div>
            </div>
            <div class="button-get-plan">
            <a id="alq" href="#"  onclick="alquilar('${
              node.getData().nombre_pelicula
            }')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="svg-rocket">
                    <path d="M18.641,4.818H1.444c-0.475,0-0.86,0.385-0.86,0.86v8.6c0,0.474,0.385,0.859,0.86,0.859h17.197c0.475,0,0.859-0.386,0.859-0.859v-8.6C19.5,5.203,19.115,4.818,18.641,4.818 M1.874,5.678c0.237,0,0.43,0.192,0.43,0.431c0,0.237-0.193,0.43-0.43,0.43c-0.238,0-0.43-0.192-0.43-0.43C1.444,5.87,1.636,5.678,1.874,5.678 M1.874,14.277c-0.238,0-0.43-0.193-0.43-0.431s0.192-0.43,0.43-0.43c0.237,0,0.43,0.192,0.43,0.43S2.111,14.277,1.874,14.277 M18.21,14.277c-0.237,0-0.43-0.193-0.43-0.431s0.192-0.43,0.43-0.43c0.238,0,0.431,0.192,0.431,0.43S18.448,14.277,18.21,14.277 M18.641,12.636c-0.135-0.048-0.279-0.079-0.431-0.079c-0.712,0-1.289,0.578-1.289,1.29c0,0.151,0.03,0.295,0.078,0.431H3.084c0.048-0.136,0.079-0.279,0.079-0.431c0-0.712-0.578-1.29-1.29-1.29c-0.152,0-0.295,0.031-0.43,0.079V7.319c0.135,0.048,0.278,0.08,0.43,0.08c0.711,0,1.29-0.578,1.29-1.29c0-0.152-0.031-0.295-0.079-0.431h13.915c-0.048,0.136-0.078,0.279-0.078,0.431c0,0.712,0.577,1.29,1.289,1.29c0.151,0,0.296-0.031,0.431-0.08V12.636z M18.21,6.538c-0.237,0-0.43-0.192-0.43-0.43c0-0.238,0.192-0.431,0.43-0.431c0.238,0,0.431,0.192,0.431,0.431C18.641,6.346,18.448,6.538,18.21,6.538 M15.631,12.557h-0.86c-0.236,0-0.43,0.193-0.43,0.431s0.193,0.43,0.43,0.43h0.86c0.238,0,0.43-0.192,0.43-0.43S15.869,12.557,15.631,12.557 M5.313,6.538h-0.86c-0.237,0-0.43,0.192-0.43,0.43c0,0.237,0.193,0.43,0.43,0.43h0.86c0.237,0,0.43-0.193,0.43-0.43C5.743,6.73,5.55,6.538,5.313,6.538 M10.042,6.538c-1.899,0-3.439,1.54-3.439,3.439c0,1.9,1.54,3.44,3.439,3.44s3.439-1.54,3.439-3.44C13.481,8.078,11.941,6.538,10.042,6.538M10.969,9.359l-0.164,0.379H9.26C9.256,9.758,9.254,9.785,9.254,9.82v0.136c0,0.103,0.002,0.164,0.006,0.184h1.456l-0.158,0.373H9.292c0.05,0.319,0.157,0.57,0.321,0.751c0.189,0.224,0.446,0.336,0.77,0.336c0.21,0,0.384-0.03,0.523-0.094c0.126-0.06,0.269-0.158,0.428-0.296v0.656c-0.285,0.174-0.603,0.261-0.951,0.261c-0.563,0-1.003-0.162-1.318-0.484c-0.273-0.28-0.443-0.657-0.511-1.13H8.068l0.17-0.373h0.284c-0.004-0.027-0.007-0.057-0.009-0.088C8.511,10.02,8.51,9.986,8.51,9.951c0-0.027,0-0.059,0.003-0.094C8.515,9.82,8.518,9.781,8.522,9.738H8.068l0.165-0.379h0.333C8.671,8.906,8.863,8.547,9.14,8.283c0.324-0.304,0.737-0.456,1.243-0.456c0.365,0,0.74,0.123,1.122,0.367l-0.29,0.538c-0.269-0.252-0.563-0.378-0.883-0.378c-0.282,0-0.517,0.104-0.706,0.313c-0.16,0.185-0.267,0.416-0.322,0.691H10.969z"></path>
                </svg>
                <span >Alquilar</span>
            </a>
        </div>
            <div class="button-get-plan">
                <a href="#"  onclick="pelis('${node.getData().id_pelicula}','${
        node.getData().nombre_pelicula
      }','${node.getData().precion_Q}','${node.getData().puntuacion_star}')">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="svg-rocket">
                        <path d="M4.317,16.411c-1.423-1.423-1.423-3.737,0-5.16l8.075-7.984c0.994-0.996,2.613-0.996,3.611,0.001C17,4.264,17,5.884,16.004,6.88l-8.075,7.984c-0.568,0.568-1.493,0.569-2.063-0.001c-0.569-0.569-0.569-1.495,0-2.064L9.93,8.828c0.145-0.141,0.376-0.139,0.517,0.005c0.141,0.144,0.139,0.375-0.006,0.516l-4.062,3.968c-0.282,0.282-0.282,0.745,0.003,1.03c0.285,0.284,0.747,0.284,1.032,0l8.074-7.985c0.711-0.71,0.711-1.868-0.002-2.579c-0.711-0.712-1.867-0.712-2.58,0l-8.074,7.984c-1.137,1.137-1.137,2.988,0.001,4.127c1.14,1.14,2.989,1.14,4.129,0l6.989-6.896c0.143-0.142,0.375-0.14,0.516,0.003c0.143,0.143,0.141,0.374-0.002,0.516l-6.988,6.895C8.054,17.836,5.743,17.836,4.317,16.411"></path>
                    </svg>
                    <span >INFORMACION</span>
                </a>
            </div>
        </div>`;

      //
      this.ORDENCARD2(node.getDerecha(), idDiv);
    }
  }
  addcomen(nombre, comentario1, USUARIO33) {
    let temporalcabeza = this.star1;

    while (temporalcabeza != null) {
      if (temporalcabeza.pelicula == nombre) {
        var nuevacancion = new comentario(USUARIO33, comentario1);
        var iniciocanciones = temporalcabeza.comentario;

        temporalcabeza.comentario = nuevacancion;

        nuevacancion.next = iniciocanciones;
      }
      temporalcabeza = temporalcabeza.next;
    }
  }
  setcoment(name) {
    let current = this.star1;
    while (current) {
      if (current.pelicula == name) {
        let current2 = current.comentario;
        while (current2.next) {
          document.getElementById("comentarios").innerHTML += `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20 " class="svg-rocket">
                    <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
                </=>
                         <p>USUARIO:  ${current2.usuario}</p>
                         <li class="comentarios">${current2.comentario1}</li>
                    
                    `;
          current2 = current2.next;
        }
      }
      current = current.next;
    }
  }

  addstars(name, star1) {
    if (this.verificarstars(name)) {
    } else {
      const newNode = new star(name, star1);

      if (this.star1) {
        newNode.next = this.star1;
        this.star1.prev = newNode;
        this.star1 = newNode;
      } else {
        this.star1 = newNode;
        this.star2 = newNode;
      }
    }
  }
  setStar(name, star) {
    let current = this.star1;
    while (current != null) {
      if (current.pelicula == name) {
        if (star == 0) {
          current.estrellas = star;
          document.getElementById("stars").innerHTML = "✰✰✰✰✰";
          return true;
        } else if (star == 1) {
          current.estrellas = star;
          document.getElementById("stars").innerHTML = "⭐✰✰✰✰";
          return true;
        } else if (star == 2) {
          current.estrellas = star;
          document.getElementById("stars").innerHTML = "⭐⭐✰✰✰";
          return true;
        } else if (star == 3) {
          current.estrellas = star;
          document.getElementById("stars").innerHTML = "⭐⭐⭐✰✰";
          return true;
        } else if (star == 4) {
          current.estrellas = star;
          document.getElementById("stars").innerHTML = "⭐⭐⭐⭐✰";
          return true;
        } else if (star == 5) {
          current.estrellas = star;
          document.getElementById("stars").innerHTML = "⭐⭐⭐⭐⭐";
          return true;
        } else {
          document.getElementById("stars").innerHTML = "✰✰✰✰✰";
          return true;
        }
      } else {
        current = current.next;
      }
    }
    document.getElementById("stars").innerHTML = "✰✰✰✰✰";
    return false;
  }
  printstar(name) {
    let current = this.star1;
    while (current != null) {
      if (current.pelicula == name) {
        if (current.estrellas == 0) {
          document.getElementById("stars").innerHTML = "✰✰✰✰✰";
        } else if (current.estrellas == 1) {
          document.getElementById("stars").innerHTML = "⭐✰✰✰✰";
        } else if (current.estrellas == 2) {
          document.getElementById("stars").innerHTML = "⭐⭐✰✰✰";
        } else if (current.estrellas == 3) {
          document.getElementById("stars").innerHTML = "⭐⭐⭐✰✰";
        } else if (current.estrellas == 4) {
          document.getElementById("stars").innerHTML = "⭐⭐⭐⭐✰";
        } else if (current.estrellas == 5) {
          document.getElementById("stars").innerHTML = "⭐⭐⭐⭐⭐";
        }
        return true;
      } else {
        current = current.next;
      }
    }
    document.getElementById("stars").innerHTML = "✰✰✰✰✰";
    return false;
  }

  verificarstars(name) {
    let current = this.star1;
    while (current != null) {
      if (current.pelicula == name) {
        return true;
      } else {
        current = current.next;
      }
    }
    return false;
  }

  Card1(id, nombre, precio, descripcion, star, idDiv) {
    let card = document.querySelector(idDiv);

    card.innerHTML += `
  
        <div class="product-details">
        <h1>${nombre}</h1>
            <p class="information">${descripcion}</p>    
    <div class="button-get-plan">
        <a id="punt"  href="#"  onclick="punteo('${nombre}')">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20 " class="svg-rocket">
                <path d="M15.94,10.179l-2.437-0.325l1.62-7.379c0.047-0.235-0.132-0.458-0.372-0.458H5.25c-0.241,0-0.42,0.223-0.373,0.458l1.634,7.376L4.06,10.179c-0.312,0.041-0.446,0.425-0.214,0.649l2.864,2.759l-0.724,3.947c-0.058,0.315,0.277,0.554,0.559,0.401l3.457-1.916l3.456,1.916c-0.419-0.238,0.56,0.439,0.56-0.401l-0.725-3.947l2.863-2.759C16.388,10.604,16.254,10.22,15.94,10.179M10.381,2.778h3.902l-1.536,6.977L12.036,9.66l-1.655-3.546V2.778z M5.717,2.778h3.903v3.335L7.965,9.66L7.268,9.753L5.717,2.778zM12.618,13.182c-0.092,0.088-0.134,0.217-0.11,0.343l0.615,3.356l-2.938-1.629c-0.057-0.03-0.122-0.048-0.184-0.048c-0.063,0-0.128,0.018-0.185,0.048l-2.938,1.629l0.616-3.356c0.022-0.126-0.019-0.255-0.11-0.343l-2.441-2.354l3.329-0.441c0.128-0.017,0.24-0.099,0.295-0.215l1.435-3.073l1.435,3.073c0.055,0.116,0.167,0.198,0.294,0.215l3.329,0.441L12.618,13.182z"></path>
            </=>
            <span >PUNTUACION</span>
        </a>
    </div>
    <input id="star33" type="text" autocomplete="off" placeholder="Escribe tu Puntuacion (1-5)" name="text" class="input">
    <p id="stars"></p>
    <div class="button-get-plan">
        <a id="alq" href="#"  onclick="alquilar('${nombre}')">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="svg-rocket">
                <path d="M18.641,4.818H1.444c-0.475,0-0.86,0.385-0.86,0.86v8.6c0,0.474,0.385,0.859,0.86,0.859h17.197c0.475,0,0.859-0.386,0.859-0.859v-8.6C19.5,5.203,19.115,4.818,18.641,4.818 M1.874,5.678c0.237,0,0.43,0.192,0.43,0.431c0,0.237-0.193,0.43-0.43,0.43c-0.238,0-0.43-0.192-0.43-0.43C1.444,5.87,1.636,5.678,1.874,5.678 M1.874,14.277c-0.238,0-0.43-0.193-0.43-0.431s0.192-0.43,0.43-0.43c0.237,0,0.43,0.192,0.43,0.43S2.111,14.277,1.874,14.277 M18.21,14.277c-0.237,0-0.43-0.193-0.43-0.431s0.192-0.43,0.43-0.43c0.238,0,0.431,0.192,0.431,0.43S18.448,14.277,18.21,14.277 M18.641,12.636c-0.135-0.048-0.279-0.079-0.431-0.079c-0.712,0-1.289,0.578-1.289,1.29c0,0.151,0.03,0.295,0.078,0.431H3.084c0.048-0.136,0.079-0.279,0.079-0.431c0-0.712-0.578-1.29-1.29-1.29c-0.152,0-0.295,0.031-0.43,0.079V7.319c0.135,0.048,0.278,0.08,0.43,0.08c0.711,0,1.29-0.578,1.29-1.29c0-0.152-0.031-0.295-0.079-0.431h13.915c-0.048,0.136-0.078,0.279-0.078,0.431c0,0.712,0.577,1.29,1.289,1.29c0.151,0,0.296-0.031,0.431-0.08V12.636z M18.21,6.538c-0.237,0-0.43-0.192-0.43-0.43c0-0.238,0.192-0.431,0.43-0.431c0.238,0,0.431,0.192,0.431,0.431C18.641,6.346,18.448,6.538,18.21,6.538 M15.631,12.557h-0.86c-0.236,0-0.43,0.193-0.43,0.431s0.193,0.43,0.43,0.43h0.86c0.238,0,0.43-0.192,0.43-0.43S15.869,12.557,15.631,12.557 M5.313,6.538h-0.86c-0.237,0-0.43,0.192-0.43,0.43c0,0.237,0.193,0.43,0.43,0.43h0.86c0.237,0,0.43-0.193,0.43-0.43C5.743,6.73,5.55,6.538,5.313,6.538 M10.042,6.538c-1.899,0-3.439,1.54-3.439,3.439c0,1.9,1.54,3.44,3.439,3.44s3.439-1.54,3.439-3.44C13.481,8.078,11.941,6.538,10.042,6.538M10.969,9.359l-0.164,0.379H9.26C9.256,9.758,9.254,9.785,9.254,9.82v0.136c0,0.103,0.002,0.164,0.006,0.184h1.456l-0.158,0.373H9.292c0.05,0.319,0.157,0.57,0.321,0.751c0.189,0.224,0.446,0.336,0.77,0.336c0.21,0,0.384-0.03,0.523-0.094c0.126-0.06,0.269-0.158,0.428-0.296v0.656c-0.285,0.174-0.603,0.261-0.951,0.261c-0.563,0-1.003-0.162-1.318-0.484c-0.273-0.28-0.443-0.657-0.511-1.13H8.068l0.17-0.373h0.284c-0.004-0.027-0.007-0.057-0.009-0.088C8.511,10.02,8.51,9.986,8.51,9.951c0-0.027,0-0.059,0.003-0.094C8.515,9.82,8.518,9.781,8.522,9.738H8.068l0.165-0.379h0.333C8.671,8.906,8.863,8.547,9.14,8.283c0.324-0.304,0.737-0.456,1.243-0.456c0.365,0,0.74,0.123,1.122,0.367l-0.29,0.538c-0.269-0.252-0.563-0.378-0.883-0.378c-0.282,0-0.517,0.104-0.706,0.313c-0.16,0.185-0.267,0.416-0.322,0.691H10.969z"></path>
            </svg>
            <span >Alquilar Q.${precio}.00</span>
        </a>
    </div>
   
    <h2 id="title-coment" >COMENTARIOS</h2>

    <div class="contenedor33">
        <section class="contenedor-agg-com">
            <div class="imagen-usuario">
                <img src="logo.png">
            </div>
            <div class="input-com">
                <input id="nuevoComentario" type="text" placeholder="Nuevo Comentario...">
                <div id="bo" class="button-get-plan">
                    <a id="punt"  href="#"  onclick="comen('${nombre}','${id}','${precio}','${star}')">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20 " class="svg-rocket">
                            <path d="M17.659,3.681H8.468c-0.211,0-0.383,0.172-0.383,0.383v2.681H2.341c-0.21,0-0.383,0.172-0.383,0.383v6.126c0,0.211,0.172,0.383,0.383,0.383h1.532v2.298c0,0.566,0.554,0.368,0.653,0.27l2.569-2.567h4.437c0.21,0,0.383-0.172,0.383-0.383v-2.681h1.013l2.546,2.567c0.242,0.249,0.652,0.065,0.652-0.27v-2.298h1.533c0.211,0,0.383-0.172,0.383-0.382V4.063C18.042,3.853,17.87,3.681,17.659,3.681 M11.148,12.87H6.937c-0.102,0-0.199,0.04-0.27,0.113l-2.028,2.025v-1.756c0-0.211-0.172-0.383-0.383-0.383H2.724V7.51h5.361v2.68c0,0.21,0.172,0.382,0.383,0.382h2.68V12.87z M17.276,9.807h-1.533c-0.211,0-0.383,0.172-0.383,0.383v1.755L13.356,9.92c-0.07-0.073-0.169-0.113-0.27-0.113H8.851v-5.36h8.425V9.807z"></path>
                        </=>
                        <span >Comentar</span>
                    </a>
                </div>
            </div>
        </section>
    </div>
    <ul id="comentarios" class="contenedor-2">
           
    </ul>
      
    </div>      
    <div class="product-image">
        
        <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=859&q=80" alt="Omar Dsoky">
    </div>`;
  }

  inordenCardR(idDiv) {
    if (this.raiz == null) {
      console.log("No se ha insertado nada en el BSTree.");
    } else {
      this._inordenCardR(this.raiz, idDiv);
    }
  }

  _inordenCardR(node, idDiv) {
    if (node != null) {
      this._inordenCardR(node.getDerecha(), idDiv);

      //
      let card = document.querySelector(idDiv);

      card.innerHTML += `
  
  
            
            <div class="plan-card">
            <h2>${node.getData().nombre_pelicula}</h2>
            <span id="${node.getData().id_pelicula}">${
        node.getData().descripcion
      }</span>
            <div class="etiquet-price">
                <p>${node.getData().precion_Q}</p>
                <div></div>
            </div>
            <div class="button-get-plan">
            <a id="alq" href="#"  onclick="alquilar('${
              node.getData().nombre_pelicula
            }')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="svg-rocket">
                    <path d="M18.641,4.818H1.444c-0.475,0-0.86,0.385-0.86,0.86v8.6c0,0.474,0.385,0.859,0.86,0.859h17.197c0.475,0,0.859-0.386,0.859-0.859v-8.6C19.5,5.203,19.115,4.818,18.641,4.818 M1.874,5.678c0.237,0,0.43,0.192,0.43,0.431c0,0.237-0.193,0.43-0.43,0.43c-0.238,0-0.43-0.192-0.43-0.43C1.444,5.87,1.636,5.678,1.874,5.678 M1.874,14.277c-0.238,0-0.43-0.193-0.43-0.431s0.192-0.43,0.43-0.43c0.237,0,0.43,0.192,0.43,0.43S2.111,14.277,1.874,14.277 M18.21,14.277c-0.237,0-0.43-0.193-0.43-0.431s0.192-0.43,0.43-0.43c0.238,0,0.431,0.192,0.431,0.43S18.448,14.277,18.21,14.277 M18.641,12.636c-0.135-0.048-0.279-0.079-0.431-0.079c-0.712,0-1.289,0.578-1.289,1.29c0,0.151,0.03,0.295,0.078,0.431H3.084c0.048-0.136,0.079-0.279,0.079-0.431c0-0.712-0.578-1.29-1.29-1.29c-0.152,0-0.295,0.031-0.43,0.079V7.319c0.135,0.048,0.278,0.08,0.43,0.08c0.711,0,1.29-0.578,1.29-1.29c0-0.152-0.031-0.295-0.079-0.431h13.915c-0.048,0.136-0.078,0.279-0.078,0.431c0,0.712,0.577,1.29,1.289,1.29c0.151,0,0.296-0.031,0.431-0.08V12.636z M18.21,6.538c-0.237,0-0.43-0.192-0.43-0.43c0-0.238,0.192-0.431,0.43-0.431c0.238,0,0.431,0.192,0.431,0.431C18.641,6.346,18.448,6.538,18.21,6.538 M15.631,12.557h-0.86c-0.236,0-0.43,0.193-0.43,0.431s0.193,0.43,0.43,0.43h0.86c0.238,0,0.43-0.192,0.43-0.43S15.869,12.557,15.631,12.557 M5.313,6.538h-0.86c-0.237,0-0.43,0.192-0.43,0.43c0,0.237,0.193,0.43,0.43,0.43h0.86c0.237,0,0.43-0.193,0.43-0.43C5.743,6.73,5.55,6.538,5.313,6.538 M10.042,6.538c-1.899,0-3.439,1.54-3.439,3.439c0,1.9,1.54,3.44,3.439,3.44s3.439-1.54,3.439-3.44C13.481,8.078,11.941,6.538,10.042,6.538M10.969,9.359l-0.164,0.379H9.26C9.256,9.758,9.254,9.785,9.254,9.82v0.136c0,0.103,0.002,0.164,0.006,0.184h1.456l-0.158,0.373H9.292c0.05,0.319,0.157,0.57,0.321,0.751c0.189,0.224,0.446,0.336,0.77,0.336c0.21,0,0.384-0.03,0.523-0.094c0.126-0.06,0.269-0.158,0.428-0.296v0.656c-0.285,0.174-0.603,0.261-0.951,0.261c-0.563,0-1.003-0.162-1.318-0.484c-0.273-0.28-0.443-0.657-0.511-1.13H8.068l0.17-0.373h0.284c-0.004-0.027-0.007-0.057-0.009-0.088C8.511,10.02,8.51,9.986,8.51,9.951c0-0.027,0-0.059,0.003-0.094C8.515,9.82,8.518,9.781,8.522,9.738H8.068l0.165-0.379h0.333C8.671,8.906,8.863,8.547,9.14,8.283c0.324-0.304,0.737-0.456,1.243-0.456c0.365,0,0.74,0.123,1.122,0.367l-0.29,0.538c-0.269-0.252-0.563-0.378-0.883-0.378c-0.282,0-0.517,0.104-0.706,0.313c-0.16,0.185-0.267,0.416-0.322,0.691H10.969z"></path>
                </svg>
                <span >Alquilar</span>
            </a>
        </div>
            <div class="button-get-plan">
                <a href="#"  onclick="pelis('${node.getData().id_pelicula}','${
        node.getData().nombre_pelicula
      }','${node.getData().precion_Q}','${node.getData().puntuacion_star}')">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="svg-rocket">
                        <path d="M4.317,16.411c-1.423-1.423-1.423-3.737,0-5.16l8.075-7.984c0.994-0.996,2.613-0.996,3.611,0.001C17,4.264,17,5.884,16.004,6.88l-8.075,7.984c-0.568,0.568-1.493,0.569-2.063-0.001c-0.569-0.569-0.569-1.495,0-2.064L9.93,8.828c0.145-0.141,0.376-0.139,0.517,0.005c0.141,0.144,0.139,0.375-0.006,0.516l-4.062,3.968c-0.282,0.282-0.282,0.745,0.003,1.03c0.285,0.284,0.747,0.284,1.032,0l8.074-7.985c0.711-0.71,0.711-1.868-0.002-2.579c-0.711-0.712-1.867-0.712-2.58,0l-8.074,7.984c-1.137,1.137-1.137,2.988,0.001,4.127c1.14,1.14,2.989,1.14,4.129,0l6.989-6.896c0.143-0.142,0.375-0.14,0.516,0.003c0.143,0.143,0.141,0.374-0.002,0.516l-6.988,6.895C8.054,17.836,5.743,17.836,4.317,16.411"></path>
                    </svg>
                    <span >INFORMACION</span>
                </a>
            </div>
        </div>`;

      this._inordenCardR(node.getIzquierda(), idDiv);
    }
  }
  addalquilar(name) {
    if (this.verificaralquiler(name)) {
      swal("error", "La pelicula ya fue alquilada", "error");
      return false;
    } else {
      const newNode = new alquilados(name, true);
      if (this.head) {
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
      } else {
        this.head = newNode;
        this.tail = newNode;
      }
      swal("Exito", "La pelicula fue alquilada con exito", "success");
    }
  }

  verificaralquiler(name) {
    let current = this.head;
    while (current != null) {
      if (current.pelicula == name) {
        return true;
      } else {
        current = current.next;
      }
    }
    return false;
  }
}

//ARBOL BINARIO

class Arbol {
  constructor(contenido) {
    this.contenido = contenido;
    this.left = null;
    this.right = null;
  }
  //GETTERS Y SETTERS
  //del contenido y de derecha o izquierda

  getContenido() {
    return this.contenido;
  }
  getLeft() {
    return this.left;
  }
  getRight() {
    return this.right;
  }

  setContenido(contenido) {
    this.contenido = contenido;
  }
  setLeft(left) {
    this.left = left;
  }
  setRight(right) {
    this.right = right;
  }
}
class ArbolBinario {
  constructor() {
    this.head = null;
    this.graphviz = "";
  }

  add(contenido) {
    if (this.head == null) {
      //si la cabeza esta null agrega el primer dato

      let newNode = new Arbol(contenido);
      this.head = newNode;
    } else {
      this._add(this.head, contenido); // si no mandamos a llamar el metodo para ir llenando el metodo de izquierda a derecha
    }
  }

  _add(node, contenido) {
    if (contenido.dni < node.getContenido().dni) {
      // si el dato que entra es menor que el primer dato que esta en cabeza se va a la izquierda

      if (node.getLeft() == null) {
        let newNode = new Arbol(contenido);
        node.setLeft(newNode);
      } else {
        this._add(node.getLeft(), contenido);
      }
    } else if (contenido.dni > node.getContenido().dni) {
      // si el dato es mayor hace lo inverso que el anterior paso

      if (node.getRight() == null) {
        let newNode = new Arbol(contenido);
        node.setRight(newNode);
      } else {
        this._add(node.getRight(), contenido);
      }
    } else {
      console.log("dato igual, no se agrega");
    }
  }
  //Graphviz
  graph(idDiv) {
    this.graphviz = "";
    this.graphviz =
      'digraph SimpleList{\nnode[shape= box, fillcolor="#FFFFFF", style= filled];\nbgcolor = "  #00ccff ";\nranksep = 0.5;\nnodesep = 0.5;\nsubgraph cluster_A{\nlabel = "Actores";\nbgcolor = "  #00ffad ";\nfontcolor ="black ";\nfontsize = 30;\n\n ';

    this.preordenGraph();

    this.graphviz += "}\n}";

    let id = "#" + idDiv;

    d3.select(id)
      .graphviz()

      .width(2000)
      .height(1500)
      .zoom(true)
      .fit(true)
      .renderDot(this.graphviz);
  }

  preordenGraph() {
    if (this.head == null) {
      console.log("No se ha insertado nada en el BSTree.");
    } else {
      this._preordenGraph(this.head);
    }
  }

  _preordenGraph(node) {
    if (node != null) {
      //comenzamos con el lado izquierdo ya es es preodrden
      if (node.getLeft() != null) {
        this.graphviz +=
          node.getContenido().dni +
          '[label="' +
          node.getContenido().nombre_actor +
          '"];\n';
        this.graphviz +=
          node.getLeft().getContenido().dni +
          '[label="' +
          node.getLeft().getContenido().nombre_actor +
          '"];\n';
        this.graphviz +=
          node.getContenido().dni +
          " -> " +
          node.getLeft().getContenido().dni +
          "\n";
      }
      //terminamos con el derecho agregando los label en cada corrida que pasa
      if (node.getRight() != null) {
        this.graphviz +=
          node.getContenido().dni +
          '[label="' +
          node.getContenido().nombre_actor +
          '"];\n';
        this.graphviz +=
          node.getRight().getContenido().dni +
          '[label="' +
          node.getRight().getContenido().nombre_actor +
          '"];\n';
        this.graphviz +=
          node.getContenido().dni +
          " -> " +
          node.getRight().getContenido().dni +
          "\n";
      }
      this._preordenGraph(node.getLeft());
      this._preordenGraph(node.getRight());
    } else {
      console.log("no existen datos");
    }
  }

  //Cards

  //Inorden
  inordenCard(idDiv) {
    if (this.head == null) {
      console.log("No se ha insertado nada en el BSTree.");
    } else {
      this._inordenCard(this.head, idDiv);
    }
  }

  _inordenCard(node, idDiv) {
    if (node != null) {
      this._inordenCard(node.getLeft(), idDiv);

      //

      let card = document.querySelector(idDiv);

      let newDiv = document.createElement("div");
      card.innerHTML += `
          <div class="card-client">
          <div class="user-picture">
              <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path>
              </svg>
          </div>
          <p class="name-client"> ${node.getContenido().nombre_actor}
                <span>${node.getContenido().descripcion}</span> 
   
       
            
      
          </p>
          <div class="social-media">
              <a href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M8.749,9.934c0,0.247-0.202,0.449-0.449,0.449H4.257c-0.247,0-0.449-0.202-0.449-0.449S4.01,9.484,4.257,9.484H8.3C8.547,9.484,8.749,9.687,8.749,9.934 M7.402,12.627H4.257c-0.247,0-0.449,0.202-0.449,0.449s0.202,0.449,0.449,0.449h3.145c0.247,0,0.449-0.202,0.449-0.449S7.648,12.627,7.402,12.627 M8.3,6.339H4.257c-0.247,0-0.449,0.202-0.449,0.449c0,0.247,0.202,0.449,0.449,0.449H8.3c0.247,0,0.449-0.202,0.449-0.449C8.749,6.541,8.547,6.339,8.3,6.339 M18.631,4.543v10.78c0,0.248-0.202,0.45-0.449,0.45H2.011c-0.247,0-0.449-0.202-0.449-0.45V4.543c0-0.247,0.202-0.449,0.449-0.449h16.17C18.429,4.094,18.631,4.296,18.631,4.543 M17.732,4.993H2.46v9.882h15.272V4.993z M16.371,13.078c0,0.247-0.202,0.449-0.449,0.449H9.646c-0.247,0-0.449-0.202-0.449-0.449c0-1.479,0.883-2.747,2.162-3.299c-0.434-0.418-0.714-1.008-0.714-1.642c0-1.197,0.997-2.246,2.133-2.246s2.134,1.049,2.134,2.246c0,0.634-0.28,1.224-0.714,1.642C15.475,10.331,16.371,11.6,16.371,13.078M11.542,8.137c0,0.622,0.539,1.348,1.235,1.348s1.235-0.726,1.235-1.348c0-0.622-0.539-1.348-1.235-1.348S11.542,7.515,11.542,8.137 M15.435,12.629c-0.214-1.273-1.323-2.246-2.657-2.246s-2.431,0.973-2.644,2.246H15.435z"></path>
                  </svg>
                  <span class="tooltip-social">${node.getContenido().dni}</span>
              </a>
              <a href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M8.937,10.603c-0.383-0.284-0.741-0.706-0.754-0.837c0-0.223,0-0.326,0.526-0.758c0.684-0.56,1.062-1.297,1.062-2.076c0-0.672-0.188-1.273-0.512-1.71h0.286l1.58-1.196h-4.28c-1.717,0-3.222,1.348-3.222,2.885c0,1.587,1.162,2.794,2.726,2.858c-0.024,0.113-0.037,0.225-0.037,0.334c0,0.229,0.052,0.448,0.157,0.659c-1.938,0.013-3.569,1.309-3.569,2.84c0,1.375,1.571,2.373,3.735,2.373c2.338,0,3.599-1.463,3.599-2.84C10.233,11.99,9.882,11.303,8.937,10.603 M5.443,6.864C5.371,6.291,5.491,5.761,5.766,5.444c0.167-0.192,0.383-0.293,0.623-0.293l0,0h0.028c0.717,0.022,1.405,0.871,1.532,1.89c0.073,0.583-0.052,1.127-0.333,1.451c-0.167,0.192-0.378,0.293-0.64,0.292h0C6.273,8.765,5.571,7.883,5.443,6.864 M6.628,14.786c-1.066,0-1.902-0.687-1.902-1.562c0-0.803,0.978-1.508,2.093-1.508l0,0l0,0h0.029c0.241,0.003,0.474,0.04,0.695,0.109l0.221,0.158c0.567,0.405,0.866,0.634,0.956,1.003c0.022,0.097,0.033,0.194,0.033,0.291C8.752,14.278,8.038,14.786,6.628,14.786 M14.85,4.765h-1.493v2.242h-2.249v1.495h2.249v2.233h1.493V8.502h2.252V7.007H14.85V4.765z"></path>
                  </svg>
                  <span class="tooltip-social">${
                    node.getContenido().correo
                  }</span>
              </a>
             
             
          </div>
      </div>`;

      //

      this._inordenCard(node.getRight(), idDiv);
    }
  }

  //Preorden
  preordenCard(idDiv) {
    if (this.head == null) {
      console.log("No se ha insertado nada en el BSTree.");
    } else {
      this._preordenCard(this.head, idDiv);
    }
  }

  _preordenCard(node, idDiv) {
    if (node != null) {
      //

      let card = document.querySelector(idDiv);

      let newDiv = document.createElement("div");
      card.innerHTML += `
          <div class="card-client">
          <div class="user-picture">
              <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path>
              </svg>
          </div>
          <p class="name-client"> ${node.getContenido().nombre_actor}
                <span>${node.getContenido().descripcion}</span> 
   
       
            
      
          </p>
          <div class="social-media">
              <a href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M8.749,9.934c0,0.247-0.202,0.449-0.449,0.449H4.257c-0.247,0-0.449-0.202-0.449-0.449S4.01,9.484,4.257,9.484H8.3C8.547,9.484,8.749,9.687,8.749,9.934 M7.402,12.627H4.257c-0.247,0-0.449,0.202-0.449,0.449s0.202,0.449,0.449,0.449h3.145c0.247,0,0.449-0.202,0.449-0.449S7.648,12.627,7.402,12.627 M8.3,6.339H4.257c-0.247,0-0.449,0.202-0.449,0.449c0,0.247,0.202,0.449,0.449,0.449H8.3c0.247,0,0.449-0.202,0.449-0.449C8.749,6.541,8.547,6.339,8.3,6.339 M18.631,4.543v10.78c0,0.248-0.202,0.45-0.449,0.45H2.011c-0.247,0-0.449-0.202-0.449-0.45V4.543c0-0.247,0.202-0.449,0.449-0.449h16.17C18.429,4.094,18.631,4.296,18.631,4.543 M17.732,4.993H2.46v9.882h15.272V4.993z M16.371,13.078c0,0.247-0.202,0.449-0.449,0.449H9.646c-0.247,0-0.449-0.202-0.449-0.449c0-1.479,0.883-2.747,2.162-3.299c-0.434-0.418-0.714-1.008-0.714-1.642c0-1.197,0.997-2.246,2.133-2.246s2.134,1.049,2.134,2.246c0,0.634-0.28,1.224-0.714,1.642C15.475,10.331,16.371,11.6,16.371,13.078M11.542,8.137c0,0.622,0.539,1.348,1.235,1.348s1.235-0.726,1.235-1.348c0-0.622-0.539-1.348-1.235-1.348S11.542,7.515,11.542,8.137 M15.435,12.629c-0.214-1.273-1.323-2.246-2.657-2.246s-2.431,0.973-2.644,2.246H15.435z"></path>
                  </svg>
                  <span class="tooltip-social">${node.getContenido().dni}</span>
              </a>
              <a href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M8.937,10.603c-0.383-0.284-0.741-0.706-0.754-0.837c0-0.223,0-0.326,0.526-0.758c0.684-0.56,1.062-1.297,1.062-2.076c0-0.672-0.188-1.273-0.512-1.71h0.286l1.58-1.196h-4.28c-1.717,0-3.222,1.348-3.222,2.885c0,1.587,1.162,2.794,2.726,2.858c-0.024,0.113-0.037,0.225-0.037,0.334c0,0.229,0.052,0.448,0.157,0.659c-1.938,0.013-3.569,1.309-3.569,2.84c0,1.375,1.571,2.373,3.735,2.373c2.338,0,3.599-1.463,3.599-2.84C10.233,11.99,9.882,11.303,8.937,10.603 M5.443,6.864C5.371,6.291,5.491,5.761,5.766,5.444c0.167-0.192,0.383-0.293,0.623-0.293l0,0h0.028c0.717,0.022,1.405,0.871,1.532,1.89c0.073,0.583-0.052,1.127-0.333,1.451c-0.167,0.192-0.378,0.293-0.64,0.292h0C6.273,8.765,5.571,7.883,5.443,6.864 M6.628,14.786c-1.066,0-1.902-0.687-1.902-1.562c0-0.803,0.978-1.508,2.093-1.508l0,0l0,0h0.029c0.241,0.003,0.474,0.04,0.695,0.109l0.221,0.158c0.567,0.405,0.866,0.634,0.956,1.003c0.022,0.097,0.033,0.194,0.033,0.291C8.752,14.278,8.038,14.786,6.628,14.786 M14.85,4.765h-1.493v2.242h-2.249v1.495h2.249v2.233h1.493V8.502h2.252V7.007H14.85V4.765z"></path>
                  </svg>
                  <span class="tooltip-social">${
                    node.getContenido().correo
                  }</span>
              </a>
             
             
          </div>
      </div>`;

      //
      this._preordenCard(node.getLeft(), idDiv);
      this._preordenCard(node.getRight(), idDiv);
    }
  }

  //PostOrden
  postordenCard(idDiv) {
    if (this.head == null) {
      console.log("No se ha insertado nada en el BSTree.");
    } else {
      this._postordenCard(this.head, idDiv);
    }
  }

  _postordenCard(node, idDiv) {
    if (node != null) {
      this._postordenCard(node.getLeft(), idDiv);
      this._postordenCard(node.getRight(), idDiv);
      //

      let card = document.querySelector(idDiv);

      let newDiv = document.createElement("div");
      card.innerHTML += `
          <div class="card-client">
          <div class="user-picture">
              <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path>
              </svg>
          </div>
          <p class="name-client"> ${node.getContenido().nombre_actor}
                <span>${node.getContenido().descripcion}</span> 
   
       
            
      
          </p>
          <div class="social-media">
              <a href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M8.749,9.934c0,0.247-0.202,0.449-0.449,0.449H4.257c-0.247,0-0.449-0.202-0.449-0.449S4.01,9.484,4.257,9.484H8.3C8.547,9.484,8.749,9.687,8.749,9.934 M7.402,12.627H4.257c-0.247,0-0.449,0.202-0.449,0.449s0.202,0.449,0.449,0.449h3.145c0.247,0,0.449-0.202,0.449-0.449S7.648,12.627,7.402,12.627 M8.3,6.339H4.257c-0.247,0-0.449,0.202-0.449,0.449c0,0.247,0.202,0.449,0.449,0.449H8.3c0.247,0,0.449-0.202,0.449-0.449C8.749,6.541,8.547,6.339,8.3,6.339 M18.631,4.543v10.78c0,0.248-0.202,0.45-0.449,0.45H2.011c-0.247,0-0.449-0.202-0.449-0.45V4.543c0-0.247,0.202-0.449,0.449-0.449h16.17C18.429,4.094,18.631,4.296,18.631,4.543 M17.732,4.993H2.46v9.882h15.272V4.993z M16.371,13.078c0,0.247-0.202,0.449-0.449,0.449H9.646c-0.247,0-0.449-0.202-0.449-0.449c0-1.479,0.883-2.747,2.162-3.299c-0.434-0.418-0.714-1.008-0.714-1.642c0-1.197,0.997-2.246,2.133-2.246s2.134,1.049,2.134,2.246c0,0.634-0.28,1.224-0.714,1.642C15.475,10.331,16.371,11.6,16.371,13.078M11.542,8.137c0,0.622,0.539,1.348,1.235,1.348s1.235-0.726,1.235-1.348c0-0.622-0.539-1.348-1.235-1.348S11.542,7.515,11.542,8.137 M15.435,12.629c-0.214-1.273-1.323-2.246-2.657-2.246s-2.431,0.973-2.644,2.246H15.435z"></path>
                  </svg>
                  <span class="tooltip-social">${node.getContenido().dni}</span>
              </a>
              <a href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M8.937,10.603c-0.383-0.284-0.741-0.706-0.754-0.837c0-0.223,0-0.326,0.526-0.758c0.684-0.56,1.062-1.297,1.062-2.076c0-0.672-0.188-1.273-0.512-1.71h0.286l1.58-1.196h-4.28c-1.717,0-3.222,1.348-3.222,2.885c0,1.587,1.162,2.794,2.726,2.858c-0.024,0.113-0.037,0.225-0.037,0.334c0,0.229,0.052,0.448,0.157,0.659c-1.938,0.013-3.569,1.309-3.569,2.84c0,1.375,1.571,2.373,3.735,2.373c2.338,0,3.599-1.463,3.599-2.84C10.233,11.99,9.882,11.303,8.937,10.603 M5.443,6.864C5.371,6.291,5.491,5.761,5.766,5.444c0.167-0.192,0.383-0.293,0.623-0.293l0,0h0.028c0.717,0.022,1.405,0.871,1.532,1.89c0.073,0.583-0.052,1.127-0.333,1.451c-0.167,0.192-0.378,0.293-0.64,0.292h0C6.273,8.765,5.571,7.883,5.443,6.864 M6.628,14.786c-1.066,0-1.902-0.687-1.902-1.562c0-0.803,0.978-1.508,2.093-1.508l0,0l0,0h0.029c0.241,0.003,0.474,0.04,0.695,0.109l0.221,0.158c0.567,0.405,0.866,0.634,0.956,1.003c0.022,0.097,0.033,0.194,0.033,0.291C8.752,14.278,8.038,14.786,6.628,14.786 M14.85,4.765h-1.493v2.242h-2.249v1.495h2.249v2.233h1.493V8.502h2.252V7.007H14.85V4.765z"></path>
                  </svg>
                  <span class="tooltip-social">${
                    node.getContenido().correo
                  }</span>
              </a>
             
             
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
    this.contraseña = contraseña;
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
      "Cliente Cargado Correctamente" +
        " " +
        "Numero de Clientes: " +
        this.size,
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
          USUARIO33 = recorrido.username;

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

//TABLA HASH
class CATEGORIAS {
  //clase nodo con lso datos para cargar
  constructor(id, company) {
    this.id = id;
    this.company = company;
    this.next = null;
  }
}

class Lista {
  //la lista para cuando hayan colisiones
  constructor() {
    this.head = null;
    this.size = 0;
  }

  insert(id, category) {
    //metodo para insertar en la lista
    this.size++; //aumentamos
    var tempo = new CATEGORIAS(id, category);
    tempo.next = this.head; //creamos la lista
    this.head = tempo;
  }

  getSize() {
    return this.size;
  }

  isEmpty() {
    return this.head == null;
  }
}

class TableHash {
  constructor(size) {
    this.espacios = 0;
    this.size = size;
    this.table = [];
    for (let i = 0; i < size; i++) {
      this.table.push(new Lista());
    }
  }

  insert(id, category) {
    var index = this.functionHash(id); // guardamos en una variable el valor del dato que entra para hacer el metodo de insersion con el tamaño de la tabla que seria el modulo
    if (this.table[index].isEmpty()) {
      // si la cabeza de la tabla esta vacia agregamos un espacio
      this.espacios++;
    }
    this.table[index].insert(id, category); // agregamos en la posicion qeu devolvio el modulo los datos id
    this.rehashing(); // llamamos el metodo rehashing por si los espacios abarcados ya son mayor al 75%
  }

  functionHash(id) {
    return id % this.size;
  }

  rehashing() {
    var porcentaje = this.espacios / this.size; //aqui obtenemos el dato del porcentaje de datos
    // que seria lso espacios que estamos ocupando en la tabla dividio el tamaño de la tabla
    if (porcentaje > 0.75) {
      var temp = this.table; // guardamos la tabla
      var tempSize = this.size; // y el tamaño de la tabla
      this.size = this.espacios * 5; // por cada ocupacion digamos hay 10 espacios ocupados multiplicamos por 5
      this.table = []; // volvemos la tabla vacia para ordenar la tabla
      for (let i = 0; i < this.size; i++) {
        this.table.push(new Lista()); //volvemos a ordenar la tabla
      }
      this.espacios = 0; // ahora los espacios estan en 0
      for (let i = 0; i < tempSize; i++) {
        // con el tamaño de la tabla anterior
        if (!temp[i].isEmpty()) {
          // si la cabeza es diferente de nula
          var nodo = temp[i].head; // obtenemos la posicion del nodo y el head
          while (nodo != null) {
            // mientras el nodo sea diferente de nullo
            this.insert(nodo.id, nodo.company); // insertamos los nuevos datos
            nodo = nodo.next;
          }
        }
      }
    }
  }

  graph(idDiv) {
    let grafo = "";
    grafo =
      'digraph SimpleList{\nnode[ shape= box, fillcolor="#FFFFFF", style= filled]; rankdir="LR" \nbgcolor = "  #00ccff ";\nranksep = 0.5;\nnodesep = 0.5;\nsubgraph cluster_A{\nlabel = "Tabla Hash";\nbgcolor = "  #00ffad ";\nfontcolor ="black ";\nfontsize = 30;\n\n ';

    for (var i = 0; i <= this.size - 1; i++) {
      if (this.table[i].head == null) {
        grafo += "cabeza" + i + '[label="' + i + '"];\n';
      } else {
        grafo += "cabeza" + i + '[label="' + i + '"];\n';
        var temp = this.table[i].head;
        grafo += "cabeza" + i + " -> " + this.table[i].head.id + "\n";
        while (temp.next != null) {
          grafo += temp.id + '[label="' + temp.id + '"];\n';
          if (temp == null) {
            break;
          } else {
            let temp2 = temp.next;

            grafo += temp.id + " -> " + temp2.id + "\n";
          }
          temp = temp.next;
        }
      }
    }
    for (var j = 0; j < this.size - 1; j++) {
      grafo += "cabeza" + j + " -> " + "cabeza" + (j + 1) + "\n";
    }

    i = 0;
    grafo += "{rank = same; cabeza" + 0;
    for (var j = 1; j < this.size; j++) {
      grafo += "; cabeza" + j;
    }

    grafo += "};}\n}";
    let id = "#" + idDiv;

    console.log(grafo);

    d3.select(id)
      .graphviz()
      .width(2000)
      .height(1500)
      .zoom(true)
      .fit(true)
      .renderDot(grafo);
  }
  print1() {
    for (var i = 0; i < this.size; i++) {
      if (this.table[i].head == null) {
        console.log(i);
      } else {
        console.log(this.table[i].head.id);
      }
    }
  }
}

//----------------------------------------------------------------------------------

//VARIBLES----------------------------------------------------------------

const admin = {
  dpi: 2354168452525,
  nombre_completo: "Oscar Armin",
  nombre_usuario: "EDD",
  contrasenia: "12345678",
  correo: "ingenieira@usac.com",
  telefono: 12345678,
};
let clientes = new listaenlazada();
let actors = new ArbolBinario();
let peliculas = new ArbolAVL();
let peliculas2 = new ArbolAVL2();
let tablahash = new TableHash(20);
let graphviz = "";
let comentarios = [];
let USUARIO33 = "";

//--------------------------------------------------------

//INGRESO DE ADMINISTRADOR-----------
function loginadmin() {
  let user = document.getElementById("usuario").value;
  let password = document.getElementById("password").value;
  let check = document.getElementById("check1").checked;
  if (user == "" || password == "") {
    swal("Oops!", "LLENE TODOS LOS CAMPOS", "error");
  } else {
    if (check) {
      if (user == admin.nombre_usuario && password == admin.contrasenia) {
        goAdmin();
        document.getElementById("usuario").value = "";
        document.getElementById("password").value = "";
        document.getElementById("check1").checked = "";
      } else {
        swal("Oops!", "ADMINISTRADOR ERRONEO", "error");
      }
    } else {
      clientes.login_us(user, password);
    }
  }
}
//---------------------------------
function grafocategorias() {
    tablahash.graph("showcategorias")
    document.getElementById("showlist").style.display = "none";
    document.getElementById("showactores").style.display = "none";
    document.getElementById("showpeliculas").style.display = "none";
    document.getElementById("showcategorias").style.display = "grid";
  }
function Cargar_categorias(e) {
  var archivo = e.target.files[0];
  document.getElementById("fichero-categorias").files[0];

  if (!archivo) {
    return;
  }
  let lector = new FileReader();
  lector.onload = function (e) {
    let contenido = e.target.result;

    const _clients = JSON.parse(contenido);

    for (const i in _clients) {
      let client1 = _clients[i];
      tablahash.insert(client1.id_categoria, client1.company)
      ;
    }
  };
  lector.readAsText(archivo);
}
document
  .getElementById("fichero-categorias")
  .addEventListener("change", Cargar_categorias, false);

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

function grafoclientes() {
  clientes.graph("showlist");
  document.getElementById("showlist").style.display = "grid";
  document.getElementById("showactores").style.display = "none";
  document.getElementById("showpeliculas").style.display = "none";
}

//CREAR CLIENTE UNO POR UNO
function create_cliente1() {
  let user = document.getElementById("usuario1").value;
  let nombre = document.getElementById("nombre1").value;
  let correo = document.getElementById("correo1").value;
  let telefono = document.getElementById("telefono1").value;
  let password = document.getElementById("password1").value;
  let dpi = document.getElementById("DPI1").value;

  if (
    user == "" ||
    nombre == "" ||
    correo == "" ||
    telefono == "" ||
    password == "" ||
    dpi == ""
  ) {
    swal("!Oops", "Llene todos los campos", "error");
  } else {
    clientes.add(dpi, nombre, user, correo, password, telefono);
    GOcreate();
  }
}

//DESCARGAR GRAFOCLIENTE
function downloadcliente() {
  html2canvas($("#showlist")[0]).then(function (canvas) {
    return Canvas2Image.saveAsPNG(canvas);
    $(".response").append(canvas);
  });
}
function donwloadpeliculas() {
  html2canvas($("#showpeliculas")[0]).then(function (canvas) {
    return Canvas2Image.saveAsPNG(canvas);
    $(".response").append(canvas);
  });
}
function donwloadactores() {
  html2canvas($("#showactores")[0]).then(function (canvas) {
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
  lector.onload = function (e) {
    let contenido = e.target.result;

    const _actors = JSON.parse(contenido);

    for (const i in _actors) {
      let actor = _actors[i];

      actors.add(actor);
    }

    // actors.inordenCard('#in');
    // actors.preordenCard('#pre');
    // actors.postordenCard('#post');
  };
  lector.readAsText(archivo);
}
document
  .getElementById("fichero-actores")
  .addEventListener("change", Cargar_actores, false);

function grafoactores() {
  actors.graph("showactores");
  document.getElementById("showlist").style.display = "none";
  document.getElementById("showactores").style.display = "grid";
  document.getElementById("showpeliculas").style.display = "none";
}

//_-------------------------------------

function Cargar_peliculas(e) {
  var archivo = e.target.files[0];

  if (!archivo) {
    return;
  }

  let lector = new FileReader();
  lector.onload = function (e) {
    let contenido = e.target.result;

    const _movies = JSON.parse(contenido);

    for (const i in _movies) {
      let movie = _movies[i];

      peliculas._add(movie);
      peliculas2._add(movie);
    }

    // peliculas.inordenCardR('#moviesUserD');
  };
  lector.readAsText(archivo);
}
document
  .getElementById("fichero-peliculas")
  .addEventListener("change", Cargar_peliculas, false);

function grafopeliculas() {
  peliculas.graph1("showpeliculas");
  document.getElementById("showlist").style.display = "none";
  document.getElementById("showactores").style.display = "none";
  document.getElementById("showpeliculas").style.display = "grid";
}

function movies2() {
  document.getElementById("container").style.display = "none";
  document.getElementById("botones-asdes").style.display = "grid";
  document.getElementById("movies-container").style.display = "flex";
  document.getElementById("actors-container").style.display = "none";
  document.getElementById("botonsinor").style.display = "none";
}
function actors2() {
  document.getElementById("botones-asdes").style.display = "none";
  document.getElementById("movies-container").style.display = "none";
  document.getElementById("actors-container").style.display = "flex";
  document.getElementById("container").style.display = "none";
  document.getElementById("botonsinor").style.display = "block";
}

function pelis(id, nombre, precio, star) {
  document.getElementById("container").style.display = "flex";
  document.getElementById("movies-container").style.display = "none";
  document.getElementById("botones-asdes").style.display = "none";
  document.getElementById("actors-container").style.display = "none";
  document.getElementById("botonsinor").style.display = "none";
  let x = document.getElementById(id).innerHTML;
  document.getElementById("container").innerHTML = "";
  peliculas2.Card1(id, nombre, precio, x, star, "#container");
  peliculas2.addstars(nombre, star);
  peliculas2.printstar(nombre);
  peliculas2.setcoment(nombre);

  //     // swal("sucess"," " + x,"success")
}

function mostraras() {
  document.getElementById("movies-container").innerHTML = "";
  peliculas2.ORDENCARD("#movies-container");
}
function mostrardes() {
  document.getElementById("movies-container").innerHTML = "";
  peliculas2.inordenCardR("#movies-container");
}

function alquilar(nombre) {
  peliculas2.addalquilar(nombre);
}

function punteo(name) {
  let star = document.getElementById("star33").value;
  if (star == "") {
  } else {
    peliculas2.setStar(name, star);
  }
  document.getElementById("star33").value = "";
}
function comen(nombre, id, precio) {
  let comentario = document.getElementById("nuevoComentario").value;
  if (comentario == "") {
  } else {
    document.getElementById("comentarios").innerHTML = "";

    peliculas2.addcomen(nombre, comentario, USUARIO33);
    peliculas2.setcoment(nombre);
  }
  document.getElementById("nuevoComentario").value = "";
}

function inorden12() {
  document.getElementById("actors-container").innerHTML = "";
  actors.inordenCard("#actors-container");
}
function preorden12() {
  document.getElementById("actors-container").innerHTML = "";
  actors.preordenCard("#actors-container");
}
function postorden12() {
  document.getElementById("actors-container").innerHTML = "";
  actors.postordenCard("#actors-container");
}
