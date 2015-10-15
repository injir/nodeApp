
 if (BABYLON.Engine.isSupported()) {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);
    var createScene = function(){
    // create a basic BJS Scene object
    var scene = new BABYLON.Scene(engine);
    var id = canvas.getAttribute('data-id');
    
    // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
    var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-10), scene);

    // target the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // attach the camera to the canvas
    camera.attachControl(canvas, false);

    // create a basic light, aiming 0,1,0 - meaning, to the sky
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
     var ground = new BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene);
         
    var sphere = new BABYLON.SceneLoader.ImportMesh(null, '../3d/'+id+'/files/', "model.babylon", scene, function(newMeshes,particleSystems,skeletons){
        var skeleton = scene.skeletons; 
        console.log( skeleton);
    	 newMeshes[0].position = BABYLON.Vector3.Zero();
    	  newMeshes[0].position.y = 1;
         
          var animationTorus = new BABYLON.Animation("torusEasingAnimation", "rotation", 30,  BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
            var torus =newMeshes[0];
        // the torus destination position
        var nextPos = torus.position.add(new BABYLON.Vector3(-80, 0, 0));

// Animation keys
var keysTorus = [];
keysTorus.push({ frame: 0, value: torus.position });
keysTorus.push({ frame: 120, value: nextPos });
animationTorus.setKeys(keysTorus);

// Creating an easing function
var easingFunction = new BABYLON.CircleEase();

// For each easing function, you can choose beetween EASEIN (default), EASEOUT, EASEINOUT
easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

// Adding the easing function to the animation
animationTorus.setEasingFunction(easingFunction);

// Adding animation to my torus animations collection
torus.animations.push(animationTorus);

//Finally, launch animations on torus, from key 0 to key 120 with loop activated
//scene.beginAnimation(torus, 0, 120, true);
    });
     



    // move the sphere upward 1/2 of its height
    

    // create a built-in "ground" shape; its constructor takes the same 5 params as the sphere's one
   

    // return the created scene
    return scene;
}
var scene = createScene();
window.addEventListener('resize', function(){
    engine.resize();
});

engine.runRenderLoop(function(){
    scene.render();

});
    }
