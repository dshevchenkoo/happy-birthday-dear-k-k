(function(){
	
	var Memory = {

		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
     		this.guess = null;
			this.binding();
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		// kinda messy but hey
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img style="width: 100%;height: 100%;object-fit: contain;" src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img style="width: 100%;height: 100%;object-fit: contain;" src="https://illustrators.ru/uploads/illustration/image/1012443/main_Happy_Birthday_-_s.jpg"\
				alt="Codepen" /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	

	const urlImages = [
		{
			name: "1",
			img: "https://sun9-42.userapi.com/impf/c627122/v627122809/271ed/qT7kM7qShl8.jpg?size=1280x854&quality=96&sign=051ffeba202c4485318e8cfa449a35cf",
			id: 1,
		},
		{
			name: "2",
			img: "https://sun9-43.userapi.com/impf/C3NSrOvrsx0HYPv7pA0CBZRgQ0KhULVFop5cgg/7M4_JUuTP20.jpg?size=1280x854&quality=96&sign=b03a1088b4e261ba3d29a89d69a30d28",
			id: 2
		},
		{
			name: "4",
			img: "https://sun9-24.userapi.com/impf/c841333/v841333259/58958/kxUmneG8VTI.jpg?size=1280x960&quality=96&sign=fbce7b8d636f9c7dd87572b06fa6e948",
			id: 4
		}, 
		{
			name: "5",
			img: "https://sun9-53.userapi.com/c11173/u63963809/-6/y_d4e61bd1.jpg",
			id: 5
		},
		{
			name: "6",
			img: "https://sun9-35.userapi.com/impg/ZO1vZyAP3342oWRsEdcbw-ufL7T22Xwc2tAORQ/-n3Da-afaz0.jpg?size=1042x1080&quality=96&proxy=1&sign=2e65bad99d2d9097e9bf93ba8fd489bf",
			id: 6
		},
		{
			name: "7",
			img: "https://sun9-5.userapi.com/impg/gEdb1iIbhnStHaPw1cCvD82GoklykCIhVTmlmA/ptqqphlgueE.jpg?size=1080x720&quality=96&proxy=1&sign=9a483b8f85baf13b1abad17939130afe",
			id: 7
		},
		{
			name: "8",
			img: "https://sun9-13.userapi.com/impg/TFIErp05qCyBKW0ZM65Qc1DTz4pys3wUT2q1KQ/6QwuvKJU3aY.jpg?size=640x640&quality=96&proxy=1&sign=1cb13e7e1cb2a7787f4fd3f5b92cc523",
			id: 8
		},
		{
			name: "9",
			img: "https://sun9-65.userapi.com/impg/FpJd4YIm4AJV8W7iMHp1IH-9aW7SCeLLIPEqug/EogzlsurdtY.jpg?size=640x640&quality=96&proxy=1&sign=65839da17627cf15b0f1742c5cc2bd58",
			id: 9
		},
		{
			name: "10",
			img: "https://sun9-47.userapi.com/impg/fe_qtkAV7SG7TKR2GVHyQLJVO_Ht6gumARR3wA/n5l45pdDwW0.jpg?size=640x800&quality=96&proxy=1&sign=c784487ede7ceaac935cf4bacec6c793",
			id: 10
		},
		{
			name: "11",
			img: "https://sun9-57.userapi.com/impg/HvpsqqgcK9T_BywW6n5MrSRhnyvAjmD3Q2v1cw/H5nmUjViCxI.jpg?size=640x480&quality=96&proxy=1&sign=0888563a292d6fe6bec2d9b3bbb4669d",
			id: 11
		},
		{
			name: "12",
			img: "https://sun9-31.userapi.com/impg/IgFGEAk_8ao_t4ovlAHcuqBOSkKtOnNQfdZv-A/gC6TH_7S26g.jpg?size=640x640&quality=96&proxy=1&sign=c0c0f3f2a57cd8ff4cfe4daca4c11634",
			id: 12
		},

		{
			name: "13",
			img: "https://sun9-30.userapi.com/impg/IDTviBxW9HHwKJn6gImwx74wNKlIR-4rW91JMA/f9D6vKAvjwk.jpg?size=640x479&quality=96&proxy=1&sign=70983a869cf0e5c40195639a98656a3c",
			id: 13
		},

		{
			name: "14",
			img: "https://sun9-9.userapi.com/impg/oCk2At215Eek0KVL6H3hXLdgmH3rIGigWErrZg/AxsU6JWJiN8.jpg?size=640x483&quality=96&proxy=1&sign=bf4430daf620e71b5401e4fa9b831d8b",
			id: 14
		},

		{
			name: "15",
			img: "https://sun9-13.userapi.com/impg/9gIPkLF55x95ur4Qc2PqhMIiK4Cd0ICGw6zLYw/Ujv4g5PNoLI.jpg?size=640x567&quality=96&proxy=1&sign=4878b4be8ee211327cd56fc57ad5f8b3",
			id: 15
		},

		{
			name: "16",
			img: "https://sun9-48.userapi.com/impg/c759VvGYuDFBb41k-QI7NCDhtzuyD8KLz4dd_g/02gBkuwoO10.jpg?size=640x800&quality=96&proxy=1&sign=56002bef70e5f5a922902e376cb465bb",
			id: 16
		},

		{
			name: "17",
			img: "https://sun9-3.userapi.com/impg/CWKfcsgcEbX8EaHKtZ0hH8KG_psKi7waK5d4AQ/fEoM_9SHtog.jpg?size=640x640&quality=96&proxy=1&sign=4f37e18c357bf3852923563a7c0db733",
			id: 17
		},

		{
			name: "18",
			img: "https://sun9-15.userapi.com/impg/T5UBuVSG3HjdPycIitiShiM6f35YZXq0nppf3Q/SAwZrciWhps.jpg?size=640x529&quality=96&proxy=1&sign=07ea56df33bedab127066ea865bad022",
			id: 18
		},

		{
			name: "19",
			img: "https://sun9-38.userapi.com/impg/Q-gHERZuCRmP0D3iTR0Em9AxYg2dEwiJ3hjf1Q/Xe9-hdIHrec.jpg?size=640x480&quality=96&proxy=1&sign=6d8a4ee898c26ee67c733bfa1517bfa1",
			id: 19
		},


		{
			name: "20",
			img: "https://sun9-37.userapi.com/impg/4wbl83WJKFSKB3nHLpXgS4i_RjuIQZzcjPJQNw/LVU7Gd4c1Iw.jpg?size=640x641&quality=96&proxy=1&sign=49426aba5c3f1ffb2aa8adf8f5d0447f",
			id: 20
		},


		{
			name: "21",
			img: "https://sun9-52.userapi.com/impg/4HDNj98iQ9otek65dUSEEP3lu-jD_1hIJYOcBQ/jA4dNxGbdxU.jpg?size=640x640&quality=96&proxy=1&sign=8b0519b5daec2f174fde89852968aedd",
			id: 21
		},


		{
			name: "22",
			img: "https://sun9-27.userapi.com/impg/LoNE8cfQfqv_7Y0Eb9RgvcuMvyhUDSUrB7DTtQ/bp4JjfxxHeI.jpg?size=640x480&quality=96&proxy=1&sign=9ae636db11b247c877e5bf3251a846df",
			id: 22
		},


		{
			name: "23",
			img: "https://sun9-10.userapi.com/impg/hk3ZC8ZyK0x86UuOvxUq-ZNXSBI1pDFjgXW4Kw/UIYzJj7s2JI.jpg?size=640x639&quality=96&proxy=1&sign=0cc6bcf87df87f360bdaa8fedac38cd0",
			id: 23
		},


		{
			name: "24",
			img: "https://sun9-15.userapi.com/impg/5qC6t3GNDLJSOd56of3RCZuS0QsSHWai6A0rlg/m6wvMsS5fjs.jpg?size=640x520&quality=96&proxy=1&sign=220530a0178b87741e67e40b398524d2",
			id: 24
		},
	];


	const shuffle = (array) => {
		array.sort(() => Math.random() - 0.5);
		return array;
	  }

	let cards = shuffle(urlImages);
    
	Memory.init(cards.slice(0, 12));


})();