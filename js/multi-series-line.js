/************************************************\
|**Source : http://nvd3.org/examples/line.html **|
*************************************************/

/***********************************************************************************************************************|
|******************************* - Modification apportée au script d3.js*******************************************|
|************************On crée une fonction paramétrée pour facilement manipuler le graphique.************************|
************************************************************************************************************************/

function msl(IdClass, CsvData, ylabel, LeftValue){

	/***Ajustement exemple : Read csv data and create a array of json objects for function nvd3Linegraph***/
	d3.csv(CsvData,function(err,data){
		/***Ajustement exemple : Recovering csv data in variable "data"***/
		/*These lines are all chart setup.  Pick and choose which chart features you want to utilize. */
		/***Ajustement exemple :  Constructs a range of twenty categorical colors***/
		/***Color is empty***/
		var color = d3.scale.category20();

		var dataToPlot = Object.keys(data[0]).filter(function(k){return k!="time"})
			/***Ajustement exemple : Recovering columns names (keys) in array and map a function to each keys element..***/
			.map(function(k){
				return {"key":k,
							"values":data.map(function(d){return {"x":+d.time, "y":+d[k]}}),
							"color": color(k)}
		 });
		 /***Ajustement exemple : La fonction mappée retourne un objet json où "key" contient le nom de la colonne (la clé), "values" contient
			des objets de la forme souhaitée pour chaque clé et donc commestible pour la fonction nv.addGraph de nvd3, et "color"
			contient automatiquement la valeur hexadécimale des couleurs par ordre croissant de la fonction d3.scale.category20().***/

		/***Ajustement exemple : Call new function nvd3Linegraph***/
		nvd3Linegraph(IdClass, dataToPlot, ylabel, LeftValue);
		console.log(dataToPlot);
	})


	/***Ajustement exemple : Creating a parametric function for nvd3 function "nv.addGraph"***/
	function nvd3Linegraph(IdClass, PlotData, ylabel, LeftValue){
		nv.addGraph(function() {
		  var chart = nv.models.lineChart()
						.margin({left: LeftValue})  //Adjust chart margins to give the x-axis some breathing room.
						.useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
						.duration(400)  //how fast do you want the lines to transition?
						.showLegend(true)       //Show the legend, allowing users to turn on/off line series.
						.showYAxis(true)        //Show the y-axis
						.showXAxis(true)        //Show the x-axis
		  ;

		  chart.xAxis     //Chart x-axis settings
			  .tickFormat(d3.format(',r'));

		  chart.yAxis     //Chart y-axis settings
			  .axisLabel(ylabel)
			  .tickFormat(d3.format('.02f'));

		  /* Done setting the chart up? Time to render it!*/
		  //var myData = sinAndCos();   //You need data...

		  d3.select(IdClass)//.append('svg')    //Select the <svg> element you want to render the chart in.
			  .datum(PlotData)//myData)         //Populate the <svg> element with chart data...
			  .call(chart);          //Finally, render the chart!

		  //Update the chart when window resizes.
		  nv.utils.windowResize(function() { chart.update() });
		  return chart;
		});
	}
}
