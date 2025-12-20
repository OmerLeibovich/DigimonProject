
import { getshopitems, getuserdigi, getuseritems } from "./userDigiAndItems.js";
import { showMessage } from "./Messages.js";
import { updateList,pages } from "./create.js";

//// to hide navbar after click only in mobile
export function hideNavBar(){
     if (window.innerWidth <= 768) {
         $('.nav-links').slideToggle();
     }
     else{
        return;
     }
}

export function navbar(){
/////--------navbar-------/////
        $(document).on('click', '.Statistic', function(e) {
        e.preventDefault();
        hideNavBar();
        $('.container').hide();
        $('.battle-container').hide();
        getuserdigi('statistic');
        });
        
        $(document).on('click','.home',async function(e){
        e.preventDefault();
        hideNavBar();
        $('.actions-wrapper').show();
        $('#userTable').empty();
        $('.title').html('HomePage');
        $('#digimon-select-container').hide();
        $('.battle-container').hide();
        $('.container').show();
        $('.digimonsT').show();
        $('.shopT').hide();
        $('.bagT').hide();
        $('#addDigimon').show();
        $('.battle-button').show();
        $('#pages').show();
        if (window.innerWidth <= 768) {
            await updateList();
        }
        else{
        await updateList(1);
        } 
        pages("digimons");
    });


         $(document).on('click','.bag',async function(e){
            e.preventDefault();
            hideNavBar();
            $('.actions-wrapper').hide();
            setTimeout(() => {
                $('#digimon-select-container').hide();
                $('.battle-container').hide();
                $('.container').show();
            }, 500);
            await getuseritems();
            $('.title').html('InventoryPage');
           });

        $(document).on('click','.Shop',async function(e){
            e.preventDefault();
             $('.actions-wrapper').hide();
             var type = "all";
            if (window.innerWidth <= 768) {
                type = "mobile"
            }
            hideNavBar();
            setTimeout(() => {
                $('#digimon-select-container').hide();
                $('.battle-container').hide();
                $('.container').show();
            }, 500);
            await getshopitems();
            $('.title').html('ShopPage');
        });

    }


    
