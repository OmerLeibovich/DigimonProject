

import {calcDmg ,calcNew_hp,calc_stats } from './calculation.js';
import { getyourrandomDigi,getopponentrandomDigi,pages
    ,updateList,evolveDigi } from './create.js';
import {resetBattlesystem,resetRegisterPage} from './reset.js';



$(document).ready(function () {

        if(Havetoken){
            $('.login-container').hide();
            $('.reset-container').show();
        }
        if (isLoggedIn) {
        if (sessionStorage.user){
            $('.login-container').hide();
            $('#addDigimon').show();
            $('#DigiList').show();
            $('#userTable').show();
            $('.battle-button').show();
            $('.bar').show();
            updateList(); 
            pages()
            }
        else if (user.remamber === 'true'){
            const username = user.username;
            const password = user.password;
            $('#username').val(username);
            $('#password').val(password);
        }
    }
   


   
    // return list adjusted to the page number
    $(document).on('click','.btn-page',function(e){
        e.preventDefault();
        const page = $(this).data('page');
        updateList((page+1));
    })

    // ON MANY ITEMS with same element need class no ID
    $(document).on('click', '.openphoto', function (e) {
        e.preventDefault();
        $('#DigiPhoto').show();
        const img = $(this).find('img').attr("src"); 
        $('#photopage').attr('src', img);
        $('#DigiPhoto').on('click','.close-btn',function(e){
        e.preventDefault()
        $('#DigiPhoto').hide();
    })
      })
      // delete digimon from list
    $(document).on('click', '.deleteDigi', function (e) {
        e.preventDefault();
        const DigiId = $(this).data('id');
        $.ajax({
            method:'DELETE',
            url:'/deleteDigimon',
            data: {
                id : DigiId,
            }
        })
        .done(function(data){
            updateList();
            pages();
        })
        .fail(function(){
            alert("fail to delete digimon");
        })
  })
  // if digimon can evolve return the evovle of this digimon
  $(document).on('click','.evolveDigi', async function(e){
    e.preventDefault();
    const diginame = $(this).closest('tr').find('td')[1].innerText;
    const digiRank = $(this).closest('tr').find('td')[2].innerText;
    const digiLevel = $(this).closest('tr').find('td')[3].innerText;
    $('.message').fadeIn();
    $('.container').fadeOut();
    // setTimeout(() => {
    //      $('.message').fadeOut();
    //      $('.container').fadeIn();
    // }, 1500);
    const digiId = $(this).data('id');
    var rankVal = ["Baby I","Baby II","Child","Adult","Perfect","Ultimate","Armor","Hybrid"];
    var rank = ["Baby","In_traning","Rookie","Champion","Ultimate","Mega","Armor","Hybrid"];
     if ((digiRank === rank[0] && digiLevel > 6 ) || (digiRank === rank[1] && digiLevel > 10 )
        || (digiRank === rank[2] && digiLevel > 17 ) || 
    (digiRank === rank[3] && digiLevel > 30 ) || (digiRank === rank[4] && digiLevel > 45 )){


        $('.message').text(`you want to evolve ${diginame} ?`);
         $('.message').append("</br>");
         $('.message').append("<button class='yesbutton'>yes</button>");
        $('.message').append("<button class='nobutton'>no</button>");



        $(".yesbutton").click(async function() {
        const evoTree = await evolveDigi(diginame,rankVal[rank.indexOf(digiRank) + 1]);
        console.log(evoTree);
        const random = Math.floor(Math.random() * (evoTree.length));
        const [hp, attack, defense] = calc_stats(digiLevel);
        $.ajax({
            url:'/evolve',
            method:'PUT',
            data : {
                id: digiId,
                evolve: evoTree[random],
                rank: rank[rank.indexOf(digiRank) + 1],
                hp: hp,
                attack: attack,
                defense: defense,
            }
        })
        .done(function(data){
            $('.message').text(diginame + " evolve to: " + evoTree[random].name);
            setTimeout(() => {
            $('.message').fadeOut();
            $('.container').fadeIn();
            }, 3000);
            updateList();
        })
        .fail(function(error){
            alert("fail to evolve digimon");
        })
    })
     $(".nobutton").click(function() {
         $('.message').fadeOut();
         $('.container').fadeIn();
     })
    }
    else{
        $('.message').text("you still cant digivolve");
        setTimeout(() => {
            $('.message').fadeOut();
         $('.container').fadeIn();
        }, 3000);
    }

})

    // form to add random digimon
    $('#DigiForm').on('click','.submit-btn',function(e){ 
        e.preventDefault();       
        const photo = $('#photo').attr('src');
        const name = $('#name').text().split(" ").slice(1).join(" ");
        const rank = $('#rank').text().split(" ")[1];
        const level = $('#level').text().split(" ")[1];
        const attribute = $('#attribute').text().split(" ")[1];
        const hp = $('#hp').text().split(" ")[1];
        const attack = $('#attack').text().split(" ")[1];
        const defense = $('#defense').text().split(" ")[1];

        $.ajax({
            method: "POST",
            url: "/addDigimon",
            data: {
                Photo: photo,
                Name: name,
                Rank: rank,
                Level: level,
                Attribute: attribute,
                Hp: hp,
                Attack: attack,
                Defense: defense,
            }
        })
        .done(function(data){
            $('#DigiForm').hide(); 
            updateList();
            pages()
            $('#addDigimon').prop('disabled', false);
        })
        .fail(function(){
            alert("fail to add digimon");
        });
    });

       // open form to add digimon
    $('#addDigimon').on("click",function() {
        getyourrandomDigi();
        $('#DigiForm').show();
        $('#addDigimon').prop('disabled', true);
        
    })
    // close digimon form
    $('#DigiForm').on('click','.cancel-btn',function(e){
        e.preventDefault();
        $('#DigiForm').hide();
        $('#addDigimon').prop('disabled', false);
    })

    $(document).on('click', '.dropdown-toggle', function (e) {

    });
    
    ///// ---- battle system ------/////


    
     // change photo
     $(document).on('change', '#digimon-select', function () {
        const selected = $(this).find(':selected');
        const photo = selected.data('photo');
        if (photo) {
            $('#selected-photo').attr('src', photo).show();
        } else {
            $('#selected-photo').hide();
        }
        });
    
        // calc new damage in battle and new hp after got this damage
    $(document).on('click','.battle-btn',function(e){
        e.preventDefault();
        const { yourDmg, opponentDmg } = calcDmg($('#your-battlePhoto').data('at'),$('#your-battlePhoto').data('de'),
                $('#opponent-battlePhoto').data('at'),$('#opponent-battlePhoto').data('de'));
        calcNew_hp($('#your-battlePhoto').data('hp'),$('#your-battlePhoto').data('maxhp'),yourDmg
        ,$('#opponent-battlePhoto').data('hp'),$('#opponent-battlePhoto').data('maxhp'),opponentDmg)
        })

        // have chance of 90% to exit from battle
    $(document).on('click','.run-btn',function(e){
        e.preventDefault();
        $('.run-btn').prop('disabled', true);
        const runChance = Math.floor(Math.random() * 10) + 1;
        if (runChance === 1){
            $('.battle-message').text("You couldn’t get away!");
            setTimeout(() => {
            $('.battle-message').text("What will your next move?");
        }, 1700);

        }
        else{
            $('.battle-message').text("You successfully fled from battle!");
        setTimeout(() => {
            $('.battle-container').hide();
            $('.container').show();
        }, 1700);
        }
        $('.run-btn').prop('disabled', false);
    })
    // show user digimons to choose for battle
     $(document).on('click','.battle-button',function(e){
        e.preventDefault();
        $('#digimon-select-container').empty().hide();
        $('.container').hide();
        $.ajax({
            url:'/getuserdigis',
            method:'GET',
        })
        .done(function(data){
             $('#digimon-select-container').html(data).show();
        })
        .fail(function(data){
                alert("fail to getDigis");
        })
     })
     $(document).on('click','.btn-success',function(e){
         e.preventDefault();
         resetBattlesystem();
         const selected = $('#digimon-select option:selected');
         const selectedValue = selected.val();
         if(selectedValue !== ""){

         $('#your-battlePhoto').data('id',selected.data('id'));

          $('#digimon-select-container').hide();
           $('.battle-container').show();
           getopponentrandomDigi(selected.data('rank'),selected.data('level'),
           selected.data('photo'),selected.data('name'),
           selected.data('hp'),selected.data('at'),selected.data('de'));
         }
         else{
            alert("You need to choose digimon");
         }
     })
     $(document).on('click','.back-link',function(e){
        e.preventDefault();
        $('.login-container').show();
        $('.register-container').hide();
        $('.forgot-container').hide();
        resetRegisterPage();
        $('#R-email').val('');
     });



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
            sessionStorage.setItem("user", JSON.stringify({ username: username}));
            $('.login-container').hide();
            $('#addDigimon').show();
            $('#DigiList').show();
            $('#userTable').show();
            $('.battle-button').show();
            $('.bar').show();
            updateList(); 
            pages();
        
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

    // move to register
     $(document).on('click','.register-btn',function(e){
        e.preventDefault();
         $('.login-container').hide();
         $('.register-container').show();
     })


     /// ------- register ------ ///
     
     // func show error message
     function errorMessage(id,message){
        $(id).text(message).css({
            'color': 'red',
            'font-size': '12px'
            });
     }
     // Checks if all variables are correct and register
     $(document).on('click','.create-btn',function(e){
        e.preventDefault();
        const username = $('#Rusername').val();
        const email = $('#email').val()
        const password = $('#Rpassword').val();
        const confirm_password = $('#confirm-password').val();
        var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var result = email.match(pattern);
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
            errorMessage('#errorlogin',"User created successfully. Please verify your email to complete the registration");
        })
        .fail(function(error){
            errorMessage('#errordb',error.responseText);
            console.log(error.responseText);
        })


     })

     ////------- forget password ------ //////

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
     })


     /////-------reset password -------/////

     $(document).on('click','.Creset-btn',function(e){
        e.preventDefault();
           console.log("hey");
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
            console.log("hey");
            $('#NewPassword').val('');
            $('#confirmPassword').val('');
            $('.message').fadeIn();
            $('.message').text("Password reset successful. Redirecting to login page...");
            $('.reset-container').fadeOut();

            setTimeout(() => {
                $('.message').fadeOut();
                $('.login-container').fadeIn();
            }, 4000);
        })
        .fail(function(error){
            errorMessage('#errordb',error.responseText);
        })
    }
    else{
        errorMessage('#errorpass',"Passwords do not match. Please try again");
    }
     })
});



