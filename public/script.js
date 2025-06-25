

$(document).ready(function () {

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


    function gotdigimon(digimon){
        $.ajax({
            method: "POST",
            url: "/digimon",
            data:{
                Digimon: digimon,
                }
            .done(function(data){
                alert("complete");
                    return;
            }).fail(function(){
                alert("fail");
                })                
    });
    }


    function getpage(){
    var rankVal = $('#Digimonlevels').val();
    var rank = $('#Digimonlevels :selected').text();
    var level = culc_level(rank);
    var [hp, attack, defence] = culc_stats(level);
    var id = Math.floor(Math.random() * (1489 - 1) + 1);
    var isfound = false;
    if (level === 'Select digimon level') return;
    $.ajax({
            url: `https://digi-api.com/api/v1/digimon/${id}`,
            method: 'GET',
            }).done(function(response) {
            if (response.levels.length !== 0){
            for (var i = 0;i<response.levels.length;i++){
                if(response.levels[i].level === rankVal){
                    $('#photo').attr('src' , response.images[0].href);
                    $('#name').text("name: " + response.name);
                    $('#rank').text("rank: " + rank);
                    $('#level').text("level: " + level);
                    $('#hp').text("Hp: " + hp);
                    $('#attack').text("Attack: " + attack);
                    $('#defence').text("Defence: " + defence);
                    gotdigimon(response.name);
                    isfound = true;
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

    $('#Digimon').on("click",function() {
    if(!$('#Digimonlevels').val()){
        alert("you need to select digimon rank");
        return;
    }
        getpage();
        $('#DigiForm').show();
    });
});
