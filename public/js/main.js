const toggleSchwify = () => {
    let schwiftyToggler = document.getElementById('schwifty-mode');
    if(schwiftyToggler) {
        schwiftyToggler.addEventListener('click', function () {
            document.body.classList.contains('schwifty-mode') ? 
            document.body.classList.remove('schwifty-mode') : 
            document.body.classList.add('schwifty-mode') 
        });
    }
}

const rickleSearch = () => {
    let formSearch = document.querySelector("form#rickle-search");
    formSearch.addEventListener("submit", (event) => {
        event.preventDefault();
        let searchInput = document.querySelector("#rickle-search-input");
        location.href = `${window.location.origin}/?name=${searchInput.value}`; 
    })
}

window.onload = () => {
    toggleSchwify();
    rickleSearch();
}