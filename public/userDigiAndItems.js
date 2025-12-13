import { showMessage } from "./Messages.js";

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
export async function getuseritems(index=0){
    return new Promise((resolve, reject) => {
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
                $('.digimonsT').hide();
                $('.shopT').hide();
                $('#addDigimon').hide();
                $('.battle-button').hide();
                $('.bagT').show();
                $('#pages').hide();
                if (type === "mobile"){
                      $('.mobile-digi').html(data);
                }
                else{
                    $('#userTable').html(data); 
                }
                 resolve();
            })
            .fail(function(error){
                console.error('Error fetching data:', error);
                showMessage('Error fatching data',2000);
                 reject(error);
             });
         });
            
    }