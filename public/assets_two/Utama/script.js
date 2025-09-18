// DOM Elements
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const demoMic = document.getElementById("demoMic");
const demoResult = document.getElementById("demoResult");
const startLearningBtn = document.getElementById("startLearning");
const watchDemoBtn = document.getElementById("watchDemo");

// Mobile Navigation
hamburger?.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, observerOptions);

// Observe INDAH steps
document.querySelectorAll(".indah-step").forEach((step) => {
  observer.observe(step);
});

// Counter Animation
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start).toLocaleString();
    }
  }, 16);
}

// Stats Counter Observer
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll(".stat-number");
        statNumbers.forEach((stat) => {
          const target = Number.parseInt(stat.getAttribute("data-target"));
          animateCounter(stat, target);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const statsSection = document.querySelector(".stats-section");
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Demo Microphone Functionality
let isRecording = false;
let recognition;

// Check for Speech Recognition support
if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  recognition.onstart = () => {
    isRecording = true;
    demoMic.classList.add("active");
    demoMic.innerHTML = '<i class="fas fa-stop"></i><span>Mendengarkan...</span>';
    demoResult.querySelector(".result-text").textContent = "Sedang mendengarkan...";
    demoResult.querySelector(".result-score").textContent = "";
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    const confidence = Math.round(event.results[0][0].confidence * 100);

    demoResult.querySelector(".result-text").textContent = `Anda berkata: "${transcript}"`;

    // Simple scoring based on how close to "hello world"
    let score = 0;
    if (transcript.includes("hello")) score += 50;
    if (transcript.includes("world")) score += 50;

    const finalScore = Math.min(score, confidence);
    demoResult.querySelector(".result-score").innerHTML = `
            <div style="color: ${finalScore >= 70 ? "#48BB78" : finalScore >= 40 ? "#ED8936" : "#E53E3E"}">
                Skor Pronunciation: ${finalScore}%
                ${finalScore >= 70 ? "✅ Excellent!" : finalScore >= 40 ? "⚠️ Good, keep practicing!" : "❌ Needs improvement"}
            </div>
        `;
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    demoResult.querySelector(".result-text").textContent = "Terjadi kesalahan. Silakan coba lagi.";
    demoResult.querySelector(".result-score").textContent = "";
  };

  recognition.onend = () => {
    isRecording = false;
    demoMic.classList.remove("active");
    demoMic.innerHTML = '<i class="fas fa-microphone"></i><span>Klik untuk Mulai</span>';
  };
}

demoMic?.addEventListener("click", () => {
  if (!recognition) {
    demoResult.querySelector(".result-text").textContent = "Speech Recognition tidak didukung di browser ini.";
    return;
  }

  if (isRecording) {
    recognition.stop();
  } else {
    demoResult.querySelector(".result-text").textContent = 'Ucapkan "Hello World"...';
    demoResult.querySelector(".result-score").textContent = "";
    recognition.start();
  }
});

// Button Click Handlers
startLearningBtn?.addEventListener("click", () => {
  // Simulate navigation to learning platform
  showNotification("Mengarahkan ke platform pembelajaran...", "success");
  setTimeout(() => {
    window.location.href = "#indah-method";
  }, 1000);
});

watchDemoBtn?.addEventListener("click", () => {
  // Scroll to demo section
  document.querySelector(".demo-section")?.scrollIntoView({
    behavior: "smooth",
  });
});

// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
        <span>${message}</span>
    `;

  // Add notification styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === "success" ? "#48BB78" : type === "error" ? "#E53E3E" : "#4A90E2"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Parallax Effect for Hero Section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroVisual = document.querySelector(".hero-visual");

  if (heroVisual) {
    heroVisual.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Dynamic Text Animation
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize dynamic text on hero load
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    heroTitle.innerHTML = "";
    setTimeout(() => {
      heroTitle.innerHTML = originalText;
      heroTitle.style.opacity = "0";
      heroTitle.style.animation = "fadeInUp 1s ease forwards";
    }, 500);
  }
});

// Add CSS animation keyframes dynamically
const style = document.createElement("style");
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .notification {
        animation: slideIn 0.3s ease;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
        }
        to {
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Easter Egg: Konami Code
const konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener("keydown", (e) => {
  konamiCode.push(e.keyCode);

  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }

  if (konamiCode.length === konamiSequence.length && konamiCode.every((code, index) => code === konamiSequence[index])) {
    showNotification("🎉 Konami Code activated! You found the easter egg!", "success");

    // Add special effect
    document.body.style.animation = "rainbow 2s infinite";
    setTimeout(() => {
      document.body.style.animation = "";
    }, 5000);
  }
});

// Add rainbow animation
const rainbowStyle = document.createElement("style");
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

console.log("🎤 ASRI Website loaded successfully!");
console.log("💡 Try the Konami Code: ↑↑↓↓←→←→BA");
