import { showMessage } from "../Messages.js";
import { getuserdigi, getuseritems } from "../userDigiAndItems.js";


export function inventory(){
////-------userinventory-------//////
        // Handle "Use" button click
       $(document).on('click','.btn-use',function(e){
        e.preventDefault();
        let itemName;
        let itemid;
        if (window.innerWidth <= 768 ) {
            itemName = $(this).data('name');
            itemid = $(this).data('id');
        }
        else{
            itemName = $(this).closest('tr').find('td')[1].innerText;
            itemid = $(this).closest('tr').find('td').eq(0).data('item');
        }
        $('.container').hide();
        getuserdigi('items',itemName,itemid);
       })
       // take all parmeters to upgrade stat
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
        .done(async function(){
            showMessage(`increase ${selected.data('name')} ${StatName} by 1.`,2000);
            $('#digimon-select-container').hide();
            setTimeout(async () => {
                await getuseritems();
            }, 1900);
    
        }).fail(function(){
            showMessage(`Failed to buy ${itemName}.`,2000);
            })
        
       })
}