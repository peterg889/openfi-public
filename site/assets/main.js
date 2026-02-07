document.querySelectorAll('form[action*="formspree"]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const note = form.closest('.hero-copy')?.querySelector('.form-note');
      if (note) {
        note.textContent = 'Enter a valid email to join the launch list.';
        note.classList.add('error');
        note.classList.remove('success');
      }
      return;
    }

    // Submit to Formspree
    fetch(form.action, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form),
    })
      .then((response) => {
        if (response.ok) {
          const note = form.closest('.hero-copy')?.querySelector('.form-note');
          if (note) {
            note.textContent = `Thanks! We'll notify ${email} when OpenFi launches.`;
            note.classList.remove('error');
            note.classList.add('success');
          }
          form.reset();
          // Show success on non-hero forms too
          const guarantee = form.nextElementSibling;
          if (guarantee && !note) {
            guarantee.textContent = `Thanks! We'll notify ${email} when OpenFi launches.`;
            guarantee.style.color = '#176050';
          }
        } else {
          throw new Error('Form submission failed');
        }
      })
      .catch(() => {
        const note = form.closest('.hero-copy')?.querySelector('.form-note');
        if (note) {
          note.textContent = 'Something went wrong. Try again or email hello@tryopenfi.com.';
          note.classList.add('error');
          note.classList.remove('success');
        }
      });
  });
});
