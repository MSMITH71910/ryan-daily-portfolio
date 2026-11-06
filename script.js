/* ============================================================
   NAVBAR SCROLL
   ============================================================ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ============================================================
   MOBILE NAV
   ============================================================ */
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '70px';
  navLinks.style.left = '0';
  navLinks.style.right = '0';
  navLinks.style.background = 'rgba(10,10,15,0.98)';
  navLinks.style.padding = '20px';
  navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
  navLinks.style.backdropFilter = 'blur(16px)';
});

/* ============================================================
   FADE-UP OBSERVER
   ============================================================ */
const fadeEls = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => observer.observe(el));

document.querySelectorAll('.work-card, .skill-card, .about-grid > *, .contact-wrap > *').forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

/* ============================================================
   CONTACT FORM
   ============================================================ */
const successModal = document.getElementById('successModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');

function showSuccessModal() {
  successModal.classList.add('show');
}

function hideSuccessModal() {
  successModal.classList.remove('show');
}

modalCloseBtn.addEventListener('click', hideSuccessModal);
successModal.addEventListener('click', (e) => {
  if (e.target === successModal) hideSuccessModal();
});

document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  e.target.reset();
  showSuccessModal();
});

/* ============================================================
   CHATBOT
   ============================================================ */
const chatBubble  = document.getElementById('chatbotBubble');
const chatWindow  = document.getElementById('chatbotWindow');
const chatClose   = document.getElementById('chatbotClose');
const chatInput   = document.getElementById('chatInput');
const chatSend    = document.getElementById('chatSend');
const chatMessages = document.getElementById('chatMessages');
const chatUnread  = document.getElementById('chatUnread');
const quickReplies = document.getElementById('quickReplies');

let chatOpen = false;

function toggleChat() {
  chatOpen = !chatOpen;
  chatWindow.classList.toggle('open', chatOpen);
  if (chatOpen) {
    chatUnread.classList.add('hidden');
    chatInput.focus();
  }
}

chatBubble.addEventListener('click', toggleChat);
chatClose.addEventListener('click', toggleChat);

const jokes = [
  "Why don't scientists trust atoms? Because they make up everything. Much like actors! 🎭",
  "I told my agent I wanted to be a star. He said 'Great, can you play a gas ball for 5 billion years?' 😂",
  "Why did the actor fall through the floor? Because it was just a stage! 🎬",
  "An actor walked into a bar... and ordered water. Because he was method acting a fish. 🐟",
  "Why don't actors ever look out the window in the morning? Because then they'd have nothing to do in the afternoon. ☀️",
  "How many actors does it take to change a light bulb? One to change it, and 99 to say 'I could've done that better.' 💡",
  "I tried to audition for a singing role. The director said I had 'unique range' — apparently off-key counts. 🎤",
  "What's an actor's favorite website? Amazon Prime... for the acting tips... definitely not the TV shows. 📺",
];

let jokeIndex = 0;

const responses = [
  {
    patterns: ['who is ryan', 'about ryan', 'tell me about', 'who are you', 'ryan daily'],
    reply: "Ryan Daily is a passionate **General Creative Professional** — an actor, artist, and storyteller with 5+ years of experience. He works across film, theatre, commercials, voice over, and creative collaborations. Basically, if it involves creativity and performance, Ryan's your person! 🎭"
  },
  {
    patterns: ['work', 'project', 'film', 'theatre', 'commercial', 'portfolio'],
    reply: "Ryan's portfolio includes lead roles in indie films, sold-out theatre runs, national TV commercials, award-nominated short films, and documentary narration. Scroll up to the **Work** section to see highlights! 🎬"
  },
  {
    patterns: ['contact', 'reach', 'hire', 'book', 'email', 'get in touch', 'collaboration'],
    reply: "To work with Ryan, scroll down to the **Contact** section and fill out the form — he'll get back to you! You can also email **hello@ryandaily.com**. He's open for acting roles, brand work, voice-over, and creative collabs. 📩"
  },
  {
    patterns: ['skill', 'expertise', 'can ryan', 'what does ryan do', 'speciali'],
    reply: "Ryan's core skills include acting (film/TV/theatre), voice & narration, on-camera performance, creative writing, brand collaboration, and improv. The man is a creative Swiss Army knife! 🔧"
  },
  {
    patterns: ['joke', 'funny', 'laugh', 'humor', 'entertain'],
    reply: null,
    isJoke: true
  },
  {
    patterns: ['hello', 'hi', 'hey', 'sup', 'howdy', 'greetings'],
    reply: "Hey there! 👋 Great to meet you! I'm RD Bot, Ryan's AI assistant with questionable comedy skills. What can I help you with? Ask me about Ryan, his work, how to contact him, or hit me up for a joke! 😄"
  },
  {
    patterns: ['thanks', 'thank you', 'appreciate', 'helpful'],
    reply: "Anytime! 😊 That's what I'm here for. Anything else you'd like to know about Ryan? Or maybe another joke? I've got plenty... whether you want them or not. 😂"
  },
  {
    patterns: ['bye', 'goodbye', 'later', 'see ya', 'cya'],
    reply: "Catch you later! 👋 If you ever want to work with Ryan or just need another terrible joke, you know where to find me. ✨"
  },
  {
    patterns: ['experience', 'years', 'background', 'training'],
    reply: "Ryan has 5+ years of professional creative experience, including method acting training, improv courses, and hands-on work across dozens of projects. He's not just talented — he's dedicated. 💪"
  },
  {
    patterns: ['available', 'availability', 'free', 'schedule', 'when'],
    reply: "Ryan is currently available for new projects! Drop a message in the Contact section with your project details and he'll get back to you to discuss scheduling. 📅"
  },
  {
    patterns: ['rate', 'price', 'cost', 'fee', 'charge', 'money'],
    reply: "Rates vary depending on the project type and scope. Best to reach out directly via the Contact section — Ryan's happy to discuss details based on your specific needs. 💼"
  }
];

function findResponse(msg) {
  const lower = msg.toLowerCase();
  for (const r of responses) {
    if (r.patterns.some(p => lower.includes(p))) {
      if (r.isJoke) {
        return jokes[jokeIndex++ % jokes.length];
      }
      return r.reply;
    }
  }
  return "Hmm, great question! I'm still learning. Try asking about Ryan's **work**, **skills**, **contact info**, or just say 'tell me a joke' — that one I definitely know how to handle. 😄";
}

function appendMessage(text, sender) {
  const div = document.createElement('div');
  div.className = `chat-msg ${sender}`;
  div.innerHTML = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
  const typing = document.createElement('div');
  typing.className = 'chat-typing';
  typing.id = 'typingIndicator';
  typing.innerHTML = '<span></span><span></span><span></span>';
  chatMessages.appendChild(typing);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTyping() {
  const t = document.getElementById('typingIndicator');
  if (t) t.remove();
}

function sendMessage(text) {
  if (!text.trim()) return;

  if (quickReplies && quickReplies.parentNode === chatMessages) {
    quickReplies.remove();
  }

  appendMessage(text, 'user');

  showTyping();
  const delay = 800 + Math.random() * 600;
  setTimeout(() => {
    hideTyping();
    const reply = findResponse(text);
    appendMessage(reply, 'bot');
  }, delay);
}

chatSend.addEventListener('click', () => {
  const val = chatInput.value.trim();
  chatInput.value = '';
  sendMessage(val);
});

chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const val = chatInput.value.trim();
    chatInput.value = '';
    sendMessage(val);
  }
});

document.querySelectorAll('.quick-reply').forEach(btn => {
  btn.addEventListener('click', () => {
    sendMessage(btn.dataset.msg);
  });
});

/* ============================================================
   SMOOTH ACTIVE NAV
   ============================================================ */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--text)' : '';
  });
});
