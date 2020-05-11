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

	//ctx.fillStyle = "white";
	//ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "rgba(1, 1, 1, 150)";
	ctx.fillRect(canvas.width * 0.1, canvas.height * 0.1, 2, canvas.height * 0.8);
	ctx.fillRect(canvas.width * 0.1, canvas.height * 0.9, canvas.width * 0.8, 2);

	
	//fleche du haut

	ctx.font = "20px Arial";
	ctx.fillText("T", canvas.width * 0.075, canvas.height * 0.1 );

	ctx.beginPath();
	ctx.moveTo(canvas.width*0.1+1, canvas.height*0.1-10);
	ctx.lineTo(canvas.width * 0.1 + 6, canvas.height * 0.1 + 5);
	ctx.lineTo(canvas.width * 0.1 - 4, canvas.height * 0.1 + 5);
	ctx.fill();
	ctx.closePath();

	//fleche de droite
	ctx.beginPath();
	ctx.moveTo(canvas.width * 0.9+1, canvas.height * 0.9+1);
	ctx.lineTo(canvas.width * 0.9 - 10, canvas.height * 0.9 +6);
	ctx.lineTo(canvas.width * 0.9 - 10, canvas.height * 0.9 - 4);
	ctx.fill();
	ctx.closePath();
	ctx.font = "20px Arial";
	ctx.fillText("s", canvas.width * 0.92, canvas.height * 0.95);

	var pic = 0.3 * canvas.height;
	//partie gauche
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.moveTo(canvas.width * 0.35, canvas.height * 0.9);
	ctx.bezierCurveTo(canvas.width * 0.4, canvas.height * 0.9, canvas.width * 0.4, pic, canvas.width * 0.5, pic);
	ctx.stroke();
	ctx.closePath();
	//partie droite
	ctx.beginPath();
	ctx.moveTo(canvas.width * 0.75, canvas.height * 0.9);
	ctx.bezierCurveTo(canvas.width * 0.55, canvas.height * 0.9, canvas.width * 0.65, pic, canvas.width * 0.5, pic);
	ctx.stroke();
	ctx.closePath();
	//ctx.moveTo(canvas.width * 0.3, canvas.height * 0.9);
	//ctx.quadraticCurveTo(canvas.width * 0.5, canvas.height * 0.01, canvas.width * 0.7, canvas.height * 0.9);
	//correction de la courbe
	

	

	 //Duplicate template
	duplicatecanvas.height = window.innerHeight / 1.5
	duplicatecanvas.width = window.innerWidth / 1.5
	
	//variables
	let sketching = false;
	var positionrect = duplicatecanvas.getBoundingClientRect();
	var point;
	var nouveaupoint;
	var premier = true;
	var highlight = true;
	var counter = 1;
	
	
	//settings des lignes
	//duplicatectx.strokeStyle = "rgba(255, 0, 0, 150)";
	duplicatectx.lineWidth = 2;
	duplicatectx.lineCap = "round";
	//copiage du duplicate
	var copie = document.createElement('canvas');
	var copiectx = copie.getContext('2d');
	copie.width = duplicatecanvas.width;
	copie.height = duplicatecanvas.height;
	copiectx.drawImage(duplicatecanvas, 0, 0);
	
	function localisation(e) {
		return [e.clientX - positionrect.left, e.clientY - positionrect.top + (window.scrollY/1)];
	}

	function clique(e) {
		highlight = false;
		//duplicatecanvas = copie;
		duplicatectx.drawImage(copie, 0, 0);
		if (premier) {
			//on prend en note le premier point
			//point = [e.clientX - positionrect.left, e.clientY - positionrect.top];
			point = localisation(e);
			premier = false;
			if (document.getElementById('numbers').checked) {
				duplicatectx.font = "20px Arial";
				duplicatectx.fillText(counter.toString(), point[0] - 15, point[1] - 5);
				counter = counter + 1;
				copiectx.drawImage(duplicatecanvas, 0, 0);
			}
			
		}

		else {
			// on trace la ligne avec le point  


			//si on doit ajuster
			
				if (document.getElementById('constptchange').checked) {
					//nouveaupoint = [e.clientX - positionrect.left, e.clientY - positionrect.top];
					nouveaupoint = localisation(e);
					duplicatectx.beginPath();
					duplicatectx.moveTo(point[0], point[1]);
					//duplicatectx.lineTo(nouveaupoint[0], nouveaupoint[1]);
					if (nouveaupoint[0] >= point[0]) {
						duplicatectx.quadraticCurveTo(0.4 * point[0] + 0.6 * nouveaupoint[0], 0.6 * point[1] + 0.4 * nouveaupoint[1], nouveaupoint[0], nouveaupoint[1]);
					}
					else if (nouveaupoint[0] <= point[0]) {
						duplicatectx.quadraticCurveTo(0.6 * point[0] + 0.4 * nouveaupoint[0], 0.6 * nouveaupoint[1] + 0.4 * point[1], nouveaupoint[0], nouveaupoint[1]);
					}
					
					
					duplicatectx.stroke();
					point = nouveaupoint;
				}
				
				else if (document.getElementById('isentchange').checked) {
					nouveaupoint = localisation(e);
					duplicatectx.beginPath();
					duplicatectx.moveTo(point[0], point[1]);
					duplicatectx.lineTo(point[0], nouveaupoint[1]);
					duplicatectx.stroke();
					point = [point[0], nouveaupoint[1]];
				}

				else if (document.getElementById('mixture').checked) {
					nouveaupoint = localisation(e);
					duplicatectx.beginPath();
					duplicatectx.moveTo(point[0], point[1]);
					duplicatectx.lineTo(nouveaupoint[0], point[1]);
					duplicatectx.stroke();
					point = [nouveaupoint[0], point[1]];
				}
				else if (document.getElementById('isenpchange').checked) {
					nouveaupoint = localisation(e)
					duplicatectx.beginPath();
					duplicatectx.moveTo(point[0], point[1]);
					duplicatectx.lineTo(nouveaupoint[0], nouveaupoint[1]);
					duplicatectx.stroke();
					point = nouveaupoint;
				}
		
		}
		if (document.getElementById('numbers').checked) {
			duplicatectx.font = "20px Arial";
			duplicatectx.fillText(counter.toString(), nouveaupoint[0] - 15, nouveaupoint[1] - 5);
			counter = counter + 1;
			

			//nouveaupoint = [e.clientX - positionrect.left, e.clientY - positionrect.top];
			//duplicatectx.beginPath();
			//duplicatectx.moveTo(point[0], point[1]);
			//duplicatectx.lineTo(nouveaupoint[0], nouveaupoint[1]);
			//duplicatectx.stroke();
			//point = nouveaupoint;
        }
		//copie = duplicatecanvas;
		copiectx.drawImage(duplicatecanvas, 0, 0);
		


	}

	function plusproche() {
		//sketching = false;
	}


	function relache() {
		//sketching = false;
		highlight = true;
	}

	let what = false

	function deplace(e) {
		duplicatectx.clearRect(0, 0, duplicatecanvas.width, duplicatecanvas.height);
		duplicatectx.drawImage(copie, 0, 0);
		
		if ((!premier) && highlight) {
			//on modifie directement duplicatectx
			if (document.getElementById('constptchange').checked) {
				nouveaupoint = localisation(e);
				duplicatectx.beginPath();
				duplicatectx.moveTo(point[0], point[1]);
				// ligne remplacée par quad
				
				if (nouveaupoint[0] > point[0]) {
					duplicatectx.quadraticCurveTo(0.4 * point[0] + 0.6 * nouveaupoint[0], 0.6 * point[1] + 0.4 * nouveaupoint[1], nouveaupoint[0], nouveaupoint[1]);
				}
				else if (nouveaupoint[0] < point[0]) {
					duplicatectx.quadraticCurveTo(0.6 * point[0] + 0.4 * nouveaupoint[0], 0.6 * nouveaupoint[1] + 0.4 * point[1], nouveaupoint[0], nouveaupoint[1]);
				}

				//duplicatectx.lineTo(nouveaupoint[0], nouveaupoint[1]);
				

				duplicatectx.stroke();
				
			}

			else if (document.getElementById('isentchange').checked) {
				nouveaupoint = localisation(e);
				duplicatectx.beginPath();
				duplicatectx.moveTo(point[0], point[1]);
				duplicatectx.lineTo(point[0], nouveaupoint[1]);
				duplicatectx.stroke();
				
			}

			else if (document.getElementById('mixture').checked) {
				nouveaupoint = localisation(e);
				duplicatectx.beginPath();
				duplicatectx.moveTo(point[0], point[1]);
				duplicatectx.lineTo(nouveaupoint[0], point[1]);
				duplicatectx.stroke();
				
			}
			else if (document.getElementById('isenpchange').checked) {
				nouveaupoint = localisation(e)
				duplicatectx.beginPath();
				duplicatectx.moveTo(point[0], point[1]);
				duplicatectx.lineTo(nouveaupoint[0], nouveaupoint[1]);
				duplicatectx.stroke();
				
			}
			if (document.getElementById('numbers').checked) {
				duplicatectx.font = "20px Arial";
				duplicatectx.fillText(counter.toString(), nouveaupoint[0] - 15, nouveaupoint[1] - 5);
				
			}
		}
		
	}

	duplicatecanvas.addEventListener("mousedown", clique);
	duplicatecanvas.addEventListener("mouseup", relache);
	duplicatecanvas.addEventListener("mousemove", deplace);
	


});

	//resizing
//window.addEventListener("resize", () => {

