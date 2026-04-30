// give padding
sorceMain = document.querySelector('table');
sorceMain.className = 'sorce-main';

//sorce blocks
function classifyRow(tr) {
  if (tr.querySelector('td.titlehdr4')) return 'title';
  if (tr.querySelector('td span.style79')) return 'link';
  return 'skip';
}
const sorceTable = document.querySelectorAll('table')[1];
const sorceRows = sorceTable.querySelectorAll('tr');
sorceTable.style.display = 'none';

const blocks = [];
let currentBlock = null;

sorceRows.forEach(tr => {
  const type = classifyRow(tr);
  if (type === 'skip') return;
  if (type === 'title') {
    currentBlock = { title: tr, links: [] };
    blocks.push(currentBlock);
  }
  if (type === 'link' && currentBlock) {
    currentBlock.links.push(tr);
  }
});

const constainer = document.createElement('div');
constainer.id = 'sorces-container';

blocks.forEach( block => {
    const title = block.title.querySelectorAll('td span')[0].innerText;
    const date = block.title.querySelectorAll('td span')[1]?.innerText;
    
    const box = document.createElement('div');
    box.className = 'sorce-box';
    box.innerHTML = `
        <div class="header">
            <span class="lecture">${title}</span>
            <span class="date">${date ? date : ''}</span>
        </div>
        <table class="sorce-table">
            <thead>
                <tr>
                    <td style="width: 40%">სასწავლო მასალის დასახელება</td>
                    <td>ფაილის დასახელება</td>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    `;
    tbody = box.querySelector('tbody');
    block.links.forEach( tr => {
        const a = tr.querySelector('a');
        const fullText = a?.innerText.trim();
        if (!fullText) return;
        const text = fullText.split(' - ')[0];
        const fileType = fullText.split('.')[1];
        const row = document.createElement('tr');
        console.log(fullText);
        row.innerHTML = `
            <td>${text}</td>
            <td>
                <a href="${a?.href}">${text}${fileType ? '.'+fileType : ''}</a>
            </td>
        `;
        tbody.appendChild(row);
    });
    constainer.appendChild(box);
});
sorceTable.insertAdjacentElement('afterend', constainer);