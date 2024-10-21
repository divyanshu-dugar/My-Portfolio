document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById("load-characters");
    const ajax = document.getElementById("ajax");

    button.addEventListener('click', () => {
        fetch('/api/data')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const charTable = document.createElement('table');
                data.forEach(character => {
                    const newRow = document.createElement('tr');
                    newRow.innerHTML = 
                    `<tr>
                        <td>${character.name}</td> 
                        <td>${character.house}</td>
                    </tr>`

                    charTable.appendChild(newRow);
                    ajax.appendChild(charTable);
                });
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error); 
            });
    });
});
