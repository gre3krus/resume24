document.querySelector("#modal").addEventListener("click", function (e) {
    const modalOpen = document.getElementById("modalOpen");
    modalOpen.style.display =
      modalOpen.style.display === "none" ? "flex" : "none";
  });
  
  document.querySelector("#close").addEventListener("click", function (e){
    const close = document.getElementById("modalOpen");
    const container = document.getElementsByClassName("container");
    close.style.display = close.style.display === "none" ? "flex" : "none";
    if(modalOpen.style.display === "flex") {
      container.style.marginTop = container.style.marginTop === "0px";
    }
  })
  
  class ItcTabs {
    constructor(target, config) {
      const defaultConfig = {};
      this._config = Object.assign(defaultConfig, config);
      this._elTabs =
        typeof target === "string" ? document.querySelector(target) : target;
      this._elButtons = this._elTabs.querySelectorAll(".tabs__btn");
      this._elPanes = this._elTabs.querySelectorAll(".tabs__pane");
      this._init();
      this._events();
    }
    _init() {
      this._elTabs.setAttribute("role", "tablist");
      this._elButtons.forEach((el, index) => {
        el.dataset.index = index;
        el.setAttribute("role", "tab");
        this._elPanes[index].setAttribute("role", "tabpanel");
      });
    }
    show(elLinkTarget) {
      const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
      const elLinkActive = this._elTabs.querySelector(".tabs__btn_active");
      const elPaneShow = this._elTabs.querySelector(".tabs__pane_show");
      if (elLinkTarget === elLinkActive) {
        return;
      }
      this._paneFrom = elPaneShow;
      this._paneTo = elPaneTarget;
      elLinkActive ? elLinkActive.classList.remove("tabs__btn_active") : null;
      elPaneShow ? elPaneShow.classList.remove("tabs__pane_show") : null;
      elLinkTarget.classList.add("tabs__btn_active");
      elPaneTarget.classList.add("tabs__pane_show");
      this._elTabs.dispatchEvent(
        new CustomEvent("tab.itc.change", {
          detail: {
            elTab: this._elTabs,
            paneFrom: this._paneFrom,
            paneTo: this._paneTo,
          },
        })
      );
      elLinkTarget.focus();
    }
    showByIndex(index) {
      const elLinkTarget = this._elButtons[index];
      elLinkTarget ? this.show(elLinkTarget) : null;
    }
    _events() {
      this._elTabs.addEventListener("click", (e) => {
        const target = e.target.closest(".tabs__btn");
        if (target) {
          e.preventDefault();
          this.show(target);
        }
      });
    }
  }
  
  const elTab = document.querySelector(".tabs");
  new ItcTabs(elTab);
  
  const elScript = document.createElement("script");
  elScript.src = "https://www.youtube.com/iframe_api";
  document.head.append(elScript);
  
  const players = {};
  function onYouTubeIframeAPIReady() {
    document.querySelectorAll(".player").forEach((el) => {
      players[el.id] = new YT.Player(el.id, {
        height: el.dataset.height,
        width: el.dataset.width,
        videoId: el.dataset.videoId,
      });
    });
  }
  
  elTab.addEventListener("tab.itc.change", (e) => {
    const paneFrom = e.detail.paneFrom;
    if (paneFrom) {
      const player = paneFrom.querySelector(".player");
      player ? players[player.id].pauseVideo() : null;
    }
  });