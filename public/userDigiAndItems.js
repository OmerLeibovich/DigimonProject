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