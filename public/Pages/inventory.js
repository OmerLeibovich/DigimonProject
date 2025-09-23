import { showMessage } from "../Messages.js";
import { getuserdigi, getuseritems } from "../userDigiAndItems.js";


export function inventory(){
////-------userinventory-------//////
       $(document).on('click','.btn-use',function(e){
        e.preventDefault();
        const itemid = $(this).closest('tr').find('td').eq(0).data('item');
        const itemName = $(this).closest('tr').find('td')[1].innerText;
        $('.container').hide();
        getuserdigi('items',itemName,itemid);
       })
       $(document).on('click','#use-digimon',function(e){
        e.preventDefault();
        const id = $('.titleItem').data('id');
        const itemName = $('.titleItem').data('name');
        const selected = $('#digimon-select option:selected');
        let StatName = itemName.replace(/UP$/, '');
        $.ajax({
            url:'/useitem',
            method:'PUT',
            data:{
                itemid: id,
                digimonid: selected.data('id'),
                userid: JSON.parse(sessionStorage.user).id,
                stat: StatName.toLowerCase(),
            }
        })
        .done(function(){
            $('.table-container').hide();
            showMessage(`increase ${selected.data('name')} ${StatName} by 1.`,2000);
            $('#digimon-select-container').hide();
            $('.table-container').show();
            getuseritems();
    
        }).fail(function(){
            showMessage(`Failed to buy ${itemName}.`,2000);
            })
        
       })
}