// offline sample dictionary for very common words
const sampleDictionary = {
    "meaning": "the thing one intends to convey especially by language",
    "life": "the existence of an individual human being or animal",
    "love": "an intense feeling of deep affection",
    "hope": "a feeling of expectation and desire for a certain thing to happen",
    "courage": "the ability to do something that frightens one"
};

// helper: fetch definition from free dictionary API
async function fetchDefinition(word) {
    try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
        if (!res.ok) {
            throw new Error('not found');
        }
        const data = await res.json();
        // extract first meaning
        if (Array.isArray(data) && data[0].meanings && data[0].meanings[0].definitions) {
            return data[0].meanings[0].definitions[0].definition;
        }
    } catch (err) {
        // ignore
    }
    return null;
}

const input = document.getElementById('word-input');
const btn = document.getElementById('search-btn');
const resultDiv = document.getElementById('result');

btn.addEventListener('click', async () => {
    const word = input.value.trim().toLowerCase();
    if(!word) return;

    let meaning = sampleDictionary[word];
    if(!meaning) {
        meaning = await fetchDefinition(word);
    }
    if(meaning) {
        resultDiv.innerHTML = `<h2>${word}</h2><p>${meaning}</p>`;
    } else {
        resultDiv.innerHTML = `<p>Sorry, meaning for "${word}" not found.</p>`;
    }
});

input.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        btn.click();
    }
});

// Tutorial modal handlers
const tutorialBtn = document.getElementById('tutorial-btn');
const tutorialModal = document.getElementById('tutorial-modal');
const closeBtn = document.querySelector('.close-btn');

tutorialBtn.addEventListener('click', () => {
    tutorialModal.classList.remove('hidden');
});

closeBtn.addEventListener('click', () => {
    tutorialModal.classList.add('hidden');
});

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
    if (e.target === tutorialModal) {
        tutorialModal.classList.add('hidden');
    }
});