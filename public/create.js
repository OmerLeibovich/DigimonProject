 import { calc_level,calc_stats } from "./calculation.js";
 
 // update list in UI with refresh the page
    export function updateList(num = 1){
    $.ajax({
            url: '/getDigis',
            method: 'GET',
            data:{
                pages : num,
            }
        })  
        .done(function(data) {
        $('#userTable').html(data); 
        })
        .fail(function(error) {
            console.error('Error fetching data:', error);
        });
    }

        //send pages
    export  function pages(){
        $.ajax({
            url:'/getpages',
            method:'GET',
        })
        .done(function(data){
            $('#pages').html(data);

        })
        .fail(function(error) {
            console.error('Error fetching data:', error);
        })
    }



    export function getopponentrandomDigi(digiRank,level,photo,name,HP,at,de){
    var rankVal = ["Baby I","Baby II","Child","Adult","Perfect","Ultimate","Armor","Hybrid"];
    var rank = ["Baby","In_traning","Rookie","Champion","Ultimate","Mega","Armor","Hybrid"];
    var rankindex = rank.indexOf(digiRank);
    var [hp, attack, defense] = calc_stats(level);
    var id = Math.floor(Math.random() * (1489 - 1) + 1);
    $.ajax({
            url: `https://digi-api.com/api/v1/digimon/${id}`,
            method: 'GET',
            }).done(function(response) {
            if (response.levels.length !== 0){
            for (var i = 0;i<response.levels.length;i++){
                if(response.levels[i].level === rankVal[rankindex]){
                    $('.battle-message').text(`Get ready! Your opponent is ${response.name}`);
                    setTimeout(() => {
                         $('.battle-message').text("What will your next move?");
                    }, 1700);
                    // opponent 
                    // clearBackground(response.images[0].href,response.name).done(function(data) {
                    // const cleanedUrl = data.cleanedImageUrl;
                    // $('#opponent-battlePhoto').attr('src', cleanedUrl);
                    // })
                    $('#opponent-battlePhoto').attr('src', response.images[0].href);
                    $('#opponent-battlePhoto').attr('title',("HP: " + hp + "  Attack: " +attack + "  defense: " + defense));
                    $('#opponent-battlePhoto').data('hp', hp);
                    $('#opponent-battlePhoto').data('maxhp', hp);
                    $('#opponent-battlePhoto').data('at', attack);
                    $('#opponent-battlePhoto').data('de', defense);
                    $('#opponent-battleName').text(response.name);
                    $('.opponent-progress-bar').css('width', (hp/hp)*100 + '%');
                    $('.opponent-percentage').text(hp+"/"+hp);
                    // your
                    //  clearBackground(photo,name).done(function(data) {
                    // const cleanedUrl = data.cleanedImageUrl;
                    // $('#your-battlePhoto').attr('src', cleanedUrl);
                    // })
                    $('#your-battlePhoto').attr('src', photo);
                    $('#your-battlePhoto').attr('title',("HP: " + HP + "  Attack: " + at + "  defense: " + de));
                    $('#your-battlePhoto').data('maxhp',HP);
                    $('#your-battlePhoto').data('hp',HP);
                    $('#your-battlePhoto').data('at',at);
                    $('#your-battlePhoto').data('de',de);
                    $('#your-battleName').text(name);
                    $('.your-progress-bar').css('width', (HP/HP)*100 + '%');
                    $('.your-percentage').text(HP+"/"+HP);
                    return;
                }
            }
        }
            getopponentrandomDigi(digiRank,level,photo,name,HP,at,de);
            }).fail(function() {
            console.log("fail to get information");
            getopponentrandomDigi(digiRank,level,photo,name,HP,at,de);
            });
    }

    export function getyourrandomDigi(){
    var rankVal = ["Baby I","Baby II","Child","Adult","Perfect","Ultimate","Armor","Hybrid"];
    var rank = ["Baby","In_traning","Rookie","Champion","Ultimate","Mega","Armor","Hybrid"];
    const randomIndex = Math.floor(Math.random() * rankVal.length);
    var level = calc_level(rank[randomIndex]);
    var [hp, attack, defense] = calc_stats(level);
    var id = Math.floor(Math.random() * (1489 - 1) + 1);
    $('#photo').attr('src','');
    if (level === 'Select digimon level') return;
    $.ajax({
            url: `https://digi-api.com/api/v1/digimon/${id}`,
            method: 'GET',
            }).done(function(response) {
            if (response.levels.length !== 0){
            for (var i = 0;i<response.levels.length;i++){
                if(response.levels[i].level === rankVal[randomIndex]){
                    $('#photo').attr('src' , response.images[0].href);
                    $('#name').text("Name: " + response.name);
                    $('#rank').text("Rank: " + rank[randomIndex]);
                    $('#level').text("Level: " + level);
                    $('#attribute').text("Attribute: " + response.attributes[0].attribute);
                    $('#hp').text("Hp: " + hp);
                    $('#attack').text("Attack: " + attack);
                    $('#defense').text("Defense: " + defense);
                    return;
                }
            }
        }
            getyourrandomDigi();
            }).fail(function() {
            console.log("fail to get information");
            getyourrandomDigi();
            });
    }


    export function resetBattlesystem() {
    $('#your-battlePhoto').attr('src', '');
    $('#your-battleName').text('');
    $('.your-progress-bar').css('width', '100%');
    $('.your-percentage').text('');

    $('#opponent-battlePhoto').attr('src', '');
    $('#opponent-battleName').text('');
    $('.opponent-progress-bar').css('width', '100%');
    $('.opponent-percentage').text('');

    $('.battle-message').text('');
    $('.battle-btn').prop('disabled', false);
}

