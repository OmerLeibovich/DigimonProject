import { updateList } from "./create.js"; 
    // culc the level of digimon according to his rank
  export  function calc_level(rank){
         if (rank === 'Baby'){
            return(Math.floor(Math.random() * (7 - 1) + 1));
         }
         else if(rank === 'In_traning'){
            return(Math.floor(Math.random() * (11 - 7) + 7));
         }
         else if(rank === 'Rookie'){
            return(Math.floor(Math.random() * (18 - 11) + 11));
         }
         else if(rank === 'Champion'){
            return(Math.floor(Math.random() * (31 - 18) + 18));
         }
         else if(rank === 'Ultimate'){
            return(Math.floor(Math.random() * (46 - 31) + 31));
         }
         else if(rank === 'Mega'){
            return(Math.floor(Math.random() * (100 - 46) + 46));
         }
         else{
            return(Math.floor(Math.random() * (100 - 18) + 18));
         }
    }
    
    // culc base stats according to him level
   export function calc_stats(level){
        var hp = Math.floor(Math.random() * ((level*5.5) - (level*3)) + (level*3));
        var attack = Math.floor(Math.random() * ((level*5.5) - (level*3)) + (level*3));
        var defense = Math.floor(Math.random() * ((level*2.75) - (level*1.5)) + (level*1.5));
        return [hp, attack, defense];
    }

     
 // calc hp every side after any attack
   export function calcNew_hp(yourHp,yourMaxHp,yourDmg,opponentHp,opponentMaxHp,opponetDmg){
        var yourNewHp = yourHp - opponetDmg;
        var opponentNewHp = opponentHp - yourDmg;
        var finish = false;
        var result;
        var endMessage ;
        const opponentName = $('#opponent-battleName').text();
        const yourName = $('#your-battleName').text();
        if (opponentNewHp < 1){
           finish = true;
           result = "wins";
           opponentNewHp = 0;
           endMessage = `you won ${yourName} defeat your opponent ${opponentName},you got +30 experience`;
        }
        else if(yourNewHp < 1){
            finish = true;
            result = "loses";
            yourNewHp = 0;
            endMessage = `you lose ${opponentName} defeat your digimon ${yourName},you got -15 experience`;
        }

        // your attack
        $('#opponent-battlePhoto').data('hp', opponentNewHp);
        $('.opponent-progress-bar').css('width', (opponentNewHp/opponentMaxHp)*100 + '%');
        $('.opponent-percentage').text(opponentNewHp+"/"+opponentMaxHp);
        if (yourDmg === 0){
            $('.battle-message').text(yourName + " tried to attack, but missed")
        }
        else{
             $('.battle-message').text(yourName + " attack and does to your opponent " + yourDmg + " damage");
        }
        $('#opponent-battlePhoto').fadeToggle("fast");
        $('#opponent-battlePhoto').fadeToggle("fast");

        // opponent attack
        if (opponentNewHp > 0){
        setTimeout(() => {
        $('#your-battlePhoto').data('hp',yourNewHp);
        $('.your-progress-bar').css('width', (yourNewHp/yourMaxHp)*100 + '%');
        $('.your-percentage').text(yourNewHp+"/"+yourMaxHp);
        if (!finish) {
            if (opponetDmg === 0) {
                $('.battle-message').text(`${opponentName} tried to attack, but missed.`);
            } else {
                $('.battle-message').text(`${opponentName} attacks ${yourName} and deals ${opponetDmg} damage.`);
            }
        }
        $('#your-battlePhoto').fadeToggle("fast");
        $('#your-battlePhoto').fadeToggle("fast");
         }, 1700);
        }
         //end of attacks
         if (finish) {
            const userid = JSON.parse(sessionStorage.user).id
            setTimeout(() => {
                $('.battle-message').text(endMessage);
            }, 2500);
            setTimeout(() => {
                var experiance;
                if (opponentNewHp <= 0){
                    experiance = 30;
                }
                else{
                    experiance = -15;
                }
                $('.battle-container').hide();
                $('.container').show();
                 $.ajax({
                        url:'/updateEXP',
                        method:'PUT',
                        data :{
                            exp : experiance,
                            id : $('#your-battlePhoto').data('id'),
                            result : result,
                            userid : userid,
                        }
                    })
                    .done(function(data){
                        updateList(1);
                        sessionStorage.setItem("money", data.newMoney);
                        $('.money-display').html(`<i class="fa fa-money"></i> : ${data.newMoney}`);
                    })
                    .fail(function(error){
                        alert("error:"+error);
                    })
            }, 4700);
        } else {
            setTimeout(() => {
                $('.battle-message').text("What will your next move?");
                 $('.battle-btn, .run-btn').prop('disabled', false).removeClass('disabled-btn');
            }, 4000);
        }
    }
    // Calc every side dmg
  export  function calcDmg(yourAt,yourDe,opponentAt,opponentDe){
        const randomYourCrit = Math.floor(Math.random() * 10) + 1;
        const randomOpponentCrit = Math.floor(Math.random() * 10) + 1;

        var yourDmg = parseInt(yourAt) - parseInt(opponentDe);
        var opponentDmg = parseInt(opponentAt) - parseInt(yourDe);

        if (yourDmg<10){
            yourDmg = 10;
        }
        if (randomYourCrit === 10){
            yourDmg += 30;
        }
        else if(randomYourCrit === 1){
            yourDmg = 0
        }
        if(opponentDmg<10){
            opponentDmg = 10;
        }
        if(randomOpponentCrit === 10){
            opponentDmg += 30;
        }
        else if(randomOpponentCrit === 1){
            opponentDmg = 0;
        }
     return { yourDmg, opponentDmg };
    }