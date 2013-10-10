define(['handlebars',
		'text!templates/bodySectionTitle.html',
		'text!templates/bodySectionParagraph.html',
		'text!templates/bodySectionCode.html'],
function(Handlebars,
		 strTitleHtml,
		 strParagraphHtml,
		 strCodeHtml){
	return {

		// these 'types' have to match those found in new.haml,
		// in the keys of the quickkey init
		getRenderingFunctionForBodyType: function(strType){
			if(strType==='header'){
				return Handlebars.compile(strTitleHtml);
			}
			if(strType==='code'){
				return Handlebars.compile(strCodeHtml);
			}
			if(strType==='paragraph'){
				return Handlebars.compile(strParagraphHtml);
			}
		}
	}
})