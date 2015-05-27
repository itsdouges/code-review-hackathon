'use strict';

/* jshint ignore:end */

function CodeAnalyzerDirective () {
	var directive = {};
	directive.restrict = 'E';
	directive.controller = 'CodeAnalyzerController';
	directive.controllerAs = 'ctrl';
	directive.scope = {};
	directive.template = `
        <div class="code-analyzer" style="height: 100%" ng-if="ctrl.isLoaded()">
            <code-summary model="ctrl.getSummary()"></code-summary>
        </div>`;

    directive.link = function (scope, element, attributes) {
        // element.addClass('code-analyzer');
	};

	return directive;
}

// class CodeAnalyzerControllerr {
//     constructor($scope, codeService, rankDescriptionService, languageIconService) {
//         this.$scope = $scope;
//         this.codeService = codeService;
//         this.currentItem = 0;
//     }

//     readSummary() {

//     }

//     readItem() {

//     }

//     onItemSelected() {

//     }
// }

function CodeAnalyzerController (codeService, $scope, rankDescriptionService) {
        	
    var ctrl = this;
    var currentItem = 0;
    var showDuplicates = false;

    ctrl.getSummary = function () {
        let result = codeService.getResult();

        console.log('This is loaded a lot. Probably should fix this.');

        console.log(result);

        let stuff = {
            ranking: result.rank,
            rankingDescription: rankDescriptionService.getDescription(result.rank),
            scoreExplanation: result.description,
            mainLanguage: result.mainlanguage,
            technology: result.technologylist.join(', '),
            teams: result.reccomendedteams.join(', ')
        };

        console.log(stuff);

        return stuff;
    };

    ctrl.isLoaded = function () {
        return window.loaded;
    };

 //    ctrl.startOver = function () {
 //        window.loaded = false;
 //    };

 //    ctrl.currentItem = function () {
 //        return codeService.getResult().files[currentItem];
 //    };


	// ctrl.data = function () {
	// 	return codeService.getResult().files;
	// };

 //    ctrl.isSelected = function (index) {
 //        return currentItem === index ? 'selected ' + ctrl.ranking().toLowerCase() : '';
 //    };

 //    ctrl.current = {
 //        name: function () {
 //            return ctrl.currentItem().filename;
 //        },
 //        language: function () {
 //            return "This file was written in " + ctrl.currentItem().languagename + ".";
 //        },
 //        totalLines: function () {
 //            return "It has " + ctrl.currentItem().linescount + " lines of code.";
 //        },
 //        codeLines: function () {
 //            return "There are " + ctrl.currentItem().code + " lines of actual code.";
 //        },
 //        techUsed: function () {
 //            return ctrl.currentItem().technologies ? 
 //            ctrl.currentItem().technologies.join(', ') : '';
 //        },
 //        hasDuplicates: function () {
 //            return ctrl.currentItem().duplicates.length > 0;
 //        },
 //        showDuplicates: function () {
 //             return showDuplicates;
 //        },
 //        toggleDuplicates: function () {
 //            showDuplicates != showDuplicates;
 //        },
 //        duplicates: function () {
 //            if (ctrl.currentItem().duplicates.length > 0) {
 //                var duplicates = ctrl.currentItem().duplicates.map(function (item) {
 //                    return [
 //                        '<h2>' + item.filename + '</h2>',
 //                        '<div>' + item.sourceUrl + '</div>',
 //                        '<div>' + item.language + '</div>',
 //                        '<div>' + item.md5hash + '</div>',
 //                        '<div>' + item.filename + '</div>',
 //                        '<div>' + item.source + '</div>',
 //                        '<div>' + item.linescount + '</div>',
 //                        '<div>' + item.reponame + '</div>',
 //                        '<div>' + item.id + '</div>',
 //                    ].join('');
 //                });

 //                return duplicates;
 //            }

 //            return;
 //        },
 //        code: function () {
 //            return ctrl.currentItem().content ? ctrl.currentItem().content : 'This file is empty.';
 //        }
 //    };

	// ctrl.setItem = function (index) {
 //        showDuplicates = false;
	// 	currentItem = index;
	// };
}

angular.module('code-review.components.code-analyzer', [
    'code-review.components.code-information',
    'code-review.components.code-summary',
    'code-review.services.code-service',
    'code-review.services.rank-service'
])
.controller('CodeAnalyzerController', CodeAnalyzerController)
.directive('codeAnalyzer', CodeAnalyzerDirective);