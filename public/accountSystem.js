import {showMessage,errorMessage} from './Messages.js';
import {resetRegisterPage} from './reset.js';
import { updateList } from './create.js';
export function accountSystem(){

//// ----- login -----////
     // login to user
     $(document).on('click','.login-btn',function(e){
        e.preventDefault();
        const username = $('#username').val();
        const password = $('#password').val();
        const remamber = $('#remamber').is(":checked");
        $.ajax({
            method:'POST',
            url:'/login',
            data: {
                username: username,
                password: password,
                remamber: remamber
            }
        })
        .done(function(data){
            sessionStorage.setItem("user", JSON.stringify({ username: username, id: data.id}));
            $('.login-container').hide();
            $('#addDigimon').show();
            $('#DigiList').show();
            $('#userTable').show();
            $('.battle-button').show();
            $('.bar').show();
            updateList(); 
            pages("digimons");
        
    })
        .fail(function(error){
            if(error.statusText === 'Unauthorized'){
                errorMessage('#errorlogin','Invalid username or password');
            }
            else if(error.statusText === 'Forbidden'){
                errorMessage('#errorlogin','You need verification email');
            }
            else{
                errorMessage('#errorlogin','Connection failed. Please try again later');
            }
    })
});

// Checks if all variables are correct and register
     $(document).on('click','.create-btn',function(e){
        e.preventDefault();
        const username = $('#Rusername').val();
        const email = $('#email').val()
        const password = $('#Rpassword').val();
        const confirm_password = $('#confirm-password').val();
        let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let result = email.match(pattern);
        if(username.length < 4){
            errorMessage('#erroruser','Username must be at least 4 characters');
        return;
        }
        else{
            $('#erroruser').text('');
        }
        if (result){
            $('#erroremail').text('');
        }
        else{
            errorMessage('#erroremail','The email is invalid');
            return;
        }
        if (password === confirm_password){
            $('#errorpass').text('');
        }
        else{
            errorMessage('#errorpass','Passwords do not match');
            return;
        }
        $.ajax({
            url:'/register',
            method:'POST',
            data:{
                username : username,
                email: email,
                password: password,
            }
        })
        .done(function(data){
            resetRegisterPage();
            $('.login-container').show();
            $('.register-container').hide();
            errorMessage('#errorlogin',"User created successfully. Please verify your email to complete the registration","green");

        })
        .fail(function(error){
            errorMessage('#errordb',error.responseText);
            console.log(error.responseText);
        })


     });
       /////-------reset password -------/////

     $(document).on('click','.Creset-btn',function(e){
        e.preventDefault();
        const Password = $('#NewPassword').val();
        const ConfirmPassword = $('#confirmPassword').val();
        if (Password === ConfirmPassword){
        $.ajax({
            url:'/confirmReset',
            method:'PUT',
            data: {
                password: Password,
                token: token,
            }
        })
        .done(function(data){
            $('#NewPassword').val('');
            $('#confirmPassword').val('');
            $('.message').fadeIn();
            $('.reset-container').fadeOut();
            showMessage("Password reset successful. Redirecting to login page...",4000);
        })
        .fail(function(error){
            errorMessage('#errordb',error.responseText);
        })
    }
    else{
        errorMessage('#errorpass',"Passwords do not match. Please try again");
    }
     })
    
    ///-----forget password ----///
     $(document).on('click','.forgot-password', function(e){
        e.preventDefault();
        $('.login-container').hide();
        $('.forgot-container').show();
     })

     $(document).on('click','.reset-btn',function(e){
         e.preventDefault();
         const email = $('#R-email').val();
         $.ajax({
            url:'/resetpassword',
            method:"POST",
            data:{
                email: email,
            }
            })
            .done(function(data){
                errorMessage('#errorreset',"A password reset link has been sent to your email");
                $('#R-email').val('');
            })
            .fail(function(error){
                errorMessage('#errorreset',error.responseText);
            })
     });

         // move to register
     $(document).on('click','.register-btn',function(e){
        e.preventDefault();
         $('.login-container').hide();
         $('.register-container').show();
     })

             ///---backtoLogin----///
            $(document).on('click','.back-link',function(e){
             e.preventDefault();
             $('.login-container').show();
             $('.register-container').hide();
             $('.forgot-container').hide();
             resetRegisterPage();
             $('#R-email').val('');
          });


    }
