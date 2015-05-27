// class.js

class ClassService {
	constructor() {

	}

	getDescription(language) {
        switch(language) {
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
	}
}

angular.module('code-review.services.language-icon', [])
.service('languageIconService', ClassService);