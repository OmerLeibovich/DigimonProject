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
    // check the screen size for manu(navbar)
    if (window.innerWidth <= 768) {
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


        // check if have token for reset password
        if(Havetoken){
            $('.login-container').hide();
            $('.reset-container').show();
        }
        // check if user is logged in (via session or "remember me")
        if (isLoggedIn) {
        if (sessionStorage.user){
            $('.login-container').hide();
            $('#addDigimon').show();
            $('#DigiList').show();
            $('#userTable').show();
            $('.battle-button').show();
            $('.bar').show();
            $(".money-display").html(`<i class="fa fa-money"></i> : ${sessionStorage.money}`);
            if (window.innerWidth <= 768) {
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
