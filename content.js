//get current subjects
async function getCurrentSubjects() {

  const r = await fetch('/students/schedule.php', { credentials: 'include' });
  const html = await r.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const rows = [...doc.querySelectorAll('tbody')[5].querySelectorAll('tr')].slice(1);
  const subjects = [...rows].map(tr => {
    return tr.querySelector('td')?.innerText.trim();
  });

  return subjects;
} 

async function init() {

  // get data
  const currentSubjects = await getCurrentSubjects();

  const rows = document.querySelectorAll('tbody')[2].querySelectorAll('tr');
  const filteredRows = [...rows].filter(tr => tr.querySelector('td input[type="text"]:not(.style4)'));

  const dataRows = filteredRows.map(tr => {
    const tds = tr.querySelectorAll('td');
    const submitBtn = tds[1].querySelector('input[type="submit"]');
    return {
      semester: tds[0].querySelector('input')?.value,
      subject:  submitBtn?.value,
      name:     tds[2].innerText.trim(),
      credits:  tds[3].innerText.trim(),
      percent:  tds[4].querySelector('input')?.value,
      grade:    tds[5].innerText.trim(),
      score:    tds[6].innerText.trim(),
      form:     submitBtn,
      current: currentSubjects.includes(submitBtn?.value),
    };
  });
  dataRows.sort((a,b) => a.subject - b.subject);
  dataRows.sort((a,b) => b.semester - a.semester);
  dataRows.sort((a,b) => b.current - a.current);

  // clear original
  const mainTable = document.querySelectorAll('tbody')[1].closest('table');
  mainTable.style.display = 'none';

  // create header
  const container = document.createElement('div');
  container.id = 'my-overlay';
  container.innerHTML = `
    <table id="clean-table">
      <thead>
        <tr>
          <th>კურსი</th>
          <th>საგნის კოდი</th>
          <th>საგნის დასახელება</th>
          <th>კრედიტი</th>
          <th>პროცენტი</th>
          <th>ქულა</th>
          <th>ხარისხის ქულა</th>
        </tr>
      </thead>
      <tbody id="clean-tbody"></tbody>
    </table>
  `;
  mainTable.parentElement.appendChild(container);

  // fill it with your data
  const tbody = document.getElementById('clean-tbody');

  dataRows.forEach(row => {
    const newTr = document.createElement('tr');

    newTr.innerHTML = `
      <tr>
        <td><span class="semester-tag">${row.semester}</span></td>
        <td><button class="subject-btn">${row.subject}</button></td>
        <td>${row.name}</td>
        <td><span class="badge credit">${row.credits}</span></td>
        <td>${Math.trunc(row.percent)}%</td>
        <td><span class="badge ${gradeClass(row.grade)}">${row.grade}</span></td>
        <td>${row.score}</td>
      </tr>
    `;
    newTr.className = row.current ? 'current' : '';

    const btn = newTr.querySelector('.subject-btn');
    if (row.form) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        row.form.click();
      })
    }

    tbody.appendChild(newTr);
  });

  // row functions
  function gradeClass(g) {
    if (g === 'A') return 'grade-a';
    if (g === 'B') return 'grade-b';
    if (g === 'C') return 'grade-c';
    if (g === 'F') return 'grade-f';
  }
}

init();