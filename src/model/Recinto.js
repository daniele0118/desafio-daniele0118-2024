export class Recinto {
    constructor(numero, tamanhoTotal, biomas, animaisExistentes) {
      this._numero = numero;
      this._tamanhoTotal = tamanhoTotal;
      this._biomas = biomas;
      this._animaisExistentes = animaisExistentes;
    }
  
    get numero() {
      return this._numero;
    }
  
    get tamanho() {
      return this._tamanhoTotal;
    }
  
    get biomas() {
      return this._biomas;
    }
  
    get animaisExistentes() {
      return this._animaisExistentes;
    }
  
    set numero(value) {
      this._numero = value;
    }
  
    set tamanho(value) {
      this._tamanhoTotal = value;
    }
  
    set biomas(value) {
      this._biomas = value;
    }
  
    set animaisExistentes(value) {
      this._animaisExistentes = value;
    }
  }
  