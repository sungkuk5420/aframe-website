/* global AFRAME */
AFRAME.registerComponent('info-panel', {
    init: function () {
      var buttonEls = document.querySelectorAll('.menu-button');
      var fadeBackgroundEl = this.fadeBackgroundEl = document.querySelector('#fadeBackground');
  
      this.movieImageEl;
      this.movieTitleEl = document.querySelector('#movieTitle');
      this.movieDescriptionEl = document.querySelector('#movieDescription');
  
      this.movieInfo = {
        project1: {
          title: '2014-03 ~ 2014-06',
          imgEl: document.querySelector('#project1Img1'),
          description: 'Web App-Industrial User Management App (Android)'
        },
        project2: {
          title: '2014-08 ~ 2014-12',
          imgEl: document.querySelector('#project2Img2'),
          description: 'Web Service – Equipment and book management system'
        },
        project3: {
          title: '2015-04 ~ 2016-02',
          imgEl: document.querySelector('#project3Img3'),
          description: 'Web App-University Encounter Chat'
        },
        project4: {
          title: '2015-01 ~ 2015-12',
          imgEl: document.querySelector('#project4Img4'),
          description: 'Web Service – Business Chat'
        },
        project5: {
          title: '2016-05 ~ 2016-08',
          imgEl: document.querySelector('#project5Img5'),
          description: 'Web App – Japanese Wordbook'
        },
        project6: {
          title: '2017-01 ~ 2017-01',
          imgEl: document.querySelector('#project6Img6'),
          description: 'Web Site - Line Clone Coding'
        },
        project7: {
          title: '2017-01 ~ 2017-03',
          imgEl: document.querySelector('#project7Img7'),
          description: 'Web Site – Hagoromo Foods Campaign Site'
        },
        project8: {
          title: '2019-05',
          imgEl: document.querySelector('#project8Img8'),
          description: '3D Web Game – Indie Game'
        },
        project9: {
          title: '2018-05',
          imgEl: document.querySelector('#project9Img9'),
          description: 'web Crawler – Image Collection App (Participated in Salesforce AI App Contest 2018)'
        },
        project10: {
          title: '2018-05 ~ 2019-02',
          imgEl: document.querySelector('#project10Img10'),
          description: 'Progressive Web App-Industrial User Management App Renewal'
        },
        project11: {
          title: '2018-02',
          imgEl: document.querySelector('#project11Img11'),
          description: 'Web Service – Youtube Clone Coding'
        },
        project12: {
          title: '2020-02',
          imgEl: document.querySelector('#project12Img12'),
          description: 'Web Site – Hackathon Participant Registration Page for Korean Development Community Nomad Coders'
        },
        project13: {
          title: '2019-04 ~ 2019-05',
          imgEl: document.querySelector('#project13Img13'),
          description: 'Web Site – Sketchbook'
        },
        project14: {
          title: '2018-11',
          imgEl: document.querySelector('#project14Img14'),
          description: 'Web Service – Korean development community Nomad Coders overseas worker display map app'
        },
        project15: {
          title: '2019-05',
          imgEl: document.querySelector('#project15Img15'),
          description: 'Web Service – Popular movie listing site'
        },
      };
  
      this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
      this.onBackgroundClick = this.onBackgroundClick.bind(this);
      this.backgroundEl = document.querySelector('#background');
      for (var i = 0; i < buttonEls.length; ++i) {
        buttonEls[i].addEventListener('click', this.onMenuButtonClick);
      }
      this.backgroundEl.addEventListener('click', this.onBackgroundClick);
      this.el.object3D.renderOrder = 9999999;
      this.el.object3D.depthTest = false;
      fadeBackgroundEl.object3D.renderOrder = 9;
      fadeBackgroundEl.getObject3D('mesh').material.depthTest = false;
    },
  
    onMenuButtonClick: function (evt) {
      var movieInfo = this.movieInfo[evt.currentTarget.id];
  
      this.backgroundEl.object3D.scale.set(1, 1, 1);
  
    //   if(movieInfo.imgEl.outerHTML.indexOf(`mobile`)!=-1){
    //       this.el.object3D.scale.set(0.5, 1, 1);
    //   }else{
          this.el.object3D.scale.set(1, 1, 1);
    //   }
      if (AFRAME.utils.device.isMobile()) { this.el.object3D.scale.set(1.4, 1.4, 1.4); }
      this.el.object3D.visible = true;
      this.fadeBackgroundEl.object3D.visible = true;
  
      if (this.movieImageEl) { this.movieImageEl.object3D.visible = false; }
      this.movieImageEl = movieInfo.imgEl;
      this.movieImageEl.object3D.visible = true;
  
      this.movieTitleEl.setAttribute('text', 'value', movieInfo.title);
      this.movieDescriptionEl.setAttribute('text', 'value', movieInfo.description);
      this.movieDescriptionEl.setAttribute('fontSize', "40px");
    },
  
    onBackgroundClick: function (evt) {
      this.backgroundEl.object3D.scale.set(0.001, 0.001, 0.001);
      this.el.object3D.scale.set(0.001, 0.001, 0.001);
      this.el.object3D.visible = false;
      this.fadeBackgroundEl.object3D.visible = false;
    }
  });
  