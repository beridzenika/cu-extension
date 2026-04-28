const top_space = document.querySelector("body > table > tbody > tr:first-child > td");
if (top_space && top_space.innerHTML.trim() === "&nbsp;") {
    top_space.style.display = 'none';
}

const links = document.querySelectorAll('tbody tr:nth-child(2) td div a');
links.forEach(link => {
    if(window.location.href === link.href) link.className = "active-link";
});