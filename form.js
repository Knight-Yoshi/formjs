(function formModule(factory) {
	"use strict";

	if (typeof define === "function" && define.amd) {
		define(factory);
	}
	else if (typeof module != "undefined" && typeof module.exports != "undefined") {
		module.exports = factory();
	}
	else {
		/* jshint sub:true */
		window["Form"] = factory();
	}
})(function formFactory() {
	class Form {
		constructor(attrs = {}) {
			this.initialize(attrs);
		}
		
		initialize (attrs = {}) {
			this.attrs = attrs;
		}
		
		create_form (attrs = {}) {
			var form = document.createElement('form');
			if(Object.keys(attrs).length > 0) this.attrs = attrs;
			
			Form.create_attrs (form, this.attrs);
			return form;
		}
		
		create_multipart (attrs = {}) {
			attrs.enctype = 'multipart/form-data';
			return this.create_form(attrs);
		}
		
		create_fieldset (fieldset_title, fieldset_id = '', attrs = {}) {
			var fieldset = document.createElement('fieldset');
			
			if(fieldset_title) {
				var legend = fieldset.appendChild(document.createElement('legend'));
				
				legend.textContent = fieldset_title;
			}
			
			if(fieldset_id) {
				fieldset.id = fieldset_id;
			}
			
			Form.create_attrs(fieldset, attrs);
			
			return fieldset;
		}
		
		create_input (name, type = 'text', value = '', attrs = {} ) {
			if(!type) type = 'text';
			var input = new Form_input(type, name, Form.prep(value), attrs);
			return this._create_element(input, attrs);
		}
		
		create_text (name, value = '', attrs = {}) {
			return this.create_input(name, 'text', Form.prep(value), attrs);
		}
		
		create_password (name, value = '', attrs = {}) {
			return this.create_input(name,'password', Form.prep(value), attrs);
		}
		
		create_number (name, value = '', attrs = {}) {
			return this.create_input(name, 'number', Form.prep(value), attrs);
		}
		
		create_email (name, value = '', attrs = {}) {
			return this.create_input(name, 'email', Form.prep(value), attrs);
		}
		
		create_range (name, value = '', attrs = {}) {
			return this.create_input(name, 'range', Form.prep(value), attrs);
		}
		
		create_url (name, value = '', attrs = {}) {
			return this.create_input(name,'url', Form.prep(value), attrs);
		}
		
		create_search (name, value = '', attrs = {}) {
			return this.create_input(name,'search', Form.prep(value), attrs);
		}
		
		create_hidden (name, value = '', attrs = {}) {
			return this.create_input(name,'hidden', value, attrs);
		}
		
		create_radio (name, value = '', attrs = {}) {
			return this.create_input(name,'radio', value, attrs);
		}
		
		create_checkbox (name, value = '', attrs = {}) {
			return this.create_input(name,'checkbox', Form.prep(value), attrs);
		}
		
		create_file (name, attrs = {}) {
			return this.create_input(name,'file', '', attrs);
		}
		
		create_select (name, options = {}, value = '', attrs = {}, first_option = '', disabled = []) {
			var select = new Form_select(name, options, value, attrs, first_option, disabled);
			return this._create_element(select);
		}
		
		create_textarea (name, value = '', attrs = {}) {
			var textarea = new Form_textarea(name, Form.prep(value), attrs);
			return this._create_element(textarea);
		}
		
		create_button (value, name = '', type = 'button', attrs = {}, use_input = true, text = '') {
			var button;
			
			if(use_input) {
				if(!name) {
					name = Form.create_id('form');
				}
				button = this.create_input(name, type, value, attrs);
			} else {
				button = new Form_button(type, name, value, attrs, text);
				button = button.render();
			}
			
			return button;
		}
		
		create_submit (value, name = '', attrs = {}, use_input = false, text = 'Submit') {
			return this.create_button(value, name, 'submit', attrs, use_input, text);
		}
		
		create_reset (value, name = '', attrs = {}, use_input = false, text = 'Reset') {
			return this.create_button(value, name, 'reset', attrs, use_input, text);
		}
		
		create_image (src, name = '', value = '', attrs = {}) {
			if(!attrs.src) attrs.src = src;
			var image = this.create_input(name, 'image', value, attrs);
			return image;
		}
		
		static prep (str) {		
			if(typeof str !== 'string') return '';
			
			var map = {
				'&' : '&amp;',
				'<' : '&lt;',
				'>' : '&gt;',
				'"' : '&quot;',
				'\'' : '&apos;'
			};

			return str.replace ( /[&<>"']/g, function ( m )
			{
				return map[ m ];
			} );
		}
		
		static do_checked (val) {
			if(val) return 'checked="checked"';
		}
		
		static do_disabled (val) {
			if(val) return 'disabled="disabled"';
		}
		
		static do_read_only (val) {
			if(val) return 'readonly="readonly"';
		}
		
		static create_id (name, length = 6) {
			return Foundation.GetYoDigits(length, name);
		}
		
		static create_attrs (element, attrs) {
			// make sure element and attrs are object;
			if(typeof element !== 'object' || typeof attrs !== 'object') return;
			
			var only_key = ['required', 'readonly', 'disabled', 'checked'];
			for(var key in attrs) {
				let val = attrs[key];
				
				// key must be a string
				if(Number(key)) continue;
				
				// remove the id if blank
				if(key === 'id' && !val) {
					// this gets stripped out upon rendering if the id is blank so
					// we set it so if the value is FALSE
					element.id = '';
				}
				else if (val && typeof val === 'object') {
					// if class is not a string it must be an array
					if (key === 'class' && Array.isArray(val)) {
						for(let name of val) {
							element.classList.add(name);
						}
					}
					// datasets must be a key/value pair
					else if(key === 'data' && !Array.isArray(val)) {
						for(let key in val) {
							let val2 = val[key];
							if(val2 === true) {
								element.dataset[key] = '';
							}
							else if(val2 !== '') {
								element.dataset[key] = val2;
							}
						}
					}
				} else if (val !== '') {
					if(val === true && only_key.indexOf(key)) {
						element[key];
					} else if (key === 'class') {
						element.className = val;
					}
					else {
						element[key] = val;
					}
				}
			}
		}
		
		_create_element(element) {
			return element.render();
		}
	}

	class Form_input {
		constructor(type, name, value = '', attrs = {}) {
			this.type = type.toLowerCase();
			this.name = name;
			this.value = value;
			this.attrs = attrs;
		}
		
		render () {
			var input = document.createElement('input');
			var name, id = '';
			
			if(!this.attrs.hasOwnProperty('id')) {
				name = Form.create_id('form');
				id = this.type === 'radio' ? this.value.replace(' ', '_') : name; 
			}
			Form.create_attrs(input, this.attrs);
			if(input.id === '') input.removeAttribute('id');
			input.id = id;
			input.type = this.type;
			input.name = this.name;
			input.value = this.value;
			
			Form.create_attrs(input, this.attrs);
			return input;
		}
	}

	class Form_select {
		constructor(name, options, value = '', attrs = {}, first_option = '', disabled = []) {
			this.name = name;
			this.options = options;
			this.value = value;
			this.attrs = attrs;
			this.first_option = first_option;
			this.disabled = disabled;
		}
		
		render () {
			var select = document.createElement('select');
			var id = '';
			
			if(!this.attrs.hasOwnProperty('id')) {
				id = Form.create_id('form'); 
			}
			Form.create_attrs(select, this.attrs);
			select.id = id;
			select.name = this.name;
			if(this.first_option) {
				if(typeof this.first_option === 'object' && !Array.isArray(this.first_option)) {
					for(let key in this.first_option) {
						let val = this.first_option[key];
						let option = select.appendChild(document.createElement('option'));
						option.value = val;
						option.label = key;
						option.textContent = key;
					}
				} else {
					let option = select.appendChild(document.createElement('option'));
					let formprep = Form.prep(this.first_option);
					option.value = '';
					option.label = formprep;
					option.textContent = formprep;
				}
			}
			if(this.options && typeof this.options === 'object' && !Array.isArray(this.options)) {
				for(let key in this.options) {
					let val = this.options[key];
					if(Array.isArray(val)) {
						let optgroup = select.appendChild(document.createElement('optgroup'));
						optgroup.label = key;
						for(var key2 in val[key]) {
							var val2 = val[key][key2];
							optgroup.appendChild(this._write_options(key2, val2));
						}
					} else {
						select.appendChild(this._write_options(key, val));
					}
				}
			}
			return select;
		}
		
		_write_options (key, val) {
			var option = document.createElement('option');
			
			option.value = Form.prep(val);
			option.label = Form.prep(key);
			option.textContent = Form.prep(key);
			
			if(this.value) {
				if(Array.isArray(this.value)) {
					for(let i = 0; i < this.value.length; i++) {
						let s_val = this.value[i];
						
						if(key === s_val) {
							option.selected = true;
						}
						break;
					}
				}
				else {
					if(val === this.value && !this._selected_already) {
						option.selected= true;
						this._selected_already = true;
					}
				}
			}
			
			if(Array.isArray(this.disabled) && this.disabled.indexOf(key) !== -1) option.disabled = true;
			return option;
		}
	}

	class Form_textarea {
		constructor(name, value, attrs = {}) {
			this.name = name;
			this.value = value;
			this.attrs = attrs;
		}
		
		render () {
			var textarea = document.createElement('textarea');
			var id = ''; 
			if(!this.attrs.hasOwnProperty('id')) {
				id = Form.create_id('form');
			}
			
			if(!this.attrs.hasOwnProperty('rows')) {
				textarea.rows = 10;
			}
			
			if(!this.attrs.hasOwnProperty('rows')) {
				textarea.cols = 40;
			}
			
			Form.create_attrs(textarea, this.attrs);
			
			if(!textarea.id) textarea.id = id;
			textarea.name = this.name;
			textarea.value = this.value;
			
			return textarea;
		}
	}

	class Form_button {
		constructor(type, name, value = '', attrs = {}, text = '') {
			this.type = type;
			this.name = name;
			this.value = value;
			this.attrs = attrs;
			this.text = text;
		}
		
		render () {
			let button = document.createElement('button');
			let id = '';
			
			if(!this.attrs.hasOwnProperty('id')) {
				id = Form.create_id('form');
			}
			Form.create_attrs(button, this.attrs);
			button.id = id;
			button.type = this.type;
			button.name = this.name;
			button.value = this.value;
			button.textContent = this.text || this.value;
			
			return button;
		}
	}
	
	return Form;
});