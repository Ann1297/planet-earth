var scene = (function () {
    'use strict';

    var scene = new THREE.Scene(),
        renderer = new THREE.WebGLRenderer({alpha: true}),
        camera, earth, material;

    function initScene() {
        renderer.setSize(window.innerWidth, window.innerHeight);

        document.getElementById('container').appendChild(renderer.domElement);

        camera = new THREE.PerspectiveCamera(
            35,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );

        camera.position.set(-25, 0, 230);
        scene.add(camera);

        //var material = new THREE.MeshBasicMaterial({wireframe: true, color: 0xA1D490});

        // instantiate a loader
        var loader = new THREE.TextureLoader();

        // load a resource
        loader.load('textures/earth.jpg',
            function ( texture ) {
                material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5  } );
                earth = new THREE.Mesh(new THREE.SphereGeometry(50, 50, 50), material);
                earth.position.x = 0;
                scene.add(earth);

                render();
            },
	        // Function called when download progresses
	        function ( xhr ) {
		        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	        },
	        // Function called when download errors
	        function ( xhr ) {
		        console.log( 'An error happened' );
        });
    }

    function render() {
        earth.rotation.y += 0.005;
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    return {
        initScene: initScene
    }
})();