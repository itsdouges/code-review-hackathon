// analyze-drop.js

'use strict';

function CodeDropDirective (codeService) {

var directive = {};
		directive.restrict = 'E';

		directive.controller = 'CodeAnalyzerController';
		directive.controllerAs = 'ctrl';

		directive.scope = {};

		directive.template = [
			'<input ng-if="itsGoTime()" onchange="angular.element(this).scope().onDrop(this)" class="full drop-file" type="file" />',				
			'<div ng-if="itsGoTime()" class="vertical">',
				'<img ng-if="itsGoTime() && !loading" style="margin-left: 1em;" src="./images/mi9.jpg"/><br/>',
				'<i ng-if="itsGoTime() && loading" class="fa fa-spinner code-drop-icon"></i>',
				'<i ng-if="itsGoTime() && !loading" class="fa fa-file-archive-o code-drop-icon"></i>',
				// '<h1 class="pretty">Mi9 Test Analyser</h1>',

			'</div>'
		].join('');

		directive.link = function (scope, element, attributes, controller) {
			scope.loading = false;

			window.loaded = false; // disgusting hack

			scope.itsGoTime = function () {

				return !window.loaded;

			};

			element.addClass('code-drop');

			scope.onDrop = function (e) {
				console.log(e.files);
				console.log('dropped');
				element.addClass('loading');
				scope.loading = true;
				scope.$apply();
				// todo: add upload call here

				// scope.$emit('codeLoaded'); // call this in the callback

				// set this in callback

				setTimeout(function () {
					codeService.analyze(e.files[0]).success(function () {
						window.loaded = true; // really bad hack. dont do this.
						element.removeClass('code-drop');
						// scope.$apply();
					});
				}, 5000);

				
			};

			element.on('dragenter', function (e) {
				e.preventDefault();
				console.log('in');

				element.addClass('dragging');
				return false;
			});

			element.on('dragleave', function (e) {
				e.preventDefault();  
				console.log('out');

				element.removeClass('dragging');
				return false;
			});
		}

		return directive;
}

angular.module('ai.components.code-drop', [])

.directive('codeDrop', CodeDropDirective);