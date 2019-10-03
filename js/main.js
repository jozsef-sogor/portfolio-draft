// hide all pages
function hideAllPages() {
  let pages = document.querySelectorAll(".page");
  for (let page of pages) {
    page.style.display = "none";
  }
}

// show page or tab
function showPage(pageId) {
  hideAllPages();
  document.querySelector(`#${pageId}`).style.display = "block";
  setActiveTab(pageId);

}

// sets active nav/ menu item
function setActiveTab(pageId) {
  let pages = document.querySelectorAll("nav a");
  for (let page of pages) {
    if (`#${pageId}` === page.getAttribute("href")) {
      page.classList.add("active");
    } else {
      page.classList.remove("active");
    }

  }
}

// set default page
function setDefaultPage() {
  let page = "about";
  if (location.hash) {
    page = location.hash.slice(1);
  }
  showPage(page);
}

setDefaultPage();


var firebaseConfig = {
  apiKey: "AIzaSyAU6D0i4v_W_QITGFVhNJ8MYlWKaNrA5LQ",
  authDomain: "portfolio-6eee7.firebaseapp.com",
  databaseURL: "https://portfolio-6eee7.firebaseio.com",
  projectId: "portfolio-6eee7",
  storageBucket: "",
  messagingSenderId: "524726413467",
  appId: "1:524726413467:web:21c59c64cc01cec3e13e3e",
  measurementId: "G-1FWM6STFYS"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics()

const db = firebase.firestore();
const projectsRef = db.collection("projects");

projectsRef.onSnapshot(function(snapshotData) {
  let projects = snapshotData.docs;
  appendProjects(projects);
  console.log(projects);
});

function appendProjects(projects) {
  let cardTemplate = "";
  let modalTemplate = "";
  for (let project of projects) {
    let name = project.data().name;
    let keywords = project.data().keywords;
    let description = project.data().description;
    let img = project.data().img;
    let link = project.data().link;
    let listTemplate = "";
      for (let keyword of keywords) {
        listTemplate = `
            <li class="keywords">${keyword}<li>
            `;
          };

    cardTemplate = `
          <div class="card" id="${name}">
            <img src="${img}" alt="${name}">
            <h2>${name}</h2>
          </div>
      `;

      modalTemplate = `
        <div class=modal>
          <ul>${name}</ul>
        </div>
      `;


      document.querySelector("#projectsGrid").innerHTML += cardTemplate;
      document.querySelector(".card").addEventListener("click", function(){
        document.querySelector("#desktopWrapper").innerHTML = modalTemplate;
      });

  };

}


var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }

  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};


//navigation

document.querySelector("#navButton").addEventListener("click", function() {
  if (this.classList == "closebtn") {
    closeNav();
  } else {
    openNav();
  }
});


function openNav() {
  document.querySelector(".desktop").classList.add("scale-in-ver-top");
  document.querySelector(".desktop").classList.remove("scale-out-ver-top");
  document.querySelector("#navButton").classList.remove("openbtn");
  document.querySelector("#navButton").classList.add("closebtn");
}

function closeNav() {
  document.querySelector(".desktop").classList.add("scale-out-ver-top");
  document.querySelector(".desktop").classList.remove("scalein-ver-top");
  document.querySelector("#navButton").classList.remove("closebtn");
  document.querySelector("#navButton").classList.add("openbtn");

}

if (screen.width >= 1024) {
  document.querySelector(".desktop").classList.remove("scale-out-ver-top");

}
