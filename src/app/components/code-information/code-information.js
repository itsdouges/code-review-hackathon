

function CodeInformationDirective () {
	var directive = {};

	directive.restrict = 'E';
	directive.scope = {
		'item' : '='
	};

	directive.template = [
		'hqweqweqw'
	].join('');

	directive.link = function (scope, element, attributes) {
		console.log(scope);
	};

	return directive;
}

angular.module('ai.components.code-information', [])

.directive('codeInformation,', CodeInformationDirective);