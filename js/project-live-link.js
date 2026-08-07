(() => {
  'use strict';

  const projects = Array.isArray(window.SOST_PROJECTS) ? window.SOST_PROJECTS : [];
  const projectId = new URLSearchParams(window.location.search).get('id');
  const project = projects.find((item) => item.id === projectId);

  if (!project?.url) return;

  const titleBlock = document.querySelector('.project-detail-title');
  if (!titleBlock || titleBlock.querySelector('.project-live-link')) return;

  const link = document.createElement('a');
  link.className = 'project-live-link';
  link.href = project.url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('aria-label', `${project.title} 제작 사이트 새창으로 확인하기`);
  link.innerHTML = '<span>제작 사이트 확인하기</span><strong aria-hidden="true">↗</strong>';
  titleBlock.appendChild(link);
})();
