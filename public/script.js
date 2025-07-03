
$(document).ready(function () {


        if (isLoggedIn) {
            $('.login-container').hide();
            $('#addDigimon').show();
            $('#DigiList').show();
            $('#userTable').show();
            $('.battle-button').show();
            updateList(); 
            pages()
        }



    // update list in UI with refresh the page
    function updateList(num = 1){
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
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.error('Error fetching data:', textStatus, errorThrown);
        });
    }

        //send pages
    function pages(){
        $.ajax({
            url:'/getpages',
            method:'GET',
        })
        .done(function(data){
            $('#pages').html(data);

        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.error('Error fetching data:', textStatus, errorThrown);
        })
    }
    
    // culc the level of digimon according to his rank
    function culc_level(rank){
         if (rank === 'Baby I'){
            return(Math.floor(Math.random() * (7 - 1) + 1));
         }
         else if(rank === 'Baby II'){
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
        var hp = Math.floor(Math.random() * ((level*5.5) - (level*3)) + (level*3));
        var attack = Math.floor(Math.random() * ((level*5.5) - (level*3)) + (level*3));
        var defense = Math.floor(Math.random() * ((level*5.5) - (level*3)) + (level*3));
        return [hp, attack, defense];
    }
    // return 
    $(document).on('click','.btn-page',function(e){
        e.preventDefault();
        const page = $(this).data('page');
        updateList((page+1));
    })

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
         console.log(username);
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
            $('.battle-button').show();
            updateList(); 
            pages()
        
    })
        .fail(function(data){
                alert("fail to connect");
        })
    })

     $(document).on('click','.battle-button',function(e){
        e.preventDefault();
        $('#digimon-select-container').show();
        $('.container').hide();
        $.ajax({
            url:'/getuserdigis',
            method:'GET',
        })
        .done(function(data){
             $('#digimon-select-container').html(data).show();
        })
        .fail(function(data){
                alert("fail to getDigis");
        })
     })
     $(document).on('click','.btn-success',function(e){
         e.preventDefault();
         const selected = $('#digimon-select option:selected');
         const selectedValue = selected.val();
         if(selectedValue !== ""){
          $('#digimon-select-container').hide();
           $('.battle-container').show();
           console.log(selected.data('rank'));
           console.log(selected.data('photo'));
           getrandomDigi(selected.data('rank'),selected.data('level'),
           selected.data('photo'),selected.data('name'),
           selected.data('hp'),selected.data('at'),selected.data('de'));
         }
         else{
            alert("You need to choose digimon");
         }
     })
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
    
    function getrandomDigi(digiRank,level,photo,name,HP,at,de){
    var rankVal = ["Baby I","Baby II","Child","Adult","Perfect","Ultimate","Armor","Hybrid"];
    var rank = ["Baby","In_traning","Rookie","Champion","Ultimate","Mega","Armor","Hybrid"];
    var rankindex = rank.indexOf(digiRank);
    var [hp, attack, defense] = culc_stats(level);
    var id = Math.floor(Math.random() * (1489 - 1) + 1);
    $.ajax({
            url: `https://digi-api.com/api/v1/digimon/${id}`,
            method: 'GET',
            }).done(function(response) {
            if (response.levels.length !== 0){
            for (var i = 0;i<response.levels.length;i++){
                if(response.levels[i].level === rankVal[rankindex]){
                    // opponent 
                    // clearBackground(response.images[0].href,response.name).done(function(data) {
                    // const cleanedUrl = data.cleanedImageUrl;
                    // $('#opponent-battlePhoto').attr('src', cleanedUrl);
                    // })
                    console.log(response.name);
                    $('#opponent-battlePhoto').attr('src', response.images[0].href);
                    $('#opponent-battlePhoto').attr('title',("HP: " + hp + "  Attack: " +attack + "  defense: " + defense));
                    $('#opponent-battleName').text(response.name);
                    $('.opponent-progress-bar').css('width', (30/hp)*100 + '%');
                    $('.opponent-percentage').text(30+"/"+hp);
                    // your
                    //  clearBackground(photo,name).done(function(data) {
                    // const cleanedUrl = data.cleanedImageUrl;
                    // $('#your-battlePhoto').attr('src', cleanedUrl);
                    // })
                     console.log(name);
                    $('#your-battlePhoto').attr('src', photo);
                    $('#your-battlePhoto').attr('title',("HP: " + HP + "  Attack: " + at + "  defense: " + de));
                    $('#your-battleName').text(name);
                    $('.your-progress-bar').css('width', (30/HP)*100 + '%');
                    $('.your-percentage').text(30+"/"+HP);
                    return;
                }
            }
        }
            getrandomDigi(digiRank,level,photo,name,HP,at,de);
            }).fail(function() {
            console.log("fail to get information");
            getrandomDigi(digiRank,level,photo,name,HP,at,de);
            });
    }

    function getdigi(){
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
            getdigi();
            }).fail(function() {
            console.log("fail to get information");
            getrandomDigi();
            });
    }

    // // clear photobackground
    //     function clearBackground(photo,name) {
    //         return $.ajax({
    //             method: "POST",
    //             url: "/remove-bg",
    //             data: { imageUrl: photo,
    //                     name: name
    //              }
    //         });
    //     }

    // function clearBackground(photo){
    // const formData = new FormData();
    // formData.append("size", "auto");
    // formData.append("image_url", photo);
    //     $.ajax({
    //         method: "POST",
    //         url:"https://api.remove.bg/v1.0/removebg",
    //         headers: { "X-Api-Key": process.env.REMOVEBG },
    //          data: formData,
    //         contentType: false,
    //         processData: false,
    //         xhrFields: {
    //             responseType: 'blob' 
            
    //             },
    //     })
    //         .done(function(data){
    //             const url = URL.createObjectURL(data);
    //             return url;
    //         })
    //         .fail(function(data){
    //             console.log("fail to clearbackground");
    //         })
    // }

    $('#addDigimon').on("click",function() {
        getdigi();
        $('#DigiForm').show();
        $('#addDigimon').prop('disabled', true);
    })

    $('#DigiForm').on('click','.cancel-btn',function(e){
        e.preventDefault();
        $('#DigiForm').hide();
        $('#addDigimon').prop('disabled', false);
    })
});
