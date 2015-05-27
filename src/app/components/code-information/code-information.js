

function CodeInformationDirective () {
	var directive = {};

	directive.restrict = 'E';
	directive.scope = {
		'item' : '='
	};

	directive.template = `
			<div class="container">
                <div class="file-selector col-2">
        			<div class="file-selection" ng-class="ctrl.isSelected($index)" ng-click="ctrl.setItem($index)" ng-repeat="item in ctrl.data()">
                        <i class="fa fa-exclamation" ng-if="item.duplicates.length > 0"></i>
                        {{ item.filename }}
                    </div>
        		</div>

        		<div class="file-information col-8 primary" ng-class="ctrl.ranking().toLowerCase()">
                    <div class="dat-pad">
            			<h1>{{ ctrl.current.name() }}</h1>
                        <h2>Summary</h2>
                        <div>{{ ctrl.current.language() }}</div>
                        <div>{{ ctrl.current.totalLines() }}</div>
                        <div>{{ ctrl.current.codeLines() }}</div>
                        <div>{{ "And " + ctrl.currentItem().blank + " lines of white space." }}</div>
                        <div>{{ "Has " + ctrl.currentItem().averagelinelength + " characters per line on average." }}</div>
                        <div>{{ "Estimated development cost to write is $" + ctrl.currentItem().estimatedcost }}.</div>
                        <div>{{ "This file probably took " + ctrl.currentItem().estimateddevelopers }} developers to develop.</div>
                        <div>{{ "And in a professional setting could have taken " + ctrl.currentItem().effortmonths + " months of effort." }}</div>

                        <h2 ng-if="ctrl.current.hasDuplicates()" ng-click="ctrl.current.toggleDuplicates()">Potential Duplicates <i ng-class="ctrl.current.showDuplicates ? \'fa fa-plus\' : \'fa fa-minus\'"></i></h2>
                        <div ng-if="ctrl.current.showDuplicates">
                            <div ng-repeat="item in ctrl.currentItem().duplicates">
                                <h3>{{ item.filename }}</h2>
                                <div>{{ item.source }}</div>
                                <div>Repository name: {{ item.reponame }}</div>
                            </div>
                        </div>

                        <h2 ng-if="ctrl.current.techUsed()" >Technologies</h2>
                        {{ ctrl.current.techUsed() }}

                        <h2>Code</h2>
                        <pre class="code-block linenums"><code>{{ ctrl.current.code() }}</code></pre>
                    </div>
        		</div>
            </div>
	`;

	directive.link = function (scope, element, attributes) {
		console.log(scope);
	};

	return directive;
}

angular.module('code-review.components.code-information', [])

.directive('codeInformation,', CodeInformationDirective);