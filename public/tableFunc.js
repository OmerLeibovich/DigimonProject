import { showMessage } from './Messages.js';
import {calc_stats } from './calculation.js';
import { getyourrandomDigi,pages,updateList,evolveDigi} from './create.js';
export function table(){
      // return list adjusted to the page number
        $(document).on('click','.btn-page',async function(e){
            e.preventDefault();
            const page = $(this).data('page');
            await updateList((page+1));
        })
    
        // Display photo for digimon
        $(document).on('click', '.openphoto', function (e) {
            e.preventDefault();
            $('#DigiPhoto').show();
            const img = $(this).find('img').attr("src"); 
            $('#photopage').attr('src', img);
            $('#DigiPhoto').on('click','.close-btn',function(e){
            e.preventDefault()
            $('#DigiPhoto').hide();
        })
          })
          // delete digimon from list
        $(document).on('click', '.deleteDigi', function (e) {
            e.preventDefault();
            const DigiId = $(this).data('id');
            $.ajax({
                method:'DELETE',
                url:'/deleteDigimon',
                data: {
                    id : DigiId,
                }
            })
            .done(async function(data){
                 if (window.innerWidth <= 768) {
                await updateList();
            }
            else{
                 await updateList(1); 
            }
                pages("digimons");
            })
            .fail(function(){
                showMessage("fail to delete digimon",2000);
            })
      })
      // if digimon can evolve return the evovle of this digimon
      $(document).on('click','.evolveDigi', async function(e){
        e.preventDefault();
        $('.navbar').hide();
        let digiLevel;
        let digiRank; 
        let diginame;
        if (window.innerWidth <= 768) {
            diginame = $('.digi-name').text().trim();
            digiRank = $('.MobileDigiRank').text().split(':')[1].trim();
            digiLevel = $('.MobileDigiLevel').text().split(':')[1].trim();
        }
        else{
            diginame = $(this).closest('tr').find('td')[1].innerText;
            digiRank = $(this).closest('tr').find('td')[2].innerText;
            digiLevel = $(this).closest('tr').find('td')[3].innerText;
        }
        $('.message').fadeIn();
        $('.container').fadeOut();
        const digiId = $(this).data('id');
        let rankVal = ["Baby I","Baby II","Child","Adult","Perfect","Ultimate","Armor","Hybrid"];
        let rank = ["Baby","In_traning","Rookie","Champion","Ultimate","Mega","Armor","Hybrid"];
        let evolvelevel = [7,11,18,31,46];
        let nextrank = (rank.indexOf(digiRank) + 1);
         if ((digiRank === rank[0] && digiLevel > 6 ) || (digiRank === rank[1] && digiLevel > 10 )
            || (digiRank === rank[2] && digiLevel > 17 ) || 
        (digiRank === rank[3] && digiLevel > 30 ) || (digiRank === rank[4] && digiLevel > 45 )){
    
    
            $('.message').text(`you want to evolve ${diginame} ?`);
             $('.message').append("</br>");
             $('.message').append("<button class='yesbutton'>yes</button>");
            $('.message').append("<button class='nobutton'>no</button>");
    
    
    
            $(".yesbutton").click(async function() {
            const evoTree = await evolveDigi(diginame,rankVal[rank.indexOf(digiRank) + 1]);
            const random = Math.floor(Math.random() * (evoTree.length));
            const [hp, attack, defense] = calc_stats(digiLevel);
            console.log(evoTree);
            // calculate Digimon evolution
            $.ajax({
                url:'/evolve',
                method:'PUT',
                data : {
                    id: digiId,
                    evolve: evoTree[random],
                    rank: rank[rank.indexOf(digiRank) + 1],
                    hp: hp,
                    attack: attack,
                    defense: defense,
                }
            })
            .done(async function(data){
                showMessage(`${diginame}  " evolve to: "  ${evoTree[random].name}`,3000);
            if (window.innerWidth <= 768) {
                await updateList();
                $('.navbar').show();
            }
            else{
                 await updateList(1); 
                 $('.navbar').show();
            }
            })
            .fail(function(error){
                showMessage("fail to evolve digimon",3000);
            })
        })
         $(".nobutton").click(function() {
            showMessage("",0);
         })
        }
        else if(digiRank === rank[5] || digiRank === rank[6] || digiRank === rank[7]){
            showMessage("This Digimon can't evolve from this rank",3000);
        }
        else{
            showMessage(
            `you still cant digivolve,your digimon can evolve to rank ${rank[nextrank]} in level ${evolvelevel[nextrank-1]}`,3000);
        }
    })
    
        // form to add random digimon
        $('#DigiForm').on('click','.submit-btn',function(e){ 
            e.preventDefault();       
            const photo = $('#photo').attr('src');
            const name = $('#name').text().split(" ").slice(1).join(" ");
            const rank = $('#rank').text().split(" ")[1];
            const level = $('#level').text().split(" ")[1];
            const attribute = $('#attribute').text().split(" ")[1];
            const hp = $('#hp').text().split(" ")[1];
            const attack = $('#attack').text().split(" ")[1];
            const defense = $('#defense').text().split(" ")[1];
            const money = sessionStorage.money;
            $.ajax({
                method: "POST",
                url: "/addDigimon",
                data: {
                    Photo: photo,
                    Name: name,
                    Rank: rank,
                    Level: level,
                    Attribute: attribute,
                    Hp: hp,
                    Attack: attack,
                    Defense: defense,
                    userMoney: money,

                }
            })
            .done(async function(data){
                $('#DigiForm').hide(); 
                $('.navbar').show();
                await updateList(1);
                pages("digimons");
                $('#addDigimon').prop('disabled', false); 
                sessionStorage.setItem("money",data.newMoney);
                $(".money-display").html(`<i class="fa fa-money"></i> : ${data.newMoney}`);
                $('.container').show();
            })
            .fail(function(){
                showMessage("fail to add digimon",2000);
            });
        });
    
           // open form to add digimon
        $('#addDigimon').on("click", async function() {
            $('#DigiForm')[0].reset();
            $('.navbar').hide();
            $('.container').hide();
            $('.message').text('Preparing your new Digimon...');
            $('.message').show();
            await getyourrandomDigi();
            
        })
        // close digimon form
        $('#DigiForm').on('click','.cancel-btn',function(e){
            e.preventDefault();
            $('.navbar').show();
            $('#DigiForm').hide();
            $('#addDigimon').prop('disabled', false);
            $('.container').show();
        })
}
