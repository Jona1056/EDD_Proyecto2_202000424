class Bloque{
	constructor(index,date,data,nonce,prevHash,rootmerkle,hash){
		this.index = index
		this.date = date;
		this.data = data;
		this.nonce = nonce;
		this.prevHash = prevHash;
		this.rootmerkle = rootmerkle;
		this.hash = hash;
	}
}

class Node{
  constructor(_value){
    this.value = _value;
    this.next = null;
    this.before = null;
  }
}

class BlockChain{
  constructor(){
    this.head = null;
    this.tail = null;
		this.size = 0;
  }

	generarBloque(){
    // Debe ir DD-MM-YY-::HH:MM:SS
		var date = new Date(Date.now());//revisar formato
    //Hash Anterior
		var prevHash = "";
		if(this.isEmpty()){
			prevHash = "00"
		}else{
			prevHash = this.tail.value.hash
		}
    //generamos el arbol
		merkle.auth()
    //Data revisar
    var data= merkle.datablock2;
		var rootmerkle = merkle.tophash.hash
    merkle.clear();
		var nonce = 0;
		var hash = "";

		//prueba de trabajo
		while(!hash.startsWith("00")){	
			hash = sha256(this.size+date+prevHash+rootmerkle+nonce);
			nonce += 1;
		} 
		var data = new Bloque(this.size,date,data,nonce,prevHash,rootmerkle,hash);
		this.insert(data)
	}	

	isEmpty(){
		return this.head === null
	}

  insert(_value){
    var newNode = new Node(_value);
		this.size++;

    if( this.head != null){
      newNode.before = this.tail
      this.tail.next = newNode;
      this.tail = newNode;
    }else{
      this.head = newNode;
      this.tail = newNode;
    }
  }

  delete(_value){
    var temporal = this.head;
    if(temporal.value == _value){
      this.head = temporal.next;
      if(this.head != null){
        this.head.before = null;
      }
    }else{
      while(temporal != null){
        if(temporal.value == _value){
          var anterior = temporal.before;
          anterior.next = temporal.next
          if(temporal.next != null){
            temporal.next.before = anterior; 
          }
          if(this.tail == temporal){
            this.tail = temporal.before 
          }
          break;
        }
        temporal = temporal.next;
      }
    }
  }

  print(){
    document.getElementById("block").innerHTML = ""
    let card = document.querySelector("#block");
    
    var temporal = this.head;
    while(temporal != null){
     card.innerHTML += temporal.value.data[0].value;    
      temporal = temporal.next;
    }
  }

  print2(){
    var temporal = this.tail;
    while(temporal != null){
      console.log(temporal.value);
      temporal = temporal.before;
    }
  }
}


var blockChain = new BlockChain();
var time = 3000
//var time = 60000

var as = setInterval(()=>{

	blockChain.generarBloque();  

    // blockChain.print()


  


	
},time)


function generarBloque(){
  blockChain.generarBloque();  
	console.log(blockChain)
}
