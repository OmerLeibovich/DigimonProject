

import {calc_stats } from './calculation.js';
import { getyourrandomDigi,pages
    ,updateList,evolveDigi,createCircle } from './create.js';
import {resetRegisterPage} from './reset.js';
import {battle}from './battlesystem.js'; 


export async function getuserdigi(page,itemName = null,itemId = null){
        $.ajax({
            url: '/getuserdigis',
            method: 'GET',
            data:{
                page: page,
            }
        })
        .done(function(data) {
            $('#digimon-select-container').html(data).show();
            if (page === 'items'){
                    $('#submit-digimon').hide();
                    $('.titleItem').text(`use ${itemName} on your Digimon`).attr('data-id', itemId);;
            }
            if (page === 'battle'){
                    $('#use-digimon').hide();
            }
        })
        .fail(function() {
            alert('Failed to load statistics.');
        })


}
$(document).ready(function () {

    
    
        let currentChart = null;

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


    function showMessage(text, duration) {
    $('.message').text(text).fadeIn();
    $('.container').fadeOut();
    setTimeout(() => {
        $('.message').fadeOut();
        $('.container').fadeIn();
    }, duration);
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
    const digiId = $(this).data('id');
    let rankVal = ["Baby I","Baby II","Child","Adult","Perfect","Ultimate","Armor","Hybrid"];
    let rank = ["Baby","In_traning","Rookie","Champion","Ultimate","Mega","Armor","Hybrid"];
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
            showMessage(`${diginame}  " evolve to: "  ${evoTree[random].name}`,3000);
            updateList();
        })
        .fail(function(error){
            showMessage("fail to evolve digimon",3000);
        })
    })
     $(".nobutton").click(function() {
        showMessage("",0);
     })
    }
    else{
        showMessage("you still cant digivolve",3000);
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
    $('#addDigimon').on("click", async function() {
        $('#DigiForm')[0].reset();
        await getyourrandomDigi();
        $('#addDigimon').prop('disabled', true);
        
    })
    // close digimon form
    $('#DigiForm').on('click','.cancel-btn',function(e){
        e.preventDefault();
        $('#DigiForm').hide();
        $('#addDigimon').prop('disabled', false);
    })

       $(document).on('click','.back-link',function(e){
        e.preventDefault();
        $('.login-container').show();
        $('.register-container').hide();
        $('.forgot-container').hide();
        resetRegisterPage();
        $('#R-email').val('');
     });
    
    ///// ---- battle system ------/////
    battle();

    

 
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


    /////--------navbar-------/////
        $(document).on('click', '.Statistic', function(e) {
        e.preventDefault();
        $('.container').hide();
        getuserdigi('statistic');
        });


         $(document).on('click','.bag',function(e){
            e.preventDefault();
            setTimeout(() => {
                $('#digimon-select-container').hide();
                $('.container').show();
            }, 200);
            $.ajax({
                url:'/getuseritems',
                method:'GET',
                data:{
                    id : JSON.parse(sessionStorage.user).id,
                }
            })
            .done(function(data){
                $('.digimonsT').hide();
                $('.shopT').hide();
                $('#addDigimon').css('visibility', 'hidden');
                $('.battle-button').css('visibility', 'hidden');
                $('.bagT').show();
                $('#userTable').html(data); 
            })
            .fail(function(error){
                console.error('Error fetching data:', error);
            })
           })

        $(document).on('click','.Shop',function(e){
            e.preventDefault();
            setTimeout(() => {
                $('#digimon-select-container').hide();
                $('.container').show();
            }, 200);
            $.ajax({
                url:'/getshopitems',
                method:'GET',
            })
            .done(function(data){
                $('.digimonsT').hide();
                $('.bagT').hide();
                $('#addDigimon').css('visibility', 'hidden');
                $('.battle-button').css('visibility', 'hidden');
                $('.shopT').show();
                $('#userTable').html(data); 
            })
            .fail(function(error){
                console.error('Error fetching data:', error);
            })
        })


        ////-----statistic-----////

        $(document).on('click','.btn-choose',function (e){
            e.preventDefault();
            const selected = $('#digimon-statistic option:selected');
            let id;
            let userid;
            let name;
            const photo = selected.data('photo');
            if (photo) {
                console.log(photo);
            $('#statistic-photo').attr('src', photo).show();
            }
            else {
            $('#statistic-photo').hide();
            }   
            if(selected.val() !== ""){
                 id = selected.data('id');
                userid = false;
                name = selected.data('name');
            }
            else{
                id = JSON.parse(sessionStorage.user).id;
                userid = true;
                name = "all digimons";
            }
            $.ajax({
                url:'/chartdata',
                method:'GET',
                data: {
                    id: id,
                    userid: userid,
                }
            })
            .done(function(data){
                   if (currentChart) {
                        currentChart.destroy();
                    }
                currentChart = new Chart("digiChart", {
                type: "bar",
                data: {
                    labels: ["wins","loses"],
                    datasets: [{
                    backgroundColor: ["blue","red"],
                    data: data.values,
                    }]
                },
                 options: {
                    legend: {display: false},
                    scales: {
                    yAxes: [{
                        ticks: {
                        beginAtZero: true
                        }
                    }]
                    },
                title: {
                display: true,
                text: name
                }
                },
            })
            createCircle(data.values);
            })
            .fail(function(error){
                alert('Failed to load digimon information.');
            })
        })
        
        
    ///------shop------///
        $(document).on("click",".btn-buy", function(e){
            const itemid = $(this).closest('tr').find('td').eq(0).data('item');
            const itemName = $(this).closest('tr').find('td')[1].innerText;
            const amountInput = $(this).closest('tr').find('.amount-input');
            const amount = amountInput.val();

            if (amount > 0 ){
                    $.ajax({
                        url:'/additem',
                        method:'POST',
                        data :{
                            userid : JSON.parse(sessionStorage.user).id,
                            itemid : itemid,
                            amount : amount,
                        }
                    })
                    .done(function(data){
                        if (data.quantity > amount){
                            showMessage(`updated amount of ${itemName} add more ${amount} `,2500);
                        }
                        else{
                        showMessage(`completed to buy ${amount} of ${itemName} `,2500);
                        }
                        amountInput.val('');
                    })
                    .fail(function(error){
                        alert(`Failed to buy ${itemName}.`);
                    })
            }
            else{
                showMessage(`amount of item must bigger then 0 `,2000);
                amountInput.val('');
            }
        })


    ////-------userbag-------//////
   $(document).on('click','.btn-use',function(e){
    e.preventDefault();
    const itemid = $(this).closest('tr').find('td').eq(0).data('item');
    const itemName = $(this).closest('tr').find('td')[1].innerText;
    $('.container').hide();
    getuserdigi('items',itemName,itemid);
   })
   $(document).on('click','#use-digimon',function(e){
    e.preventDefault();
    const id = $('.titleItem').data('id');
    const selected = $('#digimon-select option:selected');
    console.log(id);
    console.log(selected.data('id'))
    console.log(JSON.parse(sessionStorage.user).id);
    
   })

});



