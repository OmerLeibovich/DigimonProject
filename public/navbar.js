
import { getuserdigi, getuseritems } from "./userDigiAndItems.js";
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
        await updateList(1); 
        pages("digimons");
    });


         $(document).on('click','.bag',function(e){
            e.preventDefault();
            hideNavBar();
            setTimeout(() => {
                $('#digimon-select-container').hide();
                $('.battle-container').hide();
                $('#addDigimon').hide();
                $('.battle-button').hide();
                $('.container').show();
            }, 500);
            getuseritems();
            $('.title').html('InventoryPage');
           });

        $(document).on('click','.Shop',function(e){
            e.preventDefault();
            hideNavBar();
            setTimeout(() => {
                $('#digimon-select-container').hide();
                $('.container').show();
            }, 500);
            $.ajax({
                url:'/getshopitems',
                method:'GET',
            })
            .done(function(data){
                $('.digimonsT').hide();
                $('.bagT').hide();
                $('#addDigimon').hide();
                $('.battle-button').hide();
                $('.battle-container').hide();
                $('.shopT').show();
                $('#pages').hide();
                $('#userTable').html(data); 
                $('.title').html('ShopPage');
            })
            .fail(function(){
                console.error('Error fetching data:', error);
                showMessage('Error fatching data',2000);
            })
        });

    }


    
