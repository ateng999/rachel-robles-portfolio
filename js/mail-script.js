emailjs.init("-f8jm2PtPzhOZ2_BO");

const form = document.getElementById('contactForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('.btn_submit');
    btn.innerHTML = "Sending...";
    btn.disabled = true;

    try {
        await emailjs.sendForm(
        "service_okoya8e",
        "template_k5tqszq",
        form
        );

        btn.innerHTML = "✔ Sent";
        form.reset();

    } catch (error) {
        console.error("EmailJS Error:", error);
        btn.innerHTML = "❌ Failed";
    }

    setTimeout(() => {
        btn.innerHTML = "<span>Send Message</span>";
        btn.disabled = false;
    }, 2000);
});