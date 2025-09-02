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

  // --- Typewriter Effect ---
  const typewriterElement = document.getElementById('typewriter');
  const roles = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Engineer',
    'UI/UX Enthusiast',
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

  const heroImage = new Image();
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
      title: 'E-commerce Platform',
      category: 'fullstack',
      description:
        'A full-featured e-commerce site with React and Node.js, featuring product catalogs, user authentication, and a Stripe-integrated checkout process.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      features: [
        'User authentication with JWT',
        'Product search and filtering',
        'Shopping cart functionality',
        'Secure payment processing',
      ],
      snippet: `<div class="product-card">\n  <img src={product.image} alt={product.name} />\n  <h3>{product.name}</h3>\n  <p>{product.price}</p>\n  <button>Add to Cart</button>\n</div>`,
      link: '#',
    },
    {
      id: 1,
      title: 'Data Visualization Dashboard',
      category: 'frontend',
      description:
        'Interactive dashboard using D3.js for visualizing complex datasets with dynamic charts and graphs.',
      tech: ['D3.js', 'React', 'Tailwind'],
      features: [
        'Multiple chart types (bar, line, pie)',
        'Real-time data updates',
        'Export charts as SVG or PNG',
        'Responsive design for all devices',
      ],
      snippet: `const svg = d3.select(ref.current)\n  .attr("width", width)\n  .attr("height", height);\n\nsvg.selectAll("rect")\n  .data(data)\n  .enter()\n  .append("rect");`,
      link: '#',
    },
    {
      id: 2,
      title: 'RESTful API for Social App',
      category: 'backend',
      description:
        'A scalable backend API for a social media application, handling user profiles, posts, comments, and likes.',
      tech: ['Node.js', 'Express', 'PostgreSQL'],
      features: [
        'CRUD operations for users, posts, comments',
        'Secure authentication endpoints',
        'Pagination for handling large datasets',
        'Comprehensive API documentation',
      ],
      snippet: `app.get('/api/posts', async (req, res) => {\n  try {\n    const posts = await Post.findAll();\n    res.json(posts);\n  } catch (err) {\n    res.status(500).send('Server Error');\n  }\n});`,
      link: '#',
    },
    {
      id: 3,
      title: 'Real-time Chat Application',
      category: 'fullstack',
      description:
        'A chat app built with WebSockets for instant communication.',
      tech: ['Socket.IO', 'React', 'Node.js'],
      features: [
        'Instant messaging between users',
        'User online status indicators',
        'Room-based chat functionality',
        'Message history',
      ],
      snippet: `io.on('connection', (socket) => {\n  console.log('a user connected');\n  socket.on('chat message', (msg) => {\n    io.emit('chat message', msg);\n  });\n});`,
      link: '#',
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
      date: '2021 - Present',
      role: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
      description:
        'Led the development of a new microservices architecture, improving system scalability by 40%. Mentored junior developers and conducted code reviews.',
    },
    {
      date: '2019 - 2021',
      role: 'Software Engineer',
      company: 'Innovate Co.',
      description:
        'Developed and maintained features for a high-traffic web application using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software.',
    },
    {
      date: '2017 - 2019',
      role: 'Junior Developer',
      company: 'CodeCrafters LLC',
      description:
        'Assisted in the development of client websites using HTML, CSS, and JavaScript. Gained experience with version control systems like Git.',
    },
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