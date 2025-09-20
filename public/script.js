

import {pages,updateList} from './create.js';
import {battleSystem}from './battlesystem.js'; 
import { accountSystem } from './accountSystem.js';
import { navbar } from './navbar.js';
import { statistic } from './Pages/statistic.js';
import { inventory } from './Pages/inventory.js';
import { shop } from './Pages/shop.js';
import { table } from './tableFunc.js';



    $(document).ready(function () {
    if (mode === "reset") {
        $('.login-container').hide();
        $('.reset-container').show();
    } 
    else if (mode === "loggedIn") {
        $('.login-container').hide();
        $('#addDigimon').show();
        $('#DigiList').show();
        $('#userTable').show();
        $('.battle-button').show();
        $('.bar').show();
        updateList(); 
        pages("digimons");
    } 
    else {
        $('.login-container').show();
    }
    });


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