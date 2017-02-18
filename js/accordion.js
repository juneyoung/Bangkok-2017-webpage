// 잔여 
// 1. Slide 처리
// 2. Accordion 스왑
// 3. 시작시에 root 만 설정하고 내용을 array 로 밀어 넣으면 DOM 을 생성할 수 있도록 
var Accordion = {
	Naming : {
		Button : 'accordion_btn'
		, Content : 'accordion_cont'
		, Root : 'accordion-root'
		, Group : 'accordion-group-control'
		, Theme : {
			Default : 'default'
			, Nordic : 'nordic'
		}
	}

	, buttons : []

	, Utils : {
		findRoot : function(elem, key){
			//recursive search
			if(!elem) {
				console.error('Element does not exist');
				return elem;
			}

			if(!key) {
				console.error('Key does not exist');
				return elem;
			}
			//finding
			var hasKey = elem.hasAttribute(key);
			if(hasKey) return elem;
			else {
				return this.findRoot(elem.parentNode, key);
			}
		}
	}

	, ready : function(){
		console.log('collecting Elements By class Name accordion_*')
		console.log('finding *_btn');
		this.buttons = document.querySelectorAll('.' + this.Naming.Button + '');
		console.log('Accordion button count : ' + this.buttons.length);
	}

	, setThemes : function (themesName){
		console.log('Themes [' + themesName + '] has selected' );
	}

	, init : function(themes){
		if(!!themes) this.setThemes(themes);
		this.ready();
		this.setEvents();
	}

	, setEvents : function(){
		var me = this;
		var btns = this.buttons;
		for(var i = 0; i < btns.length; i++) {
			console.log('Attaching event [' + i + ']')
			var singleBtn = btns[i];
			if(!!singleBtn) {
				singleBtn.addEventListener('click', function(){
					console.log('clicked!');
					// 자기에게 가까운 accordion_cont 를 찾아서 display 속성을 변경함 
					var myRoot = me.Utils.findRoot(this, me.Naming.Root);
					var groupRoot = me.Utils.findRoot(this, me.Naming.Group);
					if(!myRoot){
						console.error('This element does not have root - ', this);
						return;
					}

					if(!groupRoot) {
						console.error('This element does not have group-control - ', this);
						return;

					}

					var contents = this.parentNode.querySelector('.accordion_cont');

					if(!!groupRoot) {
						var others = document.querySelectorAll('[' + me.Naming.Root + ']');
						for(var i = 0; i < others.length; i ++){
							var loopCont = others[i].querySelector('.accordion_cont');
							if(loopCont != contents){
								others[i].querySelector('.accordion_cont').style.display = 'none';
							} else {
								var currentStatus = contents.style.display;
								contents.style.display = (!currentStatus || currentStatus == 'none') ? 'block' : 'none';
							}
						}
					} else {
						console.error('group-root does not exist');
					}
				}, false);
			}
		}
	}
}