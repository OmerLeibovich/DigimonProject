
    export function showMessage(text, duration) {
    $('.message').text(text).fadeIn();
    $('.container').fadeOut();
    setTimeout(() => {
        $('.message').fadeOut();
        $('.container').fadeIn();
    }, duration);
}
  // func show error message
     export function errorMessage(id,message){
        $(id).text(message).css({
            'color': 'red',
            'font-size': '12px'
            });
     }