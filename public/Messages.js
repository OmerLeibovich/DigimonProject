
    export function showMessage(text, duration) {
    $('.message').text(text).fadeIn();
    $('.container').fadeOut();
    setTimeout(() => {
        $('.message').fadeOut();
        $('.container').fadeIn();
        $('.navbar').show();
    }, duration);
}
  // func show error message
     export function errorMessage(id,message,color = "red"){
        $(id).text(message).css({
            'color': color,
            'font-size': '12px'
            });
     }