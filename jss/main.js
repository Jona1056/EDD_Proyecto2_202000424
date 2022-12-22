
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


//ARBOL BINARIO

class BSTreeNode{

  constructor(data){

      this.data = data;
      this.left = null;
      this.right = null;

  }

  //Getters
  getData(){

      return this.data;
  }

  getLeft(){

      return this.left;
  }

  getRight(){

      return this.right;
  }

  //Setters
  setData(data){

      this.data = data;
  }

  setLeft(left){

      this.left = left;
  }

  setRight(right){

      this.right = right;
  }
}
class BSTree{

  constructor(){

      this.root = null;
      this.graphviz = '';

  }


  add(data){

      if(this.root == null){

          let newNode = new BSTreeNode(data);
          this.root = newNode;
      }else{

          this._add(this.root, data);
      }


  }

  _add(node, data){

      if(data.dni < node.getData().dni){

          if(node.getLeft() == null){
              let newNode =  new BSTreeNode(data);
              node.setLeft(newNode);

          }else{
              this._add(node.getLeft(), data);
          }


      }else if(data.dni > node.getData().dni){

          if(node.getRight() == null){
              let newNode =  new BSTreeNode(data);
              node.setRight(newNode);

          }else{
              this._add(node.getRight(), data);

          }

      }else{

          console.log('Se enconstro un elemento igual al que se quiere insetar, insercción fallida.')
      }
  }

  //Tours

  //Inorden
  inorden(){

      if(this.root == null){

          console.log('No se ha insertado nada en el BSTree.');
      }else{

          this._inorden(this.root);
      }
  }

  _inorden(node){

      if(node != null){

          this._inorden(node.getLeft());
          console.log(node.getData() + ' ');
          this._inorden(node.getRight());
      }

  }

  inordenR(){

      if(this.root == null){

          console.log('No se ha insertado nada en el BSTree.');
      }else{

          this._inordenR(this.root);
      }
  }

  _inordenR(node){

      if(node != null){

          this._inordenR(node.getRight());
          console.log(node.getData() + ' ');
          this._inordenR(node.getLeft());
      }

  }

  //Preorden
  preorden(){

      if(this.root == null){

          console.log('No se ha insertado nada en el BSTree.');
      }else{

          this._preorden(this.root);
      }
  }

  _preorden(node){

      if(node != null){

          console.log(node.getData() + ' ');
          this._preorden(node.getLeft());
          this._preorden(node.getRight());
      }


  }

  //PostOrden
  postorden(){

      if(this.root == null){

          console.log('No se ha insertado nada en el BSTree.');
      }else{

          this._postorden(this.root);
      }
  }

  _postorden(node){

      if(node != null){

          this._postorden(node.getLeft());
          this._postorden(node.getRight());
          console.log(node.getData() + ' ');
          
      }


  }

  //Graphviz
  graph(idDiv){

      this.graphviz = '';
      this.graphviz = 'digraph BST{\nnode[shape= box, fillcolor="#FFFFFF", style= filled];\nbgcolor = "#00FF7F";\nranksep = 0.5;\nnodesep = 0.5;\nsubgraph cluster_A{\nlabel = "Actores";\nbgcolor = "#20B2AA";\nfontcolor = white;\nfontsize = 30;\n\n ';

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

      if(this.root == null){

          console.log('No se ha insertado nada en el BSTree.');
      }else{

          this._preordenGraph(this.root);
      }
  }

  _preordenGraph(node){

      if(node != null){

          if(node.getLeft() != null){

              this.graphviz += node.getData().dni+ '[label="' + node.getData().nombre_actor+ '"];\n';
              this.graphviz += node.getLeft().getData().dni + '[label="' + node.getLeft().getData().nombre_actor+ '"];\n';
              this.graphviz += node.getData().dni + ' -> ' + node.getLeft().getData().dni+ '\n';
          }
          if(node.getRight() != null){
              
              this.graphviz += node.getData().dni + '[label="' + node.getData().nombre_actor+ '"];\n';
              this.graphviz += node.getRight().getData().dni + '[label="' + node.getRight().getData().nombre_actor+ '"];\n';
              this.graphviz += node.getData().dni + ' -> ' + node.getRight().getData().dni + '\n';
          }
          this._preordenGraph(node.getLeft());
          this._preordenGraph(node.getRight());
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
            if (user == recorrido.username && passw == recorrido.password) {
              document.getElementById("LOGIN-1").style.display = "none";
              document.getElementById("PANTALLA-USUARIO").style.display = "block";
              USUARIO = recorrido.name;
              artistas.print_canciones(recorrido.name);
            
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
let actors = new BSTree();
let  graphviz =""

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


///FUNCIONAMIENTOS ACTOres
function loadActors(e) {
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
document.getElementById("fichero-actores").addEventListener("change", loadActors, false);


function grafoactores(){
  actors.graph("showactores");
  document.getElementById("showlist").style.display="none";
  document.getElementById("showactores").style.display="grid";

}



//_-------------------------------------

