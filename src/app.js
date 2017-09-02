var scene = (function () {
    'use strict';

    var scene = new THREE.Scene(),
        renderer = new THREE.WebGLRenderer({alpha: true}),
        camera, earth, background;

    function initScene() {
        renderer.setSize(window.innerWidth, window.innerHeight);

        document.getElementById('container').appendChild(renderer.domElement);

        camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.set(-25, 0, 230);
        scene.add(camera);

        initBackground();
        scene.add(background);

        initEarth();
        scene.add(earth);

        render();
    }

    function render() {
        earth.rotation.y += 0.005;
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    
    function initBackground() {
        var bgGeometry = new THREE.SphereGeometry( 500, 60, 40 );
        bgGeometry.scale( - 1, 1, 1 );
        var bgMaterial = new THREE.MeshBasicMaterial( {
            map: new THREE.TextureLoader().load( 'textures/stars.jpg' ), overdraw: 0.5
        } );
        background = new THREE.Mesh( bgGeometry, bgMaterial );
    }

    function initEarth() {
        var earthGeometry = new THREE.SphereGeometry(50, 50, 50);
        var earthMaterial = new THREE.MeshBasicMaterial( {
            map: new THREE.TextureLoader().load( 'textures/earth.jpg' ), overdraw: 0.5
        } );
        earth = new THREE.Mesh(earthGeometry, earthMaterial);
        earth.position.x = 0;
    }

    return {
        initScene: initScene
    }
})();