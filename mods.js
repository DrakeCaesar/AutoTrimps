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

const stringMap = {
  "grim-reaper": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1"> 	<path d="M 410 41.592 C 407.525 41.801, 398.975 42.452, 391 43.040 C 360.124 45.315, 324.125 51.259, 294.243 59.016 C 233.910 74.679, 185.490 98.527, 147.332 131.375 C 128.865 147.273, 123 155.015, 123 163.492 C 123 175.369, 131.553 184, 143.322 184 C 147.831 184, 150.769 183.033, 161.112 178.145 C 197.043 161.164, 236.231 149.877, 274.500 145.486 C 299.438 142.624, 341.986 143.474, 379.500 147.584 C 487.942 159.463, 629.394 201.075, 756.500 258.489 C 781.824 269.928, 772.406 272.891, 847.933 229.719 C 882.270 210.091, 910.456 194.137, 910.567 194.266 C 910.679 194.395, 885.632 366.175, 854.908 576 C 824.184 785.825, 799.035 959.880, 799.023 962.790 C 798.941 981.767, 822.043 990.104, 834.716 975.670 C 836.476 973.666, 838.354 970.333, 838.888 968.263 C 839.423 966.193, 867.598 774.837, 901.498 543.027 C 957.424 160.609, 963.025 121.162, 961.949 117.319 C 958.153 103.760, 941.885 97.788, 930.506 105.776 C 924.597 109.925, 922.416 114.764, 920.490 128 C 919.569 134.325, 918.639 139.682, 918.421 139.903 C 918.204 140.125, 910.033 137.332, 900.263 133.695 C 769.346 84.967, 632.147 53.160, 511 43.450 C 492.921 42.001, 420.862 40.675, 410 41.592 M 366 206.499 C 311.614 213.821, 259.364 233.685, 214.500 264.095 C 142.389 312.974, 93.124 392.028, 73.075 491.033 C 63.658 537.535, 59.870 588.332, 61.938 640.364 C 66.977 767.144, 87.213 877.917, 120.575 961.349 C 125.702 974.170, 128.433 978.063, 134.289 980.898 C 138.512 982.942, 139.918 983, 185.316 983 C 216.964 983, 232 982.665, 232 981.960 C 232 981.388, 231.096 979.149, 229.992 976.984 C 228.887 974.819, 224.890 965.050, 221.108 955.274 C 186.790 866.555, 172.147 800.859, 165.993 708 C 164.259 681.835, 163.583 615.192, 164.895 599.684 C 168.172 560.931, 183.130 518.162, 204.839 485.472 C 241.098 430.869, 292.518 399.515, 360 390.858 C 372.297 389.280, 407.672 389.296, 420.500 390.885 C 470.916 397.129, 512.082 415.869, 544.862 447.500 C 551.132 453.550, 558.959 461.796, 562.256 465.824 C 577.282 484.185, 592.276 510.876, 600.834 534.500 C 606.119 549.087, 611.688 572.003, 613.108 585 C 614.461 597.392, 613.703 688.041, 612.054 711 C 606.371 790.135, 595.574 845.012, 572.105 914.051 C 565.186 934.406, 553.572 965.132, 548.585 976.279 C 547.163 979.457, 546 982.269, 546 982.529 C 546 982.788, 566.939 983, 592.532 983 C 632.270 983, 639.605 982.774, 642.768 981.452 C 650.318 978.298, 652.216 975.366, 660.476 954.101 C 687.198 885.308, 705.441 794.713, 713.458 691 C 719.085 618.206, 717.588 563.180, 708.504 509 C 682.565 354.278, 592.588 250.479, 453.320 214.615 C 420.707 206.217, 389.585 203.324, 366 206.499 M 277.820 513.909 C 261.341 517.502, 246.269 525.548, 236.982 535.710 C 222.284 551.792, 221.352 570.290, 234.056 593.841 C 244.748 613.664, 269.533 638.077, 289.035 647.997 C 299.396 653.266, 308.057 655.280, 318.415 654.827 C 326.376 654.479, 328.637 653.961, 334.236 651.205 C 342.203 647.282, 352.111 637.202, 357.538 627.499 C 366.068 612.246, 370.269 590.856, 368.083 573.811 C 365.735 555.498, 359.504 542.258, 347.884 530.887 C 340.523 523.683, 329.354 517.447, 318.500 514.481 C 309.004 511.886, 288.424 511.597, 277.820 513.909 M 463.500 513.593 C 427.237 521.693, 406.432 552.200, 410.095 591.903 C 411.262 604.553, 413.340 611.911, 419.109 623.825 C 423.187 632.246, 425.437 635.480, 431.305 641.356 C 440.865 650.931, 447.542 654.188, 458.872 654.807 C 469.573 655.391, 476.260 653.920, 487.500 648.509 C 499.588 642.690, 510.399 634.422, 523.069 621.308 C 535.424 608.519, 544.466 595.505, 549.091 583.852 C 552.089 576.301, 552.411 574.489, 552.453 564.952 C 552.499 554.741, 552.380 554.161, 548.760 546.832 C 541.766 532.673, 526.585 521.417, 506.451 515.459 C 494.905 512.043, 474.426 511.153, 463.500 513.593 M 380.867 657.801 C 373.698 661.546, 367.197 669.732, 360.458 683.500 C 354.277 696.128, 350.345 708.754, 348.746 721.111 C 346.573 737.891, 349.710 740.258, 364.107 732.699 C 375.249 726.849, 381.907 724.769, 389.345 724.814 C 396.601 724.857, 402.351 726.661, 414.230 732.620 C 428.457 739.758, 430.683 738.524, 429.675 724.062 C 428.262 703.773, 417.117 676.309, 405.152 663.630 C 401.111 659.348, 392.942 655.025, 388.864 655.010 C 387.414 655.004, 383.816 656.260, 380.867 657.801 M 565 727.133 C 552.972 737.639, 529.509 750.805, 512.500 756.593 C 508.100 758.090, 504.132 759.635, 503.681 760.026 C 503.231 760.417, 502.450 768.008, 501.946 776.895 C 498.963 829.427, 487.291 855.384, 460.768 868.467 C 443.151 877.157, 425.176 880.050, 388.863 880.042 C 342.796 880.031, 319.735 873.862, 302.948 857.059 C 291.263 845.364, 284.504 830.317, 280.566 807.236 C 278.765 796.679, 277.024 777.143, 277.010 767.332 L 277 760.163 270.250 757.939 C 251.629 751.803, 230.531 741.075, 215.557 730.128 C 211.739 727.336, 208.468 725.199, 208.289 725.378 C 206.930 726.737, 214.689 784.246, 219.524 808.643 C 229.740 860.203, 251.666 928.146, 271.482 969.651 L 277.855 983 388.993 983 L 500.131 983 507.008 968.750 C 521.436 938.855, 540.271 885.049, 550.853 843.500 C 558.799 812.303, 564.892 777.375, 568.531 742.163 C 570.603 722.115, 570.627 722.217, 565 727.133" stroke="none" fill="currentColor" fill-rule="evenodd"/> </svg>`
};

function addMeta(name, content) {
  var meta = document.createElement('meta');
  meta.httpEquiv = name;
  meta.content = content;
  document.head.appendChild(meta);
}
// Adding the required meta tags
addMeta("Cache-Control", "no-cache, no-store, must-revalidate");
addMeta("Pragma", "no-cache");
addMeta("Expires", "0");
var script = document.createElement("script");
script.id = "AutoTrimps-Zek";
// script.src = "https://Zorn192.github.io/AutoTrimps/AutoTrimps2.js";
script.src = "http://localhost/AutoTrimps2.js";
// script.setAttribute("crossorigin", "anonymous");
document.head.appendChild(script);
holidayObj.checkActive = function () {
  return true;
};
moveSettings();
observeResistancesElement();
// observeTime();
// zoomListener();
// breed();
let value = stringMap["grim-reaper"];
console.log(value);
