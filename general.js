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

//form pages
const form = document.querySelector('form[name="form1"]');
if (form) FormFunction(form);

function FormFunction(form) {
    // select options
    const options = [...form.querySelectorAll('input[id="sem_id1"]')];
    const selectBtn = form.querySelector('input[type="submit"]:not(#submit5)');

    const wrapper = document.createElement('div');
    wrapper.id = 'semester-dropdown';

    const params = new URL(window.location.href).searchParams;
    const savedSem = params.get('ext_sem');
    const selected_val = savedSem ?
                        options.find(o => o.value === savedSem) :
                        options.reduce((max, o) => o.value > max.value ? o : max, options[0]);

    const selected = document.createElement('div');
    selected.id = 'semester-selected';
    selected.textContent = selected_val.nextSibling?.textContent?.trim();
    wrapper.appendChild(selected);

    const optionList = document.createElement('div');
    optionList.id = 'semester-options';
    optionList.style.display = 'none';
    let isOpen = false;
    wrapper.appendChild(optionList);

    options.forEach(opt => {
        const label = opt.nextSibling?.textContent?.trim();
        const option = document.createElement('div');
        option.className = 'semester-option';
        option.value = opt.value;
        option.textContent = label;

        option.addEventListener('click', () => {
            const url = new URL(window.location.href);
            url.searchParams.set('ext_sem', opt.value);
            window.history.replaceState({}, '', url);

            opt.checked = true;
            selectBtn.click();
        })

        optionList.appendChild(option);
    });
    selected.addEventListener('click', () => {
        isOpen = !isOpen;
        optionList.style.display = isOpen ? 'block' : 'none';
    });
    document.addEventListener('click', e => {
        if (!wrapper.contains(e.target)) {
            optionList.style.display = 'none';
        }
    });


    // silabus/sorces table
    const rows = [...selectBtn.nextElementSibling.nextSibling.querySelectorAll('tr')];
    const headerRows = [...rows[0].children]
                        .map(cell => `<th>${cell.textContent}</th>`)
                        .join('');

    const container = document.createElement('div');
    container.id = 'sorce-overlay';
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
    container.prepend(wrapper);

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
    form.style.display = 'none';
    form.insertAdjacentElement('afterend', container);
}