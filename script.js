/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navigationItems = document.querySelectorAll(".nav-links a");

function closeMenu() {
  if (!menuToggle || !navLinks) return;

  navLinks.classList.remove("open");
  menuToggle.classList.remove("active");

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  navigationItems.forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  document.addEventListener("click", event => {
    if (
      !navLinks.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });
}


/* =========================================
   ACTIVE SECTION INDICATOR
========================================= */

const pageSections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.id;

          navigationItems.forEach(link => {
            const isActive =
              link.getAttribute("href") === `#${currentId}`;

            link.classList.toggle("active", isActive);

            if (isActive) {
              link.setAttribute("aria-current", "location");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        }
      });
    },
    {
      rootMargin: "-25% 0px -65% 0px"
    }
  );

  pageSections.forEach(section => {
    sectionObserver.observe(section);
  });
}


/* =========================================
   PROJECT DETAILS
========================================= */

const projectDetails = [
  {
    category: "Public Health Research",
    title: "Non-Communicable Disease Prevention",
    overview:
      "Research examining awareness, knowledge and preventive practices relating to non-communicable diseases among adults in Jos Metropolis.",
    methods:
      "The research focuses on quantitative research methods, survey-based data collection, questionnaire development and statistical analysis.",
    tools: ["Research Methods", "SPSS", "Survey Data"],
    focus:
      "Understanding knowledge and preventive practices to support evidence-based public health interventions."
  },

  {
    category: "Health Systems Research",
    title: "Healthcare Financing and Primary Care",
    overview:
      "A study exploring healthcare financing, household healthcare expenditure and access to primary healthcare services in the FCT.",
    methods:
      "The study focuses on healthcare financing, research design, data collection, analysis and interpretation of findings.",
    tools: ["Health Systems", "Field Research", "Data Analysis"],
    focus:
      "Understanding how healthcare financing relates to access to essential health services."
  },

  {
    category: "Occupational Health",
    title: "Work-Related Stress and Mental Wellbeing",
    overview:
      "Public health research focused on work-related stress and mental wellbeing among Community Health Extension Workers.",
    methods:
      "The research draws on quantitative research methods, questionnaire-based data collection and statistical analysis.",
    tools: ["Research Design", "SPSS", "Questionnaire Development"],
    focus:
      "Examining occupational factors associated with the wellbeing of community health workers."
  },

  {
    category: "Database Management",
    title: "SQL Data Cleaning and Preparation",
    overview:
      "A SQL project focused on preparing structured datasets and improving data quality before analysis.",
    methods:
      "The work includes identifying missing values, checking duplicates, standardising records and preparing data for further analysis.",
    tools: ["SQL", "Data Cleaning", "Database Queries"],
    focus:
      "Developing reliable datasets that support accurate analysis and reporting."
  },

  {
    category: "Health Information Systems",
    title: "DHIS2 and Health Data",
    overview:
      "A health information systems project exploring digital health data management, data collection and the role of reliable information in public health reporting.",
    methods:
      "The project focuses on health information management, digital data collection and the importance of data quality in health reporting.",
    tools: ["DHIS2", "Health Data", "Survey Tools", "Data Quality"],
    focus:
      "Understanding how digital health information systems support the collection, management and use of health data."
  },

  {
    category: "Statistical Analysis",
    title: "SPSS Statistical Analysis",
    overview:
      "A research and analysis showcase demonstrating the use of statistical methods to organise, analyse and interpret quantitative data.",
    methods:
      "The work includes data organisation, descriptive analysis, statistical interpretation and presentation of findings.",
    tools: ["SPSS", "Excel", "Quantitative Research"],
    focus:
      "Supporting reliable research findings through appropriate statistical analysis and clear reporting."
  },

  {
    category: "Business Intelligence",
    title: "Procurement Dashboard",
    overview:
      "A dashboard project designed to monitor procurement information and support operational decision-making.",
    methods:
      "The dashboard organises information into performance views covering spend analysis, supplier performance and procurement efficiency.",
    tools: ["Excel", "Power BI", "Data Visualisation"],
    focus:
      "Using performance indicators and visual reporting to support better procurement decisions."
  },

  {
    category: "Public Health Research",
    title: "Malaria Research Project",
    overview:
      "A public health project exploring malaria-related research, prevention and disease control.",
    methods:
      "The project focuses on reviewing relevant public health information, research methods and the interpretation of evidence.",
    tools: ["Public Health Research", "Research Methods", "Data Analysis"],
    focus:
      "Understanding the role of evidence in malaria prevention and control."
  },

  {
    category: "Academic Research",
    title: "Comparative Evaluation of Common Disinfectants",
    overview:
      "An undergraduate microbiology study comparing the efficiency of commonly used disinfectants against Staphylococcus aureus and Pseudomonas aeruginosa.",
    methods:
      "The study involved a comparative microbiological investigation of disinfectant effectiveness against the two bacterial species.",
    tools: ["Microbiology", "Disinfectants", "Scientific Research"],
    focus:
      "Comparing the effectiveness of commonly used disinfectants against Staphylococcus aureus and Pseudomonas aeruginosa."
  }
];


/* =========================================
   PROJECT MODAL ELEMENTS
========================================= */

const modal = document.getElementById("projectModal");
const closeButton = document.getElementById("modalClose");

const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalOverview = document.getElementById("modalOverview");
const modalMethods = document.getElementById("modalMethods");
const modalTools = document.getElementById("modalTools");
const modalFocus = document.getElementById("modalFocus");

let lastFocusedElement = null;


/* =========================================
   OPEN PROJECT MODAL
========================================= */

document.querySelectorAll("[data-project]").forEach(button => {
  button.addEventListener("click", () => {
    const project = projectDetails[Number(button.dataset.project)];

    if (
      !project ||
      !modal ||
      !modalTitle ||
      !modalCategory ||
      !modalOverview ||
      !modalMethods ||
      !modalTools ||
      !modalFocus ||
      !closeButton
    ) return;

    lastFocusedElement = button;

    modalCategory.textContent = project.category;
    modalTitle.textContent = project.title;
    modalOverview.textContent = project.overview;
    modalMethods.textContent = project.methods;
    modalFocus.textContent = project.focus;

    modalTools.innerHTML = "";

    project.tools.forEach(tool => {
      const tag = document.createElement("span");
      tag.textContent = tool;
      modalTools.appendChild(tag);
    });

    modal.classList.add("active");
    document.body.classList.add("modal-open");

    closeButton.focus();
  });
});


/* =========================================
   CLOSE PROJECT MODAL
========================================= */

function closeProjectModal() {
  if (!modal) return;

  modal.classList.remove("active");
  document.body.classList.remove("modal-open");

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

if (closeButton && modal) {
  closeButton.addEventListener("click", closeProjectModal);

  modal.addEventListener("click", event => {
    if (event.target === modal) {
      closeProjectModal();
    }
  });

  document.addEventListener("keydown", event => {
    if (
      event.key === "Escape" &&
      modal.classList.contains("active")
    ) {
      closeProjectModal();
    }
  });
}


/* =========================================
   SCROLL-TRIGGERED ENTRANCE ANIMATIONS
========================================= */

const revealElements = document.querySelectorAll(
  "main section[id], .project-card, .skill-card"
);

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach(element => {
    element.classList.add("visible");
  });
} else {
  revealElements.forEach((element, index) => {
    element.classList.add("reveal");

    if (element.classList.contains("project-card")) {
      const delay = (index % 3) * 100;

      element.style.setProperty(
        "--reveal-delay",
        `${delay}ms`
      );
    }
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}


/* =========================================
   BACK-TO-TOP BUTTON
========================================= */

const backToTopButton = document.createElement("button");

backToTopButton.type = "button";
backToTopButton.className = "back-to-top";
backToTopButton.setAttribute("aria-label", "Back to top");
backToTopButton.setAttribute("title", "Back to top");

backToTopButton.innerHTML = `
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M12 19V5M5 12l7-7 7 7"
      fill="none"
      stroke="currentColor"
      stroke-width="1.7"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`;

document.body.appendChild(backToTopButton);


function updateBackToTopButton() {
  const shouldShow = window.scrollY > 450;

  backToTopButton.classList.toggle("visible", shouldShow);

  backToTopButton.setAttribute(
    "aria-hidden",
    String(!shouldShow)
  );

  backToTopButton.tabIndex = shouldShow ? 0 : -1;
}


window.addEventListener(
  "scroll",
  updateBackToTopButton,
  { passive: true }
);


backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion ? "instant" : "smooth"
  });
});


updateBackToTopButton();
