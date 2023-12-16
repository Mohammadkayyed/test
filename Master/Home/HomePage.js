// start nav bar
const btnMenu = document.getElementById('btn-open')
const btnMenuClose = document.getElementById('btn-close')
const lsit = document.getElementById('list')
btnMenu.addEventListener('click', () => {
    lsit.style.display = "flex"
    btnMenu.style.display = "none"
    btnMenuClose.style.display = "block"
})
btnMenuClose.addEventListener('click', () => {
    lsit.style.display = "none"
    btnMenu.style.display = "block"
    btnMenuClose.style.display = "none"
})


//start slider
const slider = document.getElementById('imageSlider');
const images = [
    '../Img/slider4.jpg',
    '../Img/slider7.jpg',
    '../Img/slider5.jpg',
];
let currentImageIndex = 0;

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    slider.style.backgroundImage = `linear-gradient(to left, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6) 50%), url('${images[currentImageIndex]}')`;
}

setInterval(nextImage, 3000);
//end slider


//start Comments
let currentTestimonial = 1;
let autoSwitch;

function showTestimonial(index) {
    document.getElementById(`testimonial${currentTestimonial}`).style.display = "none";
    currentTestimonial = index;
    document.getElementById(`testimonial${currentTestimonial}`).style.display = "block";
}

function prevTestimonial() {
    showTestimonial((currentTestimonial - 1 + 3) % 3 || 3);
    resetAutoSwitch();
}

function nextTestimonial() {
    showTestimonial((currentTestimonial + 1) % 3 || 3);
    resetAutoSwitch();
}


//كل 5 ثواني بتحرك
function switchTestimonialsAutomatically() {
    autoSwitch = setInterval(() => {
        nextTestimonial();
    }, 5000);
}

function resetAutoSwitch() {
    clearInterval(autoSwitch);
    switchTestimonialsAutomatically();
}

showTestimonial(currentTestimonial);

switchTestimonialsAutomatically();

// end Comments //

// start function LOGOUT // 

// Update navigation links based on login status
updateNavigationLinks();

function updateNavigationLinks() {
    const isLoggedIn = localStorage.getItem('isLoggedin');
    const userType = localStorage.getItem('userType');
    const login= document.getElementById("login");
    const signup= document.getElementById("signup");

    if (isLoggedIn=='true'&&userType==3){
        login.textContent="logout";
        signup.textContent="profile";
        login.addEventListener("click",(e)=>{
            window.location.href="../Home/HomePage.html";
            localStorage.clear();
        })
        signup.addEventListener("click",(e)=>{
            window.location.href="/";
        })
    }else if(isLoggedIn=='true'&&userType==2){
        login.textContent="logout";
        signup.textContent="Dashboard";
        login.addEventListener("click",(e)=>{
            window.location.href="../Home/HomePage.html";
            localStorage.clear();
        })
        signup.addEventListener("click",(e)=>{
            window.location.href="/admin2/admin/ArtisanDashboard/Artisan.html";
        }) 
    }else if(isLoggedIn=='true'&&userType==1){
        login.textContent="logout";
        signup.textContent="Dashboard";
        login.addEventListener("click",(e)=>{
            window.location.href="../Home/HomePage.html";
            localStorage.clear();
        })
        signup.addEventListener("click",(e)=>{
            window.location.href="/admin2/admin/AdminDashboard/Artisans.html";
        })
    }
}
fetch('http://127.0.0.1:8000/api/artisans')
    .then(response => response.json())
    .then(data => {
        // Select the container div
        const artisansContainer = document.getElementById('artisansContainer');

        // Loop through the artisans and create divs
        for (let i = 0; i < 3 && i < data.artisans.length; i++) {
            const artisan = data.artisans[i];

            // Create a div for each artisan
            const artisanDiv = document.createElement('div');
            artisanDiv.className = 'card-Artisans';

            // Add an image (assuming the image URL is available in the API response)
            const imageElement = document.createElement('img');
            imageElement.src = `/Img/sha7nfryon 24-4.jpg`;
            imageElement.alt = '';

            artisanDiv.appendChild(imageElement);

            // Add artisan information
            const artisanInfo = document.createElement('p');
            artisanInfo.innerHTML = `Artisan Name: <span>${artisan.user.name}</span><br>Specialty: <span>${artisan.specialty.name}</span>`;

            artisanDiv.appendChild(artisanInfo);

            // Append the artisan div to the container
            artisansContainer.appendChild(artisanDiv);
        }
    })
    .catch(error => console.error('Error fetching data:', error));



// REPORT API
function submitData() {
    // استرجاع user_id من localStorage
    const user_id = localStorage.getItem('user_id');

    // التحقق مما إذا كانت قيمة user_id موجودة
    if (!user_id) {
        console.error('User ID not found in localStorage');
        return;
    }

    const message = document.getElementById('titleInput').value;
    const subject = document.getElementById('subjectInput').value;

    const data = {
        subject: subject,
        message: message,
        user_id: user_id // استخدام user_id من localStorage
    };

    fetch('http://127.0.0.1:8000/api/reports', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}