// Handle contact form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    const submitButton = form.querySelector('.form-submit-button');
    const originalButtonText = submitButton.innerHTML;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value || 'Not provided',
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };

        // Update button state
        submitButton.disabled = true;
        submitButton.innerHTML = '<span>⏳</span> Sending...';

        try {
            const scriptURL = 'https://script.google.com/macros/s/AKfycbww56li_VF1g1_OrVQYzMR-LZqKrXrpVm98dpmbBWMXnSCtTzQSoeFGexqJDdimIYpu/exec';
            
            // Use FormData for better compatibility with Google Apps Script
            const formDataToSend = new URLSearchParams();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('phone', formData.phone);
            formDataToSend.append('message', formData.message);
            formDataToSend.append('timestamp', formData.timestamp);
            
            const response = await fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors',
                body: formDataToSend
            });

            // With no-cors, we can't read the response, so assume success
            submitButton.innerHTML = '<span>✅</span> Message Sent!';
            submitButton.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            form.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
                submitButton.style.background = '';
            }, 3000);
            
        } catch (error) {
            console.error('Error:', error);
            submitButton.innerHTML = '<span>❌</span> Error - Try Again';
            submitButton.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
                submitButton.style.background = '';
            }, 3000);
        }
    });
});
