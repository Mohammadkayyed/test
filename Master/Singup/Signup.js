function signup() {
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

    var usernameError = document.getElementById("usernameError");
    var emailError = document.getElementById("emailError");
    var passwordError = document.getElementById("passwordError");
    var confirmPasswordError = document.getElementById("confirmPasswordError");
    var userTypeError = document.getElementById("userTypeError");

    if (!username.trim()) {
        usernameError.textContent = "Please enter a username";
    } else {
        usernameError.textContent = "";
    }

    if (!email.trim() || !emailRegex.test(email)) {
        emailError.textContent = "Please enter a valid email address";
    } else {
        emailError.textContent = "";
    }

    if (!password.trim() || !passwordRegex.test(password)) {
        passwordError.textContent = "Password must be at least 8 characters long and include an uppercase letter, a number, and a special character";
    } else {
        passwordError.textContent = "";
    }

    if (!confirmPassword.trim() || confirmPassword !== password) {
        confirmPasswordError.textContent = "Passwords do not match";
    } else {
        confirmPasswordError.textContent = "";
    }

    var userTypeRadios = document.getElementsByName("userType");
    var userTypeSelected = false;

    for (var i = 0; i < userTypeRadios.length; i++) {
        if (userTypeRadios[i].checked) {
            userTypeSelected = true;
            break;
        }
    }

    if (!userTypeSelected) {
        userTypeError.textContent = "Please select a user type";
    } else {
        userTypeError.textContent = "";
    }

    if (!usernameError.textContent && !emailError.textContent && !passwordError.textContent && !confirmPasswordError.textContent && !userTypeError.textContent) {
        var userType = userTypeRadios[0].checked ? "User" : "Artisan";

        var userData = {
            name: username,
            email: email,
            password: password,
            password_confirmation: confirmPassword,
            role_id: userType === "User" ? 3 : 2,

        };
        console.log(userData);
        fetch('http://127.0.0.1:8000/api/signup', {
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
                var username = data.user.name;
                var email = data.user.email;
                var userType = data.user.role_id;
                alert("Sign up successful!\nUsername: " + username + "\nEmail: " + email + "\nUser Type: " + userType);
                window.location.href = "/Login/Login.html"
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error occurred during signup. Please try again.');
            });
    }
}
