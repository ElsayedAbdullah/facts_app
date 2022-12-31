const CATEGORIES = [
  { name: 'technology', color: '#3b82f6' },
  { name: 'science', color: '#16a34a' },
  { name: 'finance', color: '#ef4444' },
  { name: 'society', color: '#eab308' },
  { name: 'entertainment', color: '#db2777' },
  { name: 'health', color: '#14b8a6' },
  { name: 'history', color: '#f97316' },
  { name: 'news', color: '#8b5cf6' }
];

const btn = document.querySelector('.btn-share-fact');
const factForm = document.querySelector('.fact-form');

btn.addEventListener('click', function () {
  if (factForm.classList.contains('hidden')) {
    factForm.classList.remove('hidden');
    btn.textContent = 'Close';
  } else {
    factForm.classList.add('hidden');
    btn.textContent = 'Share a fact';
  }
});

// load data from API
const loadFacts = async function () {
  const res = await fetch('https://ifwcaepodbhskcpwzluy.supabase.co/rest/v1/facts', {
    headers: {
      apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlmd2NhZXBvZGJoc2tjcHd6bHV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIwNDcxNTgsImV4cCI6MTk4NzYyMzE1OH0.h4m1QmeKBo8d3cVT8Z577dQQyfSiy4uAWJ1HeDTZmGM',
      authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlmd2NhZXBvZGJoc2tjcHd6bHV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIwNDcxNTgsImV4cCI6MTk4NzYyMzE1OH0.h4m1QmeKBo8d3cVT8Z577dQQyfSiy4uAWJ1HeDTZmGM'
    }
  });

  const data = await res.json();
  createFactList(data);
};

loadFacts();

// render the facts in DOM
const factsList = document.querySelector('.facts-list');

factsList.innerHTML = '';
const createFactList = function (data) {
  data.map((fact) => {
    const html = `
      <li class="fact">
        <p>
          ${fact.text}
          <a class="source" href="${fact.source}" target="_blank">(Source)</a>
        </p>
        <span class="tag" style="background-color: ${CATEGORIES.find((cat) => cat.name === fact.category).color}">${fact.category}</span>
      </li>
    `;

    factsList.insertAdjacentHTML('afterbegin', html);
  });
};
