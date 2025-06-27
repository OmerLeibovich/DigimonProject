

$(document).ready(function () {


    // update list in UI with refresh the page
    function updateList(){
    $.ajax({
            url: '/getDigis',
            method: 'GET',
        })  
        .done(function(data) {
        $('#userTable').html(data); 
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.error('Error fetching data:', textStatus, errorThrown);
        });
    }
    // culc the level of digimon according to his rank
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
    
    // culc base stats according to him level
    function culc_stats(level){
        var hp = Math.floor(Math.random() * ((level*8) - (level*6)) + (level*6));
        var attack = Math.floor(Math.random() * ((level*5.5) - (level*3)) + (level*3));
        var defense = Math.floor(Math.random() * ((level*3) - (level*1.3)) + (level*1.3));
        return [hp, attack, defense];
    }

    // ON MANY ITEMS with same element need class no ID
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
        console.log(DigiId);
        $.ajax({
            method:'DELETE',
            url:'/deleteDigimon',
            data: {
                id : DigiId,
            }
        })
        .done(function(data){
            updateList();
        })
        .fail(function(){
            alert("fail to delete digimon");
        })
  })



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
            }
        })
        .done(function(data){
            $('#DigiForm').hide(); 
            updateList();
            $('#addDigimon').prop('disabled', false);
        })
        .fail(function(){
            alert("fail to add digimon");
        });
    });

    $(document).on('click','.login-btn',function(e){
        e.preventDefault();
        const username = $('#username').val();
        const password = $('#password').val();
        $.ajax({
            method:'POST',
            url:'/login',
            data: {
                username: username,
                password: password,
            }
        })
        .done(function(data){
            $('.login-container').hide();
            $('#addDigimon').show();
            $('#DigiList').show();
            $('#userTable').show();
            updateList(); 
        }) 
        .fail(function(data){
                alert("fail to connect");
        })
    })

    function getpage(){
    var rankVal = ["Baby I","Baby II","Child","Adult","Perfect","Ultimate","Armor","Hybrid"];
    var rank = ["Baby","In_traning","Rookie","Champion","Ultimate","Mega","Armor","Hybrid"];
    const randomIndex = Math.floor(Math.random() * rankVal.length);
    var level = culc_level(rank[randomIndex]);
    var [hp, attack, defense] = culc_stats(level);
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
            getpage();
            }).fail(function() {
            console.log("fail to get information");
            getpage();
            });
    }

    $('#addDigimon').on("click",function() {
        getpage();
        $('#DigiForm').show();
        $('#addDigimon').prop('disabled', true);
    })

    $('#DigiForm').on('click','.cancel-btn',function(e){
        e.preventDefault();
        $('#DigiForm').hide();
        $('#addDigimon').prop('disabled', false);
    })
});
