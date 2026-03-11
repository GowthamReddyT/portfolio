document.addEventListener('DOMContentLoaded', () => {

  // 1. TYPEWRITER ANIMATION
  const typewriterEl = document.getElementById('typewriter-text');
  const roles = [
    'DevOps & Cloud Engineer',
    'Python Full-Stack Developer',
    'Salesforce Developer & Administrator',
    'Building scalable, automated systems'
  ];
  let roleIndex = 0, charIndex = 0, isDeleting = false;
  function typeWriter() {
    if (!typewriterEl) return;
    const current = roles[roleIndex];
    typewriterEl.textContent = isDeleting
      ? current.substring(0, charIndex--)
      : current.substring(0, charIndex++);
    if (!isDeleting && charIndex === current.length + 1) {
      isDeleting = true; setTimeout(typeWriter, 1800); return;
    }
    if (isDeleting && charIndex === 0) {
      isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(typeWriter, 400); return;
    }
    setTimeout(typeWriter, isDeleting ? 45 : 95);
  }
  typeWriter();

  // 2. PARTICLE BACKGROUND
  const container = document.getElementById('particles-container');
  if (container) {
    for (let i = 0; i < 25; i++) {
      const dot = document.createElement('div');
      dot.classList.add('particle');
      const size = Math.random() * 6 + 3;
      dot.style.cssText = `
        position: absolute;
        width: ${size}px; height: ${size}px;
        border-radius: 50%;
        background: ${Math.random() > 0.5 ? 'rgba(100,255,218,0.4)' : 'rgba(189,147,249,0.4)'};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: floatParticle ${Math.random() * 6 + 4}s ease-in-out ${Math.random() * 4}s infinite alternate;
        pointer-events: none;
      `;
      container.appendChild(dot);
    }
  }

  // 3. SCROLL REVEAL
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));

  // 4. ACTIVE NAV ON SCROLL (index.html only)
  const sections = document.querySelectorAll('section[id]');
  const navIcons = document.querySelectorAll('.nav-icon');
  if (sections.length > 0) {
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
      });
      navIcons.forEach(icon => {
        icon.classList.remove('active');
        if (icon.getAttribute('href') === `#${current}` || icon.getAttribute('href') === `index.html#${current}`) {
          icon.classList.add('active');
        }
      });
    });
  }

  // 5. SKILL CARD ACCORDION
  const projectsData = {
    python: [
      {
        title: 'Cloud-Based Intrusion Detection System using ML',
        description: 'Developed an intrusion detection system using SVM, Random Forest, Logistic Regression, and CNN to classify cyber threats in cloud environments using the NSL-KDD dataset.',
        link: 'https://github.com/GowthamReddyT/Intrusion-Detection-Based-on-Machine-Learning-in-Cloud-Environment'
      },
      {
        title: 'Logistics ERP System (Internship Project)',
        description: 'Built an ERP-based logistics and supply chain management system using Django, enabling shipment tracking and real-time database synchronization.',
        link: 'https://github.com/GowthamReddyT'
      }
    ],
    front_end: [
      {
        title: 'Real-Time Environmental Data Dashboard',
        description: 'An interactive dashboard visualizing live environmental and weather data using FastAPI, Chart.js, and REST APIs with auto-refresh features.',
        link: 'https://gowthamreddyt.github.io/Live-Dashboard/'
      }
    ],
    salesforce: [
      {
        title: 'RiceHub CRM Application',
        description: 'Custom CRM app in Salesforce Lightning platform using Apex and Visualforce for business workflow automation.',
        link: 'https://github.com/GowthamReddyT'
      },
      {
        title: 'Workflow Automation Demo',
        description: 'Salesforce project automating approval and record updates with Apex triggers and Lightning components.',
        link: 'https://github.com/GowthamReddyT'
      }
    ],
    cloud: [
      {
        title: 'CI/CD Pipeline Deployment',
        description: 'Configured continuous integration pipelines using Jenkins, Docker, and Kubernetes to automate testing and deployment on AWS.',
        link: 'https://github.com/GowthamReddyT'
      },
      {
        title: 'Cloud-Based IDS Deployment',
        description: 'Containerized and deployed a Machine Learning-based IDS using AWS ECS and EKS clusters.',
        link: 'https://github.com/GowthamReddyT'
      }
    ],
    database: [
      {
        title: 'Oracle SQL Database Optimization',
        description: 'Improved database performance by optimizing SQL queries and designing stored procedures for multi-user environments.',
        link: 'https://github.com/GowthamReddyT'
      }
    ]
  };

  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('click', () => {
      const skill = card.dataset.skill;
      const dropdown = card.querySelector('.project-dropdown');
      const isActive = card.classList.contains('active');

      // Close all
      document.querySelectorAll('.skill-card.active').forEach(c => {
        c.classList.remove('active');
        c.querySelector('.project-dropdown').style.maxHeight = '0';
      });

      if (!isActive) {
        card.classList.add('active');
        if (!dropdown.innerHTML.trim()) {
          const projects = projectsData[skill] || [];
          dropdown.innerHTML = projects.map(p => `
            <div class="project-item">
              <h4>${p.title}</h4>
              <p>${p.description}</p>
              <a href="${p.link}" target="_blank" rel="noopener noreferrer" class="project-link">View Project <i class="fas fa-external-link-alt"></i></a>
            </div>
          `).join('');
        }
        dropdown.style.maxHeight = dropdown.scrollHeight + 'px';
      }
    });
  });

  // Close accordion on outside click
  document.addEventListener('click', e => {
    if (!e.target.closest('.skill-card')) {
      document.querySelectorAll('.skill-card.active').forEach(c => {
        c.classList.remove('active');
        c.querySelector('.project-dropdown').style.maxHeight = '0';
      });
    }
  });

});
