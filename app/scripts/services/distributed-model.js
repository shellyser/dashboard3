angular.module('dashApp')
.service('DistributedModel', function ($http, $q) {
	var distributedModel = this,
		URLS = {
			FETCH: '/data/enrollment/distributed'+'.json',
		},
		distributed;

		function extract(result){
				return result.data;
		}

		function cacheDistributed(result){
			distributed = extract(result);
			return distributed;
		};


		distributedModel.getDistributed = function getDistributed(params){
			return (distributed) ? $q.when(distributed) : $http.get(URLS.FETCH, params, {cache:true}).then(cacheDistributed);
		};

		distributedModel.getDistributedDelivered = function getDistributedDelivered(params1){
			return $http.get(URLS.FETCH, params1, {cache:true}).then(function(distributedDeliveredData){
				return distributedDeliveredData.data;
			});
		}

		distributedModel.getDistributedShipped = function getDistributedShipped(params2){
			return $http.get(URLS.FETCH, params2, {cache:true}).then(function(distributedShippedData){
				return distributedShippedData.data;
			});
		}

		distributedModel.getDistributedStatuses = function getDistributedStatuses(params1, params2){
			var distributedDeliveredPromise = distributedModel.getDistributedDelivered(params1),
					distributedShippedPromise = distributedModel.getDistributedShipped(params2);

			return $q.all([distributedDeliveredPromise, distributedShippedPromise]).then(function(resultArray){
				 return resultArray;
			});
		}

});