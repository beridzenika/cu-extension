// top space issue
const top_space = document.querySelector("body > table > tbody > tr:first-child > td");
if (top_space && top_space.innerHTML.trim() === "&nbsp;") {
    top_space.style.display = 'none';
}

// nav menu links
const links = document.querySelectorAll('tbody tr:nth-child(2) td div a');
links.forEach(link => {
    if(window.location.href === link.href) link.className = "active-link";
});

// select options
const form = document.querySelector('form[name="form1"]');
const options = [...form.querySelectorAll('input[id="sem_id1"]')];
const selectBtn = form.querySelector('input[type="submit"]:not(#submit5)');

const dropdown = document.createElement('select');
dropdown.id = 'semester-select';

options.forEach(opt => {
    const label = opt.nextSibling?.textContent?.trim();
    const option = document.createElement('option');
    option.value = opt.value;
    option.textContent = label;
    dropdown.appendChild(option);
});

dropdown.addEventListener('change', e => {
    options.forEach(opt => opt.checked = false);
    const target = options.find(o => o.value === e.target.value);
    if (target) target.checked = true;
    selectBtn.click();
});

form.appendChild(dropdown);