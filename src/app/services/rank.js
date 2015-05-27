// rank.js

class RankService {
	constructor() {

	}

	getDescription(rank) {
    	switch(rank) {
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
	}
}

angular.module('code-review.services.rank-service', [])
.service('rankDescriptionService', RankService);