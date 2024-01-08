function spireAssault(lastPreset = 0) {
  var newPreset = 0;
  const resistancesElement = document.querySelector(".autoStats:nth-child(2) .autoStatsBreakup:nth-child(2)");
  const resistancesElementText = document.querySelectorAll(".autoStats:nth-child(2) .autoStatsBreakup:nth-child(2) b");
  const resistances = resistancesElement.innerText.replace(/[^0-9 ]/g, "").split(" ").filter(x => x !== "");
  const pResist = parseInt(resistances[1]);
  const bResist = parseInt(resistances[2]);
  const sResist = parseInt(resistances[3]);
  let minResist = Math.min(pResist, bResist, sResist);
  let presetsToColor = [];
  if (pResist === minResist) {
    presetsToColor.push({
      preset: 1,
      color: "green"
    });
  }
  if (bResist === minResist) {
    presetsToColor.push({
      preset: 2,
      color: "red"
    });
  }
  if (sResist === minResist) {
    presetsToColor.push({
      preset: 3,
      color: "yellow"
    });
  }
  presetsToColor.forEach(({
    preset,
    color
  }) => {
    resistancesElementText[preset].style.color = color;
  });
  newPreset = presetsToColor[0].preset;
  //make italics
  resistancesElementText[newPreset].style.fontStyle = "italic";
  const presetName = ["", "Poison", "Bleed", "Shock"];
  if (lastPreset !== newPreset) {
    const presetButton = document.querySelector("#autoBattleMenuButtons span.autoColorGrey");
    presetButton.click();
    const upgradeElements = document.querySelectorAll("body  #autoItemsDiv .preset .autoItemUpgrade");
    upgradeElements[newPreset - 1].click();
    lastPreset = newPreset;
    console.log("Switched to preset " + presetName[newPreset]);
  }
  return newPreset;
}
async function observeResistancesElement() {
  let lastPreset = 0;
  let resistanceElement = document.querySelector('#tooltipDiv');
  while (!resistanceElement) {
    resistanceElement = document.querySelector('#tooltipDiv');
    await new Promise(r => setTimeout(r, 100));
  }
  const callback = function (mutationsList) {
    if (resistanceElement === null) {
      console.log("resistanceElement is null");
      return;
    }
    for (let mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        observer.disconnect();
        try {
          lastPreset = spireAssault(lastPreset);
        } catch (error) {}
        observer.observe(resistanceElement, {
          attributes: true,
          subtree: true
        });
      }
    }
  };
  const observer = new MutationObserver(callback);
  observer.observe(resistanceElement, {
    attributes: true,
    subtree: true
  });
  // while (true) {
  //   resistanceElement = document.querySelector('#tooltipDiv');
  //   (document.querySelector("#autoBattleA") as HTMLElement).click();
  //   await new Promise(r => setTimeout(r, 1000));
  // }
}

// Function to check if both elements exist
function doElementsExist(selectors) {
  return selectors.every(selector => document.querySelector(selector) !== null);
}
// Function to move an element to be the last child of its parent
function moveToLastChild(selector) {
  var element = document.querySelector(selector);
  if (element && element.parentElement) {
    element.parentElement.appendChild(element);
  }
}

function moveSettings() {
  // Selectors of the elements to monitor
  const selectors = ["#settingsTable", "#autoTrimpsTabBarMenu"];
  // Create a MutationObserver to monitor the DOM for changes
  const observer = new MutationObserver(function () {
    if (doElementsExist(selectors)) {
      // If both elements exist, move them and disconnect the observer
      selectors.forEach(selector => moveToLastChild(selector));
      observer.disconnect();
    }
  });
  // Start observing the document body for childList and subtree changes
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  // Check initially if the elements already exist
  if (doElementsExist(selectors)) {
    selectors.forEach(selector => moveToLastChild(selector));
    observer.disconnect();
  }
}

// add listener to zoom in and out with ctrl + mouse wheel, or ctrl + +/- or ctrl + 0
function zoomListener() {
  // zoom in and out with ctrl + mouse wheel
  window.addEventListener('wheel', e => {
    if (e.ctrlKey) {
      e.preventDefault();
      if (e.deltaY < 0) {
        zoomIn();
      } else {
        zoomOut();
      }
    }
  });
  // zoom in and out with ctrl + +/- or ctrl + 0
  window.addEventListener('keydown', e => {
    if (e.ctrlKey) {
      e.preventDefault();
      if (e.key === '+') {
        zoomIn();
      } else if (e.key === '-') {
        zoomOut();
      } else if (e.key === '0') {
        zoomReset();
      }
    }
  });
}
function zoom(change) {
  const body = document.body;
  let zoom = body.style.getPropertyValue("zoom");
  if (zoom === null || zoom === '') {
    zoom = '100%';
  }
  let zoomValue = parseInt(zoom.replace('%', ''));
  zoomValue += change;
  body.style.setProperty("zoom", zoomValue + '%');
  console.log('zoomOut');
  console.log(zoom);
}
function zoomIn() {
  zoom(10);
}
function zoomOut() {
  zoom(-10);
}
function zoomReset() {
  const body = document.body;
  body.style.setProperty("zoom", '100%');
  console.log('zoomReset');
}

var script = document.createElement("script");
script.id = "AutoTrimps-Zek";
// script.src = "https://localhost/AutoTrimps/AutoTrimps2.js";
// script.src = "file:///C:/Users/domin/dev/AutoTrimps/AutoTrimps2.js";
script.src = "http://localhost/AutoTrimps2.js";
//http://localhost/AutoTrimps2.js
//file:///C:/Users/domin/dev/AutoTrimps/AutoTrimps2.js
script.setAttribute("crossorigin", "anonymous");
document.head.appendChild(script);
holidayObj.checkActive = function () {
  return true;
};
moveSettings();
observeResistancesElement();
// observeTime();
zoomListener();
// breed();
