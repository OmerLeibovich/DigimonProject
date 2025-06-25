

$(document).ready(function () {

    function updateList(){
    $.ajax({
            url: '/getUpdatedList',
            method: 'GET',
        })  
        .done(function(data) {
        const newList = $(data).find('#DigiList').html();
        $('#DigiList').html('');
        $('#DigiList').html(newList);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.error('Error fetching data:', textStatus, errorThrown);
        });
    }

    function culc_level(rank){
         if (rank === 'Baby'){
            return(Math.floor(Math.random() * (7 - 1) + 1));
         }
         else if(rank === 'In-traning'){
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
    

    function culc_stats(level){
        var hp = Math.floor(Math.random() * ((level*8) - (level*6)) + (level*6));
        var attack = Math.floor(Math.random() * ((level*5.5) - (level*3)) + (level*3));
        var defence = Math.floor(Math.random() * ((level*3) - (level*1.3)) + (level*1.3));
        return [hp, attack, defence];
    }


    $('#DigiForm').on('click','.submit-btn',function(e){ 
        e.preventDefault();       
        const photo = $('#photo').attr('src');
        const name = $('#name').text().split(" ")[1];
        const rank = $('#rank').text().split(" ")[1];
        const level = $('#level').text().split(" ")[1];
        const attribute = $('#attribute').text().split(" ")[1];
        const hp = $('#hp').text().split(" ")[1];
        const attack = $('#attack').text().split(" ")[1];
        const defence = $('#defence').text().split(" ")[1];

        $.ajax({
            method: "POST",
            url: "/digimon",
            data: {
                Photo: photo,
                Name: name,
                Rank: rank,
                Level: level,
                Attribute: attribute,
                Hp: hp,
                Attack: attack,
                Defence: defence,
            }
        })
        .done(function(data){
            $('#DigiForm').hide(); 
            updateList();
        })
        .fail(function(){
            alert("fail");
        });
    });



    function getpage(){
    var rankVal = ["Baby I","Baby II","Child","Adult","Perfect","Ultimate","Armor","Hybrid"];
    var rank = ["Baby","In_traning","Rookie","Champion","Ultimate","Mega","Armor","Hybrid"];
    const randomIndex = Math.floor(Math.random() * rankVal.length);
    var level = culc_level(rank[randomIndex]);
    var [hp, attack, defence] = culc_stats(level);
    var id = Math.floor(Math.random() * (1489 - 1) + 1);
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
                    $('#defence').text("Defence: " + defence);
                    return;
                }
            }
        }
            getpage();
            }).fail(function() {
            console.log("fail to get information");
            getpage();
            });
    }

    $('#addDigimon').on("click",function() {
        getpage();
        $('#DigiForm').show();
    });

    $('#DigiForm').on('click','.cancel-btn',function(e){
        e.preventDefault();
        $('#DigiForm').hide();
e   
    })
});
