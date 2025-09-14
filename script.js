document.addEventListener('DOMContentLoaded', function () {
  // --- Custom Cursor ---
  const cursorDot = document.getElementById('cursor-dot');
  window.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
  });

  function updateInteractiveElements() {
    const interactiveElements = document.querySelectorAll(
      'a, button, .project-card, input, textarea'
    );
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () =>
        cursorDot.classList.add('hovered')
      );
      el.addEventListener('mouseleave', () =>
        cursorDot.classList.remove('hovered')
      );
    });
  }
  updateInteractiveElements();




    // --- Quote → ASCII → Terminal Sequence ---
  const quotes = [
  "Ransomware attacks are not only increasing in scale and frequency, but also sophistication. — Roger Spitz",
  "The internet doesn’t forget, because forgetting isn’t profitable. — Timsux Wales",
  "A successful hacking methodology is built on accumulated experience with diverse techniques, explored creatively. — Timsux Wales",
  "Nothing can be hacked without connectivity, even your heart. — Avin29feb",
  "Collecting intelligence and understanding an adversary's motivations is fundamental to cybersecurity. — Dmitri Alperovitch",
  "Agentic AI in security is like a seasoned chess grandmaster, anticipating threats before they unfold. — Jason Hishmeh",
  "Like a lighthouse in a restless sea, cybersecurity shines not by predicting storms, but by facing the unexpected. — Stephane Nappo",
  "Security doesn’t start with detection, it begins with design. — Timsux Wales",
  "Security is an outcome of thoughtful design, not a product you install or a checklist you complete. — Timsux Wales",
  "Security is a people problem wearing a technical costume. — Timsux Wales",
  "Security doesn’t exist in a vacuum, it lives in the context of money, risk, and reputation. — Timsux Wales",
  "Cybersecurity will not be saved by corporate decorum. It will be saved by those willing to fail forward and defend relentlessly. — Ludmila Morozova-Buss",
  "Hackers have underground forums. We have NDAs, corporate decorum... and a false sense of security. — Ludmila Morozova-Buss",
  "There is no perfect security, only maximum temporary security. — Gun Gun Febrianza",
  "In the cybersecurity industry, you can pray for peace, but never stop entertaining chaos. — Timsux Wales",
  "In our shared digital future, hacking and cybersecurity can no longer exist in a black box. — Laura S. Scherling",
  "It may take legions of cybersecurity advocates before awareness is truly baked into daily routines. — Laura S. Scherling",
  "The much-lamented 'cybersecurity skills gap' is a myth. The real disease is a leadership gap. — Ludmila Morozova-Buss",
  "Cybersecurity's greatest failure is a leadership gap, not a skills gap. — Ludmila Morozova-Buss",
  "Social engineering succeeds only if defaults fire unchallenged. Whoever engineers the situation engineers the outcome. — Timsux Wales"
];


  const quoteContainer = document.getElementById("quote-container");
  const heroImage = new Image();
  heroImage.crossOrigin = "Anonymous";
  heroImage.src = document.getElementById("hero-img").src;

  // Terminal card (the bottom fake terminal in hero)
  const terminalCard = document.querySelector(
    "#hero .absolute.bottom-8"
  );
  // terminalCard.style.opacity = "0"; // hide initially
  // terminalCard.style.transform = "translateY(30px)";
  // terminalCard.style.transition = "all 1s ease-in-out";

  // 1) Show random quote
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteContainer.textContent = randomQuote;
  quoteContainer.classList.add("opacity-100");

  function loadAsciiFile(url) {
  fetch(url)
    .then(res => res.text())
    .then(text => {
      // Convert ANSI-style codes to HTML
      let parsed = text
        .replace(/%clr/g, "</span>")
        .replace(/%whi/g, "<span style='color:white'>")
        .replace(/%dyel/g, "<span style='color:yellow'>")
        .replace(/%bld/g, "<span style='font-weight:bold'>")
        .replace(/%blk/g, "<span style='color:black'>");

      // Split into lines
      let lines = parsed.split("\n");
      let container = document.getElementById("ascii-file-output");
      container.innerHTML = "";

      let i = 0;
      function showLine() {
        if (i < lines.length) {
          container.innerHTML += lines[i] + "\n";
          i++;
          setTimeout(showLine, 50); // typing speed (ms per line)
        } else {
          // Once finished, fade out ASCII
          setTimeout(() => {
            container.style.transition = "opacity 1s";
            container.style.opacity = "0";
          }, 1000); // wait 1s before hiding
        }
      }
      showLine();
    })
    .catch(err => console.error("Error loading ASCII file:", err));
}



  // 2) After 3s, fade out quote and start ASCII
  setTimeout(() => {
  // Fade out quote
  quoteContainer.classList.remove("opacity-100");
  quoteContainer.classList.add("opacity-0");

  setTimeout(() => {
    // Start ASCII rendering in the background canvas
    heroImage.onload = () => {
      initParticles(heroImage);
      animate();
    };

    // Show terminal at the same time
    terminalCard.style.opacity = "1";
    terminalCard.style.transform = "translateY(0)";

    // ✅ Load ASCII file into fake terminal
    loadAsciiFile("aperture-science-01.txt");

  }, 100); // delay after quote disappears

}, 5000); // how long the quote stays visible



  // --- Typewriter Effect ---
  const typewriterElement = document.getElementById('typewriter');
  const roles = [
    'CyberSecuriy Researcher',
    'Bug Bounty Hunter',
    'AI & Data Enthiseast',
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      setTimeout(() => (isDeleting = true), 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    const typeSpeed = isDeleting ? 100 : 200;
    setTimeout(type, typeSpeed);
  }
  type();

  // --- Pixel Assembler Hero Effect ---
  const canvas = document.getElementById('hero-canvas');
  const heroSection = document.getElementById('hero');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particleArray = [];
  const characters = [
    '{',
    '}',
    ';',
    ':',
    '=',
    '+',
    '-',
    '*',
    '/',
    '>',
    '<',
    '(',
    ')',
    '[',
    ']',
  ];

  const mouse = {
    x: null,
    y: null,
    radius: 100,
  };

  heroSection.addEventListener('mousemove', function (event) {
    const rect = heroSection.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
  });

  heroSection.addEventListener('mouseleave', function () {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor(x, y, character, color) {
      this.x = x;
      this.y = y;
      this.character = character;
      this.color = color;
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = Math.random() * 40 + 5;
      this.size = 3;
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.font = '10px Fira Code';
      ctx.fillText(this.character, this.x, this.y);
    }
    update() {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let forceDirectionX = dx / distance;
      let forceDirectionY = dy / distance;
      let maxDistance = mouse.radius;
      let force = (maxDistance - distance) / maxDistance;
      let directionX = forceDirectionX * force * this.density;
      let directionY = forceDirectionY * force * this.density;

      if (distance < mouse.radius) {
        this.x -= directionX;
        this.y -= directionY;
      } else {
        if (this.x !== this.baseX) {
          let dx = this.x - this.baseX;
          this.x -= dx / 10;
        }
        if (this.y !== this.baseY) {
          let dy = this.y - this.baseY;
          this.y -= dy / 10;
        }
      }
    }
  }

  function initParticles(image) {
    particleArray = [];

    const heroWidth = canvas.width;
    const heroHeight = canvas.height;

    const imgAspect = image.width / image.height;
    const canvasAspect = heroWidth / heroHeight;

    let imgWidth, imgHeight;

    if (imgAspect > canvasAspect) {
      imgHeight = heroHeight;
      imgWidth = imgHeight * imgAspect;
    } else {
      imgWidth = heroWidth;
      imgHeight = imgWidth / imgAspect;
    }

    const startX = heroWidth - imgWidth;
    let startY;

    if (window.innerWidth > 1024) {
      startY = (heroHeight - imgHeight) / 2 + 100;
    } else {
      startY = (heroHeight - imgHeight) / 2;
    }

    // Draw image to a temporary canvas to grab pixel data
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = imgWidth;
    tempCanvas.height = imgHeight;
    tempCtx.drawImage(image, 0, 0, imgWidth, imgHeight);

    const imageData = tempCtx.getImageData(0, 0, imgWidth, imgHeight);

    // step controls particle density → higher = smoother
    const step = 9;

    for (let y = 0; y < imageData.height; y += step) {
      for (let x = 0; x < imageData.width; x += step) {
        const i = (y * imageData.width + x) * 4;
        const alpha = imageData.data[i + 3];

        if (alpha > 128) {
          const r = imageData.data[i];
          const g = imageData.data[i + 1];
          const b = imageData.data[i + 2];
          const color = `rgb(${r},${g},${b})`;

          const randomChar =
            characters[Math.floor(Math.random() * characters.length)];
          particleArray.push(
            new Particle(startX + x, startY + y, randomChar, color)
          );
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
      particleArray[i].draw();
      particleArray[i].update();
    }
    requestAnimationFrame(animate);
  }

  // const profileImage = new Image();
  // profileImage.crossOrigin = 'Anonymous';
  // profileImage.src = document.getElementById('about-img').src;
  // profileImage.onload = () => {
  //   initParticles(profileImage);
  //   animate();
  // };

  // const heroImage = new Image();
  heroImage.crossOrigin = 'Anonymous';
  heroImage.src = document.getElementById('hero-img').src;
  heroImage.onload = () => {
    initParticles(heroImage);
    animate();
  };

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles(profileImage);
  });

  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  revealElements.forEach((el) => revealObserver.observe(el));

  // --- Staggered Skill Bar Animation ---
  const skillsSection = document.querySelector('#about');
  const skillBars = document.querySelectorAll('.skill-bar-inner');
  const skillObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        skillBars.forEach((bar, index) => {
          setTimeout(() => {
            bar.style.width = bar.getAttribute('data-width');
          }, index * 150);
        });
        skillObserver.unobserve(skillsSection);
      }
    },
    { threshold: 0.5 }
  );
  skillObserver.observe(skillsSection);

  // --- Portfolio Filtering & Modals ---
  const projects = [
    
    {
    id: 0,
    title: "Blockchain Framework for Web3 Transactions",
    category: ">Projects",
    description:
      "A peer-to-peer blockchain network of 15 devices running PoW algorithms and consensus mechanisms, integrating smart contracts and secure transaction flows that improved transaction security & anonymity by using cryptography, hashing, and digital signatures.",
    tech: ["Python", "Cryptography", "Hashing", "Digital Signatures"],
    features: [
      "Consensus mechanism implementation (Proof of Work)",
      "Smart contract integration",
      "Secure peer-to-peer transactions",
      "Improved anonymity through cryptographic methods"
    ],
    snippet: `<div class="project-card">
      <h3>Blockchain Network</h3>
      <p>Decentralized peer-to-peer transactions with smart contracts.</p>
    </div>`,
    link: "https://github.com/kingakshat"
  },
  {
    id: 1,
    title: "Web Application SQL Injection Scanner",
    category: ">Projects",
    description:
      "Developed a Python-based scanner that identifies vulnerabilities in URLs and HTML forms by detecting unsafe input parameters and SQL injection possibilities.",
    tech: ["Python", "Requests", "Regex"],
    features: [
      "Scans URLs and HTML forms",
      "Detects SQL injection points",
      "Supports GET and POST methods",
      "Lightweight and scriptable tool"
    ],
    snippet: `<div class="project-card">
      <h3>SQLi Scanner</h3>
      <p>Python tool to detect SQL injection vulnerabilities in web apps.</p>
    </div>`,
    link: "https://github.com/kingakshat/Web-Application-SQL-Injection-Scanner-with-Python"
  },
  {
    id: 2,
    title: "Network Tracking & Visualization",
    category: ">Projects",
    description:
      "A system integrating Wireshark with Python & Google Earth to monitor network traffic, detect anomalies, and visualize IP geolocation.",
    tech: ["Wireshark", "Python", "Google Earth"],
    features: [
      "Packet capture and parsing",
      "Anomaly detection",
      "IP geolocation visualization",
      "Real-time monitoring dashboard"
    ],
    snippet: `<div class="project-card">
      <h3>Network Visualization</h3>
      <p>Track and visualize live network traffic on a global map.</p>
    </div>`,
    link: "https://github.com/kingakshat/Wireshark-Python-Network-Traffic-Visualization"
  },




  ];

  const portfolioGrid = document.getElementById('portfolio-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const modalOverlay = document.getElementById('project-modal-overlay');
  const modalBody = document.querySelector('.modal-body');
  const modalTabs = document.querySelectorAll('.modal-tab');

  function displayProjects(filter) {
    portfolioGrid.innerHTML = '';
    const filteredProjects =
      filter === 'all'
        ? projects
        : projects.filter((p) => p.category === filter);

    filteredProjects.forEach((project) => {
      const projectCard = `
                      <div class="project-card rounded-lg overflow-hidden" data-id="${
                        project.id
                      }">
                          <div class="p-6">
                              <h3 class="text-xl font-bold mb-2 text-accent">${
                                project.title
                              }</h3>
                              <p class="text-secondary mb-4">${project.description.substring(
                                0,
                                80
                              )}...</p>
                              <div class="flex flex-wrap gap-2 mb-4">
                                  ${project.tech
                                    .map(
                                      (t) =>
                                        `<span class="bg-gray-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">${t}</span>`
                                    )
                                    .join('')}
                              </div>
                              <span class="text-green hover:underline">View Details →</span>
                          </div>
                      </div>
                  `;
      portfolioGrid.innerHTML += projectCard;
    });

    document.querySelectorAll('.project-card').forEach((card) => {
      card.addEventListener('click', (e) =>
        openModal(e.currentTarget.dataset.id)
      );
    });
    updateInteractiveElements();
  }

  function openModal(projectId) {
    const project = projects.find((p) => p.id == projectId);
    if (!project) return;
    updateModalContent(project, 'description');
    modalOverlay.classList.add('active');
  }

  function updateModalContent(project, activeTab) {
    let content = '';
    modalTabs.forEach((tab) => {
      tab.classList.toggle('active', tab.dataset.tab === activeTab);
      tab.onclick = () => updateModalContent(project, tab.dataset.tab);
    });

    switch (activeTab) {
      case 'features':
        content = `<h3 class="text-xl font-bold mb-4 text-accent">Key Features</h3><ul class="list-disc list-inside space-y-2">${project.features
          .map((f) => `<li>${f}</li>`)
          .join('')}</ul>`;
        break;
      case 'snippet':
        content = `<h3 class="text-xl font-bold mb-4 text-accent">Code Snippet</h3><pre><code class="language-javascript rounded-lg">${project.snippet}</code></pre>`;
        break;
      default:
        content = `<h3 class="text-xl font-bold mb-4 text-accent">${project.title}</h3><p class="text-primary mb-4">${project.description}</p><a href="${project.link}" target="_blank" class="text-green hover:underline font-bold">Visit Website →</a>`;
    }
    modalBody.innerHTML = content;
    if (activeTab === 'snippet') {
      hljs.highlightAll();
    }
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      displayProjects(btn.dataset.filter);
    });
  });

  document
    .getElementById('modal-close-btn')
    .addEventListener('click', () => modalOverlay.classList.remove('active'));
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) modalOverlay.classList.remove('active');
  });

  displayProjects('all');
  document
    .querySelector('.filter-btn[data-filter="all"]')
    .classList.add('active');

  const experiences = [

    {
      date: "Jan 2025 - Present",
      role: "Cyber Security Analyst",
      company: "TCS - GE Vernova ARC, Bengaluru, India",
      description: "Managed enterprise vulnerability management, running security tools across on-prem and cloud servers, and automated end-to-end vulnerability identification & reporting, reducing response time to 60%. Implemented a passive reconnaissance framework & automating 90% of manual checks using Shell scripts to identify known CVEs, CPEs & exploits for software products. Facilitated & monitored application security scans (SAST, DAST, AVA, VAPT), for efficient of risk tracking. Developed Splunk queries for endpoint detection, identifying and flagging unauthorized and suspicious activities."
    },
    {
      date: "July 2022 - Dec 2024",
      role: "Data Analysis & Migration Consultant",
      company: "TCS - GE Vernova, Mumbai, India",
      "description": "Built & optimized ETL data pipelines to migrate data between ERP systems using SQL & ETL Tools. Analyzed complex data, and delivered actionable insights for data accuracy and streamlined workflows."
    },
    {
      date: "Mar 2021 - May 2021",
      role: "IT and Network Operations Intern",
      company: "ALOK Industries LTD, Vapi, Gujarat",
      "description": "Implemented & configured servers, leveraging Networking tools to enhance network management efficiency."
    }


  ];
  const experienceContainer = document.querySelector('#experience .relative');
  experiences.forEach((exp) => {
    const item = `<div class="timeline-item"><div class="timeline-dot"></div><p class="text-sm text-secondary mb-1">${exp.date}</p><h3 class="text-xl font-bold text-accent">${exp.role}</h3><p class="font-semibold mb-2">${exp.company}</p><p class="text-primary">${exp.description}</p></div>`;
    experienceContainer.innerHTML += item;
  });

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenuBtn.addEventListener('click', () =>
    mobileMenu.classList.toggle('hidden')
  );

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document
        .querySelector(this.getAttribute('href'))
        .scrollIntoView({ behavior: 'smooth' });
      if (!mobileMenu.classList.contains('hidden'))
        mobileMenu.classList.add('hidden');
    });
  });
});


