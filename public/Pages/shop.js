import { showMessage } from "../Messages.js";
export function shop(){
         
        ///------shop------///
            $(document).on("click",".btn-buy", function(e){
                const itemid = $(this).closest('tr').find('td').eq(0).data('item');
                const itemName = $(this).closest('tr').find('td')[1].innerText;
                const amountInput = $(this).closest('tr').find('.amount-input');
                const amount = amountInput.val();
                const money = user.money;
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
                            if (data.quantity-amount > 0){
                                showMessage(`updated amount of ${itemName} add more ${amount} `,2500);
                            }
                            else{
                            showMessage(`completed to buy ${amount} of ${itemName} `,2500);
                            }
                            amountInput.val('');
                            user.money = data.newMoney;
                              $(".money-display").html(`<i class="fa fa-money"></i> : ${user.money}`);
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