document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("navMenu");
  const overlay = document.getElementById("overlay");

  function openMenu() {
    nav.classList.add("active");
    overlay.classList.add("active");
  }

  function closeMenu() {
    nav.classList.remove("active");
    overlay.classList.remove("active");
  }

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    nav.classList.contains("active") ? closeMenu() : openMenu();
  });

  overlay.addEventListener("click", closeMenu);

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
  
  document.getElementById("glass-text").textContent = "hello.";
  
  // ===== Load data =====
  fetch("data.json")
    .then((res) => res.json())
    .then((data) => {
      if (document.getElementById("name"))
        document.getElementById("name").textContent = data.name;

      if (document.getElementById("title"))
        document.getElementById("title").textContent = data.title;

      if (document.getElementById("about"))
        document.getElementById("about").textContent = data.about;

      const projectList = document.getElementById("project-list");
      if (projectList) {
        data.projects.forEach((p) => {
          const div = document.createElement("div");
          div.className = "card";
          div.innerHTML = `
                    <h4>${p.name}</h4>
                    <p>${p.desc}</p>
                    <a href="${p.link}" target="_blank">View</a>
                `;
          projectList.appendChild(div);
        });
      }

      const linkList = document.getElementById("link-list");
      if (linkList) {
        data.links.forEach((l) => {
          const a = document.createElement("a");
          a.href = l.url;
          a.target = "_blank";
          a.textContent = l.title;
          linkList.appendChild(a);
        });
      }
    })
    .catch((err) => console.log("JSON error:", err));
});
