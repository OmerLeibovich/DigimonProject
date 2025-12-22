

import {pages,updateList} from './create.js';
import {battleSystem}from './battlesystem.js'; 
import { accountSystem } from './accountSystem.js';
import { navbar } from './navbar.js';
import { statistic } from './Pages/statistic.js';
import { inventory } from './Pages/inventory.js';
import { shop } from './Pages/shop.js';
import { table } from './tableFunc.js';
import { MobileDigi } from './mobileFunc.js';



$(document).ready(async function () {

    let isAnimating = false;

    if (window.innerWidth <= 1024) {
    $('.menu-toggle').click(function () {
        if (isAnimating) return;
        isAnimating = true;
        $('.nav-links').slideToggle(200, function () {
        isAnimating = false;
        });
    });

    $('.main-wrapper').click(function () {
        if (isAnimating) return;
        if ($('.nav-links').is(':visible')) {
        isAnimating = true;
        $('.nav-links').slideUp(200, function () {
            isAnimating = false;
        });
        }
    });
    }



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
            $(".money-display").html(`<i class="fa fa-money"></i> : ${sessionStorage.money}`);
            if (window.innerWidth <= 1024) {
                await updateList();
                $('.actions-wrapper').css('display','flex');
            }
            else{
                 await updateList(1); 
            }
            pages("digimons")
            $('.title').html('HomePage')
            }
        else if (user.remamber === 'true'){
            const username = user.username;
            const password = user.password;
            $('#username').val(username);
            $('#password').val(password);
        }
    }
    if (!isLoggedIn && window.innerWidth <= 768 ) {
        $('.actions-wrapper').css('display','none');
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
   


    ////------------Mobile--------///////
        MobileDigi();
});
