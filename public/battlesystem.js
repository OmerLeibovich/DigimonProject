
import {calcDmg ,calcNew_hp } from './calculation.js';
import {getopponentrandomDigi} from './create.js';
import {resetBattlesystem} from './reset.js';
import {getuserdigi} from './script.js';

export function battle(){
     // change photo
     $(document).on('change', '#digimon-select', function () {
        const selected = $(this).find(':selected');
        const photo = selected.data('photo');
        if (photo) {
            $('#selected-photo').attr('src', photo).show();
        } else {
            $('#selected-photo').hide();
        }
        });
    
        // calc new damage in battle and new hp after got this damage
    $(document).on('click','.battle-btn',function(e){
        e.preventDefault();
        const { yourDmg, opponentDmg } = calcDmg($('#your-battlePhoto').data('at'),$('#your-battlePhoto').data('de'),
                $('#opponent-battlePhoto').data('at'),$('#opponent-battlePhoto').data('de'));
        calcNew_hp($('#your-battlePhoto').data('hp'),$('#your-battlePhoto').data('maxhp'),yourDmg
        ,$('#opponent-battlePhoto').data('hp'),$('#opponent-battlePhoto').data('maxhp'),opponentDmg)
        })

        // have chance of 90% to exit from battle
    $(document).on('click','.run-btn',function(e){
        e.preventDefault();
        $('.run-btn').prop('disabled', true);
        const runChance = Math.floor(Math.random() * 10) + 1;
        if (runChance === 1){
            $('.battle-message').text("You couldn’t get away!");
            setTimeout(() => {
            $('.battle-message').text("What will your next move?");
        }, 1700);

        }
        else{
            $('.battle-message').text("You successfully fled from battle!");
        setTimeout(() => {
            $('.battle-container').hide();
            $('.container').show();
        }, 1700);
        }
        $('.run-btn').prop('disabled', false);
    })
    // show user digimons to choose for battle
     $(document).on('click','.battle-button',function(e){
        e.preventDefault();
        $('#digimon-select-container').empty().hide();
        $('.container').hide();
        $('.btn-use').hide();
        getuserdigi('battle');
        })
     $(document).on('click','#submit-digimon', async function(e){
         e.preventDefault();
         resetBattlesystem();
         const selected = $('#digimon-select option:selected');
         const selectedValue = selected.val();
         if(selectedValue !== ""){
         $('#your-battlePhoto').data('id',selected.data('id'));
          $('#digimon-select-container').hide();
           $('.battle-container').show();
           await getopponentrandomDigi(selected.data('rank'),selected.data('level'),
           selected.data('photo'),selected.data('name'),
           selected.data('hp'),selected.data('at'),selected.data('de'));
         }
         else{
            alert("You need to choose digimon");
         }
     })
    }