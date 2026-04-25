/* ============================================
   AYEYI OYE — Contact Page JavaScript
   ============================================ */

function submitOrder(e) {
  e.preventDefault();
  showToast("Enquiry sent! We'll be in touch soon ✨");
  e.target.reset();
}
