var siteNameInput = document.getElementById("siteNameInput");
var siteUrlInput = document.getElementById("siteUrlInput");
var websiteList = [];
var box = document.querySelector(".box");
if (localStorage.getItem("websites") != null) {
  websiteList = JSON.parse(localStorage.getItem("websites"));
  displayData();
}

function addWebsite() {
  if (validationSiteName() == true && validationSiteUrl() == true) {
  var website = {
    name: siteNameInput.value,
    url: siteUrlInput.value,
  };
  websiteList.push(website);
  clear();
  displayData();
  siteNameInput.classList.remove("is-valid");
  siteUrlInput.classList.remove("is-valid");
  localStorage.setItem("websites", JSON.stringify(websiteList));
}
else {
  box.classList.remove("d-none");
}
}

function clear() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
}

function displayData() {
  var cartoona = "";
  for (var i = 0; i < websiteList.length; i++) {
    cartoona += `<tr>
    <td>${i}</td>
    <td>${websiteList[i].name}</td>
    <td><button onclick="visitSite(${i})" class="visit-btn btn btn-primary"><i class="fa-solid fa-eye pe-2 "></i> Visit</button></td>
    <td><button onclick="deleteItem(${i})" class="btn btn-danger px-5"><i class="fa-solid fa-trash-can pe-2 "></i>Delete</button></td>
  </tr>`;
  }
  document.getElementById("tableBody").innerHTML = cartoona;
}

function visitSite(index) {
  var url = websiteList[index].url;
  if (url.startsWith("https://" || "http://")) {
    window.open(url, "_blank");
  } else {
    window.open("http://" + url, "_blank");
  }
}

function deleteItem(index) {
  websiteList.splice(index, 1);
  localStorage.setItem("websites", JSON.stringify(websiteList));
  displayData();
}

function validationSiteName() {
  var regexSiteName = /^\w{3,}(\s+\w+)*$/;
  if (regexSiteName.test(siteNameInput.value) == true) {
    siteNameInput.classList.add("is-valid");
    siteNameInput.classList.remove("is-invalid");
    return true;
  } else {
    siteNameInput.classList.add("is-invalid");
    siteNameInput.classList.remove("is-valid");
    return false;
  }
}

function validationSiteUrl() {
  var regexSiteUrl =
    /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
  if (regexSiteUrl.test(siteUrlInput.value) == true) {
    siteUrlInput.classList.add("is-valid");
    siteUrlInput.classList.remove("is-invalid");
    return true;
  } else {
    siteUrlInput.classList.add("is-invalid");
    siteUrlInput.classList.remove("is-valid");
    return false;
  }
}


function closeBox() {
  box.classList.add("d-none");
}