// //Exercice

// const arr1 = ["Bonjour", "tout", "le monde"]
// const arr2 = ["Salut", "à tout"]
// const arr3 = ["Je m'appelle", "mon nom est"]
// const arr4 = ["Céline", "Chignon"]
// const arr5 = ["Antoine", "Dupont"]

//à l'aire du sprred operator , créer un seul et unique tableau, qui sera ensuite parcouru pour ecrire les phrases suivantes:

//Bonjour tout le monde je m'appel Antoine Dupont
//Salut à tous , mon nom est Céline Chignon
// const arrPhrase1 = [...arr1, arr3[0], ...arr5,]
// const arrPhrase2 = [...arr2, arr3[1], ...arr4]
// //console.log(arrPhrase1.join(" "))
// console.log(arrPhrase2.join(" "))

// confusion avec les rest parameter

// function sum(...params) {
//     let total = 0
//     params.forEach((el) => {
//         total += el
//     })

//     return total
// }

// console.log(sum(4, 5, 7))



// SPREAD OPERATOR = ... Parcourir un tableau

// const arr1 = [2, 4, 7]

// const arr2 = [4, 5, 8]

// const newArr = [...arr1, ...arr2, "hello", "word"]

// console.log(newArr)

//pour les objects

// const amir = {
//     name: 'amir',
//     age: 36
// }

// const amirWithEmail = {

//     ...amir,
//     email: 'amir@exemple.com'
// }

// console.log(amirWithEmail)

// const oldAmir = {
//     age: 37,
//     ...amir
// }

// console.log(oldAmir) l'age sera 36 car la derniere valeur trouvé est ...amir donc elle écrase 37