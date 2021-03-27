/* global AFRAME */
AFRAME.registerComponent('menu-click', {
  init: function () {
    console.log(this.el)
    if(this.el.id == "menu-1"){
      this.el.addEventListener('click', this.menu1Click);
    }
    if(this.el.id == "menu-2"){
      this.el.addEventListener('click', this.menu1Click);
    }
    if(this.el.id == "menu-3"){
      this.el.addEventListener('click', this.menu3Click);
    }
    if(this.el.id == "portfolioClose"){
      this.el.addEventListener('click', this.portfolioCloseClick);
    }
  },

  tick: function () {
  },

  menu1Click: function () {
    console.log("menu1Click")
    showMaze();
    hideMenu();
    setTimeout(() => {
      startTurnOnLights();
    }, 200);
  },
  menu2Click: function () {
    console.log("menu2Click")
  },
  menu3Click: function () {
    console.log("menu3Click")
    hideMenu()
    setTimeout(() => {
      showPortfolio();
    }, 200);
  },
  portfolioCloseClick: function () {
    console.log("portfolioCloseClick")
    hidePortfolio();
    setTimeout(() => {
      showMenu()
    }, 100);
  },
});
