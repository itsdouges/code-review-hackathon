

function CodeService ($http) {

    var data = {};

    function buildUri(fileName) {
        return './data/' + fileName + '.json';
    }

	this.analyze = function (file) {

        var uri = buildUri(file.name);

        var promise = $http.get(uri);
		promise.success(function (e) {
            console.log(e);
            data = e;
        });

        return promise;

	};

    this.getResult = function () {
        return data;
    };

}

angular.module('code-review.services.code-service', [])

.service('codeService', CodeService);