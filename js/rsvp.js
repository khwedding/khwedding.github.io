// Modal functions
function openRsvpModal() {
    const modal = document.getElementById('rsvp-modal');
    modal.classList.add('is-active');

    // Add event listener for escape key
    document.addEventListener('keydown', handleEscapeKey);
}

function closeRsvpModal() {
    const modal = document.getElementById('rsvp-modal');
    modal.classList.add('is-closing');

    setTimeout(() => {
        modal.classList.remove('is-active', 'is-closing');
    }, 200);

    // Remove escape key listener
    document.removeEventListener('keydown', handleEscapeKey);
}

// Handle escape key press
function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        closeRsvpModal();
    }
}

// Add click handler for modal background
document.addEventListener('DOMContentLoaded', () => {
    const modalBackground = document.querySelector('.modal-background');
    if (modalBackground) {
        modalBackground.addEventListener('click', closeRsvpModal);
    }
});

// Form submission
async function submitRsvp(event) {
    event.preventDefault();

    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');

    // Disable submit button to prevent double submission
    submitButton.classList.add('is-loading');

    try {
        const formData = {
            name: form.name.value,
            guests: parseInt(form.guests.value),
            contact: form.contact.value,
            relation: form.relation.value,
            timestamp: window.serverTimestamp()
        };

        await window.addDoc(window.collection(window.db, 'rsvps'), formData);

        // Show success message
        alert('참석 여부가 성공적으로 전달되었습니다.');

        // Reset form and close modal
        form.reset();
        closeRsvpModal();
    } catch (error) {
        console.error('Error submitting RSVP:', error);
        alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
        submitButton.classList.remove('is-loading');
    }
}