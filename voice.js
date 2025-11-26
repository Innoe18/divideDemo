// ========== Voice Narration System ==========

// Reusable speech function
function speak(text) {
  if (!text || text.trim() === "") return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;       // speaking speed
  utterance.pitch = 1;      // tone
  utterance.volume = 1;     // loudness
  utterance.lang = "en-US"; // language/accent
  window.speechSynthesis.cancel(); // stop any ongoing speech
  window.speechSynthesis.speak(utterance);
}

// Stop function (optional)
function stopSpeech() {
  window.speechSynthesis.cancel();
}

// ========== Floating Button ==========

// Create floating button dynamically
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.createElement("button");
  btn.innerHTML = "🔊 Read This Section";
  btn.id = "readButton";
  document.body.appendChild(btn);

  // Style it (dark, modern, matches your theme)
  Object.assign(btn.style, {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    background: "#00C4CC",
    color: "#0f0f10",
    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontFamily: "'Poppins', sans-serif",
    boxShadow: "0 0 15px rgba(0,255,255,0.3)",
    transition: "all 0.3s ease",
    zIndex: "1000"
  });

  btn.addEventListener("mouseenter", () => {
    btn.style.background = "#00f0ff";
    btn.style.boxShadow = "0 0 25px rgba(0,255,255,0.5)";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.background = "#00C4CC";
    btn.style.boxShadow = "0 0 15px rgba(0,255,255,0.3)";
  });

  // On click — read visible section
  btn.addEventListener("click", () => {
    stopSpeech(); // cancel any ongoing speech first

    // Find the section currently visible in the viewport
    const sections = document.querySelectorAll("section");
    let current = null;
    for (let s of sections) {
      const rect = s.getBoundingClientRect();
      if (rect.top < window.innerHeight / 2 && rect.bottom > 0) {
        current = s;
        break;
      }
    }

    if (current) {
      const text = current.innerText.replace(/\s+/g, " ").trim();
      speak(text);
    } else {
      speak("No readable section detected on screen.");
    }
  });
});
