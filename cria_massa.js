import { initializeApp } from "firebase/app";
import { child, getDatabase, push, ref, set } from "firebase/database";
import { faker } from '@faker-js/faker';

import { firebaseConfig } from "./config.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function salvaAluno(alunoId, nome, nascimento, endereco) {
  let aluno = {
    nome: nome,
    nascimentoMs: nascimento.getTime(),
    nascimento: nascimento.getDate() + '/' + (nascimento.getMonth() + 1) + '/' + nascimento.getFullYear(),
    endereco: endereco,
  }

  // Adiciona aluno
  set(ref(db, 'aluno/' + alunoId), aluno);

  // Adiciona turma
  let turmaRef = ref(db, 'turma/' + (alunoId%5))
  push(child(turmaRef, "alunos"), aluno)

  // Agrupa por endereço
  let enderecoRef = ref(db, 'endereco_grupo/' + buildKey(endereco.cidade) + "_" + buildKey(endereco.bairro))
  push(child(enderecoRef, "alunos"), aluno)
}

function buildKey(key) {
  return key.toLowerCase().replace(/[^0-9A-Za-z]/g, '');
}

function salvaTurma(turmaId, serie) {
  set(ref(db, 'turma/' + turmaId), {
    serie: serie,
    alunos: []
  })
}

for(let i = 0; i < 5; i++) {
  salvaTurma(i, i + "A")
}

for(let i = 0; i < 1000; i++) {
  salvaAluno(
    i+1,
    faker.name.fullName(),
    faker.date.birthdate({ min: 10, max: 18, mode: 'age' }),
    {
      rua: faker.address.street(),
      numero: faker.address.buildingNumber(),
      bairro: "bairro",
      cidade: faker.address.cityName(),
      estado: faker.address.state()
    }
  )
}
