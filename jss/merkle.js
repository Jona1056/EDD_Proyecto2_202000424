


class HashNode{
	constructor(data){
		this.data = data;
		this.left= null;
		this.right= null;
	}
}
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


class Merkle {
  constructor() {
    this.tophash = null
    this.size = 0;
    this.datablock = []
    this.blockchain = []    
    this.dot = ''
  }

  generarBloque(pelicula){
    // Debe ir DD-MM-YY-::HH:MM:SS
		var date = new Date(Date.now());//revisar formato
    //Hash Anterior
		var prevHash = "";
		if(this.isEmpty()){
			prevHash = "00" // el primer dato del bloque lleva 00 en el hash
		}else{
			prevHash = this.datablock[this.datablock.length-1].hash; // y si no esta vacio retorna el valor del ultimo dato -1 el hash
		}

    if(this.menor(this.size,this.blockchain.length)){ // si la funcion de menor devuelve true, es porque el arbol merkle le falta el valor del un bloque
			this.blockchain[this.size] = pelicula; // agregamos en el dato  y con eso ya tendriamos el mismo numero de datos
		}else{
			this.blockchain.push(pelicula); // si no solo añadimos
		}
    //generamos el arbol
    this.auth();

    //Data revisar
    var data= this.tophash.data;

		var nonce = 0;
		var hash = "";

		//prueba de trabajo
		while(!hash.startsWith("00")){	
			hash = sha256(this.size+date+prevHash+data+nonce);
			nonce += 1;
		} 
		var newdata = new Bloque(this.size,date,pelicula,nonce,prevHash,data,hash);
		this.datablock.push(newdata)
    this.size++;
	}	
  isEmpty(){
    if (this.datablock.length==0){
      return true
    }
    return false
	
	}
  menor(tamañomerkle, tamañoblock){
    if(tamañomerkle < tamañoblock){
      return true;
    }
    return false

  }



  createTree(exp) {
    this.tophash = new HashNode(0)
    this._createTree(this.tophash, exp )

  }

  _createTree(tmp, exp) {
    if (exp > 0) {
      tmp.left = new HashNode(0)
      tmp.right = new HashNode(0)
      this._createTree(tmp.left, exp - 1)
      this._createTree(tmp.right, exp - 1)
    }
   
  }

  genHash(tmp, n) { // postorder


      
      if (tmp.left == null && tmp.right == null) {
        tmp.hash = sha256(this.blockchain[n]);
        n+=1;
        return n
      }
  
   
    
      this.genHash(tmp.left, n)
  
      this.genHash(tmp.right, n)  
    
     
      tmp.hash = sha256(tmp.left.hash+tmp.right.hash);

  
  

 
  }
 
  auth() {
    var exp = 0
    while (Math.pow(2, exp) < this.blockchain.length) { // mientras el numero exp sea menor que el tamaño de los blockchain este ir aaumentando su valor
      exp += 1 // suma 1 al exponete 
    }
    for (var i = this.blockchain.length; i < Math.pow(2, exp); i++) {
      this.blockchain.push(1) // y en este for ingresamos en el blochchain los datos que nos haya dado el exp
    }

   
    this.createTree(exp)
    this.genHash(this.tophash, 0)
  }
  println(){
    document.getElementById("block").innerHTML = ""
    let card = document.querySelector("#block")
    for(var i = 0; i<this.datablock.length;i++){
      card.innerHTML += this.datablock[i].hash
          card.innerHTML += this.datablock[i].prevHash
    }
  }

  
}
var time = 3500
var merkle33 = new Merkle();
var dato33 = "peli"
var as = setInterval(()=>{

	merkle33.generarBloque(dato33)
  dato33 = "pei2"
  merkle33.println();



  // merkle.grafomerkle();


//  blockChain.print();


	
},time)
