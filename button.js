/* global AFRAME */
AFRAME.registerComponent('button', {
  schema: {
    label: {default: 'label'},
    width: {default: 4},
    toggable: {default: false}
  },
  init: function () {
    var el = this.el;
    console.log(el)
    var labelEl = this.labelEl = document.createElement('a-entity');

    this.hoverColor = '#00796B';
    
    el.setAttribute('geometry', {
      primitive: 'box',
      width: this.data.width,
      height: 1,
      depth: 0.02
    });
    
    
    if(el.id == "menu-1"){
      this.color = '#F16745';
      el.setAttribute('position', '-4 5 -7');
    }
    if(el.id == "menu-2"){
      this.color = '#FF5252';
      el.setAttribute('position', '-4 3 -7');
    }
    if(el.id == "menu-3"){
      this.color = '#303F9F';
      el.setAttribute('position', '-4 1 -7');
    }
    if(el.id == "portfolioClose"){
      this.color = '#5D4037';
    }
    
    el.setAttribute('material', {color: this.color});
    el.setAttribute('pressable', '');
    labelEl.setAttribute('position', '0 0 0.01');
    labelEl.setAttribute('text', {
      color: 'white',
      align: 'center',
    });

    labelEl.setAttribute('scale', '15 15 15');
    this.el.appendChild(labelEl);

    this.bindMethods();

    el.addEventListener('mouseenter', this.onPressedStarted);
    el.addEventListener('mouseleave', this.onPressedEnded);
  },

  bindMethods: function () {
    this.onPressedStarted = this.onPressedStarted.bind(this);
    this.onPressedEnded = this.onPressedEnded.bind(this);
  },

  update: function (oldData) {
      this.labelEl.setAttribute('text', 'value', this.data.label);
  },

  onPressedStarted: function () {
    this.el.setAttribute('material', {color: this.hoverColor});
  },

  onPressedEnded: function () {
    this.el.setAttribute('material', {color: this.color});
  }
});
