import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, orderByChild } from "firebase/database";

import { firebaseConfig } from "./config.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Alunos agrupados por endereço
const refEndereco = ref(db, 'endereco_grupo/alameda_bairro');
onValue(refEndereco, (snapshot) => {
  let alunos = Object.values(snapshot.val().alunos).sort((a, b) => {
    const nameA = a.nome.toUpperCase();
    const nameB = b.nome.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });


  console.log(alunos.map(aluno => aluno.nome))
})
