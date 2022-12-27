
class Nodo{
    constructor(_value){
        this.value = _value
        this.next = null
    }
  }
  
  class Lista{
    constructor(){
        this.head = null
        this.size = 0;
    }
  
    //metodos de la lista
    //insertar
    insert(_value){
      this.size++;
      var tempo = new Nodo(_value)
      tempo.next = this.head
      this.head = tempo
    }
    //mostrar 
    printList(){

      var temporal = this.head
      while(temporal!=null){
          console.log(temporal.value)
          temporal = temporal.next
      }
    }
  
    getSize(){
      return this.size;
    }
  
    isEmpty(){
      return this.head === null ; 
    }
    graficadora() {
            let str = "";
            let temp = this.head;
            
        
            
            let count = 0;
            let rand = 0;
            let rowInfo = "{rank=same;";
            while (temp) {
                str += "Head" + count + " [label=\"Head: " + temp+ "\"];\n";
                rowInfo += "Head" + count + ";";
                temp = temp.next;
                count++;
            }
    }
  }
  
  class TableHash{
    constructor(size){
      this.amount =0;
      this.size =  size
      this.table = [];
      for(let i = 0;i < size ; i++){
        this.table.push(new Lista())
      }
    }
  
    insert(data){
      var index = this.functionHash(data);
      if(this.table[index].isEmpty()){
        this.amount++;
      }
      this.table[index].insert(data);
      this.rehashing()
    }
  
    functionHash(data){
      return data % this.size;
    }
  
    rehashing(){
      var porcentaje =this.amount/this.size
      if(porcentaje>0.75){
        var temp =this.table;
        var tempSize = this.size
        this.size = this.amount+5
        this.table = []
        for(let i = 0;i < this.size ; i++){
          this.table.push(new Lista())
        }
  
        for(let i = 0;i < tempSize ; i++){
          if(!temp[i].isEmpty()){
            var nodo = temp[i].head;
            while(nodo!=null){
              this.insert(nodo.value);
              nodo = nodo.next
          }
          }
        }
  
        
      }else{
     
      }

  
    }
    // graficadora() {
    //     let str = "";
    //     let temp = this.table;
    
        
    //     let count = 0;
    //     let rand = 0;
    //     let rowInfo = "{rank=same;";
    //     while (temp) {
    //         str += "Head" + count + " [label=\"Head: " + this.table.nodo._value+ "\"];\n";
    //         rowInfo += "Head" + count + ";";
    //         temp = temp.next;
    //         count++;
    //     }
        // temp = this.cabeza;
        // str += "Head" + 0;
        // count = 1;
        // temp = temp.next;
        // while (temp) {
        //     str += " -> Head" + count;
        //     temp = temp.next;
        //     count++;
        // }
        // str += ";\n" + rowInfo + "};\n";
  
        // temp = this.cabeza;
        // count = 0;
        // rand = 0;
        // while (temp) {
        //     let temp_ = temp.listaL.head;
        //     if (temp_ != null) {
        //         str += "Head" + count + " -> List" + rand + ";\n";
        //     }
        //     while (temp_) {
        //         str += "List" + rand + " [label=\" List: " + temp_.id_categoria + "\"];\n";
        //         if (temp_.siguiente != null) {
        //             str += "List" + rand + " -> List" + (rand+1) + ";\n";
        //         }
        //         temp_ = temp_.siguiente;
        //         rand++;
        //     }
        //     temp = temp.next;
        //     count++;
        // }
        // return str;
    // }
  
    graph() {
        let str = "digraph structs\n{\nrankdir=\"LR\"\nlabel=\"Tabla Categorias\"\nnode [shape=box];\n";
   
    
        // str += tabla2.graficadora();
        // str += "}";
        console.log(this.table)
        // d3.select("#tablas-hs").graphviz(str);
        // console.log(d3);
    }
  
  }
  
  var tabla = new TableHash(20);
  let tabla2 = new Lista();
  tabla.insert(20);
  tabla.insert(21);
  tabla.insert(22);

 tabla.graph();

 