import {calcDmg ,calcNew_hp,calc_stats } from './calculation.js';
import { getyourrandomDigi,getopponentrandomDigi,pages
    ,updateList,resetBattlesystem,evolveDigi } from './create.js';



$(document).ready(function () {


        if (isLoggedIn) {
            $('.login-container').hide();
            $('#addDigimon').show();
            $('#DigiList').show();
            $('#userTable').show();
            $('.battle-button').show();
            $('.bar').show();
            updateList(); 
            pages()
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

  $(document).on('click','.evolveDigi', async function(e){
    e.preventDefault();
    const diginame = $(this).closest('tr').find('td')[1].innerText;
    const digiRank = $(this).closest('tr').find('td')[2].innerText;
    const digiLevel = $(this).closest('tr').find('td')[3].innerText;
    const digiId = $(this).data('id');
    var rankVal = ["Baby I","Baby II","Child","Adult","Perfect","Ultimate","Armor","Hybrid"];
    var rank = ["Baby","In_traning","Rookie","Champion","Ultimate","Mega","Armor","Hybrid"];
     if ((digiRank === rank[0] && digiLevel > 6 ) || (digiRank === rank[1] && digiLevel > 10 )
        || (digiRank === rank[2] && digiLevel > 17 ) || 
    (digiRank === rank[3] && digiLevel > 30 ) || (digiRank === rank[4] && digiLevel > 45 )){
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
            alert(diginame + " evolve to: " + evoTree[random].name)
            updateList();
        })
        .fail(function(error){
            alert("fail to evolve digimon");
        })
    }
    else{
        alert("you still cant digivolve");
    }

})

//  $.ajax({
//             url:'/evolve',
//             method:'GET',
//             data : {
//                 id: digiId,
//                 rank : rankVal[rank.indexOf(digiRank)],
//             }
//         })
//         .done(function(data){
//             alert(diginame + " evolve to: " + data)
//         })
//         .fail(function(error){
//             alert("fail to evolve digimon");
//         })


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


       
    $('#addDigimon').on("click",function() {
        getyourrandomDigi();
        $('#DigiForm').show();
        $('#addDigimon').prop('disabled', true);
        
    })

    $('#DigiForm').on('click','.cancel-btn',function(e){
        e.preventDefault();
        $('#DigiForm').hide();
        $('#addDigimon').prop('disabled', false);
    })

    $(document).on('click', '.dropdown-toggle', function (e) {

    });
    
    ///// ---- battle system ------/////
    

    $(document).on('click','.battle-btn',function(e){
        e.preventDefault();
        const { yourDmg, opponentDmg } = calcDmg($('#your-battlePhoto').data('at'),$('#your-battlePhoto').data('de'),
                $('#opponent-battlePhoto').data('at'),$('#opponent-battlePhoto').data('de'));
        calcNew_hp($('#your-battlePhoto').data('hp'),$('#your-battlePhoto').data('maxhp'),yourDmg
        ,$('#opponent-battlePhoto').data('hp'),$('#opponent-battlePhoto').data('maxhp'),opponentDmg)
        })


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



 //// ----- login -----////

     $(document).on('click','.login-btn',function(e){
        e.preventDefault();
        const username = $('#username').val();
        const password = $('#password').val();
        $.ajax({
            method:'POST',
            url:'/login',
            data: {
                username: username,
                password: password,
            }
        })
        .done(function(data){
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
            else{
                errorMessage('#errorlogin','Connection failed. Please try again later');
            }
    })
});

    
     $(document).on('click','.register-btn',function(e){
        e.preventDefault();
         $('.login-container').hide();
         $('.register-container').show();
     })


     /// ------- register ------ ///

     function errorMessage(id,message){
        $(id).text(message).css({
            'color': 'red',
            'font-size': '12px'
            });
     }

     $(document).on('click','.create-btn',function(e){
        e.preventDefault();
        const username = $('#Rusername').val();
        const email = $('#email').val()
        const password = $('#Rpassword').val();
        const confirm_password = $('#confirm-password').val();
        var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var result = email.match(pattern);
        if(username.length < 5){
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
            $('.login-container').show();
            $('.register-container').hide();
        })
        .fail(function(error){
            errorMessage('#errordb',error.responseText);
            console.log(error.responseText);
        })


     })
});
