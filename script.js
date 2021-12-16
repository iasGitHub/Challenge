const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTQxMzY4OSwiZXhwIjoxOTU0OTg5Njg5fQ.eW1mB199JfwekcQ1tbTpY2gwkM5HhxJTYzJMHpDQ1_w"
const API_URL = "https://msuvueufmlnvyilckwfg.supabase.co/rest/v1/Idées"

const proposition = document.getElementById("proposition");
const ideeForm = document.querySelector("form");
const inputTitre = document.querySelector("input#titre")
const inputDescription = document.querySelector("textarea#description")

/*tableau_idee.forEach((idees)=>{
    creerCarte(idees)
})*/


// Recuppération des informations du formulaire
ideeForm.addEventListener("submit", (event) => {
    event.preventDefault()

    // Récupération dees inf saisies
    const titreSaisi = inputTitre.value
    const descriptionSaisi = inputDescription.value

    if (titreSaisi.trim().length < 5 || descriptionSaisi.trim().length < 10) {
        alert("Merci de saisir des informations correctes")
        return
    }

    // Mettre les informations sous forme
    let nouvelleIdee = {
        titre : titreSaisi,
        description : descriptionSaisi,
        statut : false
    }
    
    // Ajout
    //tableau_idee.push(nouvelleIdee)

    // ENVOYER LES DONNÉES VERS API
    fetch(API_URL, {
        method: "POST",
        headers : {
            apikey : API_KEY,
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(nouvelleIdee),
    })

    // On vide les champs
    inputTitre.value = ""
    inputDescription.value = ""

    // Ajout de la nouvelle idée dans la page
    creerCarte(nouvelleIdee)
})

// 

// fonction pour créer les cartes
function creerCarte(donnee){
    // const divcard = document.createElement("div")
    // divcard.classList.add("card")
    // divcard.classList.add("m-2")
    // divcard.style.width = "18rem"

    // const divCardBody = document.createElement("div")
    // divCardBody.classList.add("card-body")

    // const cardTitle = document.createElement("h5")
    // cardTitle.classList.add("card-title")

    // const cardDescription = document.createElement("p")
    // cardDescription.classList.add("card-text")

    // cardTitle.textContent = donnee.titre
    // cardDescription.textContent = donnee.description

    // divCardBody.appendChild(cardTitle)
    // divCardBody.appendChild(cardDescription)
    // divcard.appendChild(divCardBody)
    // proposition.appendChild(divcard)

    // Ajout des boutons approuver/refuser lors de la création d'une carte
    const btnApprouver = "btn-valider" + donnee.id
    const btnRefuser = "btn-reset" + donnee.id

    proposition.insertAdjacentHTML(
        "afterbegin",
        `
      <div class="card me-1" style="width: 18rem">
          <div class="card-body">
              <h5 class="card-title fw-bold">${donnee.titre}</h5>
              <h6 class="card-subtitle mb-2 text-muted">
                  approuvée / réfusée
              </h6>
              <p class="card-text">${donnee.description}
              </p>
              <div class="d-flex justify-content-between">
                  <i
                      class="bi bi-check-circle text-success card-link"
                      style="font-size: 2rem" id= ${btnApprouver}
                  ></i>
                  <i
                      class="bi bi-x-circle card-link"
                      style="font-size: 2rem; color: #ce0033" id = ${btnRefuser}
                  ></i>
              </div>
          </div>
      </div>
      `
      )
    
    const btnValider = document.getElementById(btnApprouver)
    const btnAnnuler = document.getElementById(btnRefuser)

    btnValider.addEventListener ('click', (event) =>{
        alert("Bouton success")
    })
    btnAnnuler.addEventListener ('click', (event) =>{
        alert("Bouton annulé")
    })
}

// contrôle nombre de caratères textarea

inputDescription.addEventListener("input", (event) => {
    const longueurMax = 130
    const contenuSaisi = inputDescription.value
    const longueurSaisi = contenuSaisi.length
    const reste = longueurMax - longueurSaisi
  
    //actualiser le dom pour afficher le nombre
    const paragraphCompteur = document.getElementById("limite-text")
    const compteurText = document.getElementById("text-progress")
    const restantText = document.getElementById("text-restant")
    const btnDescription = document.getElementById("btn-description")
    compteurText.textContent = longueurSaisi
    restantText.textContent = " Il vous reste " + reste
  
    //changer couleur
  
    if (reste < 0) {
      paragraphCompteur.style.color = "#CE0033"
      btnDescription.disabled = true
    } else if (reste <= 16) {
      paragraphCompteur.style.color = "yellow"
      btnDescription.disabled = false
    } else {
      paragraphCompteur.style.color = "#00000"
      btnDescription.disabled = false
    }
  })

//RECUPÉRATION ET AFFICHAGE DES DONNÉES VIA API 
window.addEventListener("DOMContentLoaded", (event) => {
    fetch(API_URL, {
            method : "GET",
            headers : {
            apikey: API_KEY,
        },
    })
    .then((response) => response.json())
    .then((idees) => {
      idees.forEach((donnee) => {
        creerCarte(donnee)
      })
    })
})
