/* const data = {
  "BlockyParkour": {
    "name": "方块跑酷",
    "platforms": {
      "Android": {
        "bits": "arm64",
        "url": "https://gitee.com/devode/blocky-parkour-release/releases/download/v2.0.0-dev/%E6%96%B9%E5%9D%97%E8%B7%91%E9%85%B72D_v2.0.0-dev_android_arm64.apk"
      },

      "Windows": {
        "bits": "x64",
        "url": "https://gitee.com/devode/blocky-parkour-release/releases/download/v2.0.0-dev/%E6%96%B9%E5%9D%97%E8%B7%91%E9%85%B72D_v2.0.0-dev_win_x64.exe"
      }
    }
  }
}; */
let data = {};

const hashkey = window.location.hash.substring(1);

async function loadJSON() {
  try {
    const response = await fetch('../json/downloads.json');
    if (!response.ok) {
      throw new Error('网络响应不正常');
    }
    data = await response.json();
    console.log(data); // 处理获取到的数据
  } catch (error) {
    console.error('获取数据失败:', error);
  }
}


function setCard(platform) {
  const newCard = document.createElement('div');
  const cardDownloadImg = document.createElement('div');
  const cardImage = document.createElement('img');
  const cardDownloadInfo = document.createElement('div');
  const cardH3 = document.createElement('h3')
  const cardA = document.createElement('a')
  newCard.className = "download-card";
  cardDownloadImg.className = "download-image";
  cardImage.style.height = "150px"
  cardDownloadInfo.className = "download-info";
  cardH3.textContent = `${platform} ${data[hashkey]["platforms"][platform]["bits"]}下载` //platform + " " + data[hashkey]["platforms"][platform]["bits"] + "下载";
  cardA.href = data[hashkey]["platforms"][platform]["url"];
  cardA.className = "download-link"
  cardA.textContent = "立即下载"

  switch (platform) {
    case "Android":
      cardImage.src = "../img/android.svg";
      break;
    case "Windows":
      cardImage.src = "../img/windows.svg";
      break;
  }
  cardDownloadInfo.appendChild(cardH3);
  cardDownloadInfo.appendChild(cardA);
  cardDownloadImg.appendChild(cardImage);
  newCard.appendChild(cardDownloadImg);
  newCard.appendChild(cardDownloadInfo);

  return newCard;
};

function updatePage() {
  const platforms = Object.keys(data[hashkey]["platforms"]);
  document.title = `Devode - 下载 ${data[hashkey]["name"]}`//"Devode Games - 下载" + data[hashkey]["name"];
  document.getElementById("downloads-section-title").innerText = `下载 ${data[hashkey]["name"]}`; //"下载" + data[hashkey]["name"];
  const cardGrid = document.getElementById("downloads-grid");
  
  for (const platform in platforms) {
    if (platforms.hasOwnProperty(platform)) {
      cardGrid.appendChild(setCard(platforms[platform]));
    }
  }
  /* cardGrid.appendChild(setCard("Android"));
  cardGrid.appendChild(setCard("Windows")) */
}

(async function initializeApp() {
    // 等待JSON文件加载完成
    await loadJSON();

    // 只有在JSON加载完成后，才执行后续函数
    updatePage();
})();