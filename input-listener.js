AFRAME.registerComponent('input-listener', {
    init:
        function () { 
            var p = new THREE.Vector3(200,300,500);
            console.log(p)
            //コントローラのグリップボタンを押しているかどうかを保持
            this.el.grip = false;

            //トリガーを押した時に球を発射 
            document.addEventListener('keydown', function(event) {
                
                if(event.code !== "Space"){
                    return false;
                }
             //コントローラの位置を取得(thisはコントローラ)
             console.log(document.querySelector('a-scene').camera.el.object3D.position)
             var point = document.querySelector('a-scene').camera.el.object3D.position; 
                //ボールを生成
                var ball = document.createElement('a-sphere');
                ball.setAttribute('class', 'ball');
                ball.setAttribute('scale', '0.2 0.2 0.2');
                ball.setAttribute('position', point);
                //dynamic-bodyを設定することで物理演算をさせる
                ball.setAttribute('dynamic-body', 'shape: sphere; sphereRadius:0.2; ');
                //球を発射するときの向きと大きさを設定(好みに応じて変更) 
                var force = new THREE.Vector3(point.x, point.y, point.z);
                force.multiplyScalar(2000);
                // //レイキャスターの向きはコントローラを原点としたローカル座標系なのでワールド座標に変換                   
                // ball.force = this.object3D.localToWorld(force);
                //上記の設定を済ませた球をシーンに登場させる
                var scene = document.querySelector('a-scene');
                scene.appendChild(ball);
                //物理関係の設定が済んだタイミングで球を飛ばす 
                ball.addEventListener('body-loaded', function (e) {
                    //ボールの位置を取得(ここでのthisはballを示す)
                    var p = this.object3D.position;
                    //加える力は先ほど計算したものを使用
                    var f = this.force;
                    //球に力を加えて飛ばす
                    this.body.applyForce(
                        new CANNON.Vec3(f.x, f.y, f.z),
                        new CANNON.Vec3(p.x, p.y, p.z)
                    );
                });
            });
            this.el.addEventListener('triggerdown', function (e) {
                //コントローラの位置を取得(thisはコントローラ)
                var point = this.object3D.getWorldPosition();
                //ボールを生成
                var ball = document.createElement('a-sphere');
                ball.setAttribute('class', 'ball');
                ball.setAttribute('scale', '0.2 0.2 0.2');
                ball.setAttribute('position', point);
                //dynamic-bodyを設定することで物理演算をさせる
                ball.setAttribute('dynamic-body', 'shape: sphere; sphereRadius:0.2; ');
                //コントローラのレイキャスターの向きを取得
                var dir = this.getAttribute("raycaster").direction;
                //球を発射するときの向きと大きさを設定(好みに応じて変更) 
                var force = new THREE.Vector3(dir.x, dir.y, dir.z);
                force.multiplyScalar(2000);
                //レイキャスターの向きはコントローラを原点としたローカル座標系なのでワールド座標に変換                   
                ball.force = this.object3D.localToWorld(force);
                //上記の設定を済ませた球をシーンに登場させる
                var scene = document.querySelector('a-scene');
                scene.appendChild(ball);
                //物理関係の設定が済んだタイミングで球を飛ばす 
                ball.addEventListener('body-loaded', function (e) {
                    //ボールの位置を取得(ここでのthisはballを示す)
                    var p = this.object3D.position;
                    //加える力は先ほど計算したものを使用
                    var f = this.force;
                    //球に力を加えて飛ばす
                    this.body.applyForce(
                        new CANNON.Vec3(f.x, f.y, f.z),
                        new CANNON.Vec3(p.x, p.y, p.z)
                    );
                });
            });

            //グリップボタンを押した時に呼ばれる
            this.el.addEventListener('gripdown', function (e) {
                //グリップボタン押下中
                this.grip = true;
            });

            //グリップボタンを話した時に呼ばれる
            this.el.addEventListener('gripup', function (e) {
                //グリップボタン押下終了
                this.grip = false;
            });

            //レイキャスターが何かしらのオブジェクトにぶつかった時
            this.el.addEventListener('raycaster-intersection', function (e) {
                //交差したオブジェクトのうち0番目を覚えておく(本当はもうちょっと上手にやるべき)
                this.selectedObj = e.detail.els[0];
            });

            //レイキャスターとオブジェクトとの接触完了
            this.el.addEventListener('raycaster-intersection-cleared', function (e) {
                //レイキャスターと接触しているオブジェクトの情報をクリア
                this.selectedObj = null;
            });

            //Aボタンを押した時(球を全部削除する) 
            this.el.addEventListener('abuttondown', function (e) {
                //a-sceneに存在する球を全て取得
                var els = document.querySelectorAll('.ball');
                //球を削除
                for (var i = 0; i < els.length; i++) {
                    els[i].parentNode.removeChild(els[i]);
                }
            });

            //xボタンを押した時 
            this.el.addEventListener('xbuttondown', function (e) {
                //行き先をポインティング  
                this.emit('teleportstart');
            });

            //Xボタンを離した時 
            this.el.addEventListener('xbuttonup', function (e) {
                //ポイントした場所にジャンプ
                this.emit('teleportend');
            });
        },

    //毎フレーム呼ばれる
    tick:
        function () {
            if (!this.el.selectedObj) { return; }
            if (!this.el.grip) { return; }
            //レイキャスターの向きを取得 (this.elはコントローラを示す)
            var ray = this.el.getAttribute("raycaster").direction;
            //レイキャスターの先端の位置を1.2m手前とし、そのワールド座標を計算 
            var p = new THREE.Vector3(ray.x, ray.y, ray.z);
            console.log(p)
            p.normalize();
            p.multiplyScalar(1.2);
            this.el.object3D.localToWorld(p);
            //レイキャスターの先端に、選択中のオブジェクトを追従させる。
            this.el.selectedObj.object3D.position.set(p.x, p.y, p.z);
        }
});