
window.onload = function () {
    var schwiftyToggler = document.getElementById('schwifty-mode');
    if(schwiftyToggler) {
        schwiftyToggler.addEventListener('click', function () {
            document.body.classList.contains('schwifty-mode') ? 
            document.body.classList.remove('schwifty-mode') : 
            document.body.classList.add('schwifty-mode') 
        });
    }
}