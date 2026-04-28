document.addEventListener('DOMContentLoaded', () => {

  // ==============================
  // STATE
  // ==============================
	let caseStudies = [];
	let isLoaded = false;

	// ==============================
	// LOAD DATA (cached)
	// ==============================
	const caseStudiesPromise = fetch('./js/case-study.json')
		.then(res => {
		if (!res.ok) throw new Error('Failed to load case-study.json');
		return res.json();
		})
		.then(data => {
		caseStudies = data.projects || [];
		isLoaded = true;
		return caseStudies;
		})
		.catch(err => {
		console.error('Error loading case studies:', err);
		return [];
		});

	// ==============================
	// OPEN CASE MODAL
	// ==============================
	document.addEventListener('click', async (e) => {

		const btn = e.target.closest('.view-case');
		if (!btn) return;

		e.preventDefault();

		// SUPPORT BOTH data-id AND data-case (backward compatible)
		const id = btn.dataset.id || btn.dataset.case;

		if (!id) {
		console.error('Missing data-id or data-case attribute');
		return;
		}

		// WAIT FOR DATA (fixes race condition)
		const data = isLoaded ? caseStudies : await caseStudiesPromise;

		const project = data.find(p => p.id === id);

		if (!project) {
		console.error('Project not found:', id, data);
		return;
		}

		populateCaseModal(project);

		const modal = document.getElementById('caseModal');
		modal.classList.add('open');
		document.body.classList.add('no-scroll');

	});

	// ==============================
	// POPULATE MODAL CONTENT
	// ==============================
	function populateCaseModal(p) {

		setText('#case-title', p.title);
		setText('#case-tagline', p.tagline);
		setText('#case-overview', p.overview);
		setText('#case-problem', p.problem);
		setText('#case-solution', p.solution);
		setText('#case-role', p.role);
		setText('#case-tools', (p.tools || []).join(', '));

		// RESULTS
		const resultsHTML = (p.results || [])
		.map(r => `<li>${escapeHTML(r)}</li>`)
		.join('');
		setHTML('#case-results', resultsHTML);

		// IMAGES (optimized)
		const imagesHTML = (p.images || [])
		.map(media => {
			if (typeof media === 'string') {
			// backward compatibility
			return `
				<img 
				src="${media}" 
				loading="lazy" 
				decoding="async"
				alt="${escapeHTML(p.title)} case study image"
				>
			`;
			}

			if (media.type === 'image') {
			return `
				<img 
				src="${media.src}" 
				loading="lazy" 
				decoding="async"
				alt="${escapeHTML(p.title)} case study image"
				>
			`;
			}

			if (media.type === 'iframe') {
			return `
				<div class="case-frame">
				<iframe 
					src="${media.src}" 
					loading="lazy"
					frameborder="0"
					allowfullscreen
				></iframe>
				</div>
			`;
			}

			return '';
		})
		.join('');
		setHTML('#case-images', imagesHTML);

		// LINK
		const linkEl = document.getElementById('case-link');
		if (linkEl && p.link) {
		linkEl.href = p.link;
		linkEl.setAttribute('target', '_blank');
		linkEl.setAttribute('rel', 'noopener noreferrer');
		}
	}

	// ==============================
	// CLOSE MODAL
	// ==============================
	function closeCaseModal() {
		const modal = document.getElementById('caseModal');
		modal.classList.remove('open');
		document.body.classList.remove('no-scroll');
	}

	document.addEventListener('click', (e) => {
		if (e.target.matches('.case-close, .case-backdrop')) {
		closeCaseModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') {
		closeCaseModal();
		}
	});

	document.getElementById('caseModal')?.addEventListener('click', (e) => {
		if (e.target.id === 'caseModal') {
		closeCaseModal();
		}
	});

	// ==============================
	// HELPERS (safe DOM updates)
	// ==============================
	function setText(selector, value) {
		const el = document.querySelector(selector);
		if (el) el.textContent = value || '';
	}

	function setHTML(selector, value) {
		const el = document.querySelector(selector);
		if (el) el.innerHTML = value || '';
	}

	function escapeHTML(str) {
		return String(str || '')
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
	}

});