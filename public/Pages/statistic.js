import { showMessage } from "../Messages.js";
import { createCircle } from "../create.js";
export function statistic(){
    ////-----statistic-----////
    let currentChart = null;
            $(document).on('click','.btn-choose',function (e){
                e.preventDefault();
                const selected = $('#digimon-statistic option:selected');
                let id;
                let userid;
                let name;
                const photo = selected.data('photo');
                if (photo) {
                $('#statistic-photo').attr('src', photo).show();
                }
                else {
                $('#statistic-photo').hide();
                }   
                if(selected.val() !== ""){
                     id = selected.data('id');
                    userid = false;
                    name = selected.data('name');
                }
                else{
                    id = JSON.parse(sessionStorage.user).id;
                    userid = true;
                    name = "all digimons";
                }
                $.ajax({
                    url:'/chartdata',
                    method:'GET',
                    data: {
                        id: id,
                        userid: userid,
                    }
                })
                .done(function(data){
                       if (currentChart) {
                            currentChart.destroy();
                        }
                    currentChart = new Chart("digiChart", {
                    type: "bar",
                    data: {
                        labels: ["wins","loses"],
                        datasets: [{
                        backgroundColor: ["blue","red"],
                        data: data.values,
                        }]
                    },
                     options: {
                        legend: {display: false},
                        scales: {
                        yAxes: [{
                            ticks: {
                            beginAtZero: true
                            }
                        }]
                        },
                    title: {
                    display: true,
                    text: name
                    }
                    },
                })
                createCircle(data.values);
                })
                .fail(function(){
                    showMessage('Failed to load digimon information.',2000);
                })
            })
            
}