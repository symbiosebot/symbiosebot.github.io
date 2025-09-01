// Symbiose web_5 — minimal, accessible interactions
(function () {
  const doc = document.documentElement;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Constants
  const THEME_KEY = "symbiose_theme";
  const LANG_KEY = "symbiose_lang";
  const TELEGRAM_URL = "https://t.me/Symbiose_Bot?start=web_landing";

  // i18n dictionary
  const I18N = {
    en: {
      nav: { tutorial: "Tutorial", features: "Features", faq: "FAQ", open: "Open in Telegram" },
      hero: {
        title: "Learn. Teach. Match in minutes.",
        lead: "Symbiose pairs people by <strong>skills</strong> and <strong>city</strong> so you can learn faster and share what you know. No fluff — just meaningful matches.",
        ctaStart: "Start in Telegram",
        ctaHow: "See how it works",
        badge1: "Free to use",
        badge2: "Privacy-friendly",
        badge3: "Works on any device",
        figcaption: "Powered by Telegram • <a data-telegram target=\"_blank\" rel=\"noopener\">@Symbiose_Bot</a>"
      },
      tutorial: {
        title: "Tutorial",
        s1title: "Join the bot and register",
        s1text: "Open Telegram, press \"Start\" and answer a few onboarding questions (name, city, language).",
        s2title: "Post your first learning request",
        s2text: "Tap \"I want to learn!\", choose a skill, add a short note and city — we'll search for a mentor.",
        s3title: "Post your first teaching offer",
        s3text: "Tap \"I can teach!\", specify the skill, city and availability — we'll match you with learners.",
        s23title: "Post a learning request or a teaching offer",
        s23text: "Choose either \"I want to learn!\" or \"I can teach!\" — add skill, city and a short note. We'll match you accordingly.",
        s4title: "Confirm match and meet",
        s4text: "Confirm mutual interest, get contacts, set a date, and share feedback afterwards.",
        moreBtnOpen: "Other functions",
        moreBtnClose: "Hide",
        more: {
          myApps_title: "My applications",
          myApps_text: "View all your listings, their status (pending/approved/matched), and navigate to details.",
          delete_title: "Delete application",
          delete_text: "Remove an outdated listing. This helps us keep matches fresh. You can create a new one anytime.",
          random_title: "Random activity",
          random_text: "Get a quick inspiration task to practice or share a skill when you have a spare moment.",
          feedback_title: "Feedback",
          feedback_text: "Send suggestions or report an issue directly to us right in the bot.",
          reviews_title: "Reviews about me",
          reviews_text: "Read feedback from people you've met through matches. Helps build trust and reputation.",
          invite_title: "Invite a friend",
          invite_text: "Share a personal link. Friends who join help the community grow.",
          friends_title: "My friends",
          friends_text: "See your invited friends and stats.",
          confirm_title: "Match confirmations & scheduling",
          confirm_text: "We ask both sides to confirm interest, share contacts when both agree, and send gentle reminders to set a date and later share feedback.",
        }
      },
      features: {
        title: "Built for learners and mentors",
        sub: "Features that help you match, learn and share with confidence.",
        c1title: "Skill-first matching",
        c1text: "Smart matching blends exact and related skills to expand quality options.",
        c2title: "Local by city",
        c2text: "Meet nearby or go online. City filter keeps matches relevant.",
        c3title: "Lightweight & private",
        c3text: "No accounts, no tracking. Everything through Telegram.",
        c4title: "Timely reminders",
        c4text: "Nudges to confirm, schedule and reflect — never spam.",
        c5title: "Accessible UI",
        c5text: "High-contrast, keyboard-friendly, reduced motion where it matters.",
        c6title: "One-tap start",
        c6text: "Post a request or offer in under a minute."
      },
      cta: { title: "Ready to meet your learning partner?", text: "Tap below to open the bot. Start a listing, receive a match, and grow together.", btn: "Open @Symbiose_Bot" },
      faq: {
        title: "Frequently asked questions",
        f1q: "Is Symbiose free?",
        f1a: "Yes. The bot is free to use. If we ever add paid features, the core matching will remain free.",
        f2q: "Do I need a Telegram account?",
        f2a: "Yes — Symbiose runs through Telegram for speed, privacy and reliability.",
        f3q: "How are matches found?",
        f3a: "We search by opposite intent (learn/teach), skill relevance (exact or partial) and city. You confirm before contacts are shared.",
        f4q: "What about privacy?",
        f4a: "We only store what’s necessary for matching. You control when to share contact info."
      },
      footer: { nav: { tutorial: "Tutorial", features: "Features", faq: "FAQ" } },
      seo: {
        desc: "Find a learning or teaching partner. Symbiose connects people by skills and city for real-world learning."
      },
      notfound: {
        title: "Page not found",
        text: "The page you are looking for doesn’t exist or was moved.",
        home: "Go to homepage"
      }
    },
    ru: {
      nav: { tutorial: "Руководство", features: "Функции", faq: "FAQ", open: "Открыть в Telegram" },
      hero: {
        title: "Учись. Преподавай. Находи пару за минуты.",
        lead: "Symbiose подбирает людей по <strong>навыкам</strong> и <strong>городу</strong>, чтобы вы быстрее учились и делились знаниями. Никакой воды — только полезные знакомства.",
        ctaStart: "Начать в Telegram",
        ctaHow: "Как это работает",
        badge1: "Бесплатно",
        badge2: "Конфиденциально",
        badge3: "Работает на любом устройстве",
        figcaption: "Работает в Telegram • <a data-telegram target=\"_blank\" rel=\"noopener\">@Symbiose_Bot</a>"
      },
      tutorial: {
        title: "Руководство",
        s1title: "Запустите бота и пройдите регистрацию",
        s1text: "Откройте Telegram, нажмите «Start» и ответьте на несколько вопросов: имя, город, язык.",
        s2title: "Отправьте первый запрос на обучение",
        s2text: "Нажмите «Хочу учиться!», укажите навык, добавьте короткую заметку и город — мы найдём наставника.",
        s3title: "Опубликуйте первое предложение преподавать",
        s3text: "Нажмите «Могу преподавать!», укажите навык, город и доступность — мы подберём учеников.",
        s23title: "Создайте заявку на обучение или предложение преподавать",
        s23text: "Выберите «Хочу учиться!» или «Могу преподавать!» — укажите навык, город и короткую заметку. Мы подберём пару.",
        s4title: "Подтвердите пару и встретитесь",
        s4text: "Подтвердите взаимный интерес, получите контакты, договоритесь о встрече и позже оставьте отзыв.",
        moreBtnOpen: "Другие функции",
        moreBtnClose: "Скрыть",
        more: {
          myApps_title: "Мои заявки",
          myApps_text: "Смотрите все ваши заявки, их статус (на модерации/одобрена/подобрана пара) и переходите к деталям.",
          delete_title: "Удалить заявку",
          delete_text: "Удалите устаревшую заявку — так мы поддерживаем актуальность. В любой момент можно создать новую.",
          random_title: "Случайная активность",
          random_text: "Получите идею, чем заняться прямо сейчас: потренироваться самому или помочь другому.",
          feedback_title: "Обратная связь",
          feedback_text: "Отправьте нам предложение или сообщите о проблеме прямо в боте.",
          reviews_title: "Отзывы обо мне",
          reviews_text: "Читайте отзывы людей, с которыми вы встречались. Это помогает формировать доверие и репутацию.",
          invite_title: "Пригласить друга",
          invite_text: "Поделитесь персональной ссылкой — друзья помогут сообществу расти.",
          friends_title: "Мои друзья",
          friends_text: "Смотрите, кого вы пригласили, и ваши статистики.",
          confirm_title: "Подтверждения и встреча",
          confirm_text: "Обе стороны подтверждают интерес, после этого мы открываем контакты и мягко напоминаем договориться о встрече и оставить отзыв.",
        }
      },
      features: {
        title: "Создано для учеников и наставников",
        sub: "Возможности, которые помогают находить пары, учиться и делиться знаниями уверенно.",
        c1title: "Подбор по навыкам",
        c1text: "Умное сопоставление: точные и родственные навыки — больше качественных вариантов.",
        c2title: "Локально по городу",
        c2text: "Встречайтесь рядом или онлайн — фильтр по городу сохраняет релевантность.",
        c3title: "Лёгкий и приватный",
        c3text: "Без аккаунтов и трекинга. Всё внутри Telegram.",
        c4title: "Своевременные напоминания",
        c4text: "Напоминания подтвердить, договориться и поделиться опытом — без спама.",
        c5title: "Доступный интерфейс",
        c5text: "Высокая контрастность, поддержка клавиатуры и меньше анимаций.",
        c6title: "Старт в один тап",
        c6text: "Заявка или предложение — меньше минуты."
      },
      cta: { title: "Готовы встретить партнёра по обучению?", text: "Нажмите ниже, чтобы открыть бота. Создайте заявку, получите совпадение и растите вместе.", btn: "Открыть @Symbiose_Bot" },
      faq: {
        title: "Частые вопросы",
        f1q: "Сервис бесплатный?",
        f1a: "Да, бот бесплатный. Если появятся платные функции, основное сопоставление останется бесплатным.",
        f2q: "Нужен ли аккаунт в Telegram?",
        f2a: "Да — Symbiose работает в Telegram ради скорости, приватности и надёжности.",
        f3q: "Как подбираются пары?",
        f3a: "Ищем по противоположному намерению (учусь/преподаю), релевантности навыка (точное или частичное совпадение) и городу. Контакты открываются только после подтверждения.",
        f4q: "Как с приватностью?",
        f4a: "Храним только то, что нужно для подбора. Вы сами решаете, когда делиться контактами."
      },
      footer: { nav: { tutorial: "Руководство", features: "Функции", faq: "FAQ" } },
      seo: {
        desc: "Найдите напарника, чтобы учиться или преподавать. Symbiose соединяет людей по навыкам и городу для реального обучения."
      },
      notfound: {
        title: "Страница не найдена",
        text: "Страница не существует или была перемещена.",
        home: "На главную"
      }
    }
  };

  // Theme handling
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

  function setTheme(theme) {
    const light = theme === 'light';
    doc.classList.toggle('light', light);
    try { localStorage.setItem(THEME_KEY, theme); } catch (_) {}
    const meta = $('meta[name="theme-color"]') || (function(){ const m=document.createElement('meta'); m.name='theme-color'; document.head.appendChild(m); return m; })();
    meta.setAttribute('content', light ? '#f7f9fc' : '#0b0f14');
  }

  function initTheme() {
    let saved;
    try { saved = localStorage.getItem(THEME_KEY); } catch (_) {}
    setTheme(saved || (prefersLight ? 'light' : 'dark'));
  }

  // Compute header height for fixed header offset
  function initHeaderOffset() {
    const header = $('.site-header');
    if (!header) return;
    const apply = () => {
      const h = header.offsetHeight;
      document.documentElement.style.setProperty('--header-h', h + 'px');
    };
    apply();
    window.addEventListener('resize', apply);
  }

  // Mobile nav toggle
  function initNav() {
    const toggle = $('.nav-toggle');
    const menu = $('#primary-menu');
    if (!toggle || !menu) return;
    const closeMenu = () => { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); };
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    // Close when clicking a link
    $$('#primary-menu a').forEach(a => a.addEventListener('click', closeMenu));
    // Close on escape
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  }

  // Smooth scroll for same-page anchors
  function initSmoothScroll() {
    const supports = 'scrollBehavior' in document.documentElement.style;
    $$('#primary-menu a[href^="#"], a.btn[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (!id || id === '#' || !supports) return; // fallback to default
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  // Reveal on scroll
  function initReveal() {
    const items = $$('.reveal');
    if (!items.length) return;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { items.forEach(el => el.classList.add('in')); return; }

    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      }
    }, { threshold: 0.15 });

    items.forEach(el => io.observe(el));
  }

  // i18n helpers & language switching
  function getDict(lang) { return I18N[lang] || I18N.en; }
  function resolve(dict, path) {
    return path.split('.').reduce((acc, k) => (acc && acc[k] != null ? acc[k] : undefined), dict);
  }
  function applyI18n(lang) {
    const dict = getDict(lang);
    $$('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = resolve(dict, key);
      if (typeof val === 'string') {
        if (val.includes('<')) el.innerHTML = val; else el.textContent = val;
      }
    });
    doc.setAttribute('lang', lang);
  }
  function updateLangSwitcherUI(lang) {
    const opts = $$('.lang-option');
    if (!opts.length) return;
    opts.forEach(btn => {
      const active = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }
  function tgUrlWithRef(index) {
    // Append _<index> to the start parameter to track button source
    const m = TELEGRAM_URL.match(/([?&])start=([^&]+)/);
    if (!m) return TELEGRAM_URL + (TELEGRAM_URL.includes('?') ? '&' : '?') + 'start=web_landing_' + index;
    const sep = m[1];
    const startVal = m[2];
    return TELEGRAM_URL.replace(sep + 'start=' + startVal, sep + 'start=' + startVal + '_' + index);
  }
  function normalizeTelegramLinks() {
    $$('[data-telegram]').forEach((el, idx) => {
      const url = tgUrlWithRef(idx);
      el.setAttribute('data-ref-index', String(idx));
      if (el.tagName && el.tagName.toLowerCase() === 'a') {
        if (el.getAttribute('href') !== url) el.setAttribute('href', url);
        el.setAttribute('rel', 'noopener');
        el.setAttribute('target', '_blank');
      } else {
        el.addEventListener('click', () => { window.open(url, '_blank', 'noopener'); });
      }
    });
  }
  function setLang(lang) {
    try { localStorage.setItem(LANG_KEY, lang); } catch (_) {}
    applyI18n(lang);
    // Update meta descriptions for SEO and social
    const dict = getDict(lang);
    const mDesc = document.querySelector('meta[name="description"]');
    if (mDesc) mDesc.setAttribute('content', dict.seo?.desc || '');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', dict.seo?.desc || '');
    // Re-normalize telegram links since some translated content injects anchors (e.g., figcaption)
    normalizeTelegramLinks();
    updateLangSwitcherUI(lang);
    const btn = $('#more-functions-btn');
    const panel = $('#tutorial-more');
    if (btn && panel) {
      const open = !panel.hasAttribute('hidden') && panel.style.height !== '0px' && panel.style.height !== '';
      const label = getDict(lang).tutorial[open ? 'moreBtnClose' : 'moreBtnOpen'];
      btn.textContent = label;
    }
  }
  function initLang() {
    let saved;
    try { saved = localStorage.getItem(LANG_KEY); } catch (_) {}
    // Force Russian by default when opened locally (file://), else use saved preference or RU
    const isLocal = location.protocol === 'file:';
    if (isLocal) setLang('ru');
    else setLang(saved || 'ru');
  }
  function initLangSwitcher() {
    const group = $('.lang-switch');
    if (!group) return;
    $$('.lang-option', group).forEach(btn => {
      btn.addEventListener('click', () => {
        const next = btn.getAttribute('data-lang');
        if (next) setLang(next);
      });
    });
  }
  function initTutorialMore() {
    const btn = $('#more-functions-btn');
    const panel = $('#tutorial-more');
    if (!btn || !panel) return;
    panel.hidden = true;
    panel.style.height = '0px';
    btn.setAttribute('aria-controls', 'tutorial-more');
    btn.setAttribute('aria-expanded', 'false');
    const setBtnLabel = (open) => {
      const lang = doc.getAttribute('lang') || 'en';
      const label = getDict(lang).tutorial[open ? 'moreBtnClose' : 'moreBtnOpen'];
      btn.textContent = label;
    };
    const openPanel = () => {
      panel.hidden = false;
      panel.style.height = '0px';
      const h = panel.scrollHeight;
      panel.style.height = h + 'px';
      const onEnd = () => { panel.style.height = 'auto'; panel.removeEventListener('transitionend', onEnd); };
      panel.addEventListener('transitionend', onEnd);
      btn.setAttribute('aria-expanded', 'true');
      setBtnLabel(true);
    };
    const closePanel = () => {
      const h = panel.scrollHeight;
      panel.style.height = h + 'px';
      requestAnimationFrame(() => { panel.style.height = '0px'; });
      const onEnd = () => { panel.hidden = true; panel.removeEventListener('transitionend', onEnd); };
      panel.addEventListener('transitionend', onEnd);
      btn.setAttribute('aria-expanded', 'false');
      setBtnLabel(false);
    };
    btn.addEventListener('click', () => {
      const isOpen = !panel.hidden && panel.style.height !== '0px' && panel.style.height !== '';
      if (isOpen) closePanel(); else openPanel();
    });
    setBtnLabel(false);
  }

  // Theme toggle button
  function initThemeToggle() {
    const btn = $('.theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const next = doc.classList.contains('light') ? 'dark' : 'light';
      setTheme(next);
    });
  }

  // Init
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initHeaderOffset();
    initNav();
    initSmoothScroll();
    initReveal();
    initThemeToggle();
    initLang();
    initLangSwitcher();
    initTutorialMore();
    normalizeTelegramLinks();
  });
})();
