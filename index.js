/* ===================== PORTFOLIO MASTER JS ===================== */
document.addEventListener("DOMContentLoaded", () => {
  /* === 1. Typing Animation for Home Page === */
  const typingElement = document.getElementById("typing-text");
  const textsToType = [
    "A Full-Stack Python Developer.",
    "DevOps & Cloud Professional with AWS Expertise.",
    "A Salesforce Developer & Administrator.",
    "Let's build something scalable!"
  ];

  let textIndex = 0, charIndex = 0, isDeleting = false;
  function typeWriter() {
    if (!typingElement) return;
    const currentText = textsToType[textIndex];
    typingElement.textContent = isDeleting
      ? currentText.substring(0, charIndex--)
      : currentText.substring(0, charIndex++);

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(typeWriter, 1500);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % textsToType.length;
      setTimeout(typeWriter, 400);
    } else {
      setTimeout(typeWriter, isDeleting ? 50 : 100);
    }
  }
  typeWriter();


  /* === 2. Skill Projects Data === */
  const projectsData = {
    python: [
      {
        title: "Cloud-Based Intrusion Detection System using ML",
        description:
          "Developed an intrusion detection system using SVM, Random Forest, Logistic Regression, and CNN to classify cyber threats in cloud environments using the NSL-KDD dataset.",
        link: "https://github.com/GowthamReddyT/Intrusion-Detection-Based-on-Machine-Learning-in-Cloud-Environment"
      },
      {
        title: "Logistics ERP System (Internship Project)",
        description:
          "Built an ERP-based logistics and supply chain management system using Django, enabling shipment tracking and real-time database synchronization.",
        link: "https://github.com/GowthamReddyT"
      }
    ],

    front_end: [
      {
        title: "Real-Time Environmental Data Dashboard",
        description:
          "An interactive dashboard visualizing live environmental and weather data using FastAPI, Chart.js, and REST APIs with auto-refresh features.",
        link: "https://gowthamreddyt.github.io/Live-Dashboard/"
      }
    ],

    salesforce: [
      {
        title: "RiceHub CRM Application",
        description:
          "Custom CRM app in Salesforce Lightning platform using Apex and Visualforce for business workflow automation.",
        link: "https://github.com/GowthamReddyT"
      },
      {
        title: "Workflow Automation Demo",
        description:
          "Salesforce project automating approval and record updates with Apex triggers and Lightning components.",
        link: "https://github.com/GowthamReddyT"
      }
    ],

    cloud: [
      {
        title: "CI/CD Pipeline Deployment",
        description:
          "Configured continuous integration pipelines using Jenkins, Docker, and Kubernetes to automate testing and deployment on AWS.",
        link: "https://github.com/GowthamReddyT"
      },
      {
        title: "Cloud-Based IDS Deployment",
        description:
          "Containerized and deployed a Machine Learning-based IDS using AWS ECS and EKS clusters.",
        link: "https://github.com/GowthamReddyT"
      }
    ],

    database: [
      {
        title: "Oracle SQL Database Optimization",
        description:
          "Improved database performance by optimizing SQL queries and designing stored procedures for multi-user environments.",
        link: "https://github.com/GowthamReddyT"
      }
    ]
  };


  /* === 3. Skill Card Dropdown with Clickable Links === */
  const skillCards = document.querySelectorAll(".skill-card");

  skillCards.forEach((card) => {
    card.addEventListener("click", () => {
      const skill = card.getAttribute("data-skill");
      const isActive = card.classList.contains("active");

      // Remove old dropdowns
      document.querySelectorAll(".project-details").forEach((el) => el.remove());
      document.querySelectorAll(".skill-card.active").forEach((el) =>
        el.classList.remove("active")
      );

      if (isActive) return; // if clicking the same card, close it

      // Activate this card
      card.classList.add("active");
      const arrow = card.querySelector(".arrow");
      if (arrow) arrow.textContent = "↑";

      // Create dropdown content
      const projectList = projectsData[skill];
      if (!projectList) return;

      const dropdown = document.createElement("div");
      dropdown.classList.add("project-details");

      let contentHTML = `<h3 style="color: var(--accent-color); margin-bottom: 12px;">${skill
        .replace("_", " ")
        .toUpperCase()} PROJECTS</h3>`;

      projectList.forEach((project) => {
        contentHTML += `
          <div class="project-item" style="margin-bottom: 14px;">
            <h4 style="color: var(--primary-color); margin-bottom: 5px;">${project.title}</h4>
            <p style="margin-bottom: 6px;">${project.description}</p>
            <a href="${project.link}" target="_blank" style="color: var(--accent-color); font-weight: 600; text-decoration:none;">
              Hosted Link <i class="fas fa-external-link-alt"></i>
            </a>
          </div>
        `;
      });

      dropdown.innerHTML = contentHTML;
      card.insertAdjacentElement("afterend", dropdown);

      // Scroll smoothly to dropdown
      dropdown.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });

  /* === 4. Reset Arrow Directions on Outside Click === */
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".skill-card")) {
      document.querySelectorAll(".skill-card.active").forEach((c) => {
        c.classList.remove("active");
        const arrow = c.querySelector(".arrow");
        if (arrow) arrow.textContent = "↓";
      });
      document.querySelectorAll(".project-details").forEach((d) => d.remove());
    }
  });
});
