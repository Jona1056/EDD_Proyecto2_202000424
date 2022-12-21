
//------------------------------------------------------------------
// FUNCIONES PARA PASAR DE OTRAS PANTALLAS A OTRAS

function crearcuenta(){
    document.getElementById("LOGIN").style.display = "none";
    document.getElementById("crearusuario").style.display="grid";
}

function Home(){
    document.getElementById("LOGIN").style.display = "grid";
    document.getElementById("crearusuario").style.display="none";
}

function create(){
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
      } else {
        let recorrido = this.head;
        while (recorrido) {
          if (!recorrido.admin) {
            console.log(recorrido.username);
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
          } else {
            if (!recorrido) {
              swal("Error", "USUARIO NO ENCONTRADO", "error");
              return "error";
            }
            recorrido = recorrido.next;
          }
        }
      }
    }
    show() {
      if (!this.size) {
        return "Hola";
      } else {
        let recorrido = this.head;
        while (recorrido) {
          console.log(recorrido.username);
        }
      }
    }
    graph(idDiv) {
      // creamos la variable del diagraph
      let graphviz =
        'digraph SimpleList{\nnode[shape= box, fillcolor="#FFFFFF", style= filled];\nbgcolor = "#CD1CED ";\nranksep = 0.5;\nnodesep = 0.5;\nsubgraph cluster_A{\nlabel = "Clientes";\nbgcolor = "#BC70FC";\nfontcolor ="#3A0964";\nfontsize = 30;\n\n ';
  
  
      let current = this.head;
      let i = 1;
  
      while (current != null) {
        // recorremos la lista hasta que sea null y agregamos un indicie cliente1
        graphviz += "cliente" + i + '[label="' + current.name + '"];\n';
  
        i++;
        current = current.next;
      }
  
      graphviz += "\n";
  
      //we point the customer nodes
  
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
  
      //we aling the nodes
  
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
  
      d3.select(id) //creamos con d3 el rendeDot y el paragrah
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
const clientes = new Cliente();

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
                
            }else{
                swal("Oops!", "ADMINISTRADOR ERRONEO", "error");
            }
        }else{
            clientes.login_us(user,password);



        }
      }
}




//---------------------------------

