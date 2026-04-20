const links = document.querySelectorAll('tbody tr:nth-child(2) td div a');
links.forEach(link => {
    if(window.location.href === link.href) link.className = "active-link";
});