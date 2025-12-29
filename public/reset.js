    // reset battlesystem before every new battle
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
// reset registerPage after leave or register
export function resetRegisterPage(){
    $('#Rusername').val('');
    $('#email').val('');
    $('#Rpassword').val('');
    $('#confirm-password').val('');

}
