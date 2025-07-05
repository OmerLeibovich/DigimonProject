import {calcDmg ,calcNew_hp } from './calculation.js';
import { getyourrandomDigi,getopponentrandomDigi,pages
    ,updateList,resetBattlesystem } from './create.js';
$(document).ready(function () {


        if (isLoggedIn) {
            $('.login-container').hide();
            $('#addDigimon').show();
            $('#DigiList').show();
            $('#userTable').show();
            $('.battle-button').show();
            updateList(); 
            pages()
        }
   

   
    // return 
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
        console.log(DigiId);
        $.ajax({
            method:'DELETE',
            url:'/deleteDigimon',
            data: {
                id : DigiId,
            }
        })
        .done(function(data){
            updateList();
        })
        .fail(function(){
            alert("fail to delete digimon");
        })
  })



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
    




    ///// ---- battle system ------/////
    

    $(document).on('click','.battle-btn',function(e){
        e.preventDefault();
        const { yourDmg, opponentDmg } = calcDmg($('#your-battlePhoto').data('at'),$('#your-battlePhoto').data('de'),
                $('#opponent-battlePhoto').data('at'),$('#opponent-battlePhoto').data('de'));
        calcNew_hp($('#your-battlePhoto').data('hp'),$('#your-battlePhoto').data('maxhp'),yourDmg
        ,$('#opponent-battlePhoto').data('hp'),$('#opponent-battlePhoto').data('maxhp'),opponentDmg)
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
         console.log(username);
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
            updateList(); 
            pages()
        
    })
        .fail(function(data){
                alert("fail to connect");
        })
    })
});
