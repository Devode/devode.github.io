// 简单的表单提交处理
/* document.querySelector('.contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('感谢您的留言！我会尽快回复您。');
    this.reset();
});
 */
let data = {};

async function loadJSON() {
  try {
    const response = await fetch('./json/releases.json');
    if (!response.ok) {
      throw new Error('网络响应不正常');
    }
    data = await response.json();
    console.log(data); // 处理获取到的数据
  } catch (error) {
    console.error('获取数据失败:', error);
  }
}

// 平滑滚动到锚点
function initSmoothScrolling() {
    console.log("初始化平滑滚动...");

    // 获取所有锚点链接
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    console.log(`找到 ${anchorLinks.length} 个锚点链接`);

    // 为每个链接添加点击事件
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            console.log(`点击了链接: ${targetId}`);

            // 处理空链接
            if (targetId === '#') return;

            // 查找目标元素
            const targetElement = document.querySelector(targetId);
            if (!targetElement) {
                console.error(`未找到目标元素: ${targetId}`);
                return;
            }

            // 计算滚动位置（考虑固定导航栏的高度）
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;

            console.log(`滚动到位置: ${targetPosition}px (已考虑导航栏高度: ${headerHeight}px)`);

            // 使用平滑滚动
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // 更新URL哈希（可选）
            history.pushState(null, null, targetId);
        });
    });
}

function setCard(releases) {
    // const newCard = document.createElement('div');
    // const gameImageDiv = document.createElement('div');
    // const gameImage = document.createElement('img');
    // const gameInfoDiv = document.createElement('div');
    // const gameTitle = document.createElement('h3');
    // const gameLink = document.createElement('a');

    // newCard.className = "game-card";
    // gameImageDiv.className = "game-image";
    // gameImage.className = "game-image";
    // gameImage.src = releases["background_image"];
    // gameInfoDiv.className = "game-info";
    // gameTitle.textContent = releases["name"];
    // gameLink.href = `downloads#${releases["hashkey"]}`;
    // gameLink.className = "game-link";
    // gameLink.textContent = "立即下载";

    // gameImageDiv.appendChild(gameImage);
    // gameInfoDiv.appendChild(gameTitle);
    // gameInfoDiv.appendChild(gameLink);
    // newCard.appendChild(gameImageDiv);
    // newCard.appendChild(gameInfoDiv);

    const newCard = document.createElement('div'); // 游戏卡片 Div
    const gameImageDiv = document.createElement('div'); // 游戏图片
    const gameImage = document.createElement('img');
    const gameTitle = document.createElement('h3'); // 游戏标题
    const gameIntro = document.createElement('p'); // 游戏简介
    const gameLink = document.createElement('a');

    newCard.className = "project-card glass-card";
    newCard.dataset.type = releases["type"];
    gameImageDiv.className = "card-image-placeholder";
    gameImage.src = releases["icon"];
    gameImage.sizes = "100vw";
    gameTitle.textContent = releases["name"];
    gameIntro.textContent = releases["intro"];
    gameLink.className = "btn-primary";
    gameLink.href = `downloads#${releases["hashkey"]}`;

    if (releases["version_type"] == "inside") {
      gameLink.style = "pointer-events: none; color: gray; background: rgba(69, 69, 69, 0.1);";
      gameLink.textContent = "敬请期待";
    }
    else
    {
      gameLink.textContent = "立即下载";
    }

    gameImageDiv.appendChild(gameImage);
    newCard.appendChild(gameImageDiv);
    newCard.appendChild(gameTitle);
    newCard.appendChild(gameIntro);
    newCard.appendChild(gameLink);

    return newCard;
}

function updatePage() {
    const cardGrid = document.getElementById("projects");
    let Cards = [];
    for (const release in data) {
        const card = setCard(data[release]);
        if (data[release]["version_type"] == "inside")
        {
          Cards.push(card);
        }
        else
        {
          Cards.unshift(card);
        }
        // cardGrid.appendChild(setCard(data[release]));
        //console.log(`处理版本: ${data[release]}`);
    }

    console.log(Cards);

    Cards.forEach(card => {
        cardGrid.appendChild(card);
    });
}

(async function initializeApp(){
    await loadJSON();

    updatePage();
})();

// 在DOM完全加载后初始化
document.addEventListener('DOMContentLoaded', initSmoothScrolling);

// 添加错误处理
window.addEventListener('error', function (e) {
    console.error('JavaScript错误:', e.error);
});

// 主题切换逻辑
// const themeToggle = document.getElementById('theme-toggle');
// const body = document.body;

// // 检测系统偏好
// const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// // 初始化主题
// function initTheme() {
//   const saved = localStorage.getItem('devode-theme');
//   if (saved) {
//     body.className = `theme-${saved}`;
//     updateToggleLabel(saved);
//   } else {
//     body.className = 'theme-auto';
//     updateToggleLabel(prefersDark ? '深色' : '浅色');
//   }
// }

// function toggleTheme() {
//   const current = body.className;
//   let newTheme;
//   if (current === 'theme-light') {
//     newTheme = 'dark';
//   } else if (current === 'theme-dark') {
//     newTheme = 'auto';
//   } else {
//     newTheme = 'light';
//   }
//   body.className = `theme-${newTheme}`;
//   localStorage.setItem('devode-theme', newTheme);
//   updateToggleLabel(newTheme === 'auto' ? (prefersDark ? '深色' : '浅色') : newTheme);
// }

// function updateToggleLabel(label) {
//   themeToggle.setAttribute('aria-label', label === '深色' ? '浅色' : label === '浅色' ? '自动' : '深色');
//   themeToggle.textContent = label === '深色' ? '🌙' : label === '浅色' ? '☀️' : '🌓';
// }

// 作品筛选
document.querySelectorAll('.filter-tabs button').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.type;
    document.querySelectorAll('.filter-tabs button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.project-card').forEach(card => {
      if (type === 'all' || card.dataset.type === type) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// // 初始化
// initTheme();
// themeToggle.addEventListener('click', toggleTheme);