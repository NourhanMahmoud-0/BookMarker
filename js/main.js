var site_name = document.getElementById("bookmarkName") ,
    site_url = document.getElementById("bookmarkURL"),
    submit_Btn = document.getElementById("submit_Btn"),
    updata_Btn = document.getElementById("btn-update");


var Modal = document.querySelector(".box-info");
var exitBtn = document.getElementById("exitBtn");


var welcomeText = document.querySelector(".welcoming");
var message = document.querySelector(".message");


var sound_place = document.querySelectorAll(".mes");
let sound = new Audio('https://www.babybeanie.com/sounds/duck.wav');


var indexUpdate = 0;


var nameReg = /^([A-Za-z0-9]*[A-Za-z]){3}[A-Za-z0-9]*$/
var urlReg = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;


var arr = [];


if(localStorage.getItem("list")){
    arr = JSON.parse(localStorage.getItem("list"));
    display();
    isEmpty();
}

function submit(){
     if(site_name.classList.contains("is-valid") && site_url.classList.contains("is-valid") && site_name.value!="" && site_url.value!=""){
        var site = {
            name: site_name.value, 
            URL: site_url.value,
         };
        arr.push(site);
        localStorage.setItem("list",JSON.stringify(arr));
        
        
        clearForm();
        display();

     }
     else{
        Modal.classList.remove("d-none");
     }
}

submit_Btn.addEventListener("click", submit);


function clearForm() {
    site_name.value = "";
    site_url.value = "";

    site_name.classList.remove("is-valid");
    site_name.classList.remove("is-invalid");
    site_url.classList.remove("is-valid");
    site_url.classList.remove("is-invalid");

}


function display(){
    var box = "";
    for(var i= 0; i<arr.length; i++){
        box +=`
            <tr>
                <td>${i+1}</td>
                <td>${arr[i].name}</td>              
                <td>
                    <button class="btn visit-btn" onclick="visitSite(${i})" >
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                    </button>
                </td>
                <td>
                    <button class="btn update-btn pe-2" onclick="showidx(${i})" >
                    <i class="fa-solid fa-trash-can"></i>
                    Update
                    </button>
                </td>
                <td>
                    <button class="btn delete-btn pe-2" onclick="deleteSite(${i})" >
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                    </button>
                </td>
                
            </tr>
        `;
    }
    document.getElementById("tableRows").innerHTML = box;
    isEmpty();
}


function showidx(idx){
    clearForm();
    indexUpdate = idx;

    var currentBookmark = arr[idx];

    site_name.value = currentBookmark.name;
    site_url.value = currentBookmark.URL;

    submit_Btn.classList.add("d-none");
    updata_Btn.classList.remove("d-none");
}

function updateSite(){
    if((site_name.classList.contains("is-valid") || site_url.classList.contains("is-valid")) && site_name.value!="" && site_url.value!=""){
    var site = {
        name: site_name.value, 
        URL: site_url.value,
        };
    arr.splice(indexUpdate, 1, site);
    localStorage.setItem("list",JSON.stringify(arr));
    
    
    clearForm();
    display();
    }
    else{
    Modal.classList.remove("d-none");
    }

    submit_Btn.classList.remove("d-none");
    updata_Btn.classList.add("d-none");
}


function deleteSite(idx){
    arr.splice(idx, 1);
    localStorage.setItem("list", JSON.stringify(arr));
    display();
}


function visitSite(idx) {
    var httpChecker = /^http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\//
    if(httpChecker.test(arr[idx].URL)){
        open(arr[idx].URL);
    }
    else{
        console.log(`https://${arr[idx].URL}`);
        open(`https://${arr[idx].URL}`);
    }
}

function validate(input,regex){
    var tempregx = regex;
    if(tempregx.test(input.value)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
    }
    else{
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
    }
}


site_name.addEventListener("input", function(){
    validate(site_name, nameReg);
});

site_url.addEventListener("input", function(){
    validate(site_url, urlReg);
})


function isEmpty(){
    if(arr.length>0){
        welcomeText.classList.add("d-none");
        message.classList.remove("d-none");
    }
    else{
        welcomeText.classList.remove("d-none");
        message.classList.add("d-none");
    }
}


sound_place.forEach(button => {
    button.addEventListener("click", () => {
      sound.play();
    });
  });

function hideModal() {
    Modal.classList.add("d-none");
}


exitBtn.addEventListener("click", hideModal);


document.addEventListener("keydown", function(ex){
    if(ex.key == "Escape"){
        hideModal();
    }
});

document.addEventListener("click", function(ex){
    if(ex.target.classList.contains("box-info")){
        hideModal();
    }
});