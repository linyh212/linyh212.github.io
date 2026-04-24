fetch("data.json")
    .then(res => res.json())
    .then(data => {
        document.getElementById("name").textContent = data.name;
        document.getElementById("email").textContent = data.email;

        const list = document.getElementById("links");
        data.links.forEach(link => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="${link.url}" target="_blank">${link.title}</a>`;
            list.appendChild(li);
        });
    });