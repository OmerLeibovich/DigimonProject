

import {pages,updateList} from './create.js';
import {battleSystem}from './battlesystem.js'; 
import { accountSystem } from './accountSystem.js';
import { navbar } from './navbar.js';
import { statistic } from './Pages/statistic.js';
import { inventory } from './Pages/inventory.js';
import { shop } from './Pages/shop.js';
import { table } from './tableFunc.js';



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