// code-summary.js

function CodeSummaryComponent(languageIconService) {
	let directive = {};

	directive.template = `
		<div class="should-you-hire primary" ng-class="model.ranking">
            <div class="vertical syh-container">
                <div class="result">
                    {{ model.ranking }}
                    <span class="rank-des">[{{ model.rankingDescription }}]</span>
                </div>

                <div class="explanation">
                    {{ model.scoreExplanation }}
                </div>
            </div>
        </div>

        <div class="most-appropriate-team secondary" ng-class="model.ranking">
            <div class="vertical syh-container">
                <i ng-class="languageClass()" class="big-icon"></i><br/><br/>
                <div class="explanation"><strong>Most used language:</strong> {{ model.mainLanguage }}</div>
                <div class="explanation"><strong>Technologies:</strong> {{ model.technology }}</div>
                <div class="explanation"><strong>Suggested teams:</strong> {{ model.teams }}</div>
            </div>
        </div>`;

	directive.restrict = 'E';
	directive.scope = {
		'model': '='
	};

	directive.link = function (scope) {
		console.log(scope);

		scope.languageClass = function () {
			return languageIconService.getDescription(scope.model.mainLanguage);
		};
	};

	return directive;
}

angular.module('code-review.components.code-summary', [
    'code-review.services.language-icon',
    'code-review.services.rank-service'
])
.directive('codeSummary', CodeSummaryComponent);