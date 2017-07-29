/*
    
 */


var DataCubeProxy = (function () {
    var instance;
    function init() {
        function genCubeId(pivot) {
            var dimFields = [];
            dimFields = dimFields.concat(pivot.xfields);
            dimFields = dimFields.concat(pivot.yfields);
            
            var dimFieldNames = [];
            for (var i in dimFields) {
			  //dimFieldNames.push(pivot.fieldNames[dimFields[i]]);
			  dimFieldNames.push(pivot.fields[dimFields[i]].field);
			}
			
			return dimFieldNames.join("_");
        }
        
        function merge(xfields, yfields, zfields){
            var mergeFields = [];
            mergeFields = mergeFields.concat(xfields);
            mergeFields = mergeFields.concat(yfields);
            mergeFields = mergeFields.concat(zfields);
            
            mergeFields.sort();
            return mergeFields;
        }
    
        function arrayToString(arr) {
            return arr.join(",");
        }
      
        var privateVariable = "Im also private";

        return {
       
            getCuboid : function (pivot) {
            	var xfields = pivot.xfields;
            	var yfields = pivot.yfields;
            	var zfields = pivot.zfields;
                var selectedFields = merge(xfields, yfields, zfields);
                var selectedFieldsStr = arrayToString(selectedFields);
                
                var dimFieldsId = genCubeId(pivot);
                if(dimFieldsId) {
	                $.ajax({ 
					     type: "GET",
					     dataType: "json",
					     url: cubeEndpoint + "/cuboids/" + dimFieldsId,
					     success: function(data){
							pivot.insertRecords(data);
					 	 }
				   });
			   }
	
            },
            
            publicProperty: "I am also public"   
        };
    };

    return {
        getInstance: function () {
            if ( !instance ) {
                instance = init();
            }
            
            return instance;
        }
    };
})();