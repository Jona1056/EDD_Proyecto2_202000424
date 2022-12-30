



class DataNode {
	constructor(value) {
		this.value 	= value
	}
}

class HashNode {
  constructor(hash) {
    this.hash  = hash
    this.left  = null
    this.right = null
  }
}

class Merkle {
  constructor() {
    this.tophash = null
    this.size = 0;

    this.datablock = []
    this.datablock2 = []    
    this.dot = ''
  }

  add(value) {
    
    this.datablock2[this.size]= new DataNode(value)
    this.size++;
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
    if (tmp != null) {
      this.genHash(tmp.left, n)
      this.genHash(tmp.right, n)  
      
      if (tmp.left == null && tmp.right == null) {
        tmp.left = this.datablock2[n-index--]
        //tmp.hash =sha256(tmp.left.value.user+" - "tmp.left.value.movie)
        tmp.hash =sha256(tmp.left.value+"")
      } else {
        tmp.hash = sha256(tmp.left.value+""+tmp.right.value)
      }      
    }
  }

  auth() {
   


    var exp = 1
    while (Math.pow(2, exp) < this.datablock2.length) {
      exp += 1
    }
    for (var i = this.datablock2.length; i < Math.pow(2, exp); i++) {
      this.datablock2.push(1)
    }
    index = Math.pow(2, exp)
    this.createTree(exp)
    this.genHash(this.tophash, Math.pow(2, exp))
    document.getElementById("block").innerHTML = ""
    let card = document.querySelector("#block");
    while(merkle.tophash != null){
      card.innerHTML += merkle.tophash 
      merkle.tophash = merkle.tophash.left
    }while(merkle.tophash != null){
      card.innerHTML += merkle.tophash 
      merkle.tophash = merkle.tophash.right
    }
  
  }

  clear(){
    this.tophash = null
    this.datablock2 = []  
  }
}

var index = 0


var merkle = new Merkle()

class alquiler{
  constructor(movie,user, precio){
    this.movie = movie
    this.user = user
    this.precio = precio
  }
}

function alquilar(data){
  var num=Math.floor(Math.random()* 100);
  console.log(data,num)
  merkle.add(num)

  
}


function mostrar(){

    console.log(merkle)
}