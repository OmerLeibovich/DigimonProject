 import { calc_stats } from "./calculation.js";
 
 // update list in UI with refresh the page
export function updateList(num = null, digimonIndex = 0) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/getDigis',
      method: 'GET',
      data: {
        pages: num,
        index: digimonIndex
      }
    })
      .done(function (data) {
        if (num == null) {
          $('.mobile-digi').html(data);
        } else {
          $('#userTable').html(data);
        }
        resolve();
      })
      .fail(function (error) {
        console.error('Error fetching data:', error);
        reject(error);
      });
  });
}


        //send pages
    export  function pages(element){
        $.ajax({
            url:'/getpages',
            method:'GET',
            data:{
                element : element,
            }
        })
        .done(function(data){
            $('#pages').html(data);

        })
        .fail(function(error) {
            console.error('Error fetching data:', error);
        })
    }


    // return opponent digimon in battle with same level and rank
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

                    $('.message').hide();
                    $('.battle-container').show();

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
    // Retrieves one purchasable Digimon and returns it to the user
    export async function getyourrandomDigi(){
    var [hp, attack, defense] = calc_stats(1);
    var id = Math.floor(Math.random() * (1489 - 1) + 1);
    let widthSize = "";
    if (window.innerWidth <= 768) {
        widthSize = "60%";
    }
    else{
        widthSize = "90%";
    } 
    $('#photo').attr('src','');
    await $.ajax({
            url: `https://digi-api.com/api/v1/digimon/${id}`,
            method: 'GET',
            }).done(function(response) {
            if (response.levels.length !== 0){
                if(response.levels[0].level === "Baby I"){
                    $('#photo')  .attr('src', response.images[0].href)
                    .css({
                        width: widthSize,  
                        height: 'auto'
                    });
                    $('#name').text("Name: " + response.name);
                    $('#rank').text("Rank: " + "Baby");
                    $('#level').text("Level: " + 1);
                    $('#attribute').text("Attribute: " + "Free");
                    $('#hp').text("Hp: " + hp);
                    $('#attack').text("Attack: " + attack);
                    $('#defense').text("Defense: " + defense);
                    $('#DigiForm').show(); 
                    $('.message').hide();
                    return;
                }
        }
            getyourrandomDigi();
            }).fail(function() {
            console.log("fail to get information");
            getyourrandomDigi();
            });
    }





    //return evolve tree for the digimon you choose
export async function evolveDigi(name, rank) {
    const evolveTree = [];
    try {
        const response = await $.ajax({
            url: `https://digi-api.com/api/v1/digimon/${name}`,
            method: 'GET'
        });

        const evolutions = response.nextEvolutions || [];
        for (let i = 0; i < evolutions.length; i++) {
            const result = await getevolveDigi(evolutions[i].url, rank);
            if (result.isValid) {
                evolveTree.push(result.evolve);
            }
        } 
        return evolveTree;
    } catch (error) {
        console.error("Error in evolveDigi:", error);
        alert("error in evolveDigi");
        return [];
    }
}
    // check if the evolve rank above the rank of digimon you try to evolve
  export function getevolveDigi(evolution, rank) {
        return $.ajax({
            url: evolution,
            method: 'GET',
        }).then(function(response) {
            const levels = response.levels || [];
            for (let i = 0; i < levels.length; i++) {
                if (levels[i].level === rank) {
                    return {
                        isValid: true,
                        evolve: response
                    };
                }
            }
            return { isValid: false };
        }).catch(function(error) {
            return { isValid: false }; 
        });
    }


// draw circals with text(wins or loses) in statistics
function drawCircle(canvasTitle, color, label, number) {
    const canvas = document.getElementById(canvasTitle);
    if (window.innerWidth <= 768) {
    canvas.width = 120;       
    canvas.height = 120;
    }

    const ctx = canvas.getContext("2d");

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const radius = Math.min(canvas.width, canvas.height) / 2 - 5;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();

    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, centerX, centerY - 20);

    ctx.font = "30px Arial";
    ctx.fillText(number, centerX, centerY + 15);
}


export function createCircle(numbers) {
    drawCircle("winsCanvas", "blue", "WINS", numbers[0]);
    drawCircle("losesCanvas", "red", "LOSES", numbers[1]);
}
