document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqAnswer = button.nextElementSibling;

        button.classList.toggle('active');
        faqAnswer.style.display = faqAnswer.style.display === 'block' ? 'none' : 'block';

        const icon = button.querySelector('i');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
    });
});

const hamburgerMenu = document.getElementById('hamburger-menu');
const navLinks = document.getElementById('nav-links');

let debounce = false;
hamburgerMenu.addEventListener('click', () => {
    if (!debounce) {
        navLinks.classList.toggle('active');
        debounce = true;
        setTimeout(() => {
            debounce = false;
        }, 300);
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const githubProjectsContainer = document.getElementById('github-projects');
    const githubUsername = 'BiagioKawasaki308';
    const githubApiUrl = `https://api.github.com/users/${githubUsername}/repos`;
    const token = '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'; // Inserisci il tuo token GitHub qui

    fetch(githubApiUrl, {
        headers: {
            'Authorization': `token ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Errore nell'accesso all'API: ${response.status}`);
        }
        return response.json();
    })
    .then(repositories => {
        console.log("Repositories fetched:", repositories); // Verifica la risposta

        repositories.forEach(repo => {
            // Crea il contenuto HTML per ogni repository
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('project');

            projectDiv.innerHTML = `
                <div class="project-info">
                    <h3>${repo.name}</h3>
                    <a href="${repo.html_url}" target="_blank" class="details-button">Vedi su GitHub</a>
                </div>
            `;
            githubProjectsContainer.appendChild(projectDiv);
        });
    })
    .catch(error => {
        console.error('Errore nel recuperare i dati da GitHub:', error);
    });
});
