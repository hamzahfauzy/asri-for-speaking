document.addEventListener("DOMContentLoaded", () => {
  // --- Sidebar & Dropdown Controls ---
  const sidebar = document.getElementById("sidebar");
  const openBtn = document.getElementById("sidebar-toggle-open");
  const closeBtn = document.getElementById("sidebar-toggle-close");
  const accountToggle = document.getElementById("account-toggle");
  const accountSubmenu = document.getElementById("account-submenu");
  const profileToggleBtn = document.getElementById("profile-toggle-btn");
  const profileDropdown = document.getElementById("profile-dropdown");

  if (openBtn) {
    openBtn.addEventListener("click", () => sidebar.classList.add("active"));
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", () => sidebar.classList.remove("active"));
  }
  if (accountToggle) {
    accountToggle.addEventListener("click", (e) => {
      e.preventDefault();
      accountToggle.parentElement.classList.toggle("open");
      const isExpanded = accountToggle.getAttribute("aria-expanded") === "true";
      accountSubmenu.style.maxHeight = isExpanded ? "0" : `${accountSubmenu.scrollHeight}px`;
      accountToggle.setAttribute("aria-expanded", !isExpanded);
    });
  }
  if (profileToggleBtn) {
    profileToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      profileDropdown.classList.toggle("show");
    });
  }
  window.addEventListener("click", (event) => {
    if (sidebar && !sidebar.contains(event.target) && !openBtn.contains(event.target) && sidebar.classList.contains("active")) {
      sidebar.classList.remove("active");
    }
    if (profileDropdown && profileDropdown.classList.contains("show")) {
      profileDropdown.classList.remove("show");
    }
  });

  // --- Learning Path Accordion ---
  const accordionItem = document.querySelector(".accordion-item");
  if (accordionItem) {
    const accordionHeader = accordionItem.querySelector(".accordion-header");
    const accordionContent = accordionItem.querySelector(".accordion-content");
    accordionHeader.addEventListener("click", () => {
      accordionItem.classList.toggle("active");
      accordionContent.style.maxHeight = accordionItem.classList.contains("active") ? `${accordionContent.scrollHeight}px` : "0";
    });
  }

  // --- GLOBAL LESSON STATE ---
  const lessonProgressText = document.getElementById("lesson-progress-text");
  const lessonProgressFill = document.getElementById("lesson-progress-fill");
  const totalLessonSteps = 5;
  let completedLessonSteps = 0;
  let activeLessonType = "identification";

  // Step items in the accordion
  const stepItems = {
    identification: document.getElementById("step-identification"),
    notification: document.getElementById("step-notification"),
    description: document.getElementById("step-description"),
    application: document.getElementById("step-application"),
    harmonization: document.getElementById("step-harmonization"),
  };

  const lessonContent = {
    identification: document.getElementById("identification-content"),
    notification: document.getElementById("notification-content"),
    description: document.getElementById("description-content"),
    application: document.getElementById("application-content"),
    harmonization: document.getElementById("harmonization-content"),
  };

  // --- GLOBAL SPEECH APIs ---
  const synth = window.speechSynthesis;
  let speechUtterance = new SpeechSynthesisUtterance("en-US");
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let speechRecognition = null;

  if (SpeechRecognition) {
    speechRecognition = new SpeechRecognition();
    speechRecognition.continuous = false;
    speechRecognition.lang = "en-US";
    speechRecognition.interimResults = false;
    speechRecognition.maxAlternatives = 1;
  } else {
    document.querySelectorAll(".speech-input-area").forEach((area) => {
      area.innerHTML = `<p style="color:red;">Speech Recognition is not supported by your browser. Please use Chrome/Edge.</p>`;
    });
  }

  // --- LESSON NAVIGATION & PROGRESS ---
  function updateLessonProgress() {
    lessonProgressText.textContent = `${completedLessonSteps}/${totalLessonSteps} Completed`;
    lessonProgressFill.style.width = `${(completedLessonSteps / totalLessonSteps) * 100}%`;

    const stepOrder = ["identification", "notification", "description", "application", "harmonization"];
    stepOrder.forEach((type, index) => {
      const item = stepItems[type];
      item.classList.remove("active", "completed");
      const icon = item.querySelector(".step-icon");
      if (index < completedLessonSteps) {
        item.classList.add("completed");
        icon.className = "fas fa-check-circle step-icon";
      }
    });

    if (stepItems[activeLessonType]) {
      stepItems[activeLessonType].classList.add("active");
    }
  }

  function showLessonContent(lessonType) {
    hideAllLessonContent();
    activeLessonType = lessonType;

    if (synth.speaking) synth.cancel();
    if (speechRecognition && speechRecognition.recognizing) speechRecognition.stop();

    if (lessonContent[lessonType]) {
      lessonContent[lessonType].style.display = "flex";
      // Load content for the new section
      if (lessonType === "identification") loadIdentificationWord();
      if (lessonType === "notification") loadNotificationWord();
      if (lessonType === "description") loadDescriptionWord();
      if (lessonType === "application") loadApplicationTask();
      if (lessonType === "harmonization") loadHarmonizationWord();
    }
    updateLessonProgress();
  }

  function hideAllLessonContent() {
    Object.values(lessonContent).forEach((el) => (el.style.display = "none"));
  }

  Object.entries(stepItems).forEach(([type, item]) => {
    item.addEventListener("click", () => showLessonContent(type));
  });

  /**
   * Universal handler for pronunciation practice stages.
   * @param {string} targetWord The word the user needs to say.
   */
  function setupPronunciationRecognition(targetWord) {
    if (!speechRecognition) return;

    // Determine which elements to use based on the active stage
    const elements = {
      startBtn: document.getElementById(`start-${activeLessonType}-recognition-btn`),
      statusEl: document.getElementById(`${activeLessonType}-recording-status`),
      spokenEl: document.getElementById(`${activeLessonType}-user-spoken-word`),
      resultEl: document.getElementById(`${activeLessonType}-recognition-result`),
      tryAgainBtn: document.getElementById(`${activeLessonType}-try-again-btn`),
      nextBtn: document.getElementById(`${activeLessonType}-next-btn`),
    };

    // Reset UI
    elements.spokenEl.textContent = "";
    elements.resultEl.textContent = "";
    elements.resultEl.classList.remove("correct", "incorrect");
    elements.startBtn.disabled = false;

    speechRecognition.onstart = () => {
      elements.statusEl.textContent = "Listening... Speak now!";
      elements.startBtn.classList.add("recording");
      elements.startBtn.disabled = true;
    };

    speechRecognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript.toLowerCase().trim();
      elements.spokenEl.textContent = `You said: "${spokenText}"`;
      elements.startBtn.classList.remove("recording");

      if (spokenText === targetWord.toLowerCase().trim()) {
        elements.resultEl.textContent = "Correct! ✅";
        elements.resultEl.className = "recognition-result correct";
        elements.tryAgainBtn.style.display = "none";
        elements.nextBtn.style.display = "inline-block";
        elements.startBtn.disabled = true;
      } else {
        elements.resultEl.textContent = `Incorrect. ❌`;
        elements.resultEl.className = "recognition-result incorrect";
        elements.tryAgainBtn.style.display = "inline-block";
        elements.nextBtn.style.display = "none";
        elements.startBtn.disabled = false;
      }
    };

    speechRecognition.onerror = (event) => {
      elements.statusEl.textContent = `Error: ${event.error}. Please try again.`;
      elements.startBtn.classList.remove("recording");
      elements.tryAgainBtn.style.display = "inline-block";
      elements.nextBtn.style.display = "none";
      elements.startBtn.disabled = false;
    };

    speechRecognition.onend = () => {
      elements.statusEl.textContent = "Click the microphone to speak";
      elements.startBtn.classList.remove("recording");
    };
  }

  // --- STAGE 1: IDENTIFICATION (Listening) ---
  const identificationWordsData = ["type", "want", "made", "key", "use"];
  // =================== PERUBAHAN DI SINI ===================
  // Ubah indeks awal menjadi 1 untuk menampilkan kata "want" (kata kedua)
  let currentIdentificationWordIndex = 0;
  // =========================================================
  const identificationWordToDisplayEl = document.getElementById("identification-word-to-display");
  const playIdentificationWordBtn = document.getElementById("play-identification-word-btn");
  const identificationCurrentWordEl = document.getElementById("identification-current-word");
  const identificationTotalWordsEl = document.getElementById("identification-total-words");
  const identificationPrevBtn = document.getElementById("identification-prev-btn");
  const identificationNextBtn = document.getElementById("identification-next-btn");
  const completeIdentificationBtn = document.getElementById("complete-identification-btn");

  function loadIdentificationWord() {
    identificationTotalWordsEl.textContent = identificationWordsData.length;
    identificationWordToDisplayEl.textContent = identificationWordsData[currentIdentificationWordIndex];
    identificationCurrentWordEl.textContent = currentIdentificationWordIndex + 1;
    identificationPrevBtn.style.display = currentIdentificationWordIndex > 0 ? "inline-block" : "none";
    identificationNextBtn.style.display = currentIdentificationWordIndex < identificationWordsData.length - 1 ? "inline-block" : "none";
    completeIdentificationBtn.style.display = currentIdentificationWordIndex === identificationWordsData.length - 1 ? "inline-block" : "none";
  }
  playIdentificationWordBtn.addEventListener("click", () => {
    speechUtterance.text = identificationWordsData[currentIdentificationWordIndex];
    synth.speak(speechUtterance);
  });
  identificationNextBtn.addEventListener("click", () => {
    currentIdentificationWordIndex++;
    loadIdentificationWord();
  });
  identificationPrevBtn.addEventListener("click", () => {
    currentIdentificationWordIndex--;
    loadIdentificationWord();
  });
  completeIdentificationBtn.addEventListener("click", () => {
    if (completedLessonSteps < 1) completedLessonSteps = 1;
    lessonContent.identification.innerHTML = `
      <div class="identification-completion">
        <h3>Stage 1 Complete! ✅</h3>
        <p>You've listened to all the words. Now, let's practice speaking them!</p>
        <button class="btn" id="finish-identification-lesson-btn">Continue to Pronunciation</button>
      </div>`;
    document.getElementById("finish-identification-lesson-btn").addEventListener("click", () => showLessonContent("notification"));
  });

  // --- STAGE 2: NOTIFICATION (Pronunciation) ---
  const notificationWordsData = ["type", "want", "made", "key", "use"];
  let currentNotificationWordIndex = 0;
  // Get all elements by ID
  const notificationWordToDisplayEl = document.getElementById("notification-word-to-display");
  const startNotificationRecognitionBtn = document.getElementById("start-notification-recognition-btn");
  const notificationTryAgainBtn = document.getElementById("notification-try-again-btn");
  const notificationCurrentWordEl = document.getElementById("notification-current-word");
  const notificationTotalWordsEl = document.getElementById("notification-total-words");
  const notificationPrevBtn = document.getElementById("notification-prev-btn");
  const notificationNextBtn = document.getElementById("notification-next-btn");
  const completeNotificationBtn = document.getElementById("complete-notification-btn");

  function loadNotificationWord() {
    const word = notificationWordsData[currentNotificationWordIndex];
    notificationTotalWordsEl.textContent = notificationWordsData.length;
    notificationWordToDisplayEl.textContent = word;
    notificationCurrentWordEl.textContent = currentNotificationWordIndex + 1;
    // Reset UI
    document.getElementById("notification-recognition-result").textContent = "";
    document.getElementById("notification-user-spoken-word").textContent = "";
    startNotificationRecognitionBtn.disabled = false;
    notificationTryAgainBtn.style.display = "none";
    // Button visibility
    notificationPrevBtn.style.display = currentNotificationWordIndex > 0 ? "inline-block" : "none";
    notificationNextBtn.style.display = "inline-block";
    completeNotificationBtn.style.display = "none";
    if (currentNotificationWordIndex === notificationWordsData.length - 1) {
      notificationNextBtn.style.display = "none";
      completeNotificationBtn.style.display = "inline-block";
    }
  }
  startNotificationRecognitionBtn.addEventListener("click", () => {
    setupPronunciationRecognition(notificationWordsData[currentNotificationWordIndex]);
    speechRecognition.start();
  });
  notificationTryAgainBtn.addEventListener("click", () => {
    startNotificationRecognitionBtn.click(); // Just re-trigger the recognition
  });
  notificationNextBtn.addEventListener("click", () => {
    currentNotificationWordIndex++;
    loadNotificationWord();
  });
  notificationPrevBtn.addEventListener("click", () => {
    currentNotificationWordIndex--;
    loadNotificationWord();
  });
  completeNotificationBtn.addEventListener("click", () => {
    if (completedLessonSteps < 2) completedLessonSteps = 2;
    lessonContent.notification.innerHTML = `
      <div class="notification-completion">
        <h3>Stage 2 Complete! ✅</h3>
        <p>Great job on the pronunciation practice!</p>
        <button class="btn" id="finish-notification-lesson-btn">Continue to Description</button>
      </div>`;
    document.getElementById("finish-notification-lesson-btn").addEventListener("click", () => showLessonContent("description"));
  });

  // --- STAGE 3: DESCRIPTION (Unchanged) ---
  const descriptionWordsData = [
    {
      word: "type",
      spelling: "T-Y-P-E",
      pronunciation_ipa: "/taɪp/",
      pronunciation_approx: "(TAIP)",
      meaning_intro: "The word 'type' can mean:",
      meanings: ["A category or classification.", "To write using a keyboard."],
      examples: ["What type of music do you like?", "Please type your password carefully."],
    },
    { word: "want", spelling: "W-A-N-T", pronunciation_ipa: "/wɔnt/", pronunciation_approx: "(WONT)", meaning_intro: "To feel a desire for something.", meanings: [], examples: ["I want to go to the beach.", "Do you want some water?"] },
    {
      word: "made",
      spelling: "M-A-D-E",
      pronunciation_ipa: "/meɪd/",
      pronunciation_approx: "(MAYD)",
      meaning_intro: "Past tense of 'make'; to create or construct.",
      meanings: [],
      examples: ["She made a delicious cake.", "This was made from wood."],
    },
    {
      word: "key",
      spelling: "K-E-Y",
      pronunciation_ipa: "/kiː/",
      pronunciation_approx: "(KEE)",
      meaning_intro: "A crucial element or a device to open a lock.",
      meanings: [],
      examples: ["This is the key to success.", "Use the key to open the door."],
    },
    { word: "use", spelling: "U-S-E", pronunciation_ipa: "/juːz/", pronunciation_approx: "(YOOS)", meaning_intro: "To employ for a purpose.", meanings: [], examples: ["Can I use your pen?", "How do you use this tool?"] },
  ];
  let currentDescriptionWordIndex = 0;
  const descriptionWordToDisplayEl = document.getElementById("description-word-to-display");
  const descriptionSpellingEl = document.getElementById("description-spelling");
  const descriptionPronunciationEl = document.getElementById("description-pronunciation");
  const descriptionMeaningIntroEl = document.getElementById("description-meaning-intro");
  const descriptionMeaningsList = document.getElementById("description-meanings-list");
  const descriptionExamplesList = document.getElementById("description-examples-list");
  const descriptionCurrentIndexEl = document.getElementById("description-current-index");
  const descriptionTotalWordsEl = document.getElementById("description-total-words");
  const descriptionPrevBtn = document.getElementById("description-prev-btn");
  const descriptionNextBtn = document.getElementById("description-next-btn");
  const playDescriptionFullBtn = document.getElementById("play-description-full-btn");
  const completeDescriptionBtn = document.getElementById("complete-description-btn");

  function loadDescriptionWord() {
    const wordData = descriptionWordsData[currentDescriptionWordIndex];
    descriptionTotalWordsEl.textContent = descriptionWordsData.length;
    descriptionWordToDisplayEl.textContent = wordData.word;
    descriptionSpellingEl.textContent = `Spelled: ${wordData.spelling}`;
    descriptionPronunciationEl.textContent = `Pronunciation: ${wordData.pronunciation_ipa} ${wordData.pronunciation_approx}`;
    descriptionMeaningIntroEl.textContent = wordData.meaning_intro;
    descriptionMeaningsList.innerHTML = wordData.meanings.map((m) => `<li>${m}</li>`).join("");
    descriptionExamplesList.innerHTML = wordData.examples.map((ex) => `<li>${ex}</li>`).join("");
    descriptionCurrentIndexEl.textContent = currentDescriptionWordIndex + 1;
    descriptionPrevBtn.style.display = currentDescriptionWordIndex > 0 ? "inline-block" : "none";
    descriptionNextBtn.style.display = currentDescriptionWordIndex < descriptionWordsData.length - 1 ? "inline-block" : "none";
    completeDescriptionBtn.style.display = currentDescriptionWordIndex === descriptionWordsData.length - 1 ? "inline-block" : "none";
  }
  playDescriptionFullBtn.addEventListener("click", () => {
    const wordData = descriptionWordsData[currentDescriptionWordIndex];
    let textToSpeak = `The word is ${wordData.word}. ${wordData.meaning_intro}. Example: ${wordData.examples[0]}`;
    speechUtterance.text = textToSpeak;
    synth.speak(speechUtterance);
  });
  descriptionNextBtn.addEventListener("click", () => {
    currentDescriptionWordIndex++;
    loadDescriptionWord();
  });
  descriptionPrevBtn.addEventListener("click", () => {
    currentDescriptionWordIndex--;
    loadDescriptionWord();
  });
  completeDescriptionBtn.addEventListener("click", () => {
    if (completedLessonSteps < 3) completedLessonSteps = 3;
    lessonContent.description.innerHTML = `
      <div class="description-completion">
        <h3>Stage 3 Complete! ✅</h3>
        <p>You have reviewed all the word descriptions.</p>
        <button class="btn" id="finish-description-lesson-btn">Continue to Application</button>
      </div>`;
    document.getElementById("finish-description-lesson-btn").addEventListener("click", () => showLessonContent("application"));
  });

  // --- STAGE 4: APPLICATION (Pronunciation) ---
  const applicationWordsData = ["talk", "dress", "wear", "own", "risk"];
  let currentApplicationTaskIndex = 0;
  const applicationWordToDisplayEl = document.getElementById("application-word-to-display");
  const startApplicationRecognitionBtn = document.getElementById("start-application-recognition-btn");
  const applicationTryAgainBtn = document.getElementById("application-try-again-btn");
  const applicationCurrentWordEl = document.getElementById("application-current-word");
  const applicationTotalWordsEl = document.getElementById("application-total-words");
  const applicationPrevBtn = document.getElementById("application-prev-btn");
  const applicationNextBtn = document.getElementById("application-next-btn");
  const completeApplicationBtn = document.getElementById("complete-application-btn");

  function loadApplicationTask() {
    const word = applicationWordsData[currentApplicationTaskIndex];
    applicationTotalWordsEl.textContent = applicationWordsData.length;
    applicationWordToDisplayEl.textContent = word;
    applicationCurrentWordEl.textContent = currentApplicationTaskIndex + 1;
    document.getElementById("application-recognition-result").textContent = "";
    document.getElementById("application-user-spoken-word").textContent = "";
    startApplicationRecognitionBtn.disabled = false;
    applicationTryAgainBtn.style.display = "none";
    applicationPrevBtn.style.display = currentApplicationTaskIndex > 0 ? "inline-block" : "none";
    applicationNextBtn.style.display = "inline-block";
    completeApplicationBtn.style.display = "none";
    if (currentApplicationTaskIndex === applicationWordsData.length - 1) {
      applicationNextBtn.style.display = "none";
      completeApplicationBtn.style.display = "inline-block";
    }
  }
  startApplicationRecognitionBtn.addEventListener("click", () => {
    setupPronunciationRecognition(applicationWordsData[currentApplicationTaskIndex]);
    speechRecognition.start();
  });
  applicationTryAgainBtn.addEventListener("click", () => {
    startApplicationRecognitionBtn.click();
  });
  applicationNextBtn.addEventListener("click", () => {
    currentApplicationTaskIndex++;
    loadApplicationTask();
  });
  applicationPrevBtn.addEventListener("click", () => {
    currentApplicationTaskIndex--;
    loadApplicationTask();
  });
  completeApplicationBtn.addEventListener("click", () => {
    if (completedLessonSteps < 4) completedLessonSteps = 4;
    lessonContent.application.innerHTML = `
      <div class="application-completion">
        <h3>Stage 4 Complete! ✅</h3>
        <p>You're doing great! One more stage to go.</p>
        <button class="btn" id="finish-application-lesson-btn">Continue to Final Practice</button>
      </div>`;
    document.getElementById("finish-application-lesson-btn").addEventListener("click", () => showLessonContent("harmonization"));
  });

  // --- STAGE 5: HARMONIZATION (Pronunciation) ---
  const harmonizationWordsData = ["guess", "ask", "come", "offer", "understand"];
  let currentHarmonizationWordIndex = 0;
  const harmonizationWordToDisplayEl = document.getElementById("harmonization-word-to-display");
  const startHarmonizationRecognitionBtn = document.getElementById("start-harmonization-recognition-btn");
  const harmonizationTryAgainBtn = document.getElementById("harmonization-try-again-btn");
  const harmonizationCurrentWordEl = document.getElementById("harmonization-current-word");
  const harmonizationTotalWordsEl = document.getElementById("harmonization-total-words");
  const harmonizationPrevBtn = document.getElementById("harmonization-prev-btn");
  const harmonizationNextBtn = document.getElementById("harmonization-next-btn");
  const completeHarmonizationBtn = document.getElementById("complete-harmonization-btn");

  function loadHarmonizationWord() {
    const word = harmonizationWordsData[currentHarmonizationWordIndex];
    harmonizationTotalWordsEl.textContent = harmonizationWordsData.length;
    harmonizationWordToDisplayEl.textContent = word;
    harmonizationCurrentWordEl.textContent = currentHarmonizationWordIndex + 1;
    document.getElementById("harmonization-recognition-result").textContent = "";
    document.getElementById("harmonization-user-spoken-word").textContent = "";
    startHarmonizationRecognitionBtn.disabled = false;
    harmonizationTryAgainBtn.style.display = "none";
    harmonizationPrevBtn.style.display = currentHarmonizationWordIndex > 0 ? "inline-block" : "none";
    harmonizationNextBtn.style.display = "inline-block";
    completeHarmonizationBtn.style.display = "none";
    if (currentHarmonizationWordIndex === harmonizationWordsData.length - 1) {
      harmonizationNextBtn.style.display = "none";
      completeHarmonizationBtn.style.display = "inline-block";
    }
  }
  startHarmonizationRecognitionBtn.addEventListener("click", () => {
    setupPronunciationRecognition(harmonizationWordsData[currentHarmonizationWordIndex]);
    speechRecognition.start();
  });
  harmonizationTryAgainBtn.addEventListener("click", () => {
    startHarmonizationRecognitionBtn.click();
  });
  harmonizationNextBtn.addEventListener("click", () => {
    currentHarmonizationWordIndex++;
    loadHarmonizationWord();
  });
  harmonizationPrevBtn.addEventListener("click", () => {
    currentHarmonizationWordIndex--;
    loadHarmonizationWord();
  });
  completeHarmonizationBtn.addEventListener("click", () => {
    if (completedLessonSteps < 5) completedLessonSteps = 5;
    updateLessonProgress(); // Final update to show 5/5
    lessonContent.harmonization.innerHTML = `
      <div class="harmonization-completion">
        <h3>Congratulations! Lesson Complete! 🎉</h3>
        <p>You have successfully finished all stages of Lesson 1. Excellent work!</p>
        <button class="btn" id="finish-harmonization-lesson-btn">Start Lesson Over</button>
      </div>`;
    document.getElementById("finish-harmonization-lesson-btn").addEventListener("click", () => {
      // Reset everything to start the lesson again
      completedLessonSteps = 0;
      currentIdentificationWordIndex = 0;
      currentNotificationWordIndex = 0;
      currentDescriptionWordIndex = 0;
      currentApplicationTaskIndex = 0;
      currentHarmonizationWordIndex = 0;
      // You may need to restore the innerHTML of the sections if you want a true reset
      // For now, just go back to the first stage
      alert("Resetting lesson progress!");
      window.location.reload(); // Easiest way to reset the page state
    });
  });

  // --- Initial Page Load ---
  updateLessonProgress();
  showLessonContent(activeLessonType);
});
