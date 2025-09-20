import { getuserdigi, getuseritems } from "./userDigiAndItems.js";
import { showMessage } from "./Messages.js";

export function navbar(){
/////--------navbar-------/////
        $(document).on('click', '.Statistic', function(e) {
        e.preventDefault();
        $('.container').hide();
        $('.battle-container').hide();
        getuserdigi('statistic');
        });


         $(document).on('click','.bag',function(e){
            e.preventDefault();
            setTimeout(() => {
                $('#digimon-select-container').hide();
                $('.battle-container').hide();
                $('.container').show();
            }, 500);
            getuseritems();
           })

        $(document).on('click','.Shop',function(e){
            e.preventDefault();
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
                $('#addDigimon').css('visibility', 'hidden');
                $('.battle-button').css('visibility', 'hidden');
                $('.battle-container').hide();
                $('.shopT').show();
                $('#pages').hide();
                $('#userTable').html(data); 
            })
            .fail(function(){
                console.error('Error fetching data:', error);
                showMessage('Error fatching data',2000);
            })
        })

        

    }