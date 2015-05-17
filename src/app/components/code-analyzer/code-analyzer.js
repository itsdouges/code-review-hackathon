'use strict';

/* jshint ignore:end */

function CodeAnalyzerDirective () {
	var directive = {};

	directive.restrict = 'E';
	directive.controller = 'CodeAnalyzerController';
	directive.controllerAs = 'ctrl';
	directive.scope = {

	};
	directive.template = [
        '<div style="height: 100%" ng-if="ctrl.isLoaded()">',
    		'<div class="should-you-hire primary" ng-class="ctrl.ranking().toLowerCase()">',
                '<div class="vertical syh-container"><div class="result">{{ ctrl.ranking() }}<span class="rank-des"> [{{ctrl.rankedDes()}}]</span></div><div class="explanation">{{ ctrl.scoreExplanation() }}</div></div>',

            '</div>',

            '<div class="most-appropriate-team secondary" ng-class="ctrl.ranking().toLowerCase()">',
                '<div class="vertical syh-container">',
                    '<i ng-class="ctrl.mostUsedLanguageClass()" class="big-icon"></i><br/><br/>',
                    '<div class="explanation"><strong>Most used language:</strong> {{ ctrl.mainLanguage() }}</div>',
                    '<div class="explanation"><strong>Technologies:</strong> {{ ctrl.technologies() }}</div>',
                    '<div class="explanation"><strong>Suggested teams:</strong> {{ ctrl.mostAppropriateTeam() }}</div>',
                '</div>',
            '</div>',

            '<div class="container">',
                '<div class="file-selector col-2">',
        			'<div class="file-selection" ng-class="ctrl.isSelected($index)" ng-click="ctrl.setItem($index)" ng-repeat="item in ctrl.data()">',
                        '<i class="fa fa-exclamation" ng-if="item.duplicates.length > 0"></i>',
                        ' {{ item.filename }}',
                    '</div>',
        		'</div>',

        		'<div class="file-information col-8 primary" ng-class="ctrl.ranking().toLowerCase()">',
                    '<div class="dat-pad">',
            			'<h1>{{ ctrl.current.name() }}</h1>',
                        '<h2>Summary</h2>',
                        '<div>{{ ctrl.current.language() }}</div>',
                        '<div>{{ ctrl.current.totalLines() }}</div>',
                        '<div>{{ ctrl.current.codeLines() }}</div>',
                        '<div>{{ "And " + ctrl.currentItem().blank + " lines of white space." }}</div>',
                        '<div>{{ "Has " + ctrl.currentItem().averagelinelength + " characters per line on average." }}</div>',
                        '<div>{{ "Estimated development cost to write is $" + ctrl.currentItem().estimatedcost }}.</div>',
                        '<div>{{ "This file probably took " + ctrl.currentItem().estimateddevelopers }} developers to develop.</div>',
                        '<div>{{ "And in a professional setting could have taken " + ctrl.currentItem().effortmonths + " months of effort." }}</div>',

                        '<h2 ng-if="ctrl.current.hasDuplicates()" ng-click="ctrl.current.toggleDuplicates()">Potential Duplicates <i ng-class="ctrl.current.showDuplicates ? \'fa fa-plus\' : \'fa fa-minus\'"></i></h2>',
                        '<div ng-if="ctrl.current.showDuplicates">',
                            '<div ng-repeat="item in ctrl.currentItem().duplicates">',
                                '<h3>{{ item.filename }}</h2>',
                                '<div>{{ item.source }}</div>',
                                '<div>Repository name: {{ item.reponame }}</div>',
                            '</div>',
                        '</div>',

                        '<h2 ng-if="ctrl.current.techUsed()" >Technologies</h2>',
                        '{{ ctrl.current.techUsed() }}',

                        '<h2>Code</h2>',
                        '<pre class="code-block linenums"><code>{{ ctrl.current.code() }}</code></pre>',
                    '</div>',
        		'</div>',
            '</div>',
        '</div>'
        
	].join('');
	
    directive.link = function (scope, element, attributes) {
        element.addClass('code-analyzer');
	};

	return directive;
}

function CodeAnalyzerController (codeService, $scope) {
    
    	
    var ctrl = this;
    var currentItem = 0;

    // $scope.$on('codeLoaded', function () {

    //     console.log('cool we loaded son');
    //     window.loaded = true;
    //     $scope.$apply();

    // });


    ctrl.scoreExplanation = function () {
        return codeService.getResult().description;
    };

    ctrl.rankedDes = function () {
        
        switch(codeService.getResult().rank) {
            case 'A':
            return 'wesome';

            case 'B':
            return 'eautiful';

            case 'C':
            return 'ool';

            case 'D':
            return 'ull';

            case 'E':
            return 'hhhh..';

            case 'F':
            return 'ail..';
        }

        return '';
    };

    ctrl.mostUsedLanguageClass = function () {
        switch(codeService.getResult().mainlanguage.toLowerCase()) {
            case 'python':
            return 'devicon-python-plain';

            case 'c#':
            return 'devicon-csharp-line';

            case 'javascript':
            return 'devicon-javascript-plain';

            case'go':
            return 'devicon-go-plain';

            case 'java':
            return 'devicon-java-plain';

            case 'php':
            return 'devicon-php-plain';

            case 'ruby':
            return 'devicon-ruby-plain';
        }

        return 'fa fa-code';  
    };

    ctrl.isLoaded = function () {
        return window.loaded;
    };

    ctrl.startOver = function () {
        window.loaded = false;
    };

    ctrl.currentItem = function () {
        return codeService.getResult().files[currentItem];
    };

    ctrl.ranking = function () {
        return codeService.getResult().rank;
    };

	ctrl.data = function () {
		return codeService.getResult().files;
	};

    ctrl.description = function () {
        return codeService.getResult().description;
    };

    ctrl.mostAppropriateTeam = function () {
        return codeService.getResult().reccomendedteams.join(', ');
    };

    ctrl.isSelected = function (index) {
        return currentItem === index ? 'selected ' + ctrl.ranking().toLowerCase() : '';
    };

    ctrl.technologies = function () {
        return codeService.getResult().technologylist.join(', ');
    };

    var showDuplicates = false;

    ctrl.current = {
        name: function () {
            return ctrl.currentItem().filename;
        },
        language: function () {
            return "This file was written in " + ctrl.currentItem().languagename + ".";
        },
        totalLines: function () {
            return "It has " + ctrl.currentItem().linescount + " lines of code.";
        },
        codeLines: function () {
            return "There are " + ctrl.currentItem().code + " lines of actual code.";
        },
        techUsed: function () {
            return ctrl.currentItem().technologies ? 
            ctrl.currentItem().technologies.join(', ') : '';
        },
        hasDuplicates: function () {
            return ctrl.currentItem().duplicates.length > 0;
        },
        showDuplicates: function () {
             return showDuplicates;
        },
        toggleDuplicates: function () {
            showDuplicates != showDuplicates;
        },
        duplicates: function () {
            if (ctrl.currentItem().duplicates.length > 0) {
                var duplicates = ctrl.currentItem().duplicates.map(function (item) {
                    return [
                        '<h2>' + item.filename + '</h2>',
                        '<div>' + item.sourceUrl + '</div>',
                        '<div>' + item.language + '</div>',
                        '<div>' + item.md5hash + '</div>',
                        '<div>' + item.filename + '</div>',
                        '<div>' + item.source + '</div>',
                        '<div>' + item.linescount + '</div>',
                        '<div>' + item.reponame + '</div>',
                        '<div>' + item.id + '</div>',
                    ].join('');
                });

                return duplicates;
            }

            return;
        },
        code: function () {
            return ctrl.currentItem().content ? ctrl.currentItem().content : 'This file is empty.';
        }
    };

    ctrl.mainLanguage = function () {
        return codeService.getResult().mainlanguage;
    }

	ctrl.setItem = function (index) {
        showDuplicates = false;
		currentItem = index;
	};
}

angular.module('ai.components.code-analyzer', [
    'ai.components.code-information',
    'ai.services.code-service'
])
.controller('CodeAnalyzerController', CodeAnalyzerController)
.directive('codeAnalyzer', CodeAnalyzerDirective);