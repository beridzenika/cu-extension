// top space issue
const spaceTr = document.querySelectorAll("body > table > tbody > tr > td");
spaceTr.forEach(space => {
    if (space && space.innerHTML.trim() === "&nbsp;") {
        space.style.display = 'none';
    }
});


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

// silabus/sorces table
const rows = [...selectBtn.nextElementSibling.nextSibling.querySelectorAll('tr')];
const headerRows = [...rows[0].children]
                    .map(cell => `<th>${cell.textContent}</th>`)
                    .join('');

const container = document.createElement('div');
container.id = 'my-overlay';

container.innerHTML = `

    <table id="clean-table">
        <thead>
            <tr>
                ${headerRows}
            </tr>
        </thead>
        <tbody id="clean-tbody"></tbody>
    </table>
`;
const tbody = container.querySelector('#clean-tbody');
rows.slice(1).forEach(tr => {
    const newRow = document.createElement('tr');

    [...tr.children].forEach(cell => {
        const newCell = document.createElement('td');
        newCell.innerHTML = cell.innerHTML;
        newRow.appendChild(newCell);
    });

    tbody.appendChild(newRow);
});
container.appendChild(dropdown);

form.style.display = 'none';
form.insertAdjacentElement('afterend', container);