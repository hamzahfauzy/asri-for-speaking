document.addEventListener("DOMContentLoaded", () => {
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
  const right = `<div class="legend-item legend-green">
                        <i class="fas fa-check"></i>
                        <span>Exactly</span>
                    </div>`
  const wrong = `<div class="legend-item legend-red">
                        <i class="fas fa-times"></i>
                        <span>Need revision</span>
                    </div>`
//   let window.completedLessonSteps = 0;
//   let window.activeLessonType = "identification";

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
    lessonProgressText.textContent = `${window.completedLessonSteps}/${totalLessonSteps} Completed`;
    lessonProgressFill.style.width = `${(window.completedLessonSteps / totalLessonSteps) * 100}%`;

    const stepOrder = ["identification", "notification", "description", "application", "harmonization"];
    stepOrder.forEach((type, index) => {
      const item = stepItems[type];
      item.classList.remove("active", "completed");
      const icon = item.querySelector(".step-icon");
      if (index < window.completedLessonSteps) {
        item.classList.add("completed");
        icon.className = "fas fa-check-circle step-icon";
      }
    });

    if (stepItems[window.activeLessonType]) {
      stepItems[window.activeLessonType].classList.add("active");
    }
  }

  function showLessonContent(lessonType) {
    hideAllLessonContent();
    window.activeLessonType = lessonType;

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
      startBtn: document.getElementById(`start-${window.activeLessonType}-recognition-btn`),
      statusEl: document.getElementById(`${window.activeLessonType}-recording-status`),
      spokenEl: document.getElementById(`${window.activeLessonType}-user-spoken-word`),
      resultEl: document.getElementById(`${window.activeLessonType}-recognition-result`),
      tryAgainBtn: document.getElementById(`${window.activeLessonType}-try-again-btn`),
      nextBtn: document.getElementById(`${window.activeLessonType}-next-btn`),
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
        // elements.resultEl.textContent = "Correct! ✅";
        elements.resultEl.innerHTML = right;
        elements.resultEl.className = "recognition-result correct";
        elements.tryAgainBtn.style.display = "none";
        if(window.activeLessonType == 'identification' && currentIdentificationWordIndex === window.identificationWordsData.length - 1)
        {
            identificationNextBtn.style.display = "none";
        }
        else if(window.activeLessonType == 'notification' && currentNotificationWordIndex === window.notificationWordsData.length - 1)
        {
            notificationNextBtn.style.display = "none";
        }
        else if(window.activeLessonType == 'description' && currentDescriptionWordIndex === window.descriptionWordsData.length - 1)
        {
            descriptionNextBtn.style.display = "none";
        }
        else if(window.activeLessonType == 'application')
        {
            const question = window.applicationWordsData[currentApplicationTaskIndex]
            applicationFormData[currentApplicationTaskIndex] = {"sectionIndex": currentApplicationTaskIndex, "question": question, "status": 1}
            if(currentApplicationTaskIndex === window.applicationWordsData.length - 1)
            {
                applicationNextBtn.style.display = "none";
            }
            else
            {
                applicationNextBtn.style.display = "inline-block";
            }

            if (currentApplicationTaskIndex === window.applicationWordsData.length - 1) {
                completeApplicationBtn.style.display = "inline-block";
            }
        }
        else if(window.activeLessonType == 'harmonization')
        {
            const question = window.harmonizationWordsData[currentHarmonizationWordIndex]
            applicationFormData[currentHarmonizationWordIndex] = {"sectionIndex": currentHarmonizationWordIndex, "question": question, "status": 1}
            if(currentHarmonizationWordIndex === window.harmonizationWordsData.length - 1)
            {
                harmonizationNextBtn.style.display = "none";
            }
            else
            {
                harmonizationNextBtn.style.display = "inline-block";
            }

            if (currentHarmonizationWordIndex === window.harmonizationWordsData.length - 1) {
                completeHarmonizationBtn.style.display = "inline-block";
            }
        }
        else
        {
            elements.nextBtn.style.display = "inline-block";
        }
        elements.startBtn.disabled = true;
      } else {
        // elements.resultEl.textContent = `Incorrect. ❌`;
        elements.resultEl.innerHTML = wrong;
        elements.resultEl.className = "recognition-result incorrect";
        if(window.activeLessonType == 'application')
        {
            const question = window.applicationWordsData[currentApplicationTaskIndex]
            applicationFormData[currentApplicationTaskIndex] = {"sectionIndex": currentApplicationTaskIndex, "question": question, "status": 0}
            if(currentApplicationTaskIndex === window.applicationWordsData.length - 1)
            {
                applicationNextBtn.style.display = "none";
            }
            else
            {
                applicationNextBtn.style.display = "inline-block";
            }

            if (currentApplicationTaskIndex === window.applicationWordsData.length - 1) {
                completeApplicationBtn.style.display = "inline-block";
            }

            elements.tryAgainBtn.style.display = "inline-block";
            // elements.nextBtn.style.display = "none";
        }
        else if(window.activeLessonType == 'harmonization')
        {
            const question = window.harmonizationWordsData[currentHarmonizationWordIndex]
            applicationFormData[currentHarmonizationWordIndex] = {"sectionIndex": currentHarmonizationWordIndex, "question": question, "status": 0}
            if(currentHarmonizationWordIndex === window.harmonizationWordsData.length - 1)
            {
                harmonizationNextBtn.style.display = "none";
            }
            else
            {
                harmonizationNextBtn.style.display = "inline-block";
            }

            if (currentHarmonizationWordIndex === window.harmonizationWordsData.length - 1) {
                completeHarmonizationBtn.style.display = "inline-block";
            }
        }
        else
        {
            elements.tryAgainBtn.style.display = "inline-block";
            elements.nextBtn.style.display = "none";
        }
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
      elements.startBtn.disabled = false;
      elements.startBtn.classList.remove("recording");
    };
  }

  if(window.completedLessonSteps == 5)
    {
        updateLessonProgress();
        return
    }

  // --- STAGE 1: IDENTIFICATION (Listening) ---
  const identificationWordsData = ["Type", "Want", "Made", "Key", "Use", "Choose", "Move", "Care", "Answer", "Tell ", "Study ", "Die", "Call", "Success", "Serve", "Require ", "Provide", 
  "Reduce", "Burn", "Receive", "Run", "Listen", "Written", "Speak", "ead", "Produce", "Make", "Become", "Jump", "Eat", "Drink", "Sleep", "Watch", "Learn ", "Teach", "Work"
  ,"Play ", "Think", "Sing", "Dance", "Swim", "Drive", "Ride ", "Fly", "Walk", "Buy", "Sell", "Create ", "Visit", "Send"];
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
    identificationTotalWordsEl.textContent = window.identificationWordsData.length;
    identificationWordToDisplayEl.textContent = window.identificationWordsData[currentIdentificationWordIndex];
    identificationCurrentWordEl.textContent = currentIdentificationWordIndex + 1;
    identificationPrevBtn.style.display = currentIdentificationWordIndex > 0 ? "inline-block" : "none";
    identificationNextBtn.style.display = currentIdentificationWordIndex < window.identificationWordsData.length - 1 ? "inline-block" : "none";
    completeIdentificationBtn.style.display = currentIdentificationWordIndex === window.identificationWordsData.length - 1 ? "inline-block" : "none";
  }
  playIdentificationWordBtn.addEventListener("click", () => {
    // speechUtterance.text = window.identificationWordsData[currentIdentificationWordIndex];
    const text = window.identificationWordsData[currentIdentificationWordIndex];
    responsiveVoice.speak(text);
    // synth.speak(speechUtterance);
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
    if (window.completedLessonSteps < 1) window.completedLessonSteps = 1;
    lessonContent.identification.innerHTML = `
      <div class="identification-completion">
        <h3>Stage 1 Complete! ✅</h3>
        <p>You've listened to all the words. Now, let's practice speaking them!</p>
        <button class="btn btn-primary" id="finish-identification-lesson-btn">Continue to Pronunciation</button>
      </div>`;
    document.getElementById("finish-identification-lesson-btn").addEventListener("click", () => showLessonContent("notification"));

    const formData = new FormData
    formData.append('lesson_id', window.lesson_id)
    formData.append('section_id', 1)
    formData.append('total_value', 100)
    formData.append('content_object', JSON.stringify(window.identificationWordsData))
    formData.append('status', 'completed')

    // send data to ajax
    fetch('/save-result', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
    })
  });

  // --- STAGE 2: NOTIFICATION (Pronunciation) ---
  const notificationWordsData = ["Type", "Want", "Made", "Key", "Use", "Choose", "Move", "Care", "Answer ", "Tell ", "Study ", "Die", "Call", "Success", "Serve", "Require", "Provide", 
  "Reduce", "Burn", "Receive", "Run", "Listen", "Written", "Speak", "Read", "Produce", "Make", "Become", "Jump ", "Eat", "Drink", "Sleep", "Watch", "Learn", "Teach", "Work"
  ,"Play ", "Think ", "Sing", "Dance", "Swim", "Drive", "Ride ", "Fly", "Walk", "Buy", "Sell", "Create ", "Visit ", "Send"];
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
    const word = window.notificationWordsData[currentNotificationWordIndex];
    notificationTotalWordsEl.textContent = window.notificationWordsData.length;
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
    if (currentNotificationWordIndex === window.notificationWordsData.length - 1) {
      notificationNextBtn.style.display = "none";
      completeNotificationBtn.style.display = "inline-block";
    }
  }
  startNotificationRecognitionBtn.addEventListener("click", () => {
    setupPronunciationRecognition(window.notificationWordsData[currentNotificationWordIndex]);
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
    if (window.completedLessonSteps < 2) window.completedLessonSteps = 2;
    lessonContent.notification.innerHTML = `
      <div class="notification-completion">
        <h3>Stage 2 Complete! ✅</h3>
        <p>Great job on the pronunciation practice!</p>
        <button class="btn btn-primary" id="finish-notification-lesson-btn">Continue to Description</button>
      </div>`;
    document.getElementById("finish-notification-lesson-btn").addEventListener("click", () => showLessonContent("description"));
    const formData = new FormData
    formData.append('lesson_id', window.lesson_id)
    formData.append('section_id', 2)
    formData.append('total_value', 100)
    formData.append('content_object', JSON.stringify(window.notificationWordsData))
    formData.append('status', 'completed')

    // send data to ajax
    fetch('/save-result', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
    })
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
//   const descriptionSpellingEl = document.getElementById("description-spelling");
//   const descriptionPronunciationEl = document.getElementById("description-pronunciation");
//   const descriptionMeaningIntroEl = document.getElementById("description-meaning-intro");
//   const descriptionMeaningsList = document.getElementById("description-meanings-list");
//   const descriptionExamplesList = document.getElementById("description-examples-list");
  const descriptionCurrentIndexEl = document.getElementById("description-current-index");

  const wordDetails = document.getElementById("word-details");
  const descriptionTotalWordsEl = document.getElementById("description-total-words");
  const descriptionPrevBtn = document.getElementById("description-prev-btn");
  const descriptionNextBtn = document.getElementById("description-next-btn");
  const playDescriptionFullBtn = document.getElementById("play-description-full-btn");
  const completeDescriptionBtn = document.getElementById("complete-description-btn");

  function loadDescriptionWord() {
    const wordData = window.descriptionWordsData[currentDescriptionWordIndex];
    descriptionTotalWordsEl.textContent = window.descriptionWordsData.length;
    wordDetails.innerHTML = wordData.description;
    descriptionWordToDisplayEl.textContent = wordData.question;
    // descriptionSpellingEl.textContent = `Spelled: ${wordData.spelling}`;
    // descriptionPronunciationEl.textContent = `Pronunciation: ${wordData.pronunciation_ipa} ${wordData.pronunciation_approx}`;
    // descriptionMeaningIntroEl.textContent = wordData.meaning_intro;
    // descriptionMeaningsList.innerHTML = wordData.meanings.map((m) => `<li>${m}</li>`).join("");
    // descriptionExamplesList.innerHTML = wordData.examples.map((ex) => `<li>${ex}</li>`).join("");
    descriptionCurrentIndexEl.textContent = currentDescriptionWordIndex + 1;
    descriptionPrevBtn.style.display = currentDescriptionWordIndex > 0 ? "inline-block" : "none";
    descriptionNextBtn.style.display = currentDescriptionWordIndex < window.descriptionWordsData.length - 1 ? "inline-block" : "none";
    completeDescriptionBtn.style.display = currentDescriptionWordIndex === window.descriptionWordsData.length - 1 ? "inline-block" : "none";
  }
  playDescriptionFullBtn.addEventListener("click", () => {
    const wordData = window.descriptionWordsData[currentDescriptionWordIndex];
    // let textToSpeak = `The word is ${wordData.word}. ${wordData.meaning_intro}. Example: ${wordData.examples[0]}`;
    let textToSpeak = wordData.speakText;
    responsiveVoice.speak(textToSpeak);
    // speechUtterance.text = textToSpeak;
    // synth.speak(speechUtterance);
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
    if (window.completedLessonSteps < 3) window.completedLessonSteps = 3;
    lessonContent.description.innerHTML = `
      <div class="description-completion">
        <h3>Stage 3 Complete! ✅</h3>
        <p>You have reviewed all the word descriptions.</p>
        <button class="btn btn-primary" id="finish-description-lesson-btn">Continue to Application</button>
      </div>`;
    document.getElementById("finish-description-lesson-btn").addEventListener("click", () => showLessonContent("application"));
    const formData = new FormData
    formData.append('lesson_id', window.lesson_id)
    formData.append('section_id', 3)
    formData.append('total_value', 100)
    formData.append('content_object', JSON.stringify(window.descriptionWordsData))
    formData.append('status', 'completed')

    // send data to ajax
    fetch('/save-result', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
    })
  });

  // --- STAGE 4: APPLICATION (Pronunciation) ---
  const applicationWordsData = ["Talk", "Dress up", "Wear", "Own", "Risk", "Loss ", "Know ", "Hired", "Fired", "Promote", "Work"
  , "Mean", "Get", "Pack", "Believe", "Laugh", "Cry", "Search", "Live", "Die", "See", "Run", "Caught"
  , "Flow", "Begin", "Do", "Say ", "Look", "Take ", "Seat ", "Give ", "Change ", "Think ", "Hire", "Design"
  , "Waste", "Put", "Impress", "Stand", "Save", "Drive", "Pick up", "Hope", "Find", "Sound", "Read", "Produce"
  , "Make ", "Become", "Fix"];
  const applicationFormData = []
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
    const word = window.applicationWordsData[currentApplicationTaskIndex];
    applicationTotalWordsEl.textContent = window.applicationWordsData.length;
    applicationWordToDisplayEl.textContent = word;
    applicationCurrentWordEl.textContent = currentApplicationTaskIndex + 1;
    document.getElementById("application-recognition-result").textContent = "";
    document.getElementById("application-user-spoken-word").textContent = "";
    startApplicationRecognitionBtn.disabled = false;
    applicationTryAgainBtn.style.display = "none";
    applicationPrevBtn.style.display = currentApplicationTaskIndex > 0 ? "inline-block" : "none";
    // applicationNextBtn.style.display = "none";
    completeApplicationBtn.style.display = "none";
    
  }
  startApplicationRecognitionBtn.addEventListener("click", () => {
    if(applicationFormData[currentApplicationTaskIndex] && applicationFormData[currentApplicationTaskIndex].status == 1) return
    setupPronunciationRecognition(window.applicationWordsData[currentApplicationTaskIndex]);
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
    if (window.completedLessonSteps < 4) window.completedLessonSteps = 4;
    lessonContent.application.innerHTML = `
      <div class="application-completion">
        <h3>Stage 4 Complete! ✅</h3>
        <p>You're doing great! One more stage to go.</p>
        <button class="btn btn-primary" id="finish-application-lesson-btn">Continue to Final Practice</button>
      </div>`;
    document.getElementById("finish-application-lesson-btn").addEventListener("click", () => showLessonContent("harmonization"));

    const totalStatus = applicationFormData.reduce((sum, item) => sum + item.status, 0);

    const formData = new FormData
    formData.append('lesson_id', window.lesson_id)
    formData.append('section_id', 4)
    formData.append('total_value', totalStatus*2)
    formData.append('content_object', JSON.stringify(applicationFormData))
    formData.append('status', 'completed')

    // send data to ajax
    fetch('/save-result', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
    })
  });

  // --- STAGE 5: HARMONIZATION (Pronunciation) ---
  const harmonizationWordsData = ["Guess", "Ask", "Come", "Offer", "Understand", "Pass ", "Value ", "Open ", "Fly ", "Consider ", "Apply"
  , "Pay", "Hear", "Ring", "Interrupt", "Shake", "Touch", "Help", "Appreciate", "Need", "Lift", "Help", "Mention"
  , "Happen", "Impress", "Choose", "Feel ", "Realize", "Take", "Throw", "Pretend ", "Waste ", "Try ", "Arrive", "Worry"
  , "Forget", "Thought", "Close", "Treat", "Tend", "Return", "Guide", "Break", "Start", "Finish", "Enjoy", "Practice"
  , "Build ", "Walk ", "Share"];
  let currentHarmonizationWordIndex = 0;
  const harmonizationFormData = []
  const harmonizationWordToDisplayEl = document.getElementById("harmonization-word-to-display");
  const startHarmonizationRecognitionBtn = document.getElementById("start-harmonization-recognition-btn");
  const harmonizationTryAgainBtn = document.getElementById("harmonization-try-again-btn");
  const harmonizationCurrentWordEl = document.getElementById("harmonization-current-word");
  const harmonizationTotalWordsEl = document.getElementById("harmonization-total-words");
  const harmonizationPrevBtn = document.getElementById("harmonization-prev-btn");
  const harmonizationNextBtn = document.getElementById("harmonization-next-btn");
  const completeHarmonizationBtn = document.getElementById("complete-harmonization-btn");

  function loadHarmonizationWord() {
    const word = window.harmonizationWordsData[currentHarmonizationWordIndex];
    harmonizationTotalWordsEl.textContent = window.harmonizationWordsData.length;
    harmonizationWordToDisplayEl.textContent = word;
    harmonizationCurrentWordEl.textContent = currentHarmonizationWordIndex + 1;
    document.getElementById("harmonization-recognition-result").textContent = "";
    document.getElementById("harmonization-user-spoken-word").textContent = "";
    startHarmonizationRecognitionBtn.disabled = false;
    // harmonizationTryAgainBtn.style.display = "none";
    // harmonizationPrevBtn.style.display = currentHarmonizationWordIndex > 0 ? "inline-block" : "none";
    // harmonizationNextBtn.style.display = "inline-block";
    // completeHarmonizationBtn.style.display = "none";
    // if (currentHarmonizationWordIndex === window.harmonizationWordsData.length - 1) {
    //   harmonizationNextBtn.style.display = "none";
    //   completeHarmonizationBtn.style.display = "inline-block";
    // }
  }
  startHarmonizationRecognitionBtn.addEventListener("click", () => {
    setupPronunciationRecognition(window.harmonizationWordsData[currentHarmonizationWordIndex]);
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
    if (window.completedLessonSteps < 5) window.completedLessonSteps = 5;
    updateLessonProgress(); // Final update to show 5/5
    lessonContent.harmonization.innerHTML = `
      <div class="harmonization-completion">
        <h3>Congratulations! Lesson Complete! 🎉</h3>
        <p>You have successfully finished all stages of Lesson 1. Excellent work!</p>
        <button class="btn btn-primary" id="finish-harmonization-lesson-btn">Start Lesson Over</button>
      </div>`;
    const totalStatus = harmonizationFormData.reduce((sum, item) => sum + item.status, 0);

    const formData = new FormData
    formData.append('lesson_id', window.lesson_id)
    formData.append('section_id', 5)
    formData.append('total_value', totalStatus*2)
    formData.append('content_object', JSON.stringify(harmonizationFormData))
    formData.append('status', 'completed')

    // send data to ajax
    fetch('/save-result', {
    method: 'POST',
    body: formData
    })
    .then(res => res.json())
    .then(res => {
    console.log(res)
    })
    document.getElementById("finish-harmonization-lesson-btn").addEventListener("click", () => {
      // Reset everything to start the lesson again
      window.location.reload()
    });
  });

  // --- Initial Page Load ---
  updateLessonProgress();
  showLessonContent(window.activeLessonType);
});
