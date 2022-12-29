class CATEGORIAS{ //clase nodo con lso datos para cargar
    constructor(id,company){
        this.id = id
        this.company = company
        this.next = null
    }
  }
  
  class Lista{ //la lista para cuando hayan colisiones
    constructor(){
        this.head = null
        this.size = 0;
    }

    insert(id,category){ //metodo para insertar en la lista
      this.size++; //aumentamos 
      var tempo = new CATEGORIAS(id,category)
      tempo.next = this.head //creamos la lista
      this.head = tempo
    }
 
  
    getSize(){
      return this.size;
    }
  
    isEmpty(){
      return this.head == null ;  
    }
  }
  
  class TableHash{
    constructor(size){
      this.espacios =0;
      this.size =  size;
      this.table = [];
      for(let i = 0;i < size ; i++){
        this.table.push(new Lista())
      }
    }
  
    insert(id,category){
      var index = this.functionHash(id); // guardamos en una variable el valor del dato que entra para hacer el metodo de insersion con el tamaño de la tabla que seria el modulo
      if(this.table[index].isEmpty()){  // si la cabeza de la tabla esta vacia agregamos un espacio
        this.espacios++;
      }
      this.table[index].insert(id,category); // agregamos en la posicion qeu devolvio el modulo los datos id
      this.rehashing() // llamamos el metodo rehashing por si los espacios abarcados ya son mayor al 75%
    }
  
    functionHash(id){
      return id % this.size;
    }
  
    rehashing(){
      var porcentaje =this.espacios/this.size //aqui obtenemos el dato del porcentaje de datos 
      // que seria lso espacios que estamos ocupando en la tabla dividio el tamaño de la tabla
      if(porcentaje>0.75){
        var temp =this.table; // guardamos la tabla
        var tempSize = this.size // y el tamaño de la tabla
        this.size = this.espacios*5 // por cada ocupacion digamos hay 10 espacios ocupados multiplicamos por 5
        this.table = [] // volvemos la tabla vacia para ordenar la tabla
        for(let i = 0;i < this.size ; i++){
          this.table.push(new Lista()) //volvemos a ordenar la tabla
        }
        this.espacios =0; // ahora los espacios estan en 0
        for(let i = 0;i < tempSize ; i++){  // con el tamaño de la tabla anterior
          if(!temp[i].isEmpty()){ // si la cabeza es diferente de nula
            var nodo = temp[i].head; // obtenemos la posicion del nodo y el head
            while(nodo!=null){  // mientras el nodo sea diferente de nullo
              this.insert(nodo.id,nodo.company); // insertamos los nuevos datos
              nodo = nodo.next
            }
          }
        }
  
      }
  
  
    }

    graph(idDiv){
        let grafo = ""
        grafo = 'digraph SimpleList{\nnode[ shape= box, fillcolor="#FFFFFF", style= filled]; rankdir="LR" \nbgcolor = "  #00ccff ";\nranksep = 0.5;\nnodesep = 0.5;\nsubgraph cluster_A{\nlabel = "Tabla Hash";\nbgcolor = "  #00ffad ";\nfontcolor ="black ";\nfontsize = 30;\n\n ';

        for(var i=0;i<=this.size-1;i++){
          if(this.table[i].head == null){
            grafo += "cabeza" + i + '[label="' + i + '"];\n';

          }else{
            grafo += "cabeza" + i + '[label="' + i + '"];\n';
            var temp = this.table[i].head;
            grafo += "cabeza" + i + " -> " + this.table[i].head.id + "\n";
            while(temp.next != null){
              grafo += temp.id + '[label="' + temp.id + '"];\n';
              if(temp== null){
                  break;
              }else{
                let temp2 = temp.next;
                
                grafo += temp.id + " -> " + temp2.id + "\n";
            
         
              }
              temp = temp.next;

            }
          }
     
       
 

        }
        for(var j=0;j<this.size-1;j++){
          grafo += "cabeza" + j + " -> " + "cabeza" + (j+1) + "\n";
        }
      
        i = 0;
        grafo+= "{rank = same; cabeza" + 0;
        for(var j=1;j<this.size;j++){
          grafo += "; cabeza" + j;
        }
       
   

        grafo += '};}\n}';
        let id = '#'+idDiv;
  
        console.log(grafo)
  
        d3.select(id).graphviz()
            .width(2000)
            .height(1500)
            .zoom(true)
            .fit(true)
            .renderDot(grafo)
  
    }
    print1(){
        for(var i=0;i<this.size;i++){
          if(this.table[i].head==null){
            console.log(i)
          }else{
            console.log(this.table[i].head.id)
          }
          
         
          

      }
 

    }
  
  }
  
  var tabla = new TableHash(20);
  tabla.insert(5712,"ut");
  tabla.insert(6316,"a");
  tabla.insert(3650,"b");
  tabla.insert(5071,"c");
  tabla.insert(3699,"d");
  tabla.insert(6435,"e");
  tabla.insert(8653,"f");
  tabla.insert(6376,"g");
  tabla.insert(5661,"h");
  tabla.insert(9195,"i");
  tabla.insert(369,"d");
  tabla.insert(643,"e");
  tabla.insert(865,"f");
  tabla.insert(637,"g");
  tabla.insert(566,"h");
  tabla.insert(56,"h");
  tabla.insert(91,"i");
  tabla.insert(36,"d");
  tabla.insert(643,"e");
  tabla.insert(86,"f");
  tabla.insert(6,"g");
  tabla.insert(56,"h");
  tabla.insert(91,"i");
  tabla.insert(9,"i");
  tabla.insert(64,"g");
  tabla.insert(561,"h");
  tabla.insert(912,"i");
  tabla.insert(95,"i");
  tabla.insert(91,"i");
  tabla.insert(95,"i");
  tabla.insert(641,"g");
  tabla.insert(5661,"h");
  tabla.insert(91212,"i");
  tabla.insert(954,"i");
  tabla.insert(565,"h");
  tabla.insert(9111,"i");
  tabla.insert(3612,"d");
  tabla.insert(64513,"e");
  tabla.insert(8612,"f");
  tabla.insert(622,"g");

  tabla.graph();
  // tabla.print1();
  
  //tabla.insert(30);
  