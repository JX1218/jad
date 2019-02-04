// Cracked by JX1218

var sms_widget_captcha_url = 'https://www.google.com/recaptcha/api.js?onload=var_sms_widget_load_style&render=explicit';
var sms_widget_style_url = 'http://www.magtxt.biz/sms_widget.css';
var sms_widget_captcha_site_key = '6LdTCwcUAAAAAEshpW6LYfSxxEK4SAzJnEDEHrGz';
var sms_widget_sms_length_min = 6;
var sms_widget_sms_length_max = 160 - 32;//("\n\nfrom: JX1218\n(Don't Reply)").length;
var sms_widget_user_name_length_min = 4;
var sms_widget_user_name_length_max = 30;
var sms_widget_phone_number_max = 1;

var sms_widget_source = [
	"http://www.magtxt.com",
	"http://magtxt.com",
	"http://www.magtxt.biz",
	"http://magtxt.biz",
	"http://www.magtxt.net",
	"http://magtxt.net"
];

var sms_widget_source_gate = [
	"http://www.magtxt.biz/sms_processor_embed.php"
];

var sms_widget_class_toggle_button = 'sms-widget toggle-button';
var sms_widget_class_output = 'sms-widget output';
var sms_widget_class_form = 'sms-widget';
var sms_widget_class_user_name = 'sms-widget';
var sms_widget_class_phone_number = 'sms-widget';
var sms_widget_class_sms_message = 'sms-widget';
var sms_widget_class_remaining_characters = 'sms-widget remaining-characters';
var sms_widget_class_captcha_widget = 'sms-widget';
var sms_widget_class_button = 'sms-widget';
var sms_widget_class_clear_both = 'sms-widget clear-both';
var sms_widget_class_main_wrapper = 'sms-widget main-wrapper';
var sms_widget_class_main_container = 'sms-widget main-container';
var sms_widget_class_sub_container = 'sms-widget sub-container';
var sms_widget_class_input_container = 'sms-widget field-container input-container';
var sms_widget_class_output_container = 'sms-widget output-container';
var sms_widget_class_textarea_container = 'sms-widget textarea-container';
var sms_widget_class_button_container = 'sms-widget button-container';
var sms_widget_class_label = 'sms-widget';
var sms_widget_class_label_inline_right = 'sms-widget label-inline-right';

var sms_widget_captcha_widget_id_anchor = [];//Object.create(null);

/* = function(msg, url, linenumber) {
	alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
	return true;
}*/

function sms_widget_get_random_element(items) {
	if(items.length > 0) {
		return items[Math.floor(Math.random()*items.length)];
	}
	else {
		return null;
	}
}

function sms_widget_captcha_success(response) {
	/* do something on success */
}

function sms_widget_captcha_expired() {
	/* do something when it expires */
}

function sms_widget_render_captcha(id) {
	var elem = document.getElementById(id);
	if(elem && elem.innerHTML.length == 0) {
		var sms_widget_captcha_widget_id = grecaptcha.render(elem, {
			'sitekey' : sms_widget_captcha_site_key,
			'callback' : sms_widget_captcha_success,
			'expired-callback' : sms_widget_captcha_expired,
		});
		sms_widget_captcha_widget_id_anchor[sms_widget_captcha_widget_id] = id;
	}
}

function sms_widget_get_captcha_id(id) {
	var target_key = null;
	for (var key in sms_widget_captcha_widget_id_anchor) {
		if(sms_widget_captcha_widget_id_anchor[key] == id) {
			target_key = key;
		}
	}
	return target_key;
}

function sms_widget_reset_captcha(id) {
	var target_key = sms_widget_get_captcha_id(id);
	if(target_key != null) {
		grecaptcha.reset(target_key);
	}
}

function sms_widget_scroll_to(id, offset) {
	var rect = document.getElementById(id).getBoundingClientRect();
	var y = rect.top + offset;
	if(y < 0) {
		y = 0;
	}
	window.scrollTo(rect.left, y);
}

function sms_widget_display_result(e) {
	var origin = e.origin || e.originalEvent.origin;
	if(!(sms_widget_source.indexOf(origin) > -1)) {
		//From unauthorized domain.
		return;
	}
	else {
		//alert("FROM = " + origin + ", DATA = " +e.data);
		var result_raw = e.data;
		var result_elem = result_raw.split("<<<separator>>>");
		if(!(result_elem.length >= 2)) {
			//alert("The server is currently busy.\n Please try again later.");
		}
		else {
			var unique = result_elem[1];
			var result_flag = 0;
			var result = "";
			var node;
			
			if(result_elem.length > 2) {
				result = result_elem[2];
			}
			
			result_flag = parseInt(result_elem[0]);
			
			node = document.getElementById("change_flag"+"-"+unique);
			node.value = 0;
			
			node = document.getElementById("attempt_count"+"-"+unique);
			node.value = parseInt(node.value) + 1;
			
			if(result_flag == 1) {
				node = document.getElementById("sent_count"+"-"+unique);
				node.value = parseInt(node.value) + 1;
				document.getElementById("sms_message"+"-"+unique).value = "";
				sms_widget_characters_remaining("remaining_characters"+"-"+unique);
			}
			else {
				node = document.getElementById("sent_count"+"-"+unique);
				node.value = 0;
				sms_widget_characters_remaining("remaining_characters"+"-"+unique);
			}
			
			node = document.getElementById("result"+"-"+unique);
			if(result.length > 1) {
				node.innerHTML = result;
				node.style.display = "block";
				//document.getElementById("toggle_button"+"-"+unique).scrollIntoView();
				sms_widget_scroll_to("toggle_button"+"-"+unique, 0);
			}
			else {
				node.innerHTML = result;
				node.style.display = "none";
				//document.getElementById("toggle_button"+"-"+unique).scrollIntoView();
				sms_widget_scroll_to("toggle_button"+"-"+unique, 0);
			}
		}
	}
}

function sms_widget_toggle_visibility(id) {
	elem = document.getElementById(id);
	if(elem.style.display == "none") {
		elem.style.display = "block";
	}
	else if(elem.style.display == "block") {
		elem.style.display = "none";
	}
}

function sms_widget_toggle_change_flag(id) {
	elem = document.getElementById(id);
	elem.value = 1;
}

function sms_widget_create(elem) {
	var wrapper;
	var container;
	var input_container;
	var output_container;
	var node;
	var form_container;
	
	//Return a random number between 1 and 100:
	var unique = Math.floor((Math.random() * 100) + 1);
	
	node = document.createElement("DIV");
	node.setAttribute("name", "sms_widget_wrapper");
	node.setAttribute("id", "wrapper"+"-"+unique);
	node.setAttribute("class", sms_widget_class_main_wrapper);
	node.style.display = "none";
	elem.appendChild(node);
	wrapper = node;
	container = node;
	
	node = document.createElement("SECTION");
	node.setAttribute("name", "container"+"-"+unique);
	node.setAttribute("id", "container"+"-"+unique);
	node.setAttribute("class", sms_widget_class_main_container);
	container.appendChild(node);
	container = node;
	
	node = document.createElement("BUTTON");
	node.setAttribute("name", "toggle_button"+"-"+unique);
	node.setAttribute("id", "toggle_button"+"-"+unique);
	node.setAttribute("type", "button");
	node.setAttribute("value", "Free & Unlimited SMS/Texting");
	node.setAttribute("onclick", "sms_widget_toggle_visibility('"+"sub_container"+"-"+unique+"');");
	node.setAttribute("class", sms_widget_class_toggle_button);
	node.innerHTML = "Free & Unlimited SMS/Texting";
	container.appendChild(node);
	
	node = document.createElement("DIV");
	node.setAttribute("name", "sub_container"+"-"+unique);
	node.setAttribute("id", "sub_container"+"-"+unique);
	node.setAttribute("class", sms_widget_class_sub_container);
	node.style.display = "block";
	container.appendChild(node);
	container = node;
	
	node = document.createElement("DIV");
	node.setAttribute("class", sms_widget_class_output_container);
	container.appendChild(node);
	output_container = node;
	
	node = document.createElement("DIV");
	node.setAttribute("name", "result"+"-"+unique);
	node.setAttribute("id", "result"+"-"+unique);
	node.setAttribute("class", sms_widget_class_output);
	node.style.display = "none";
	output_container.appendChild(node);
	
	node = document.createElement("FORM");
	node.setAttribute("name", "form"+"-"+unique);
	node.setAttribute("id", "form"+"-"+unique);
	node.setAttribute("action", sms_widget_get_random_element(sms_widget_source_gate));
	node.setAttribute("method", "post");
	node.setAttribute("target", "result_raw"+"-"+unique);
	node.setAttribute("onsubmit", "return sms_widget_validation(this);");
	node.setAttribute("class", sms_widget_class_form);
	container.appendChild(node);
	form_container = node;
	
	node = document.createElement("DIV");
	node.setAttribute("class", sms_widget_class_input_container);
	form_container.appendChild(node);
	input_container = node;
	
	node = document.createElement("LABEL");
	node.setAttribute("for", "user_name"+"-"+unique);
	node.innerHTML = "Your Name";
	node.setAttribute("class", sms_widget_class_label);
	input_container.appendChild(node);
	
	node = document.createElement("INPUT");
	node.setAttribute("name", "user_name");
	node.setAttribute("id", "user_name"+"-"+unique);
	node.setAttribute("type", "text");
	node.setAttribute("required", "required");
	node.setAttribute("placeholder", "JuanDelaCruz");
	node.setAttribute("onclick", "sms_widget_characters_remaining('"+"remaining_characters"+"-"+unique+"');");
	node.setAttribute("onfocus", "sms_widget_characters_remaining('"+"remaining_characters"+"-"+unique+"');");
	node.setAttribute("onkeyup", "sms_widget_characters_remaining('"+"remaining_characters"+"-"+unique+"');");
	node.setAttribute("onkeydown", "sms_widget_toggle_change_flag('"+"change_flag"+"-"+unique+"');");
	node.setAttribute("onchange", "sms_widget_toggle_change_flag('"+"change_flag"+"-"+unique+"');");
	node.setAttribute("class", sms_widget_class_user_name);
	input_container.appendChild(node);
	
	node = document.createElement("DIV");
	node.setAttribute("class", sms_widget_class_input_container);
	form_container.appendChild(node);
	input_container = node;
	
	node = document.createElement("LABEL");
	node.setAttribute("for", "phone_number"+"-"+unique);
	node.innerHTML = "Recipient's Phone Number";
	node.setAttribute("class", sms_widget_class_label);
	input_container.appendChild(node);
	
	node = document.createElement("INPUT");
	node.setAttribute("name", "phone_number");
	node.setAttribute("id", "phone_number"+"-"+unique);
	node.setAttribute("type", "text");
	node.setAttribute("required", "required");
	node.setAttribute("placeholder", "09191234567");
	node.setAttribute("onkeydown", "sms_widget_toggle_change_flag('"+"change_flag"+"-"+unique+"');");
	node.setAttribute("onchange", "sms_widget_toggle_change_flag('"+"change_flag"+"-"+unique+"');");
	node.setAttribute("class", sms_widget_class_phone_number);
	input_container.appendChild(node);
	
	node = document.createElement("DIV");
	node.setAttribute("class", sms_widget_class_input_container);
	form_container.appendChild(node);
	input_container = node;
	
	node = document.createElement("LABEL");
	node.setAttribute("for", "sms_message"+"-"+unique);
	node.innerHTML = "Message";
	node.setAttribute("class", sms_widget_class_label);
	input_container.appendChild(node);
	
	node = document.createElement("DIV");
	node.setAttribute("class", sms_widget_class_textarea_container);
	input_container.appendChild(node);
	input_container = node;
	
	node = document.createElement("TEXTAREA");
	node.setAttribute("name", "sms_message");
	node.setAttribute("id", "sms_message"+"-"+unique);
	node.setAttribute("rows", "3");
	node.setAttribute("cols", "20");
	node.setAttribute("required", "required");
	node.setAttribute("placeholder", "Type you message here.");
	//node.setAttribute("onclick", "sms_widget_render_captcha('"+"captcha_widget"+"-"+unique+"');sms_widget_characters_remaining('"+"remaining_characters"+"-"+unique+"');");
	node.setAttribute("onclick", "sms_widget_characters_remaining('"+"remaining_characters"+"-"+unique+"');");
	node.setAttribute("onfocus", "sms_widget_characters_remaining('"+"remaining_characters"+"-"+unique+"');");
	node.setAttribute("onkeyup", "sms_widget_characters_remaining('"+"remaining_characters"+"-"+unique+"');");
	node.setAttribute("class", sms_widget_class_sms_message);
	input_container.appendChild(node);
	
	node = document.createElement("DIV");
	node.setAttribute("class", sms_widget_class_input_container);
	form_container.appendChild(node);
	input_container = node;
	
	node = document.createElement("DIV");
	node.setAttribute("id", "remaining_characters"+"-"+unique);
	node.setAttribute("class", sms_widget_class_remaining_characters);
	node.innerHTML = ""+sms_widget_sms_length_max+"";
	input_container.appendChild(node);
	
	node = document.createElement("LABEL");
	node.setAttribute("for", "remaining_characters"+"-"+unique);
	node.innerHTML = "Remaining Characters";
	node.setAttribute("class", sms_widget_class_label_inline_right);
	input_container.appendChild(node);
	
	node = document.createElement("DIV");
	node.setAttribute("class", sms_widget_class_clear_both);
	input_container.appendChild(node);
	
	node = document.createElement("DIV");
	node.setAttribute("class", sms_widget_class_input_container);
	form_container.appendChild(node);
	input_container = node;
	
	node = document.createElement("DIV");
	//node.setAttribute("name", "captcha_widget"+"-"+unique);
	node.setAttribute("name", "captcha_widget");
	node.setAttribute("id", "captcha_widget"+"-"+unique);
	node.setAttribute("class", sms_widget_class_captcha_widget);
	input_container.appendChild(node);
	
	node = document.createElement("DIV");
	node.style.display = "none";
	form_container.appendChild(node);
	input_container = node;
	
	node = document.createElement("INPUT");
	node.setAttribute("name", "unique_id");
	node.setAttribute("id", "unique_id"+"-"+unique);
	node.setAttribute("type", "hidden");
	node.setAttribute("value", ""+unique+"");
	input_container.appendChild(node);
	
	node = document.createElement("INPUT");
	node.setAttribute("name", "attempt_count");
	node.setAttribute("id", "attempt_count"+"-"+unique);
	node.setAttribute("type", "hidden");
	node.setAttribute("value", "0");
	input_container.appendChild(node);
	
	node = document.createElement("INPUT");
	node.setAttribute("name", "sent_count");
	node.setAttribute("id", "sent_count"+"-"+unique);
	node.setAttribute("type", "hidden");
	node.setAttribute("value", "0");
	input_container.appendChild(node);
	
	node = document.createElement("INPUT");
	node.setAttribute("name", "change_flag");
	node.setAttribute("id", "change_flag"+"-"+unique);
	node.setAttribute("type", "hidden");
	node.setAttribute("value", "1");
	input_container.appendChild(node);
	
	node = document.createElement("DIV");
	node.setAttribute("class", sms_widget_class_button_container);
	form_container.appendChild(node);
	input_container = node;
	
	node = document.createElement("BUTTON");
	node.setAttribute("name", "submit"+"-"+unique);
	node.setAttribute("id", "submit"+"-"+unique);
	node.setAttribute("type", "submit");
	node.setAttribute("value", "Send");
	node.setAttribute("class", sms_widget_class_button);
	node.innerHTML = "Send";
	input_container.appendChild(node);
	
	node = document.createElement("IFRAME");
	node.setAttribute("name", "result_raw"+"-"+unique);
	node.setAttribute("id", "result_raw"+"-"+unique);
	node.setAttribute("onload", "sms_widget_reset_captcha('"+"captcha_widget"+"-"+unique+"');");
	node.style.width = "100%";
	node.style.display = "none";
	container.appendChild(node);
	
	/*node = document.createElement("SCRIPT");
	node.setAttribute("defer", "");
	node.innerHTML = "sms_widget_render_captcha('"+"captcha_widget"+"-"+unique+"');";
	container.appendChild(node);*/
	
	//wrapper.style.display = "block";
	
	//elem.style.display = "block";
}

function sms_widget_create_all() {
	var elem = document.getElementsByName("sms_widget");
	for(var i = 0; i < elem.length; i = i + 1) {
		sms_widget_create(elem[i]);
	}
	
	window.onload = function () {
		for(var i = 0; i < elem.length; i = i + 1) {
			elem[i].style.display = "block";
		}
		
		var elem_wrapper = document.getElementsByName("sms_widget_wrapper");
		for(var i = 0; i < elem_wrapper.length; i = i + 1) {
			elem_wrapper[i].style.display = "block";
		}
		
		var elem_captcha = document.getElementsByName("captcha_widget");
		for(var i = 0; i < elem_captcha.length; i = i + 1) {
			sms_widget_render_captcha(elem_captcha[i].id);
		}
	};
	
	window.addEventListener( "message", sms_widget_display_result, false);
}

function sms_widget_make_UL(array) {
    // Create the list element:
    var list = document.createElement('ul');
	var item;
	
    for(var i = 0; i < array.length; i++) {
        // Create the list item:
        item = document.createElement('li');

        // Set its contents:
        item.appendChild(document.createTextNode(array[i]));

        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}

function sms_widget_validation(elem) {
	var error = [];
	var unique = elem.name.split("-")[1];
	var captcha_id = sms_widget_get_captcha_id("captcha_widget"+"-"+unique);
	var captcha_response = null;
	
	var user_name = document.getElementById("user_name"+"-"+unique);
	var phone_number = document.getElementById("phone_number"+"-"+unique);
	var sms_message = document.getElementById("sms_message"+"-"+unique);
	
	var test_string = "";
	var forbidden_string = "";
	var forbidden_char_count = 0;
	var test_char_code = 0;
	var regex_template = null;
	var count = 0;
	
	var node;
	
	//Validate the User Name
	test_string = user_name.value;
	if(test_string.length == 0) {
		error.push("You must enter a user name.");
	}
	else {
		//Forbidden Characters
		forbidden_string = "";
		forbidden_char_count = 0;
		for(var i=0; i<test_string.length; i++) {
			test_char_code = test_string.charCodeAt(i);
			if(
				//Numbers 0 to 9
				(test_char_code > 47 && test_char_code < 58)  
				//Letters A to Z
				|| (test_char_code > 64 && test_char_code < 91) 
				//Letters a to z
				|| (test_char_code > 96 && test_char_code < 123) 
			) {
			}
			else {
				if(test_string.charAt(i) == " " && forbidden_string.indexOf("space") == -1) {
					forbidden_string = forbidden_string + " " + "space";
					forbidden_char_count = forbidden_char_count + 1;
				}
				else if(forbidden_string.indexOf(test_string.charAt(i)) == -1) {
					forbidden_string = forbidden_string + " " + test_string.charAt(i);
					forbidden_char_count = forbidden_char_count + 1;
				}
			}
		}
		if(forbidden_char_count > 0) {
			if(forbidden_char_count == 1) {
				error.push("User name may only contain letters and numbers. It may not contain the character:"+forbidden_string);
			}
			else {
				error.push("User name may only contain letters and numbers. It may not contain the characters:"+forbidden_string);
			}
		}
		//Improper Format
		regex_template = new RegExp("^[a-zA-Z]+[0-9]*$");
		if(regex_template.test(test_string) == false) {
			error.push("User name must start with letters and may end with numbers.");
		}
		//Invalid Length
		if(test_string.length < sms_widget_user_name_length_min || test_string.length > sms_widget_user_name_length_max) {
			error.push("User name must be more than "+sms_widget_user_name_length_min+" characters and less than "+sms_widget_user_name_length_max+" characters.");
		}
	}
	
	//Validate the Phone Number
	test_string = phone_number.value;
	if(test_string.length == 0) {
		error.push("You must enter a phone number.");
	}
	else {
		//Remove Duplicates
		count = (test_string.match(/,/g) || []).length + 1;
		if(count > 1) {
			var phone_number_arr_temp = [];
			var phone_number_arr_new = [];
			phone_number_arr_temp = test_string.split(",");
			for(var i = 0; i< phone_number_arr_temp.length; i = i + 1) {
				if(phone_number_arr_new.indexOf(phone_number_arr_temp[i]) === -1) {
					phone_number_arr_new.push(phone_number_arr_temp[i]);
				}
			}
			phone_number.value = phone_number_arr_new.join(",");
			count = phone_number_arr_new.length;
		}
		//Forbidden Characters
		forbidden_string = "";
		forbidden_char_count = 0;
		for(var i=0; i<test_string.length; i++) {
			test_char_code = test_string.charCodeAt(i);
			if(
				//Numbers 0 to 9
				(test_char_code > 47 && test_char_code < 58) 
				//Comma
				|| (test_char_code == 44)
			) {
			}
			else {
				if(test_string.charAt(i) == " " && forbidden_string.indexOf("space") == -1) {
					forbidden_string = forbidden_string + " " + "space";
					forbidden_char_count = forbidden_char_count + 1;
				}
				else if(forbidden_string.indexOf(test_string.charAt(i)) == -1) {
					forbidden_string = forbidden_string + " " + test_string.charAt(i);
					forbidden_char_count = forbidden_char_count + 1;
				}
			}
		}
		if(forbidden_char_count > 0) {
			if(forbidden_char_count == 1) {
				error.push("Phone number may only contain numbers and commas. It may not contain the character:"+forbidden_string);
			}
			else {
				error.push("Phone number may only contain numbers and commas. It may not contain the characters:"+forbidden_string);
			}
		}
		//Improper Format
		regex_template = new RegExp("^[0-9]{11}(,[0-9]{11})*$");
		if(regex_template.test(test_string) == false) {
			error.push("Phone number must follow the format: 09191234567.");
		}
		//Multiple Phone Numbers Maximum
		if(count > sms_widget_phone_number_max) {
			error.push("You may only send a maximum of "+sms_widget_phone_number_max+" recipients at a time.");
		}
	}
	
	//Validate the SMS Message
	test_string = sms_message.value;
	if(test_string.length == 0) {
		error.push("You must enter a message.");
	}
	else {
		//Forbidden Characters
		forbidden_string = "";
		forbidden_char_count = 0;
		for(var i=0; i<test_string.length; i++) {
			test_char_code = test_string.charCodeAt(i);
			if(
				//All Keyboard Characters
				(test_char_code > 31 && test_char_code < 127)
				//New Line Feed
				|| (test_char_code == 10)
			) {
			}
			else {
				if(forbidden_string.indexOf(test_string.charAt(i)) == -1) {
					forbidden_string = forbidden_string + " " + test_string.charAt(i);
					forbidden_char_count = forbidden_char_count + 1;
				}
			}
		}
		if(forbidden_char_count > 0) {
			if(forbidden_char_count == 1) {
				error.push("Message may only contain keyboard characters. It may not contain the character:"+forbidden_string);
			}
			else {
				error.push("Message may only contain keyboard characters. It may not contain the characters:"+forbidden_string);
			}
		}
	}
	
	//Validate the total SMS length.
	test_string = user_name.value + ":\n" + sms_message.value;
	var user_name_length = user_name.value.length;
	var sms_message_length = sms_message.value.length;
	var sms_length = test_string.length;
	if(sms_length > sms_widget_sms_length_max) {
		if(sms_message_length == 0) {
			error.push("The user name length of "+user_name_length+" characters is too long.");
		}
		else if(sms_message_length == 1) {
			error.push("The message length of "+sms_message_length+" character is too long.");
		}
		else if(sms_message_length > 1) {
			error.push("The message length of "+sms_message_length+" characters is too long.");
		}
	}
	else if(sms_length <= sms_widget_sms_length_min) {
		if(sms_message_length == 1) {
			error.push("The message length of "+sms_message_length+" character is too short.");
		}
		else if(sms_message_length > 1) {
			error.push("The message length of "+sms_message_length+" characters is too short.");
		}
	}
	
	//Check if captcha is completed.
	if(captcha_id != null) {
		captcha_response = grecaptcha.getResponse(captcha_id);
	}
	if(captcha_response == null || captcha_response.length == 0) {
		error.push("You must complete the captcha verification.");
	}
	
	//Finalization
	node = document.getElementById("result"+"-"+unique);
	if(error.length == 0) {
		node.style.display = "none";
		//node.scrollIntoView();
		//document.getElementById("toggle_button"+"-"+unique).scrollIntoView();
		//sms_widget_scroll_to("toggle_button"+"-"+unique, 0);
		return true;
	}
	else {
		//node.innerHTML = error.join("<br>");
		node.innerHTML = "";
		node.appendChild(sms_widget_make_UL(error));
		node.style.display = "block";
		//node.focus();
		//node.scrollIntoView();
		//document.getElementById("toggle_button"+"-"+unique).scrollIntoView();
		sms_widget_scroll_to("toggle_button"+"-"+unique, 0);
		return false;
	}
}

function sms_widget_characters_remaining(id) {
	var unique = id.split("-")[1];
	var remaining_characters_node = document.getElementById("remaining_characters"+"-"+unique);
	var user_name_node = document.getElementById("user_name"+"-"+unique);
	var sms_message_node = document.getElementById("sms_message"+"-"+unique);
	var user_name = (""+user_name_node.value+"").replace("\r", "");
	var sms_message = (""+sms_message_node.value+"").replace("\r", "");
	var sms = user_name + ":\n" + sms_message;
	var remaining_characters = sms_widget_sms_length_max - sms.length;
	
	var count = (sms_message_node.value.match(/\n/g) || []).length;
	
	if(remaining_characters < 0) {
		remaining_characters = 0;
	}
	remaining_characters_node.innerHTML = ""+remaining_characters+"";
	if(sms_message.length <= sms_widget_sms_length_max) {
		user_name_node.setAttribute("maxlength", sms_widget_sms_length_max - sms_message.length);
	}
	if(user_name.length <= sms_widget_sms_length_max) {
		sms_message_node.setAttribute("maxlength", (sms_widget_sms_length_max - (user_name.length + 2)) + count);
	}
}

function sms_widget_load_style(url, callback) { 
	var file = document.createElement("LINK");
	file.setAttribute("href", url);
    file.setAttribute("type", "text/css");
    file.setAttribute("rel", "stylesheet");
	if(callback) {
		script.onreadystatechange = callback;
		script.onload = callback;
	}
    document.head.appendChild(file);
}

function sms_widget_load_script(url, callback) {
	var file = document.createElement("SCRIPT");
    file.setAttribute("src", url);
	file.setAttribute("type", "text/javascript");
	file.setAttribute("async", "");
    file.setAttribute("defer", "");
	if(callback) {
		script.onreadystatechange = callback;
		script.onload = callback;
	}
	document.head.appendChild(file);
}

var var_sms_widget_create_all = sms_widget_create_all();

var var_sms_widget_load_style = sms_widget_load_style(sms_widget_style_url, var_sms_widget_create_all);

sms_widget_load_script(sms_widget_captcha_url, null);