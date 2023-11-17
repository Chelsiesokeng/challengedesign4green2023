const listItems = document.querySelectorAll(".sidebar-list li");
var listLinks = document.getElementById("1.1");
var json;
var position=0;
var themAct;

listItems.forEach((item) => {
  item.addEventListener("click", () => {
    let isActive = item.classList.contains("active");
    listItems.forEach((el) => {
      el.classList.remove("active");
    });
    
    if (isActive) item.classList.remove("active");
    else item.classList.add("active");

    posAct(item.id);
    formulaire();
  });
});

//formulaire de connexion
const connect = document.getElementById('connexion');
connect.addEventListener('submit', function(event) {
  
    event.preventDefault();
    const form = document.getElementById('first-card');
    form.style.visibility = "visible";
    const b1 = document.getElementById('button_doc');
    b1.disabled = true;
    const b2 = document.getElementById('button_url');
    b2.disabled = true;
    formulaire();
});

function getSidebarClass() {
  const windowWidth = window.innerWidth;

  // Si la largeur de la fenêtre est inférieure à 500 pixels, retourne "sidebar close", sinon, retourne "sidebar"
  return windowWidth < 500 ? "sidebar close" : "sidebar";
}

// Fonction pour mettre à jour la classe de la sidebar container
function updateSidebarContainerClass() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.className = getSidebarClass();
}

// Attacher la fonction à l'événement resize de la fenêtre
window.addEventListener('resize', updateSidebarContainerClass);

// Appeler la fonction au chargement initial de la page
window.addEventListener('load', updateSidebarContainerClass);


document.addEventListener('DOMContentLoaded', function() {
  jsonRequest();
});

function jsonRequest(){
  
  var url = 'https://ecoresponsable.numerique.gouv.fr/publications/referentiel-general-ecoconception/export/referentiel-general-ecoconception-version-v1.json';

  fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur de réseau - ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    menu(data);
    stockJson(data);
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des données:', error);
  });
}

function stockJson(jsonObject) {
  json = Object.assign({},jsonObject); 
  themAct = json["criteres"][1].thematique;
}

function menu(jsonObj) {
  const listmenu = document.querySelectorAll(".sidebar-list li .title .name");
  const listmenuNom = document.querySelectorAll(".submenu-title");
  const section = document.querySelectorAll(".sidebar-list li"); 
  const listSmenu = document.querySelectorAll(".sidebar-list li .submenu")
  var i = 0;
  var j = 1;
  var criteres = jsonObj["criteres"];
  var pass = "";
  while(i!=8){
    if(pass != criteres[j].thematique){
      listmenu.item(i).innerHTML = criteres[j].thematique;
      listmenuNom.item(i).innerHTML = criteres[j].thematique;
      section.item(i).id = criteres[j].thematique;
      pass = criteres[j].thematique;
      i++;
    }
    j++;
  }
  i=0;
  j=0;
  while(i!=79){
    var sousCritere = document.createElement("a");
    sousCritere.classList.add('link');
    sousCritere.id = criteres[i].id;
    sousCritere.innerHTML = criteres[i].id+" - "+criteres[i].critere;
    if(criteres[i].thematique != section.item(j).id)
      j++;
    listSmenu.item(j).appendChild(sousCritere);
    i++;
  }
}

function formulaire() {
  
  criteres = json["criteres"];
  
  const cardTh = document.getElementById('thematique');
  cardTh.innerHTML = criteres[position].thematique;
  const cardtitle = document.getElementById('critere');
  cardtitle.innerHTML = criteres[position].id+" - "+criteres[position].critere;
  const cardbody = document.getElementById('desc');
  cardbody.innerHTML = "<b>Objectif : </b>"+criteres[position].objectif+"<br>"
                      + "<b>Mise en Oeuvre : </b>"+criteres[position].miseEnOeuvre+"<br>"
                      + "<b>Controle : </b>"+criteres[position].controle;
}

//bouton suivant 
var next = document.getElementById('next');
next.addEventListener("click",()=>{
  position++;
  if(position > 79)
    position = 0;
  formulaire();
});

//bouton precedent 
var back = document.getElementById('back');
back.addEventListener("click",()=>{
  position--;
  if(position < 0)
    position = 79;
  formulaire();
});

//calcul de la position
function posAct(thematique) {
  var i=0;
  while (criteres[i].thematique != thematique) 
    i++;
  themAct = thematique;
  position=i;
}
//
var smenu = document.getElementById("1.4");
smenu.addEventListener("click",()=>{
  alert("ÿann");
});