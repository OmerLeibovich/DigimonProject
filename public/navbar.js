import { getshopitems, getuserdigi, getuseritems } from "./userDigiAndItems.js";
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
        // move to display statistic window
        $(document).on('click', '.Statistic', function(e) {
        e.preventDefault();
        hideNavBar();
        $('.container').hide();
        $('.battle-container').hide();
        getuserdigi('statistic');
        });
        // return to home page
        $(document).on('click','.home',async function(e){
        e.preventDefault();
        hideNavBar();
        $('.shopT').hide();
        $('.bagT').hide();
        showShopAndInventoryPages("Loading your Digimons...");
        if (window.innerWidth <= 768) {
        await updateList();
        }
        else{
        await updateList(1);
        } 
        pages("digimons");
    });

        // move to display user items
         $(document).on('click','.bag',async function(e){
            e.preventDefault();
            hideNavBar();
            $('.actions-wrapper').hide();
            showShopAndInventoryPages("Fetching your inventory...");
            await getuseritems();
            $('.title').html('InventoryPage');
           });
        //move to display items in shop
        $(document).on('click','.Shop',async function(e){
            e.preventDefault();
             $('.actions-wrapper').hide();
             var type = "all";
            if (window.innerWidth <= 768) {
                type = "mobile"
            }
            hideNavBar();
            showShopAndInventoryPages("Please wait, loading shop items...");
            await getshopitems();
            $('.title').html('ShopPage');
        });

    }
// display waiting message for shop and bag
export function showShopAndInventoryPages(message) {
    $('#digimon-select-container').hide();
    $('.battle-container').hide();
    $('.container').hide();
    $('.message').text(message);
    $('.message').show();
}

      
      