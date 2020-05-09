window.addEventListener("load", () => {
	const canvas = document.querySelector("#canvas");
	const ctx = canvas.getContext("2d");

	const duplicatecanvas = document.querySelector("#duplicatecanvas");
	const duplicatectx = duplicatecanvas.getContext("2d");
	const variation = document.getElementById("variation");
	const canvascontainer = document.getElementById("canvascontainer");
	
	//sizing
	canvas.height = window.innerHeight / 1.5
	canvas.width = window.innerWidth / 1.5
	canvascontainer.style.width = (canvas.width+20) + "px" ;
	canvascontainer.style.height = (canvas.height+30) + "px";

	variation.style.left = canvas.width + "px";
	
	ctx.fillStyle = "rgba(1, 1, 1, 150)";
	ctx.fillRect(canvas.width * 0.1, canvas.height * 0.1, 2, canvas.height * 0.8);
	ctx.fillRect(canvas.width * 0.1, canvas.height * 0.9, canvas.width * 0.8, 2);
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.moveTo(canvas.width * 0.3, canvas.height * 0.9);
	ctx.quadraticCurveTo(canvas.width * 0.5, canvas.height * 0.01, canvas.width * 0.7, canvas.height * 0.9);
	ctx.stroke();
	ctx.closePath();

	 //Duplicate template
	duplicatecanvas.height = window.innerHeight / 1.5
	duplicatecanvas.width = window.innerWidth / 1.5
	
	//variables
	let sketching = false;
	var positionrect = duplicatecanvas.getBoundingClientRect();
	var point;
	var nouveaupoint;


	function startPosition() {
		//sketching = true;
	}

	function finishedPosition() {
		//sketching = false;
	}
	let what = false
	function draw(e) {
		//si on clique pas
		if (!sketching) {
			return;
		}
		//verifier si un radiobouton est coche
		//if(document.getElementById('GFG').checked)

		//si on clique
		else {
			//duplicatectx.lineWidth = 2;
			duplicatectx.lineCap = "round";
			duplicatectx.lineTo(e.clientX - positionrect.left, e.clientY - positionrect.top);
			var pixeldata = ctx.getImageData(e.clientX - positionrect.left, e.clientY - positionrect.top, 1, 1).data
			duplicatectx.strokeStyle = "rgba(255, 0, 0, 150)";
			//if ((ctx.getImageData(e.clientX - positionrect.left, e.clientY - positionrect.top, 1, 1).data) != (ctx.getImageData(1, 1, 1, 1).data)) {
			if (pixeldata[3] == 255 && pixeldata[0] == 0) {
				//duplicatecanvas.beginPath();
				duplicatectx.lineWidth = 2;
				duplicatectx.stroke();
				//duplicatectx.closePath();
				return;
			}
			if (document.getElementById("mixture").checked = true) {
				return;
			}
		}
	}

	duplicatecanvas.addEventListener("mousedown", startPosition);
	duplicatecanvas.addEventListener("mouseup", finishedPosition);
	duplicatecanvas.addEventListener("mousemove", draw);
	


});

	//resizing
//window.addEventListener("resize", () => {

