// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCCEwKSU4fuyV_M9juzDsG2-d8XaaqaYbo",
    authDomain: "mobile-otp-verification-4fd4a.firebaseapp.com",
    projectId: "mobile-otp-verification-4fd4a",
    storageBucket: "mobile-otp-verification-4fd4a.appspot.com",
    messagingSenderId: "390847784353",
    appId: "1:390847784353:web:8ad91b676c20b2339097e0",
    measurementId: "G-L9S8BHMRCG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Render reCAPTCHA
function render() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'normal',
        'callback': function(response) {
            console.log("reCAPTCHA solved");
        },
        'expired-callback': function() {
            console.log("reCAPTCHA expired, please solve again");
        }
    });
    recaptchaVerifier.render().then(function(widgetId) {
        window.recaptchaWidgetId = widgetId;
    }).catch(function(error) {
        console.error("reCAPTCHA render error:", error);
    });
}

// Send OTP
function sendOTP() {
    var number = document.getElementById('number').value;
    firebase.auth().signInWithPhoneNumber(number, window.recaptchaVerifier).then(function (confirmationResult) {
        window.confirmationResult = confirmationResult;
        document.querySelector('.number-input').style.display = 'none';
        document.querySelector('.verification').style.display = 'block';
    }).catch(function (error) {
        console.error('Error during signInWithPhoneNumber:', error);
        alert(error.message);
    });
}

// Verify OTP
function verifyCode() {
    var code = document.getElementById('verificationCode').value;
    window.confirmationResult.confirm(code).then(function () {
        document.querySelector('.verification').style.display = 'none';
        document.querySelector('.result').style.display = 'block';
        document.querySelector('.correct').style.display = 'block';
        console.log('OTP Verified');
    }).catch(function (error) {
        console.error('Error during code verification:', error);
        document.querySelector('.verification').style.display = 'none';
        document.querySelector('.result').style.display = 'block';
        document.querySelector('.incorrect').style.display = 'block';
        console.log('OTP Not correct');
    });
}

// Initialize reCAPTCHA
render();
