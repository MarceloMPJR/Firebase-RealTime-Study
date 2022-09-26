import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, query, orderByChild, endAt } from "firebase/database";

import { firebaseConfig } from "./config.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// alunos com mais de 15 anos
let startDate = new Date()
startDate.setFullYear(startDate.getFullYear() - 15)
console.log(startDate)

const refAluno = query(ref(db, 'aluno'), orderByChild('nascimentoMs'), endAt(startDate.getTime()));
onValue(refAluno, (snapshot) => {
  console.log(snapshot.val())
})
