// Add this script to any page where you want the wellness tracking reminder
// Add it before the closing </body> tag

// Check if user has taken wellness assessment recently
function checkWellnessAssessment() {
  const lastAssessment = localStorage.getItem('lastWellnessAssessment');
  const now = new Date().getTime();
  const oneWeek = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds
  
  if (!lastAssessment || (now - parseInt(lastAssessment)) > oneWeek) {
    showWellnessBanner();
  }
}

// Show wellness tracking banner
function showWellnessBanner() {
  const banner = document.createElement('div');
  banner.className = 'alert alert-info alert-dismissible fade show position-fixed';
  banner.style.cssText = 'top: 70px; right: 20px; z-index: 1050; max-width: 350px;';
  banner.innerHTML = `
    <div class="d-flex align-items-center">
      <div class="me-3">
        <span style="font-size: 2rem;">📊</span>
      </div>
      <div class="flex-grow-1">
        <h6 class="alert-heading mb-1">Track Your Wellness</h6>
        <p class="mb-2 small">Haven't checked your mental wellness lately?</p>
        <a href="wellness-tracker.html" class="btn btn-sm btn-primary">Take Assessment</a>
      </div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" onclick="dismissWellnessBanner()"></button>
    </div>
  `;
  
  document.body.appendChild(banner);
  
  // Auto-hide after 10 seconds
  setTimeout(() => {
    if (banner.parentNode) {
      banner.classList.remove('show');
      setTimeout(() => banner.remove(), 150);
    }
  }, 10000);
}

// Dismiss wellness banner
function dismissWellnessBanner() {
  // Remember that user dismissed the banner (don't show again for 3 days)
  const threeDays = 3 * 24 * 60 * 60 * 1000;
  localStorage.setItem('wellnessBannerDismissed', new Date().getTime() + threeDays);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  const dismissed = localStorage.getItem('wellnessBannerDismissed');
  const now = new Date().getTime();
  
  // Only show banner if not dismissed recently and not on wellness tracker page
  if ((!dismissed || now > parseInt(dismissed)) && !window.location.href.includes('wellness-tracker.html')) {
    setTimeout(checkWellnessAssessment, 3000); // Show after 3 seconds
  }
});