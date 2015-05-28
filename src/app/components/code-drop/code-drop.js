// analyze-drop.js

'use strict';

class CodeDropController {
	constructor(codeService) {
		this.codeService = codeService;
	}

	onDrop(e) {
		this.onDragLeave();
		this.loading = true;
		console.log('file dropped');

		// TODO: Develop service call.
		function test() {
			window.loaded = true;
			
			this.codeService.analyze(e.files[0]).then(function () {
				console.log('file uploaded');
				window.loaded = true;
			});	
		}

		setTimeout(test.bind(this), 1000);
	}

	onDragEnter() {
		this.dragging = true;
	}

	onDragLeave() {
		this.dragging = false;
	}
}

function CodeDropDirective () {

	var LOADING_CLASS = 'loading';
	var DISABLED_CLASS = 'disabled';
	var DRAGGING_CLASS = 'dragging';

	var directive = {};
	directive.restrict = 'E';
	directive.controller = 'CodeDropController';
	directive.controllerAs = 'ctrl';
	directive.scope = {};

	directive.template =
		`<div class="code-drop" 
			ng-class="{` + 
				LOADING_CLASS + `: ctrl.loading,` + 
				DRAGGING_CLASS + `: ctrl.dragging }"
			ng-if="itsGoTime()">

			<input 
				onchange="angular.element(this).scope().onDrop(this)" 
				class="full drop-file" 
				type="file"
				ng-disabled="ctrl.loading" />
			
			<div class="vertical">
				<img ng-if="!ctrl.loading" style="margin-left: 1em;" src="./images/mi9.jpg"/><br/>
				<i ng-if="ctrl.loading" class="fa fa-spinner code-drop-icon"></i>
				<i ng-if="!ctrl.loading" class="fa fa-file-archive-o code-drop-icon"></i>
			</div>
		</div>`;

	directive.link = function (scope, element, attributes, controller) {
		scope.itsGoTime = function () {
			return !window.loaded;
		};

		scope.onDrop = function (e) {
			controller.onDrop(e);
			scope.$apply();
		};

		element.on('dragenter', function (e) {
			controller.onDragEnter();
			scope.$apply();
		});

		element.on('dragleave', function (e) {
			controller.onDragLeave();
			scope.$apply();
		});
	}

	return directive;
}

angular.module('code-review.components.code-drop', [])
.controller('CodeDropController', CodeDropController)
.directive('codeDrop', CodeDropDirective);