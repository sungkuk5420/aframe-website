/* global AFRAME */
AFRAME.registerComponent('menu-click', {
  init: function () {
    console.log(this.el)
    if(this.el.id == "menu-1"){
      this.el.addEventListener('click', this.menu1Click);
    }
    if(this.el.id == "menu-2"){
      this.el.addEventListener('click', this.menu2Click);
    }
    if(this.el.id == "menu-3"){
      this.el.addEventListener('click', this.menu3Click);
    }
    if(this.el.id == "menu-4"){
      this.el.addEventListener('click', this.menu4Click);
    }
  },

  tick: function () {
  },

  menu1Click: function () {
    console.log("menu1Click")
    hideMenu();
    setTimeout(() => {
      startTurnOnLights();
    }, 500);
  },
  menu2Click: function () {
    console.log("menu2Click")
  },
  menu3Click: function () {
    console.log("menu3Click")
  },
  menu4Click: function () {
    console.log("menu4Click")
  },
});
