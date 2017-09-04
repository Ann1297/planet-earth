var scene = (function () {
    'use strict';

    var scene = new THREE.Scene(),
        renderer = new THREE.WebGLRenderer({alpha: true}),
        camera, earth, background, light, light2;

    function initScene() {
        renderer.setSize(window.innerWidth, window.innerHeight);

        document.getElementById('container').appendChild(renderer.domElement);

        camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.set(-25, 0, 230);
        scene.add(camera);

        addLidht();
        initBackground();
        initEarth();
    }

    function render() {
        earth.rotation.y += 0.005;
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    
    function initBackground() {
        var bgGeometry = new THREE.SphereGeometry( 500, 60, 40 );
        bgGeometry.scale( -1, 1, 1 );

        var loader = new THREE.TextureLoader();
        loader.load(
            'textures/stars.jpg',
            function(texture){
                var bgMaterial = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5} );
                background = new THREE.Mesh( bgGeometry, bgMaterial );
                scene.add(background);
                render();
            });
    }

    function initEarth() {
        var earthGeometry = new THREE.SphereGeometry(50, 50, 50);

        var loader = new THREE.TextureLoader();
        loader.load(
            'textures/earth.jpg',
            function(texture){
                var earthMaterial = new THREE.MeshLambertMaterial( { map: texture, overdraw: 0.5 });
                earth = new THREE.Mesh(earthGeometry, earthMaterial);
                scene.add(background);
                earth = new THREE.Mesh(earthGeometry, earthMaterial);
                earth.position.x = 0;
                scene.add(earth);
                render();
            });
    }

    function addLidht() {
        light = new THREE.DirectionalLight( 0xFFFFFF, 0.8);
        light.position.set(100, 50, 100);

        light2 = new THREE.AmbientLight( 0xFFFFFF, 0.4);
        light2.position.set(100, 50, 100);

        scene.add(light);
        scene.add(light2);
    }

    return {
        initScene: initScene
    }
})();