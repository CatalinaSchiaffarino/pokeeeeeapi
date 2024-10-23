const pokemonNames = ['pikachu', 'bulbasaur', 'charmander', 'squirtle', 'jigglypuff', 'meowth', 'eevee', 'snorlax'];
let currentIndex = 0;

document.getElementById('fetch-button').addEventListener('click', () => {
    const promises = [];

    for (let i = 0; i < 3; i++) {
        if (currentIndex >= pokemonNames.length) {
            alert('No hay más Pokémon disponibles.');
            return;
        }

        const name = pokemonNames[currentIndex];
        promises.push(
            fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
        );
        currentIndex++;
    }

    Promise.all(promises)
        .then(dataArray => {
            const infoDiv = document.getElementById('pokemon-info');
            infoDiv.innerHTML = '';

            dataArray.forEach(data => {
                infoDiv.innerHTML += `
                    <div class="pokemon-card">
                        <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
                        <p>Altura: ${data.height}</p>
                        <p>Peso: ${data.weight}</p>
                        <img src="${data.sprites.front_default}" alt="${data.name}">
                    </div>
                `;
            });
        })
        .catch(error => console.error('Error:', error));
});
