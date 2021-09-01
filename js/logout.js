document.querySelector(".logout").addEventListener('click', ()=>{
    localStorage.removeItem('loginKey');
    window.location.replace(site_properties.login_url);
})