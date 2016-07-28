
var app = {
  
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
	//document.addEventListener('DOMContentLoaded', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
      
	$.getScript('http://op.genesisgo.us/ar/ar.js');
      
      
	/*
	navigator.geolocation.getCurrentPosition(initGeoSuccess, geoError, { enableHighAccuracy: true });
      
	app.watchID = navigator.geolocation.watchPosition(geoSuccess, geoError, { enableHighAccuracy: true });
	
	
	setInterval(function(){
	    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, { enableHighAccuracy: true });
	}, 5000);
	
	
	function initGeoSuccess(position) {
	  
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            
	    app.igeo.lat = lat;
            app.igeo.lng = lng;
	    
	    console.log("init : " + lat + " | " + lng);
	    
	    
	    $.get('http://op.genesisgo.us/ar/geomap.php', {lat:lat, lng:lng}, function(d) {
		 app.geomap = d;
	    }, 'json');
	    
	    
        };

        function geoSuccess(position) {
            app.geo.lat = position.coords.latitude;
            app.geo.lng = position.coords.longitude;
	    
	    app.geo.distance = app.distance(app.geo.lat, app.geo.lng);
	    
	    console.log("geo : " + app.geo.lat + " | " + app.geo.lng);
	    
	    $('.geodist').text("Distance : " + app.geo.distance + " m");
	    
        };
        
	function geoError(error) {
            console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
        };
	
        app.receivedEvent('deviceready');
	//var ref = window.open('http://op.genesisgo.us/vcard/', '_self', 'location=no');
	
	*/
	
    },

    receivedEvent: function(id) {
	
	/*
	 
	if(cordova.platformId.match(/droid/ig)) {
	  
	      navigator.getUserMedia(hdConstraints, function(stream){
		  
		  video = document.createElement('video');
		  video.src = window.URL.createObjectURL(stream);
		  video.onclick = function() { video.play(); };
		  video.play();  
		  video.width    = 720;
		  video.height   = 720;
		  video.autoplay = true;
		
		  videoTexture = new THREE.Texture(video);
		  videoTexture.minFilter = THREE.LinearFilter;
		  
		  
		  var camGeometry = new THREE.PlaneGeometry(20,20,1,1);
		  var camMaterial = new THREE.MeshLambertMaterial({ map : videoTexture });
		  camMesh = new THREE.Mesh(camGeometry, camMaterial);
		  camMesh.position.y = 0;
		  camMesh.position.z = -2;
	      
		  scene2.add(camMesh);
		
		  revdraw = true;
		  
	      }, errorCallback);
	  
	} else {
	    if (window.ezar) {
		ezar.initializeVideoOverlay(function(){ ezar.getBackCamera().start(); }, function(err) { alert('unable to init camera: ' + err); });
	    } else {
		//alert('Unable to detect the camera plugin');
	    }
	}
        
	cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.001, 10000);
	cam2 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.001, 10000);
	cam2.position.set(0,0,3);
	cam2.lookAt(scene2.position);
	
	scene2.add(cam2);
	
	scene.add(cam);
        
        window.addEventListener('resize', function() {
		cam.aspect = window.innerWidth / window.innerHeight;
		cam.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	}, false);
	
	    var opts = { alpha: true };
	    renderer = webglAvailable() ? new THREE.WebGLRenderer(opts) : new THREE.CanvasRenderer(opts);
	    renderer.setSize(window.innerWidth, window.innerHeight);
	    
	    renderer.setFaceCulling( THREE.CullFaceNone );
	    renderer.autoClear = false;
	    renderer.shadowMapCullFrontFaces = false;
    
	
	    
	    
	    
	    
	    
	    $('.app').html(renderer.domElement);
	    
	    element = renderer.domElement;
	    controls = new THREE.VRControls(cam);
	    
	    //controls = new THREE.OrbitControls(cam); //, renderer.domElement);
    
    
    
	    controls.enableDamping = true;
	    controls.dampingFactor = 0.05;
	    
	    
	    pi = 3.141592653589793238;
	    var geometry = new THREE.DodecahedronGeometry(10);
	    var material = new THREE.MeshNormalMaterial();
	    material.side = THREE.DoubleSide;
	    dodecahedron = new THREE.Mesh( geometry, material );
	    dodecahedron.position.z = -20;
	    //scene.add(dodecahedron);

	    tetrahedron = new THREE.Mesh(new THREE.TetrahedronGeometry(10), new THREE.MeshBasicMaterial({color: 0xEE0443, wireframe: true}));
	    tetrahedronIncrement = 0;

	    var z = Math.sin(-3/2*pi/1000*tetrahedronIncrement)*40;
	    var x = Math.cos(-3/2*pi/1000*tetrahedronIncrement)*40;
	    tetrahedron.position.set(x, 0, z);
	    //scene.add(tetrahedron);

	    var cubes = [];
	    for (var i = 0; i < 10; i++) {
		cubes[i] = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshBasicMaterial({color: 0x0443EE}));
		cubes[i].position.z = i*(-20) + 100;
		cubes[i].position.x = i*(-20);
		//scene.add(cubes[i]);
	    }

	    var loader = new THREE.ColladaLoader();
	    loader.options.convertUpAxis = true;
	    loader.setPreferredShading(THREE.SmoothShading);
	    loader.load('http://op.genesisgo.us/ar/3d/bor.dae', function ( collada ) { 
		  bor = collada.scene;
		  bor.position.z = -13;
		  bor.position.y = -4;
		  bor.scale.set(0.5,0.5,0.5);
		  scene.add(bor); 
	    });
	
	    light = new THREE.HemisphereLight(0xefefef);
	    light.position.set(400, 100, 1000);
	    scene.add(light);
	      
	    requestAnimationFrame(render);
	*/
    }
    
};

/*

function render() {
  
	    requestAnimationFrame(render);
  
	    if(video) {
		if(video.readyState === video.HAVE_ENOUGH_DATA) {
		    videoTexture.needsUpdate = true;
		}
	    }
	    
	    dodecahedron.rotation.x += 0.01;
	    dodecahedron.rotation.y += 0.005;
	    tetrahedron.rotation.x += 0.01;
	    tetrahedronIncrement++;
	    if (tetrahedronIncrement >= 1000) { tetrahedronIncrement = 0; }
	    var z = Math.sin(-2*pi/1000*tetrahedronIncrement)*40;
	    var x = Math.cos(-2*pi/1000*tetrahedronIncrement)*40;
	    tetrahedron.position.set(x, 0, z);  
	    
	    if(bor)
	    bor.rotation.y += 0.01;
	    
	    controls.update();
	    
	    if ( cam instanceof THREE.Camera === false ) 
		console.log(cam)
	    
	    if ( cam2 instanceof THREE.Camera === false ) 
		console.log(cam2)
		
		
	    renderer.render(scene2, cam2);
	    renderer.clearDepth();
	    renderer.render(scene, cam);
	    
	    
	    
}

function webglAvailable() {
    try {
	var canvas = document.createElement("canvas");
	return !!window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
    } catch(e) { 
	return false;
    } 
}

function checkIntersect(vector) {	  
    vector.unproject(camera);
    var norm = vector.sub(camera.position).normalize();
    var ray = new THREE.Raycaster(camera.position, norm);
    var intersects = ray.intersectObject(tmpMesh);
    return intersects[0].point;
}
*/

app.initialize();
