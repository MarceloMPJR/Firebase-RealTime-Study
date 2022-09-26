import { initializeApp } from "firebase/app";
import { getDatabase, ref, remove } from "firebase/database";

import { firebaseConfig } from "./config.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Deleta todos os alunos
const refAluno = ref(db, 'aluno')
remove(refAluno)

// Deleta todas as turmas
const refTurmas = ref(db, 'turma')
remove(refTurmas)

// Deleta todas as turmas
const enderecoRef = ref(db, 'endereco_grupo')
remove(enderecoRef)
