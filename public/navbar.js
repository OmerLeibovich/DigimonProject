import { getuserdigi, getuseritems } from "./userDigiAndItems.js";
import { showMessage } from "./Messages.js";
import { updateList,pages } from "./create.js";

export function navbar(){
/////--------navbar-------/////
        $(document).on('click', '.Statistic', function(e) {
        e.preventDefault();
        $('.container').hide();
        $('.battle-container').hide();
        getuserdigi('statistic');
        });

        $(document).on('click','.home',function(e){
        e.preventDefault();
         setTimeout(() => {
        $('#digimon-select-container').hide();
        $('.battle-container').hide();
        $('.container').show();
        $('.digimonsT').show();
        $('.shopT').hide();
        $('.bagT').hide();
        $('#addDigimon').show();
        $('.battle-button').show();
        $('#pages').show();
        updateList(); 
        pages("digimons");
            }, 600);
    });


         $(document).on('click','.bag',function(e){
            e.preventDefault();
            setTimeout(() => {
                $('#digimon-select-container').hide();
                $('.battle-container').hide();
                $('#addDigimon').hide();
                $('.battle-button').hide();
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
                $('#addDigimon').hide();
                $('.battle-button').hide();
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