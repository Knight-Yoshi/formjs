#ES6 Form Generator

##Overview
FormJS allows you to create forms and form elements in JavaScript. It's non-constrictive as to what you do with the form element(s) once they're generated.


---
 
##API

###Form ( attributes )

The Form API handles the form element creations. You will need to instantiate it first though. 
````javascript
var myform = new Form ( attributes );
````

###initalize ( attributes )
This is called when the Form object is instantiated. In most cases you won't need to call it directly, but if you want to change <form> attributes later this is what you use.

###create_form ( attributes )
Creats a form, <form>

````javascript
myform.create_form( {
	"class": "my-form new-form"
} ); // outputs, <form class="my-form new-form">
````

###create_multipart( attributes )
Creates a multipart form, <form enctype="multipart/form-data">

````javascript
myform.create_multipart( {
	"class": [
		"classes-in",
		"an-array"
	],
	"data": { "mr-crabs" : 'He was #1' }
} ); // outputs, <form class="classes-in an-array" data-mr-crabs="He was #1" enctype="multipart/form-data">
````

###create_fieldset ( fieldset_title, fieldset_id, attributes, )
Creates a fieldset, <fieldset> with a <legend>

````javascript
myform.create_fieldset('Hello World', {"name":"myfieldset"}, "my_fieldset"); 
// outputs, <fieldset name="myfieldset" id="my_fieldset">
// <legend>Hello World</legend>
// </fieldset>
````

###create_input ( name, type, value, attributes )
Creates an input, <input type="text" value="">

````javascript
myform.create_input( 'myinput', 'text', 'He touched the butt.' ); // outputs, <input type="text" name="myinput" value="He touched the butt">
````

###create_text ( name, value, attributes )
Creates an input, <input type="text" value="">

````javascript
myform.create_text( 'mytext', 'P. Sherman 42 Wallaby Way, Sydney' ); // outputs, <input type="text" name="mytext" value="P. Sherman 42 Wallaby Way, Sydney">
````

###create_password ( name, value, attributes )
Creates an input, <input type="password" value="">

````javascript
myform.create_password( 'mypassword', "A113" ); // outputs, <input type="password" name="mytext"> with a value of A113
````

###create_number ( name, value, attributes )
Creates an input, <input type="number" value="">

````javascript
myform.create_number( 'mynumber', "42" ); // outputs, <input type="number" name="mynumber" value="42">
````

###create_email ( name, value, attributes )
Creates an input, <input type="password" value="">

````javascript
myform.create_email( 'myemail', "email@example.com" ); // outputs, <input type="text" name="myemail" value="email@example.com">
````

###create_range ( name, value, attributes )
Creates an input, <input type="range" value="">

````javascript
myform.create_range( 'myrange', 1, {"min": 0, "max": 2} ); // outputs, <input type="number" name="myrange" value="1">
````

###create_url ( name, value, attributes )
Creates an input, <input type="url" value="">

````javascript
myform.create_url( 'myurl', "http://example.com" ); // outputs, <input type="url" name="myurl" value="http://example.com">
````

###create_search ( name, value, attributes )
Creates an input, <input type="search" value="">

````javascript
myform.create_search( 'mysearch', "Honey … where is my super suit?" ); // outputs, <input type="search" name="mysearch" value="Honey … where is my super suit?">
````

###create_hidden ( name, value, attributes )
Creates an input, <input type="hidden" value="">

````javascript
myform.create_hidden( 'myhidden', "To infinity … and beyond!" ); // outputs, <input type="hidden" name="myhidden" value="To infinity … and beyond!">
````

###create_radio ( name, value, attributes )
Creates an input, <input type="radio" value="">

````javascript
myform.create_radio( 'myradio', "No capes!" ); // outputs, <input type="radio" name="myradio" value="No capes!">
````

###create_checkbox ( name, value, attributes )
Creates an input, <input type="checkbox" value="">

````javascript
myform.create_checkbox( 'mycheckbox', "Wall-E" ); // outputs, <input type="checkbox" name="mycheckbox" value="Wall-E">
````

###create_file ( name, attributes )
Creates an input, <input type="file">

````javascript
myform.create_file( 'myfile' ); // outputs, <input type="myfile">
````

###create_select ( name, options, value, attributes, first_option, disabled )
Creates a select, <select>

````javascript
myform.create_select( 'myselect', {'Option 1': 'opt1', 'Option 2': 'opt2', 'Option 3': 'opt3'}, 'opt2', {}, 'Select Options', ['Option 3'] );
// outputs, <select name="myselect">
//	<option label="Select Options" value="">Select Options</option>
//	<option label="Option 1" value="opt1">Option 1</option>
//	<option label="Option 2" value="opt2">Option 2</option>
//	<option disabled="" label="Option 3" value="opt3">Option 3</option>
// </select>
````
first_option can also be an object for a key/value pair(s)

###create_textarea ( name, value, attributes )
Creates a textarea, <textarea>

````javascript
myform.create_textarea( 'mytextarea', 'Thanks for the adventure. Now go have a new one.' ); // outputs, <textarea name="mytextarea" value="Thanks for the adventure. Now go have a new one.">
````

###create_button ( value, name, type, attributes, use_input, text  )
Creates a button, <input type="..."> or <button type="...">

````javascript
myform.create_button( 'Button Value', 'mybutton', 'button', {'class': 'button'}, true, 'Click Me' ); // outputs, <input type="button" class="button" name="mybutton" value="Button Value">

myform.create_button( 'Button Value', 'mybutton', 'button', {'class': 'button'}, false, 'Click Me' ); // outputs, <button class="button" type="button" name="mybutton" value="Button Value">Click Me</button>
````

###create_submit ( value, name, attributes, use_input, text  )
Creates a button, <input type="submit"> or <button type="submit">

````javascript
myform.create_submit( 'Submit Value', 'mysubmit', {'class':'my-button submit'}, true, 'Submit'  ); // outputs, <input type="submit" class="my-button submit" name="mysubmit" value="Submit Value">

myform.create_submit( 'Submit Value', 'mysubmit', {'class':'my-button submit'}, false, 'Submit'  ); // outputs, <button class="my-button submit" type="submit" name="mysubmit" value="Submit Value">Submit</button>
````

###create_reset ( value, name, type, attributes, use_input, text  )
Creates a button, <input type="reset"> or <button type="reset">

````javascript
myform.create_reset( 'Reset Value', 'myreset', {'class':'my-button reset'}, true, 'Reset'  ); // outputs, <input type="reset" class="my-button reset" name="myreset" value="Reset Value">

myform.create_reset( 'Reset Value', 'myreset', {'class':'my-button reset'}, false, 'Reset'  ); // outputs, <button type="reset" class="my-button reset" name="myreset" value="Reset Value">Reset</button>
````

###create_image ( src, name, value, attributes  )
Creates an input image, <input type="image">

````javascript
myform.create_image( 'Reset Value', 'myreset', {'class':'my-button reset'}, true, 'Reset'  ); // outputs, <input type="reset" class="my-button reset" name="myreset" value="Reset Value">
````

## Incomplete docs

##Copyright and License
Copyright (c) 2016 C. Reffett
