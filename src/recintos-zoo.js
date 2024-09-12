import { Animal } from "./model/Animal";
import { Recinto } from "./model/Recinto";
import { Resultado } from "./model/Resultado";

class RecintosZoo {

  leao = new Animal("LEAO", 3, "savana", true);
  leopardo = new Animal("LEOPARDO", 2, "savana", true);
  crocodilo = new Animal("CROCODILO", 3, "rio", true);
  macaco = new Animal("MACACO", 1, ["savana", "floresta"], false);
  gazela = new Animal("GAZELA", 2, "savana", false);
  hipopotamo = new Animal("HIPOPOTAMO", 4, ["savana", "rio"], false);

  criarMapaAnimais = (animais) => {
    const mapa = new Map();
    animais.forEach(([especie, quantidade]) => mapa.set(especie, quantidade));
    return mapa;
  };

  listaRecintos = [
    new Recinto(1, 10, "savana", this.criarMapaAnimais([[this.macaco.especie, 3]])),
    new Recinto(2, 5, "floresta", this.criarMapaAnimais([])),
    new Recinto(3, 7, ["savana", "rio"], this.criarMapaAnimais([[this.gazela.especie, 1]])),
    new Recinto(4, 8, "rio", this.criarMapaAnimais([])),
    new Recinto(5, 9, "savana", this.criarMapaAnimais([[this.leao.especie, 1]])),
  ];

  listaAnimais = [this.leao, this.leopardo, this.crocodilo, this.macaco, this.gazela, this.hipopotamo];


  analisaRecintos(animal, quantidade) {
    const animalEncontrado = this.listaAnimais.find(
      a => a.especie.toUpperCase() === animal.toUpperCase()
    );

    //Teste de quantidade
    if (quantidade <= 0) {
      return new Resultado("Quantidade inválida", null);
    }

    //Teste de animal existente
    if (!animalEncontrado) {
      return new Resultado("Animal inválido", null);
    }

    let recintos = this.filtrarRecintosPorBioma(animalEncontrado);

    //Regra carnivoros
    if (animalEncontrado._carnivoro) {
      recintos = recintos.filter(recinto => {
        const animaisExistentes = recinto.animaisExistentes;
        return ( animaisExistentes.size === 0 || (animaisExistentes.size === 1 && animaisExistentes.has(animalEncontrado.especie)) );
      });
    }

    //Regra hipopotamos
    if (animalEncontrado.especie === "HIPOPOTAMO") {
      recintos = recintos.filter(recinto => this.regraHipopotamo(recinto, recinto.animaisExistentes));
    }

    //Regra macacos
    if (animalEncontrado.especie === "MACACO") {
      recintos = recintos.filter(recinto => this.regraMacaco(recinto));
    }

    recintos = this.loteInteiro(animalEncontrado, quantidade, recintos);

    const recintosViaveis = recintos.map(recinto => {
      const espacoOcupado = this.calcularEspacoOcupado(recinto);
      const espacoLivre = recinto.tamanho - this.calcularEspacoOcupado(recinto) - (quantidade * animalEncontrado.tamanho);


      return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`;
  });

      //Regra recinto viável
      if (recintos.length === 0) {
        return new Resultado("Não há recinto viável", null);
      }

    return new Resultado(null, recintosViaveis);
  }

  filtrarRecintosPorBioma(animal) {
    const toArray = (bioma) => Array.isArray(bioma) ? bioma : [bioma];
  
    const hasCommonBioma = (biomasRecinto, biomasAnimal) => 
      biomasAnimal.some(bioma => biomasRecinto.includes(bioma));
  
    return this.listaRecintos.filter(recinto => {
      const biomasRecinto = toArray(recinto.biomas);
      const biomasAnimal = toArray(animal.biomas);
  
      return hasCommonBioma(biomasRecinto, biomasAnimal);
    });
  }
  
  regraHipopotamo(recinto, animaisExistentes) {
    const biomasRecinto = Array.isArray(recinto.biomas) ? recinto.biomas : [recinto.biomas];
    const podeHabitar = biomasRecinto.includes("savana") || biomasRecinto.includes("rio");
    const podeConviver = biomasRecinto.includes("savana") && biomasRecinto.includes("rio");
  
    return podeHabitar && (animaisExistentes.size === 0 || podeConviver);
  }
  
  regraMacaco(recinto) {
    const quantidadeMacacos = recinto.animaisExistentes.get("MACACO") || 0;
    const outrosAnimais = Array.from(recinto.animaisExistentes.values()).reduce((acc, qtd) => acc + qtd, 0) - quantidadeMacacos;
  
    return !(quantidadeMacacos === 1 && outrosAnimais === 0);
  }
  
  loteInteiro(animal, quantidade, recintosDisponiveis) {
    return recintosDisponiveis.filter(recinto => {
      const espacoDisponivel = recinto.tamanho - this.calcularEspacoOcupado(recinto);
      return espacoDisponivel >= quantidade;
    });
}

calcularEspacoOcupado(recinto) {
  let espacoOcupado = 0;
  const especiesNoRecinto = recinto.animaisExistentes.size;

  // Log para ver o conteúdo do recinto
  console.log('Espécies no recinto:', recinto.animaisExistentes);

  // Calcula o espaço ocupado por todos os animais no recinto
  recinto.animaisExistentes.forEach((quantidade, especie) => {
    const animal = this.listaAnimais.find(a => a.especie === especie);
    if (animal) {
      espacoOcupado += quantidade * animal.tamanho;
    }
  });

  // Se houver mais de uma espécie, adiciona o espaço extra
  if (especiesNoRecinto > 1) {
    espacoOcupado += 1; // Regra: espaço extra quando há mais de uma espécie
  }

  return espacoOcupado;
}

  
}

export { RecintosZoo as RecintosZoo };
