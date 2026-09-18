/**
 * interactions.js — Dynamic & Interactive Enhancements
 * Kinza Bughio // Cybersecurity Analyst Portfolio
 * Features: Scroll-Reveal, Counter, 3D Tilt, Cursor Trail, Scroll-Spy, Glitch, Toast
 */

// ==========================================================================
// 1. SCROLL-REVEAL — sections animate in as you scroll
// ==========================================================================
function initScrollReveal() {
    const revealEls = document.querySelectorAll(
        '.skill-category-card, .project-card, .cert-card, .exp-card, .stats-item, .section-header, .contact-card-item, .telemetry-card, .defense-gauge-card, .quick-shell-card'
    );

    revealEls.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(32px)';
        el.style.transition = `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${(i % 6) * 0.07}s, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${(i % 6) * 0.07}s`;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
}

// ==========================================================================
// 2. COUNTER ANIMATION — stats count up when visible
// ==========================================================================
function animateCounter(el, from, to, duration, suffix = '') {
    const start = performance.now();
    const update = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(from + (to - from) * eased) + suffix;
        if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
}

function initCounterAnimation() {
    const statsEls = document.querySelectorAll('.stat-value');
    if (!statsEls.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                entry.target.dataset.counted = 'true';
                const raw = entry.target.textContent.trim();
                const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
                const suffix = raw.replace(/[0-9.]/g, '');
                if (!isNaN(num)) animateCounter(entry.target, 0, num, 1200, suffix);
            }
        });
    }, { threshold: 0.5 });

    statsEls.forEach(el => observer.observe(el));
}

// ==========================================================================
// 3. 3D TILT EFFECT on Skill Cards
// ==========================================================================
function initTiltEffect() {
    const cards = document.querySelectorAll('.skill-category-card, .project-card, .cert-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const rotX = ((y - cy) / cy) * -7;
            const rotY = ((x - cx) / cx) * 7;
            card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px) scale(1.02)`;
            card.style.transition = 'transform 0.1s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
            card.style.transition = 'transform 0.45s cubic-bezier(0.16,1,0.3,1)';
        });
    });
}

// ==========================================================================
// 4. CURSOR TRAIL — cyber dots follow cursor
// ==========================================================================
function initCursorTrail() {
    // Only on non-touch / desktop
    if (window.matchMedia('(hover: none)').matches) return;

    const TRAIL_COUNT = 10;
    const trail = [];

    for (let i = 0; i < TRAIL_COUNT; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail-dot';
        dot.style.cssText = `
            position: fixed;
            width: ${6 - i * 0.4}px;
            height: ${6 - i * 0.4}px;
            border-radius: 50%;
            background: rgba(0, 242, 254, ${0.7 - i * 0.06});
            box-shadow: 0 0 ${4 + i}px rgba(0,242,254,0.5);
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%,-50%);
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(dot);
        trail.push({ el: dot, x: 0, y: 0 });
    }

    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    let running = true;
    const animate = () => {
        if (!running) return;
        let prevX = mouseX, prevY = mouseY;
        trail.forEach((dot, i) => {
            const speed = 0.35 - i * 0.025;
            dot.x += (prevX - dot.x) * (speed + 0.1);
            dot.y += (prevY - dot.y) * (speed + 0.1);
            dot.el.style.left = dot.x + 'px';
            dot.el.style.top = dot.y + 'px';
            prevX = dot.x;
            prevY = dot.y;
        });
        requestAnimationFrame(animate);
    };
    animate();
}

// ==========================================================================
// 5. SCROLL-SPY — highlight active nav link based on scroll position
// ==========================================================================
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { threshold: 0.35 });

    sections.forEach(section => observer.observe(section));
}

// ==========================================================================
// 6. GLITCH EFFECT — on the main name in hero
// ==========================================================================
function initGlitchEffect() {
    const name = document.querySelector('.handle-glow');
    if (!name) return;

    name.setAttribute('data-text', name.textContent);
    name.classList.add('glitch-text');

    // Randomly trigger glitch
    const triggerGlitch = () => {
        name.classList.add('glitching');
        setTimeout(() => name.classList.remove('glitching'), 400);
        const next = 4000 + Math.random() * 8000;
        setTimeout(triggerGlitch, next);
    };
    setTimeout(triggerGlitch, 3000);
}

// ==========================================================================
// 7. TOAST NOTIFICATION SYSTEM
// ==========================================================================
function showToast(message, type = 'info', duration = 3200) {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.style.cssText = `
            position: fixed; bottom: 5.5rem; right: 1.5rem;
            display: flex; flex-direction: column; gap: 0.6rem;
            z-index: 9999; pointer-events: none;
        `;
        document.body.appendChild(container);
    }

    const colorMap = {
        info:    { border: '#00F2FE', bg: 'rgba(0,242,254,0.1)',   icon: 'info' },
        success: { border: '#10B981', bg: 'rgba(16,185,129,0.1)',  icon: 'check_circle' },
        warn:    { border: '#F59E0B', bg: 'rgba(245,158,11,0.1)',  icon: 'warning' },
        error:   { border: '#F43F5E', bg: 'rgba(244,63,94,0.1)',   icon: 'error' },
    };
    const c = colorMap[type] || colorMap.info;

    const toast = document.createElement('div');
    toast.style.cssText = `
        display: flex; align-items: center; gap: 0.65rem;
        background: rgba(7,11,20,0.95);
        border: 1px solid ${c.border};
        background-color: ${c.bg};
        backdrop-filter: blur(16px);
        color: #F1F5F9;
        padding: 0.75rem 1.15rem;
        border-radius: 8px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.78rem;
        box-shadow: 0 6px 25px rgba(0,0,0,0.7), 0 0 12px ${c.border}44;
        pointer-events: auto;
        opacity: 0;
        transform: translateX(30px);
        transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
        max-width: 320px;
        cursor: pointer;
    `;
    toast.innerHTML = `<span class="material-symbols-outlined" style="font-size:1.1rem;color:${c.border};">${c.icon}</span>${message}`;
    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    });

    const dismiss = () => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(30px)';
        setTimeout(() => toast.remove(), 350);
    };

    toast.addEventListener('click', dismiss);
    setTimeout(dismiss, duration);
}

// Attach toasts to CTA buttons
function initCTAToasts() {
    document.querySelectorAll('.hero-cta-primary, .hero-cta-secondary').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('hero-cta-primary')) {
                showToast('📡 Opening secure contact channel…', 'info');
            } else {
                showToast('📄 Downloading Dossier / CV…', 'success');
            }
        });
    });

    // Quick-cmd buttons
    document.querySelectorAll('.quick-cmd-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            showToast(`⌨ Executing: ${btn.textContent.trim()}`, 'info', 2200);
        });
    });
}

// ==========================================================================
// 8. SECTION HEADING GLITCH-SCAN (one-time on first view)
// ==========================================================================
function initHeadingScan() {
    const headings = document.querySelectorAll('.section-heading');
    const seen = new Set();
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !seen.has(entry.target)) {
                seen.add(entry.target);
                const el = entry.target;
                const original = el.textContent;
                const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
                let iter = 0;
                const interval = setInterval(() => {
                    el.textContent = original.split('').map((c, i) => {
                        if (c === ' ') return ' ';
                        if (i < iter) return original[i];
                        return chars[Math.floor(Math.random() * chars.length)];
                    }).join('');
                    if (iter >= original.length) {
                        clearInterval(interval);
                        el.textContent = original;
                    }
                    iter += 0.5;
                }, 40);
            }
        });
    }, { threshold: 0.5 });
    headings.forEach(h => observer.observe(h));
}

// ==========================================================================
// 9. PROGRESS BARS ANIMATE ON SCROLL (defense readiness)
// ==========================================================================
function initProgressBars() {
    const fills = document.querySelectorAll('.defense-fill');
    fills.forEach(fill => {
        const target = fill.style.width;
        fill.style.width = '0%';
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => { fill.style.width = target; }, 200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(fill);
    });
}

// ==========================================================================
// 10. SMOOTH MOBILE NAV — close on link click, outside click & toggle icon
// ==========================================================================
function initMobileNavClose() {
    const navLinks = document.getElementById('navLinks');
    const mobileBtn = document.getElementById('mobileMenuBtn');
    if (!navLinks) return;

    const iconSpan = mobileBtn ? mobileBtn.querySelector('.material-symbols-outlined') : null;

    const updateIcon = () => {
        if (!iconSpan) return;
        if (navLinks.classList.contains('mobile-open')) {
            iconSpan.textContent = 'close';
        } else {
            iconSpan.textContent = 'menu';
        }
    };

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            setTimeout(updateIcon, 10);
        });
    }

    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('mobile-open');
            updateIcon();
        });
    });

    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('mobile-open')) {
            if (!navLinks.contains(e.target) && !mobileBtn?.contains(e.target)) {
                navLinks.classList.remove('mobile-open');
                updateIcon();
            }
        }
    });
}

// ==========================================================================
// 11. HACKER TEXT SCRAMBLE / DECRYPT on Hover
// ==========================================================================
function initHackerScramble() {
    const chars = "01010101XYZ_#@!$*&";
    const scrambleEls = document.querySelectorAll("[data-scramble]");

    scrambleEls.forEach(el => {
        const numSpan = el.querySelector(".nav-num");
        const prefix = numSpan ? numSpan.outerHTML : "";
        const originalText = el.textContent.replace(/^\d{2}/, "").trim();
        let interval = null;

        el.addEventListener("mouseenter", () => {
            let iteration = 0;
            clearInterval(interval);

            interval = setInterval(() => {
                const scrambled = originalText.split("").map((char, index) => {
                    if (index < iteration) return originalText[index];
                    if (char === " ") return " ";
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("");

                el.innerHTML = prefix + scrambled;

                if (iteration >= originalText.length) {
                    clearInterval(interval);
                    el.innerHTML = prefix + originalText;
                }
                iteration += 1 / 2;
            }, 30);
        });

        el.addEventListener("mouseleave", () => {
            clearInterval(interval);
            el.innerHTML = prefix + originalText;
        });
    });
}

// ==========================================================================
// 12. LIVE PING SIMULATOR (Sub-header Telemetry Ticker)
// ==========================================================================
// ==========================================================================
// 12. NAVBAR SCROLL CLASS — add .scrolled when user scrolls past 10px
// ==========================================================================
function initNavbarScroll() {
    const nav = document.getElementById('mainNav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }, { passive: true });
}

// ==========================================================================
// 13. INIT ALL
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initCounterAnimation();
    initTiltEffect();
    initCursorTrail();
    initScrollSpy();
    initGlitchEffect();
    initCTAToasts();
    initHeadingScan();
    initProgressBars();
    initMobileNavClose();
    initNavbarScroll();
    initHackerScramble();
});
