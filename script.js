const tableau_idee = [
    {
        id : 1,
        titre : "TP",
        description : "créer une app todo list",
        statut : true
    },
    {
        id : 2,
        titre : "TD",
        description : "créer une API REST",
        statut : false
    },
    {
        id : 3,
        titre : "Cours",
        description : "Découvrir les API SOAP",
        statut : false
    }
];

const proposition = document.getElementById("proposition");
const ideeForm = document.querySelector("form");

tableau_idee.forEach((idees)=>{
    creerCarte(idees)
})


// Recuppération des informations du formulaire
ideeForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const inputTitre = document.querySelector("input#titre")
    const inputDescription = document.querySelector("textarea#description")

    // Récupération dees inf saisies
    const titreSaisi = inputTitre.value
    const descriptionSaisi = inputDescription.value

    // Mettre les informations sous forme
    let nouvelleIdee = {
        id : 4,
        titre : titreSaisi,
        description : descriptionSaisi,
        statut : false
    }
    
    // Ajout
    tableau_idee.push(nouvelleIdee)

    // On vide les champs
    inputTitre.value = ""
    inputDescription.value = ""

    // Ajout de la nouvelle idée dans la page
    creerCarte(nouvelleIdee)
})

function creerCarte(donnee){
    const divcard = document.createElement("div")

    divcard.classList.add("card")
    divcard.classList.add("m-2")
    divcard.style.width = "18rem"

    const divCardBody = document.createElement("div")
    divCardBody.classList.add("card-body")

    const cardTitle = document.createElement("h5")
    cardTitle.classList.add("card-title")

    const cardDescription = document.createElement("p")
    cardDescription.classList.add("card-text")

    cardTitle.textContent = donnee.titre
    cardDescription.textContent = donnee.description

    divCardBody.appendChild(cardTitle)
    divCardBody.appendChild(cardDescription)
    divcard.appendChild(divCardBody)
    proposition.appendChild(divcard)
}
