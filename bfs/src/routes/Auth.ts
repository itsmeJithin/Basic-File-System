function isAuthenticated() {
    const name = "oToken";
    if (localStorage.getItem(name)) {
        return true;
    }
    let cookieValue = "";
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        console.log(document.cookie);
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    if (cookieValue) {
        localStorage.setItem("oToken", cookieValue);
        return true;
    }
    return false;
}

export default isAuthenticated;