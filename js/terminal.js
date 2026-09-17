/**
 * Hack The Box Interactive Terminal Emulator
 * Reflects authentic CV information for Kinza Bughio (Downloads/CV/Kinza_Bughio_CV.pdf)
 */

class HtbTerminal {
    constructor(containerId, inputId, outputId) {
        this.container = document.getElementById(containerId);
        this.input = document.getElementById(inputId);
        this.output = document.getElementById(outputId);
        this.history = [];
        this.historyIndex = -1;

        this.commands = {
            help: {
                desc: "List all available terminal commands",
                action: () => this.cmdHelp()
            },
            whoami: {
                desc: "Display operator bio, contact details, and current status",
                action: () => this.cmdWhoami()
            },
            education: {
                desc: "View degree, university, and relevant coursework",
                action: () => this.cmdEducation()
            },
            experience: {
                desc: "Show 5 professional roles (Tutor, NAVTTC, Rynex Security, Icreativez...)",
                action: () => this.cmdExperience()
            },
            projects: {
                desc: "List all 9 technical projects from CV",
                action: () => this.cmdProjects()
            },
            skills: {
                desc: "View technical, cybersecurity, and pedagogical skills",
                action: () => this.cmdSkills()
            },
            certs: {
                desc: "List all 12 verified certifications and credentials",
                action: () => this.cmdCerts()
            },
            nmap: {
                desc: "Run demonstration of Kinza's Python Nmap Scanner",
                action: (args) => this.cmdNmap(args)
            },
            contact: {
                desc: "Print email, location, LinkedIn, and GitHub",
                action: () => this.cmdContact()
            },
            clear: {
                desc: "Clear the terminal screen buffer",
                action: () => this.cmdClear()
            }
        };

        this.initEvents();
    }

    initEvents() {
        if (!this.input) return;

        this.input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const rawCmd = this.input.value.trim();
                if (rawCmd) {
                    this.history.push(rawCmd);
                    this.historyIndex = this.history.length;
                    this.execute(rawCmd);
                    this.input.value = "";
                }
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                if (this.historyIndex > 0) {
                    this.historyIndex--;
                    this.input.value = this.history[this.historyIndex] || "";
                }
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                if (this.historyIndex < this.history.length - 1) {
                    this.historyIndex++;
                    this.input.value = this.history[this.historyIndex] || "";
                } else {
                    this.historyIndex = this.history.length;
                    this.input.value = "";
                }
            } else if (e.key === "Tab") {
                e.preventDefault();
                this.autoComplete();
            }
        });

        if (this.container) {
            this.container.addEventListener("click", () => {
                this.input.focus();
            });
        }
    }

    execute(rawInput) {
        const parts = rawInput.split(" ").filter(Boolean);
        const cmdName = parts[0]?.toLowerCase();
        const args = parts.slice(1);

        this.println(`kinza@htb-terminal:~$ ${rawInput}`, "term-line-info");

        if (window.soundFX) window.soundFX.playKey();

        if (this.commands[cmdName]) {
            this.commands[cmdName].action(args);
        } else {
            this.println(`bash: command not found: ${cmdName}. Type 'help' to see available commands.`, "term-line-error");
        }

        this.scrollToBottom();
    }

    println(text, className = "") {
        const line = document.createElement("div");
        line.className = `term-output-line ${className}`;
        line.innerHTML = text;
        this.output.appendChild(line);
        this.scrollToBottom();
    }

    scrollToBottom() {
        if (this.output) {
            const parent = this.output.parentElement;
            if (parent) {
                parent.scrollTop = parent.scrollHeight;
            }
        }
    }

    autoComplete() {
        const current = this.input.value.trim().toLowerCase();
        if (!current) return;
        const matches = Object.keys(this.commands).filter(c => c.startsWith(current));
        if (matches.length === 1) {
            this.input.value = matches[0] + " ";
        } else if (matches.length > 1) {
            this.println(`Matching: ${matches.join("  ")}`, "term-line-info");
        }
    }

    renderBanner() {
        const banner = `
  _  ___                  ____              _     _       
 | |/ (_)_ __  ______ _  | __ ) _   _  __ _| |__ (_) ___  
 | ' /| | '_ \\|_  / _\` | |  _ \\| | | |/ _\` | '_ \\| |/ _ \\ 
 | . \\| | | | |/ / (_| | | |_) | |_| | (_| | | | | | (_) |
 |_|\\_\\_|_| |_/___\\__,_| |____/ \\__,_|\\__, |_| |_|_|\\___/ 
                                       |___/               
 ==========================================================
 INSTRUCTOR : KINZA BUGHIO
 ROLE       : ICT & Computer Science Teacher | Cybersecurity Analyst
 DEGREE     : BS Cyber Security @ MUET Jamshoro (2022-2026)
 Type <span class="term-line-success">help</span> to view all commands.
`;
        this.println(banner, "term-banner");
    }

    cmdHelp() {
        let helpText = "<strong>AVAILABLE SYSTEM UTILITIES & SHELL COMMANDS:</strong><br><br>";
        for (const [name, data] of Object.entries(this.commands)) {
            helpText += `  <span class="term-line-success">${name.padEnd(14, " ")}</span> - ${data.desc}<br>`;
        }
        helpText += "<br><em>Tip: Use UP/DOWN arrows for command history and TAB for auto-completion.</em>";
        this.println(helpText);
    }

    cmdWhoami() {
        const p = HTB_DATA.profile;
        const text = `
------------------------------------------------------------
[OPERATOR DOSSIER]
------------------------------------------------------------
NAME       : <span class="term-line-success">${p.name}</span>
ROLE       : <span class="term-line-success">${p.title}</span>
EMAIL      : ${p.email}
LOCATION   : ${p.location}
DEGREE     : ${p.degree}
UNIVERSITY : ${p.university} (${p.duration})
GITHUB     : ${p.socials.github}
LINKEDIN   : ${p.socials.linkedin}

PROFESSIONAL SUMMARY:
${p.bio}
------------------------------------------------------------`;
        this.println(text);
    }

    cmdEducation() {
        const ed = HTB_DATA.education;
        const text = `
------------------------------------------------------------
[ACADEMIC CREDENTIALS]
------------------------------------------------------------
DEGREE      : <span class="term-line-success">${ed.degree}</span>
INSTITUTION : ${ed.institution}
DURATION    : ${ed.period}
COURSEWORK  : ${ed.coursework}
------------------------------------------------------------`;
        this.println(text);
    }

    cmdExperience() {
        let text = "<strong>PROFESSIONAL WORK EXPERIENCE (5 ROLES):</strong><br><br>";
        HTB_DATA.experience.forEach(exp => {
            text += `  [ROLE] <span class="term-line-success">${exp.role}</span><br>`;
            text += `         Organization: <strong>${exp.organization}</strong> | Period: ${exp.duration} | Location: ${exp.location}<br>`;
            exp.highlights.forEach(h => {
                text += `         • ${h}<br>`;
            });
            text += "<br>";
        });
        this.println(text);
    }

    cmdSkills() {
        let text = "<strong>SKILLS INVENTORY (FROM CV):</strong><br><br>";
        HTB_DATA.skills.forEach(cat => {
            text += `<span class="term-line-info">[${cat.category}]</span><br>`;
            cat.items.forEach(item => {
                text += `  • ${item}<br>`;
            });
            text += "<br>";
        });
        this.println(text);
    }

    cmdProjects() {
        let text = "<strong>TECHNICAL PROJECTS (9 PROJECTS):</strong><br><br>";
        HTB_DATA.projects.forEach(proj => {
            text += `  [PROJECT] <span class="term-line-success">${proj.title}</span> (${proj.techStack} • ${proj.date})<br>`;
            text += `            ${proj.description}<br>`;
            text += `            Use Case: <em>${proj.useCase}</em><br><br>`;
        });
        this.println(text);
    }

    cmdCerts() {
        let text = "<strong>CERTIFICATIONS & CREDENTIALS (12 TOTAL):</strong><br><br>";
        HTB_DATA.certifications.forEach(c => {
            text += `  [CERT] <span class="term-line-success">${c.title}</span> (${c.date})<br>`;
            text += `         Issuer: ${c.issuer}<br><br>`;
        });
        this.println(text);
    }

    cmdNmap(args) {
        const target = args[0] || "127.0.0.1";
        this.println(`[+] Initializing Kinza's Python Nmap Scanner...`, "term-line-info");
        this.println(`[+] Scanning target: ${target}`);
        this.println(`[+] Port scan running via python-nmap module:`);
        this.println(`-----------------------------------------------------`);
        this.println(`PORT     STATE SERVICE       PRODUCT`);
        this.println(`22/tcp   open  ssh           OpenSSH 8.9p1 Ubuntu`);
        this.println(`80/tcp   open  http          Apache/2.4.52 (PHP/8.2 Laravel)`);
        this.println(`3306/tcp open  mysql         MySQL Community Server 8.0`);
        this.println(`-----------------------------------------------------`);
        this.println(`[+] Scan complete. Host is up with active web & database services.`, "term-line-success");
    }

    cmdContact() {
        const p = HTB_DATA.profile;
        const text = `
------------------------------------------------------------
[DIRECT CONTACT CHANNELS]
------------------------------------------------------------
Email     : <a href="mailto:${p.email}" style="color:var(--htb-green);">${p.email}</a>
Location  : <span style="color:#FFF;">${p.location}</span>
LinkedIn  : <a href="${p.socials.linkedin}" target="_blank" style="color:var(--htb-cyan);">${p.socials.linkedin}</a>
GitHub    : <a href="${p.socials.github}" target="_blank" style="color:var(--htb-cyan);">${p.socials.github}</a>
Languages : English (Full Professional) | Urdu (Fluent) | Sindhi (Native)
------------------------------------------------------------`;
        this.println(text);
    }

    cmdClear() {
        this.output.innerHTML = "";
    }
}
