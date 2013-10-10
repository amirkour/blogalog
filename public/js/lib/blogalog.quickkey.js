/*
 * Attach a popup dialog that toggles on/off when the user types shift+enter
 * The dialog prompts the user for text input, and if the
 * received input matches any of the caller's 'keys', this plugin will invoke
 * the callback associated to the caller's 'key'.
 *
 * The caller is expected to pass in something like this as the options hash:
 * {
 * 		keys: {
 *			h: {
 *				description: "useful description that describes what happens when user types 'h'",
 *				cb: function(){
 *					// this is what gets invoked by the plugin when the user types 'h'
 *				}
 *			},
 *			c: {
 *				description: "useful description that describes what happens when user types 'c'",
 *				cb: function(){
 *					// this is what gets invoked by the plugin when the user types 'c'
 *				}
 *			}
 *		}
 * }
 *
 * So that when the user types the following sequence of keyboard keys:
 * shift+enter
 * 'h'
 * <enter>
 *
 * The callback associated to the 'h' key in the option hash is invoked by the plugin.
 */
(function($,window,document,undefined){

	// helper that'll toggle the input prompt visible/invisible
	function toggle(options){
		var strCurrent=options.main.css("display");
		if(strCurrent==="none"){
			options.main.css("display","block");
			options.input.focus();
		}else{
			options.main.css("display","none");
		}
	}

	/*
	 * quickkey plugin, see header notes for details on the options hash
	 *
	 */
	$.fn.quickkey=function(options){
		var $self=this;

		// no real point right now for passing in multiple selections. just gonna use the first one.
		var $recipient=$self.first();
		var $main=$(document.createElement("div")).css("background-color","white")
												  .css("border","thin solid black")
												  .css("border-radius","4px")
												  .css("position","absolute")
												  .css("top","100px")
												  .css("left","0px")
												  .css("display","none")
												  .css("padding", "5px");
		var input=document.createElement("input");
		input.type="text";
		input.className="form-control";
		input.setAttribute("placeholder","enter command");
		var $input=$(input);

		options=$.extend({
			keys: {},
			recipient: $recipient,
			main: $main,
			input: $input
		}, options);

		$recipient.keyup(function(e){
			if(e.which === 13 && e.shiftKey === true){ // enter+shift toggles $main
				toggle(options);
			}
		});

		$input.keyup(function(e){
			if(e.which === 13){// enter key toggles command reception
				var strInput=this.value;
				this.value='';
				if(!strInput) return;

				if(options.keys[strInput]){
					var cb=options.keys[strInput].cb;
					if(typeof cb==="function") cb.call();
					toggle(options);
				}
			}
		})

		var divCommands=document.createElement("div");
		for(var command in options.keys){
			var newDiv=document.createElement("div");
			newDiv.appendChild(document.createTextNode(command + ": "));
			newDiv.appendChild(document.createTextNode(options.keys[command].description || "No Description"));
			divCommands.appendChild(newDiv);
		}
		$main.append($input)
			 .append(document.createElement("hr"))
			 .append(divCommands);
		$recipient.append($main);
		return $self;
	};
})(jQuery,window,document);
