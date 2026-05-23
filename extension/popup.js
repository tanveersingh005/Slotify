document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("event-search");
  const copyButtons = document.querySelectorAll(".btn-copy-link");
  const toast = document.getElementById("toast");
  const eventCards = document.querySelectorAll(".event-card");

  // 1. Copy Link Logic with Toast Confirmation
  copyButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      e.stopPropagation();
      const url = button.getAttribute("data-url");

      try {
        // Write to clipboard
        await navigator.clipboard.writeText(url);
        
        // Show visual copy confirmation toast
        showToast("Link copied to clipboard! 📋");
        
        // Temporary micro-animation on clicked button
        const originalText = button.innerHTML;
        button.innerHTML = "<span>Copied!</span>";
        button.style.backgroundColor = "#22c55e";
        button.style.color = "white";
        button.style.borderColor = "#22c55e";

        setTimeout(() => {
          button.innerHTML = originalText;
          button.style.backgroundColor = "";
          button.style.color = "";
          button.style.borderColor = "";
        }, 1200);

      } catch (err) {
        console.error("Failed to copy text: ", err);
        showToast("Failed to copy link.");
      }
    });
  });

  // 2. Realtime Event Search Filtering
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();

    eventCards.forEach((card) => {
      const title = card.getAttribute("data-title").toLowerCase();
      if (title.includes(query)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });

  // Helper: Display Toast Alert
  let toastTimer;
  function showToast(message) {
    toast.querySelector(".toast-text").textContent = message;
    toast.classList.remove("hide");
    toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
      toast.classList.add("hide");
    }, 2200);
  }
});
