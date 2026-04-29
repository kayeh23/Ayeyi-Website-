/* ============================================
   AYEYI OYE — Contact Page JavaScript
   ============================================ */

const SERVICE_ID = "service_xxnpmyo";
const ORDER_TEMPLATE_ID = "template_dwfzxpi";
const CONFIRMATION_TEMPLATE_ID = "";
const PUBLIC_KEY = "9ymWSnPsBQhogSibC";

if (window.emailjs) {
  emailjs.init(PUBLIC_KEY);
}

async function submitOrder(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector(".submit-btn");

  if (!window.emailjs) {
    showToast('Email service is not available right now.');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  const fullName = `${form.firstName.value} ${form.lastName.value}`.trim();

  const templateParams = {
    from_name: fullName,
    first_name: form.firstName.value,
    last_name: form.lastName.value,
    email: form.email.value,
    phone: form.phone.value || 'Not provided',
    item_of_interest: form.itemOfInterest.value,
    measurements: form.measurements.value || 'Not provided',
    details: form.details.value || 'No additional details provided.',
    order_subject: `New Ayeyi Oye order enquiry from ${fullName}`,
  };

  const confirmationParams = {
    customer_name: fullName,
    customer_email: form.email.value,
    item_of_interest: form.itemOfInterest.value,
    details: form.details.value || 'No additional details provided.',
  };

  try {
    await emailjs.send(SERVICE_ID, ORDER_TEMPLATE_ID, templateParams);
    if (CONFIRMATION_TEMPLATE_ID) {
      try {
        await emailjs.send(SERVICE_ID, CONFIRMATION_TEMPLATE_ID, confirmationParams);
      } catch (confirmationError) {
        console.warn('Customer confirmation email failed.', confirmationError);
      }
    }
    showToast("Enquiry sent! We'll be in touch soon ✨");
    form.reset();
  } catch (error) {
    showToast("Something went wrong. Please try again.");
    console.error(error);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Enquiry";
  }
}