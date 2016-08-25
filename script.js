var slider = {
	slides:['images/img1.jpg',
			'images/img2.jpg',
			'images/img3.jpg',
			'images/img4.jpg',
			'images/img5.jpg',
			'images/img6.jpg', 
			'images/img7.jpg'
			],
	frame:0, 
	id:0,
	set: function(image) { 
		document.getElementById("scr").style.backgroundImage = "url("+image+")";
	},
	init: function() { 
		this.set(this.slides[this.frame]);
	},
	left: function() { 
		this.frame--;
		if(this.frame < 0) this.frame = this.slides.length-1;
		this.set(this.slides[this.frame]);
	},
	right: function() { 
		this.frame++;
		if(this.frame == this.slides.length) this.frame = 0;
		this.set(this.slides[this.frame]);		
	},
	start: function(id) {
		this.id = setInterval(function() { 
			slider.right();
		},3000);
	},
	stop: function() {
		clearInterval(this.id);
	}
};


window.onload = function() { 
	slider.init();
	var div = document.getElementById('main');
	div.addEventListener('mousemove', function(){
		slider.stop();
	});
	div.addEventListener("mouseout",function(){
		slider.start();
	})
	slider.start();

	var initialPoint;
	var finalPoint;

	document.addEventListener('touchstart', function(event) {
		event.preventDefault();
		event.stopPropagation();
		initialPoint = event.changedTouches[0];
	},false);

	document.addEventListener('touchend',function(event){
		event.preventDefault();
		event.stopPropagation();
		finalPoint = event.changedTouches[0];
		var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
		var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
		if (xAbs > 20 || yAbs > 20) {
		if (xAbs > yAbs) {
			if (finalPoint.pageX < initialPoint.pageX){
				slider.left()
			} else {
				slider.right();
			}
		}
	}
	}, false);
};

