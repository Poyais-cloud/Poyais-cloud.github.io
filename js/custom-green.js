(function() {
  var defaultAnnouncement = '<div class="announcement_content">Hi There! 我是 Poyais，SCNU 2024 级 CS 在读。<br>这里记录课程复习、编程学习和一些长期折腾。<br><a href="https://github.com/Poyais-cloud" target="_blank" rel="noopener">GitHub: Poyais-cloud</a><br><small>点击右下角阅读模式按钮可关闭雨滴效果</small></div>';
  var focusAnnouncement = '<div class="announcement_content">雨已停，专注阅读中...<br><small>退出阅读模式可恢复雨滴</small></div>';

  var rainContainer = document.createElement('div');
  rainContainer.className = 'rain-container';

  for (var i = 0; i < 25; i++) {
    var drop = document.createElement('div');
    drop.className = 'rain-drop';
    rainContainer.appendChild(drop);
  }

  document.body.appendChild(rainContainer);

  function getAnnouncementWidget() {
    return document.querySelector('.card-announcement');
  }

  function setAnnouncementContent(html) {
    var announcementWidget = getAnnouncementWidget();
    if (announcementWidget && announcementWidget.innerHTML !== html) {
      announcementWidget.innerHTML = html;
    }
  }

  function updateProfileLink() {
    var profileLink = document.querySelector('#card-info-btn');
    if (profileLink) {
      profileLink.href = 'https://github.com/Poyais-cloud';
    }
  }

  function updateSubtitle() {
    var subtitle = document.querySelector('#subtitle');
    if (subtitle && subtitle.textContent !== 'Curiosity is all you need.') {
      if (window.typed && typeof window.typed.destroy === 'function') {
        window.typed.destroy();
      }
      subtitle.textContent = 'Curiosity is all you need.';
    }
  }

  function updateRainState() {
    var isFocusMode = document.body.classList.contains('read-mode');

    if (isFocusMode) {
      rainContainer.classList.add('hidden');
      setAnnouncementContent(focusAnnouncement);
    } else {
      rainContainer.classList.remove('hidden');
      setAnnouncementContent(defaultAnnouncement);
    }

    updateProfileLink();
    updateSubtitle();
  }

  document.addEventListener('click', function(e) {
    var target = e.target;

    if (target.closest('.console-btn-item') ||
        target.closest('.aside-toggle') ||
        target.closest('[data-type="read"]') ||
        target.closest('.fa-book-open') ||
        target.closest('.read-mode-btn')) {
      setTimeout(updateRainState, 150);
    }
  });

  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.attributeName === 'class') updateRainState();
    });
  });

  observer.observe(document.body, { attributes: true });
  setTimeout(updateRainState, 500);
  setTimeout(updateRainState, 1500);
  setTimeout(updateRainState, 3000);

  var announcementObserver = new MutationObserver(updateRainState);
  var asideContent = document.querySelector('#aside-content') || document.body;
  announcementObserver.observe(asideContent, { childList: true, subtree: true });

  document.addEventListener('click', function(e) {
    var ripple = document.createElement('div');
    ripple.style.cssText = 'position:fixed;left:' + e.clientX + 'px;top:' + e.clientY + 'px;width:0;height:0;border-radius:50%;background:rgba(90,143,106,0.3);pointer-events:none;transform:translate(-50%,-50%);animation:ripple 0.6s ease-out forwards;z-index:9998;';
    document.body.appendChild(ripple);
    setTimeout(function() { ripple.remove(); }, 600);
  });

  var style = document.createElement('style');
  style.textContent = '@keyframes ripple{to{width:150px;height:150px;opacity:0;}}';
  document.head.appendChild(style);
})();
