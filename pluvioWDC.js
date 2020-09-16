(function () {
    var myConnector = tableau.makeConnector();

myConnector.getSchema = function (schemaCallback) {
    var cols = [
	{
        id: "Date",
        alias: "Date",
        dataType: tableau.dataTypeEnum.date
    }, {
        id: "station",
        alias: "station",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "Pluvio_du_jour",
        alias: "Pluvio_du_jour",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "Cumul_du_mois",
        alias: "Cumul_du_mois",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "Cumul_moy_du_mois",
        alias: "Cumul_moy_du_mois",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "Cumul_periode",
        alias: "Cumul_periode",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "Cumul_moy_periode",
        alias: "Cumul_moy_periode",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "Cumul_mois_precedent",
        alias: "Cumul_mois_precedent",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "Cumul_periode_precedente",
        alias: "Cumul_periode_precedente",
        dataType: tableau.dataTypeEnum.float
    }];

    var tableSchema = {
        id: "pluviometrie",
        alias: "pluviometrie",
        columns: cols
    };

    schemaCallback([tableSchema]);
};

    myConnector.getData = function(table, doneCallback) {
    $.getJSON("http://www.agridata.tn/fr/api/3/action/datastore_search_sql?sql=SELECT * from \"e93a4205-84de-47a5-bcdb-e00520b15e10\"", function(resp) {
        var feat = resp.result.records,
            tableData = [];
var count = Object.keys(feat).length;
        // Iterate over the JSON object
        for (var i = 0, len = count; i < len; i++) {
            tableData.push({
				"Date": feat[i].Date,
				"station": feat[i].station,
				"Pluvio_du_jour": feat[i].Pluvio_du_jour,
				"Cumul_du_mois": feat[i].Cumul_du_mois,
				"Cumul_moy_du_mois": feat[i].Cumul_moy_du_mois,
				"Cumul_periode": feat[i].Cumul_periode,
				"Cumul_moy_periode": feat[i].Cumul_moy_periode,
				"Cumul_mois_precedent": feat[i].Cumul_mois_precedent,
                "Cumul_periode_precedente": feat[i].Cumul_periode_precedente
				
				
				
				
				
				
				
				
            });
        }

        table.appendRows(tableData);
        doneCallback();
    });
};
	$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "USGS Earthquake Feed";
        tableau.submit();
    });
});

    tableau.registerConnector(myConnector);
})();