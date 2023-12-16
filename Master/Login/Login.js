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
// end Nav bar

//login validation
function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var emailError = document.getElementById("emailError");
    var passwordError = document.getElementById("passwordError");

    emailError.textContent = "";
    passwordError.textContent = "";

    if (!email.trim()) {
        emailError.textContent = "Please enter your email";
        return;
    }

    if (!password.trim()) {
        passwordError.textContent = "Please enter your password";
        return;
    }

    var userData = {
        email: email,
        password: password
    };

    fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(userData),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);


            var userType = data.user.role_id;
            var name = data.user.name;

            localStorage.setItem('Token', data.token)
            localStorage.setItem('userType', userType);
            localStorage.setItem('name', name);
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            localStorage.setItem('isLoggedin','true');

            // Update navigation links based on user type
            updateNavigationLinks(userType);

            if (userType === 1) {
                window.location.href = '../admin2/admin/AdminDashboard/General.html';
                alert('Login is Successful');
            } else if (userType === 2) {
                window.location.href = '../admin2/admin/ArtisanDashboard/Artisan.html';
                alert('Login is Successful');
            } else if (userType === 3) {
                window.location.href = '../Home/HomePage.html';
                alert('Login is Successful');
            } else {
                console.log("Unknown user type");
            }

        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during login. Please try again.');
        });
}

function updateNavigationLinks(userType) {
    var list = document.getElementById("list");
    var signupLink = document.querySelector("#list a[href='../Singup/Signup.html']");
    var loginLink = document.querySelector("#list a[href='../Login/Login.html']");

    if (userType === 1) {
        // Admin, change Signup to Dashboard and Login to Logout
        signupLink.textContent = "Dashboard";
        signupLink.href = "/admin2/admin/AdminDashboard/General.html";
        loginLink.textContent = "Logout";
        loginLink.href = "#";  // You can set the actual logout link or function here
    } else if (userType === 2) {
        // Artisan, change Signup to Artisan Dashboard and Login to Logout
        signupLink.textContent = "Artisan Dashboard";
        signupLink.href = "/admin2/admin/ArtisanDashboard/Artisan.html";
        loginLink.textContent = "Logout";
        loginLink.href = "#";  // You can set the actual logout link or function here
    } else if (userType === 3) {
        // Regular user, change Signup to Signup Profile
        signupLink.textContent = "Signup Profile";
        signupLink.href = "#";  // Set the actual profile page link
        loginLink.textContent = "Logout";
        loginLink.href = "#";  // You can set the actual logout link or function here
    }
}