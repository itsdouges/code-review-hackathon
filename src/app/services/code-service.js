// code-service.js

class CodeService {
    constructor($http) {
        this.$http = $http;
        this.data = {};
    }

    analyze(file) {
        var uri = this.buildUri(file.name);

        function success(e) {
            this.data = e;
            console.log(this.data);
        }

        function error(e) {
            
        }

        var promise = this.$http.get(uri);
        promise.then(success.bind(this), error);

        return promise;
    }

    buildUri(fileName) {
        return './data/' + fileName + '.json';
    }

    getResult() {
        return this.data;
    }
}

angular.module('code-review.services.code-service', [])

.service('codeService', CodeService);