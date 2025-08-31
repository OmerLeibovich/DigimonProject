

import {pages,updateList} from './create.js';
import {battleSystem}from './battlesystem.js'; 
import { accountSystem } from './accountSystem.js';
import { navbar } from './navbar.js';
import { statistic } from './Pages/statistic.js';
import { inventory } from './Pages/inventory.js';
import { shop } from './Pages/shop.js';
import { table } from './tableFunc.js';


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
                    $('.titleItem').text(`use ${itemName} on your Digimon`).attr('data-id', itemId).attr('data-name', itemName);
            }
            if (page === 'battle'){
                    $('#use-digimon').hide();
            }
        })
        .fail(function() {
            alert('Failed to load statistics.');
        })


}
    export async function getuseritems(){
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
                $('#pages').hide();
                $('#userTable').html(data); 
            })
            .fail(function(error){
                console.error('Error fetching data:', error);
                showMessage('Error fatching data',2000);
            })
    }


    export function showMessage(text, duration) {
    $('.message').text(text).fadeIn();
    $('.container').fadeOut();
    setTimeout(() => {
        $('.message').fadeOut();
        $('.container').fadeIn();
    }, duration);
}
  // func show error message
     export function errorMessage(id,message){
        $(id).text(message).css({
            'color': 'red',
            'font-size': '12px'
            });
     }
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
            pages("digimons")
            }
        else if (user.remamber === 'true'){
            const username = user.username;
            const password = user.password;
            $('#username').val(username);
            $('#password').val(password);
        }
    }

    ///----table----////
    table();

    ///// ---- battle system ------/////
    battleSystem();

    //// ----- login -----////
    /// ------- register ------ ///
    ///---reset+forget password----///
    accountSystem();

    /////--------navbar-------/////
       navbar();

        ////-----statistic-----////
        statistic();

        
    ///------shop------///
     shop();

    ////-------userinventory-------//////
    inventory();
   
});