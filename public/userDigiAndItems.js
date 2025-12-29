import { showMessage } from "./Messages.js";

//displays all digimons that user have(for use item or battle)
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
            showMessage('Failed to load statistics.',500);
        })


}
//displays all items that user have (amount)
export async function getuseritems(index=0){
            var type = "all";
            if (window.innerWidth <= 768) {
                type = "mobile"
            }
            $.ajax({
                url:'/getuseritems',
                method:'GET',
                data:{
                    id : JSON.parse(sessionStorage.user).id,
                    type: type,
                    index: index,
                }
            })
            .done(function(data){
               showShopAndInventoryItems();
                if (type === "mobile"){
                      $('.mobile-digi').html(data);
                }
                else{
                    $('#userTable').html(data); 
                }
        
            })
            .fail(function(error){
                console.error('Error fetching data:', error);
                showMessage('Error fatching data',2000);

             });
    }
//displays all items in shop
export async function getshopitems(index=0){
         var type = "all";
            if (window.innerWidth <= 768) {
                type = "mobile"
            }
        await $.ajax({
                url:'/getshopitems',
                method:'GET',
                data:{
                type: type,
                index: index,
                },
            })
            .done(function(data){
                showShopAndInventoryItems();
                if (type === "mobile"){
                      $('.mobile-digi').html(data);
                }
                else{
                    $('#userTable').html(data); 
                }
            })
            .fail(function(){
                console.error('Error fetching data:', error);
                showMessage('Error fatching data',2000);
                
            })
    }
//Displays the Shop / Inventory items and hides all other main UI sections.
export function showShopAndInventoryItems() {
  $('.message').hide();
  $('.container').show();
  $('.digimonsT').hide();
  $('.bagT').hide();
  $('#addDigimon').hide();
  $('.battle-button').hide();
  $('.battle-container').hide();
  $('.shopT').show();
  $('#pages').hide();
}

