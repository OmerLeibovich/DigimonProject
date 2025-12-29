import { showMessage } from "../Messages.js";
export function shop(){
         
        ///------shop------///
        // Handle "Buy" button click
            $(document).on("click",".btn-buy", function(e){
                let itemid;
                let itemName;
                let amountInput;
                let amount;
                 if (window.innerWidth <= 768 ) {
                    itemid =  $(this).closest('.mobile-card').data('id');
                    itemName = $(this).closest('.mobile-card').find('.item-name').text().trim();
                    amountInput = $(this).closest('.mobile-card').find('.amount-input');
                    amount = amountInput.val();
                 }
                 else{
                    itemid = $(this).closest('tr').find('td').eq(0).data('item');
                    itemName = $(this).closest('tr').find('td')[1].innerText;
                    amountInput = $(this).closest('tr').find('.amount-input');
                    amount = amountInput.val();
                 }
                const money = parseInt(sessionStorage.money);
                if (amount > 0){
                    if(money>(amount*100)){
                        $.ajax({
                            url:'/additem',
                            method:'POST',
                            data :{
                                userid : JSON.parse(sessionStorage.user).id,
                                itemid : itemid,
                                amount : amount,
                                money: money,
                            }
                        })
                        .done(function(data){
                            if (data.quantity-amount >= 0){
                                showMessage(`updated amount of ${itemName} add more ${amount} `,2500);
                            }
                            else{
                            showMessage(`completed to buy ${amount} of ${itemName} `,2500);
                            }
                            amountInput.val('');
                            sessionStorage.setItem("money", data.newMoney);
                            $(".money-display").html(`<i class="fa fa-money"></i> : ${data.newMoney}`);
                        })
                        .fail(function(){
                            showMessage(`Failed to buy ${itemName}.`,2000);
                        })
                }
                  else{
                showMessage(`you have only ${money}$ and you try to buy in ${(amount*100)}$ `,2000);
                amountInput.val('');
            }
            }
                else{
                    showMessage(`amount of item must bigger then 0 `,2000);
                    amountInput.val('');
                }
            })
    
    
}