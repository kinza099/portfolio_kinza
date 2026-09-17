/**
 * Portfolio Main Controller - Grounded in Kinza Bughio's CV (Downloads/CV/Kinza_Bughio_CV.pdf)
 * Hack The Box Theme styling with Google Material Icons & Real CV details
 */

// ==========================================================================
// 1. WEB AUDIO API SYNTHESIZER
// ==========================================================================
class SoundFX {
    constructor() {
        this.ctx = null;
        this.enabled = localStorage.getItem("htb_sound_enabled") === "true";
        this.updateBtnUI();
    }

    initContext() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) this.ctx = new AudioCtx();
        }
        if (this.ctx && this.ctx.state === "suspended") {
            this.ctx.resume();
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem("htb_sound_enabled", this.enabled);
        this.updateBtnUI();
        if (this.enabled) {
            this.initContext();
            this.playClick(600, 0.08);
        }
    }

    updateBtnUI() {
        const btn = document.getElementById("soundToggleBtn");
        if (btn) {
            btn.innerHTML = this.enabled 
                ? '<span class="material-symbols-outlined" style="font-size:1.1rem;">volume_up</span> SFX: ON' 
                : '<span class="material-symbols-outlined" style="font-size:1.1rem;">volume_off</span> SFX: OFF';
            btn.style.color = this.enabled ? "var(--htb-green)" : "var(--text-muted)";
            btn.style.borderColor = this.enabled ? "var(--htb-green)" : "var(--border-color)";
        }
    }

    playTone(freq, type, duration, gainVal = 0.04) {
        if (!this.enabled) return;
        try {
            this.initContext();
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) {
            console.warn("Audio warning:", e);
        }
    }

    playClick(freq = 800, duration = 0.03) {
        this.playTone(freq, "sine", duration, 0.04);
    }

    playKey() {
        this.playTone(320 + Math.random() * 80, "triangle", 0.03, 0.02);
    }

    playSuccess() {
        if (!this.enabled) return;
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
            setTimeout(() => {
                this.playTone(freq, "square", 0.15, 0.03);
            }, idx * 90);
        });
    }
}

// ==========================================================================
// 2. MATRIX CYBER CANVAS
// ==========================================================================
class MatrixCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext("2d");
        this.characters = "0101010101ABCDEFHIJKLMNOPQRSTUVWXYZ0123456789$#><{}/*&";
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        this.active = true;

        this.init();
        window.addEventListener("resize", () => this.resize());
    }

    init() {
        this.resize();
        this.loop = this.loop.bind(this);
        requestAnimationFrame(this.loop);
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.floor(Math.random() * -100);
        }
    }

    loop() {
        if (!this.active) return;
        this.ctx.fillStyle = "rgba(11, 14, 20, 0.08)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = "#9FEF00";
        this.ctx.font = `${this.fontSize}px 'JetBrains Mono', monospace`;

        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;

            if (Math.random() > 0.95) {
                this.ctx.fillStyle = "#FFFFFF";
            } else {
                this.ctx.fillStyle = "rgba(159, 239, 0, 0.75)";
            }

            this.ctx.fillText(text, x, y);

            if (y > this.canvas.height && Math.random() > 0.985) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }

        setTimeout(() => {
            requestAnimationFrame(this.loop);
        }, 40);
    }
}

// ==========================================================================
// 3. TYPEWRITER EFFECT
// ==========================================================================
function initTypewriter() {
    const el = document.getElementById("typewriterText");
    if (!el) return;

    const phrases = [
        "ICT & Computer Science Teacher",
        "Cybersecurity Analyst & Instructor",
        "BS Cyber Security @ MUET Jamshoro (2022–2026)",
        "Python & Ethical Hacking Educator",
        "PHP / Laravel Web Developer"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let speed = 90;

    function type() {
        const current = phrases[phraseIndex];
        if (isDeleting) {
            el.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            speed = 40;
        } else {
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            speed = 90;
        }

        if (!isDeleting && charIndex === current.length) {
            speed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 400;
        }

        setTimeout(type, speed);
    }

    type();
}

// ==========================================================================
// 4. STATS COUNTER ANIMATION (GOOGLE MATERIAL ICONS)
// ==========================================================================
function renderStats() {
    const container = document.getElementById("statsGrid");
    if (!container) return;

    container.innerHTML = HTB_DATA.stats.map(s => `
        <div class="stat-box">
            <div class="stat-icon">
                <span class="material-symbols-outlined" style="font-size:2rem;color:var(--htb-green);">${s.icon}</span>
            </div>
            <div class="stat-number" data-target="${s.value}">0${s.suffix || ""}</div>
            <div class="stat-label">${s.label}</div>
        </div>
    `).join("");

    const statBoxes = container.querySelectorAll(".stat-number");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute("data-target"), 10);
                const suffix = el.textContent.replace(/[0-9]/g, "");
                let current = 0;
                const step = Math.max(1, Math.floor(target / 25));
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        el.textContent = target + suffix;
                        clearInterval(timer);
                    } else {
                        el.textContent = current + suffix;
                    }
                }, 35);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.3 });

    statBoxes.forEach(box => observer.observe(box));
}

// ==========================================================================
// 5. WORK EXPERIENCE (ALL 5 ROLES)
// ==========================================================================
function renderExperience() {
    const container = document.getElementById("experienceContainer");
    if (!container) return;

    container.innerHTML = HTB_DATA.experience.map(exp => `
        <div class="experience-card">
            <div class="exp-header">
                <div>
                    <h3 class="exp-role">${exp.role}</h3>
                    <div class="exp-org">
                        <span style="color:var(--htb-green);">${exp.organization}</span> • ${exp.location}
                    </div>
                </div>
                <span class="exp-date-pill">${exp.duration}</span>
            </div>
            <ul class="exp-bullets">
                ${exp.highlights.map(h => `<li>${h}</li>`).join("")}
            </ul>
        </div>
    `).join("");
}

// ==========================================================================
// 6. TECHNICAL PROJECTS (ALL 9 PROJECTS)
// ==========================================================================
let currentProjectFilter = "all";

function renderProjects(filter = "all") {
    const grid = document.getElementById("projectsGrid");
    if (!grid) return;

    let items = HTB_DATA.projects;
    if (filter !== "all") {
        const lower = filter.toLowerCase();
        items = items.filter(p => 
            p.category.toLowerCase().includes(lower) || 
            p.techStack.toLowerCase().includes(lower) ||
            p.tags.some(t => t.toLowerCase().includes(lower))
        );
    }

    grid.innerHTML = items.map(p => `
        <div class="project-card" data-id="${p.id}">
            <div>
                <div class="project-card-header">
                    <span class="project-cat">${p.category}</span>
                    <span class="project-date-pill">${p.date}</span>
                </div>
                <h3 class="project-title">${p.title}</h3>
                <div style="font-family:var(--font-mono);font-size:0.75rem;color:var(--htb-green);margin-bottom:0.6rem;">
                    [${p.techStack}]
                </div>
                <p class="project-desc">${p.description}</p>
                
                <div class="project-metrics">
                    <span class="material-symbols-outlined" style="font-size:1rem;color:var(--htb-green);margin-right:0.3rem;">lightbulb</span>
                    <span>${p.useCase}</span>
                </div>

                <div class="project-tags">
                    ${p.tags.map(t => `<span class="vector-tag">${t}</span>`).join("")}
                </div>
            </div>

            <div class="project-footer">
                <button class="btn-writeup" onclick="openProjectModal('${p.id}')">
                    PROJECT INTEL →
                </button>
            </div>
        </div>
    `).join("");
}

function initProjectFilterTabs() {
    const tabs = document.querySelectorAll(".filter-btn");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            currentProjectFilter = tab.getAttribute("data-filter");
            if (window.soundFX) window.soundFX.playClick(750);
            renderProjects(currentProjectFilter);
        });
    });
}

function openProjectModal(id) {
    const p = HTB_DATA.projects.find(item => item.id === id);
    if (!p) return;

    const modalBackdrop = document.getElementById("htbModalBackdrop");
    const modalContent = document.getElementById("htbModalContent");
    if (!modalBackdrop || !modalContent) return;

    if (window.soundFX) window.soundFX.playClick(900);

    modalContent.innerHTML = `
        <div class="modal-header">
            <div>
                <h3 class="modal-title">${p.title}</h3>
                <span class="difficulty-pill diff-easy" style="font-size:0.7rem;">${p.category}</span>
                <span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);margin-left:0.5rem;">${p.date}</span>
            </div>
            <button class="modal-close-btn" onclick="closeModal()" title="Close"><span class="material-symbols-outlined" style="font-size:1.1rem;">close</span></button>
        </div>
        <div class="modal-body">
            <h4>TECHNICAL OVERVIEW</h4>
            <p>${p.description}</p>

            <h4>TECH STACK & TOOLS</h4>
            <div class="machine-vectors" style="margin-top:0.5rem;">
                ${p.tags.map(t => `<span class="vector-tag" style="color:var(--htb-green);">${t}</span>`).join("")}
            </div>

            <h4>ACADEMIC & DEMO USE CASE</h4>
            <p style="background:rgba(159, 239, 0, 0.08);border:1px solid rgba(159, 239, 0, 0.2);padding:0.75rem;border-radius:4px;font-family:var(--font-mono);font-size:0.85rem;color:var(--htb-green);">
                ${p.useCase}
            </p>

            <h4>CODE REPOSITORY</h4>
            <p style="font-size:0.85rem;">
                View source implementations on Kinza's GitHub: 
                <a href="${HTB_DATA.profile.socials.github}" target="_blank" style="color:var(--htb-cyan);text-decoration:underline;">
                    ${HTB_DATA.profile.socials.github}
                </a>
            </p>
        </div>
        <div class="modal-footer">
            <button class="htb-btn htb-btn-secondary" onclick="closeModal()">CLOSE INTEL</button>
        </div>
    `;

    modalBackdrop.classList.add("active");
}

function closeModal() {
    const modalBackdrop = document.getElementById("htbModalBackdrop");
    if (modalBackdrop) modalBackdrop.classList.remove("active");
}

// ==========================================================================
// 7. SKILLS INVENTORY (GOOGLE MATERIAL ICONS)
// ==========================================================================
function renderSkills() {
    const container = document.getElementById("skillsContainer");
    if (!container) return;

    container.innerHTML = HTB_DATA.skills.map(cat => `
        <div class="skill-category-card">
            <div class="skill-cat-header">
                <span class="material-symbols-outlined" style="font-size:1.75rem;color:var(--htb-green);">${cat.icon}</span>
                <h3 class="skill-cat-title">${cat.category}</h3>
            </div>
            <div class="skill-chips-grid">
                ${cat.items.map(item => `
                    <div class="skill-chip">
                        <span class="skill-chip-dot"></span>
                        <span>${item}</span>
                    </div>
                `).join("")}
            </div>
        </div>
    `).join("");
}

// ==========================================================================
// 8. CERTIFICATIONS (ALL 12 FROM CV)
// ==========================================================================
function renderCertifications() {
    const container = document.getElementById("certsGrid");
    if (!container) return;

    container.innerHTML = HTB_DATA.certifications.map(c => `
        <div class="cert-card">
            <div>
                <div class="cert-badge-top" style="color:${c.color};font-size:1.15rem;display:flex;align-items:center;gap:0.4rem;">
                    <span class="material-symbols-outlined" style="font-size:1.3rem;">verified</span>
                    <span>${c.title}</span>
                </div>
                <div class="cert-issuer">
                    <strong>Issued by:</strong> ${c.issuer}
                </div>
            </div>
            <div class="cert-footer">
                <span class="cert-id" style="color:var(--htb-green);font-weight:700;">VERIFIED</span>
                <span class="cert-status" style="color:var(--text-muted);">${c.date}</span>
            </div>
        </div>
    `).join("");
}

// ==========================================================================
// 9. LANGUAGES & CONTACT FORM
// ==========================================================================
function renderLanguages() {
    const container = document.getElementById("languagesList");
    if (!container) return;

    container.innerHTML = HTB_DATA.profile.languages.map(l => `
        <div style="background:var(--bg-card);border:1px solid var(--border-color);padding:0.75rem 1rem;border-radius:4px;margin-bottom:0.5rem;display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:0.85rem;">
            <span style="color:#FFF;">${l.name}</span>
            <span style="color:var(--htb-green);">${l.level}</span>
        </div>
    `).join("");
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function initContactForm() {
    const form = document.getElementById("contactForm");
    const feedback = document.getElementById("contactFeedback");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.innerHTML : "TRANSMIT MESSAGE →";

        const nameVal = document.getElementById("contactName")?.value || "";
        const emailVal = document.getElementById("contactEmail")?.value || "";
        const msgVal = document.getElementById("contactMsg")?.value || "";

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `TRANSMITTING...`;
        }

        if (feedback) {
            feedback.style.display = "none";
        }

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                if (window.soundFX) window.soundFX.playSuccess();
                if (feedback) {
                    feedback.style.display = "block";
                    feedback.innerHTML = `
                        <div class="term-line-success" style="background:#0B0E14;padding:1.25rem;border:1px solid var(--htb-green);border-radius:4px;font-family:var(--font-mono);font-size:0.85rem;line-height:1.6;">
                            <div style="font-weight:700;color:var(--htb-green);margin-bottom:0.5rem;font-size:0.95rem;">[+] TRANSMISSION DISPATCHED TO KINZA BUGHIO!</div>
                            <div>[+] <strong>Sender:</strong> ${escapeHtml(nameVal)} &lt;${escapeHtml(emailVal)}&gt;</div>
                            <div style="margin-top:0.3rem;">[+] <strong>Message:</strong> "${escapeHtml(msgVal)}"</div>
                            <div style="color:var(--text-muted);font-size:0.75rem;margin-top:0.5rem;border-top:1px solid var(--border-color, #1F2E44);padding-top:0.4rem;">[✓] Status: 200 OK • Delivered to kinzapython@gmail.com</div>
                        </div>
                    `;
                }
                form.reset();
            } else {
                const data = await response.json().catch(() => ({}));
                const errMsg = (data && data.errors) ? data.errors.map(err => err.message).join(", ") : "Unable to deliver message at this time.";
                if (feedback) {
                    feedback.style.display = "block";
                    feedback.innerHTML = `
                        <div style="background:#0B0E14;padding:1rem;border:1px solid var(--diff-hard, #FF3E3E);border-radius:4px;font-family:var(--font-mono);font-size:0.85rem;color:var(--diff-hard, #FF3E3E);">
                            [!] Transmission Error: ${escapeHtml(errMsg)}
                        </div>
                    `;
                }
            }
        } catch (err) {
            if (feedback) {
                feedback.style.display = "block";
                feedback.innerHTML = `
                    <div style="background:#0B0E14;padding:1rem;border:1px solid var(--diff-hard, #FF3E3E);border-radius:4px;font-family:var(--font-mono);font-size:0.85rem;color:var(--diff-hard, #FF3E3E);">
                        [!] Network error: Could not reach gateway. Please check your internet connection.
                    </div>
                `;
            }
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        }
    });
}

// ==========================================================================
// 10. INITIALIZATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    window.soundFX = new SoundFX();
    const soundBtn = document.getElementById("soundToggleBtn");
    if (soundBtn) {
        soundBtn.addEventListener("click", () => window.soundFX.toggle());
    }

    document.addEventListener("click", (e) => {
        if (e.target.closest("button") || e.target.closest(".nav-link")) {
            if (window.soundFX) window.soundFX.playClick(650, 0.03);
        }
    });

    window.matrixBg = new MatrixCanvas("matrixCanvas");

    initTypewriter();
    renderStats();
    renderExperience();
    renderProjects();
    initProjectFilterTabs();
    renderSkills();
    renderCertifications();
    renderLanguages();
    initContactForm();

    window.terminal = new HtbTerminal("terminalContainer", "terminalInput", "terminalOutput");
    window.terminal.renderBanner();

    document.querySelectorAll(".quick-cmd-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const cmd = btn.getAttribute("data-cmd");
            if (window.terminal && cmd) {
                window.terminal.execute(cmd);
                const termInput = document.getElementById("terminalInput");
                if (termInput) termInput.focus();
            }
        });
    });

    const mobileBtn = document.getElementById("mobileMenuBtn");
    const navLinks = document.getElementById("navLinks");
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener("click", () => {
            navLinks.classList.toggle("mobile-open");
        });
    }

    const modalBackdrop = document.getElementById("htbModalBackdrop");
    if (modalBackdrop) {
        modalBackdrop.addEventListener("click", (e) => {
            if (e.target === modalBackdrop) closeModal();
        });
    }
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });
});
