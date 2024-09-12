export class Animal {
    constructor(especie, tamanho, biomas, carnivoro ) {
      this._especie = especie; 
      this._biomas = biomas;
      this._tamanho = tamanho;
      this._carnivoro = carnivoro;
    }
  
    get especie() {
      return this._especie;
    }
  
    get biomas() {
      return this._biomas;
    }
  
    get tamanho() {
      return this._tamanho;
    }
  
    get carnivoro() {
        return this._carnivoro;
      }

    set especie(value) {
      this._especie = value;
    }
  
    set biomas(value) {
      this._biomas = value;
    }
  
    set tamanho(value) {
      this._tamanho = value;
    }
  }
  