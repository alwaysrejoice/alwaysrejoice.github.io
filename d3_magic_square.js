
var type=['circle','rectangle','triangle','polygon'];
var typeInUse=type[0];
var lineData=[{"x":50, "y":20},{"x":20, "y":80},
				  {"x":80, "y":80},{"x":50, "y":20}];
var lineData2=[{"x":30, "y":0},{"x":0, "y":60},
				  {"x":60, "y":60},{"x":30, "y":0}];

var lineFunction=d3.line()
					.x(function(d){return d.x})
					.y(function(d){return d.y;})
					.curve(d3.curveLinear);	

var starData=[{"x":100, "y":10},{"x":40, "y":198},
				  {"x":190, "y":78},{"x":10, "y":78},
				  {"x":160, "y":198},{"x":100, "y":10}];
var linearScale = d3.scaleLinear().domain([0,200]).range([0,60]);
var linearScale2 = d3.scaleLinear().domain([0,200]).range([0,100]);
var newScaleData=[];
var newScaleData2=[]
for (var i=0; i<starData.length;i++){
		newScaleData[i]={"x": linearScale(starData[i].x), "y":linearScale(starData[i].y)};
		newScaleData2[i]={"x": linearScale2(starData[i].x), "y":linearScale2(starData[i].y)};
	}			  

	

function magic_matrix(n){
	// return a 2d array
	var matrix=[];
	var x=0, y=n>>1;
	var k;
	if(typeInUse==type[0])
	{
		for (var i=0; i<n; i++){
			
			for (var j=0; j<n-1; j++){
				var row={};
				row["cx"]=30+60*j;
				row["cy"]=30+60*i;
				row["row"]=i;
				row["col"]=j;
				row["radius"]=30;
				k=n*x+y+1;
				row["value"]=k;
				matrix.push(row);
				x=(x-1+n)%n;
				y=(y+1)%n;
			}
			row={};
			row["row"]=i;
			row["col"]=j;
			row["cx"]=30+60*(n-1);
			row["cy"]=30+60*i;
			row["radius"]=30;
			k=n*x+y+1;
			row["value"]=k;
			matrix.push(row);
			x=(x+1)%n;
		}
	}
	else if(typeInUse==type[1]){
		for (i=0; i<n; i++){
			
			for (j=0; j<n-1; j++){
				row={};
				row["x"]=60*j;
				row["y"]=60*i;
				row["row"]=i;
				row["col"]=j;
				row["width"]=60;
				row["height"]=60;
				k=n*x+y+1;
				row["value"]=k;
				matrix.push(row);
				x=(x-1+n)%n;
				y=(y+1)%n;
			}
			row={};
			row["row"]=i;
			row["col"]=j;
			row["x"]=60*(n-1);
			row["y"]=60*i;
			row["width"]=60;
			row["height"]=60;
			k=n*x+y+1;
			row["value"]=k;
			matrix.push(row);
			x=(x+1)%n;
		}
	}
	else{
		for (i=0; i<n; i++){
			
			for (j=0; j<n-1; j++){
				row={};
				row["x"]=60*j;
				row["y"]=60*i;
				row["row"]=i;
				row["col"]=j;
				k=n*x+y+1;
				row["value"]=k;
				matrix.push(row);
				x=(x-1+n)%n;
				y=(y+1)%n;
			}
			row={};
			row["row"]=i;
			row["col"]=j;
			row["x"]=60*(n-1);
			row["y"]=60*i;
			k=n*x+y+1;
			row["value"]=k;
			matrix.push(row);
			x=(x+1)%n;
		}
	}
	

	return matrix;
}

function validate_result(m,n){
	//calculate the constant
	var constant=n*(n*n+1)/2;
	//$("#validate").append("<div class='word'><b>Constant is</b> "+constant+"</div>");
	$("#validate").append($("<div></div>").addClass('word'));
	$(".word:last").append($("<b></b>").text("Constant is "))
	.append($("<span></span>").text(constant).addClass('count'));	
	//for horizontal
		var correct=0;
		var incorrect=0;
		for(i=0; i<n; i++){
			var total=0;
			for(j=0; j<n; j++){
				total+=m[i*n+j]["value"];

			}
			if(total==constant){
				correct++;	
			}else{
				incorrect++;
			}
		}
		//$("#validate").append("<div class='word'><b> Horizontal line:</b> "+correct+" (pass), "+incorrect+" (fail)</div>");
		$("#validate").append($("<div></div>").addClass('word'));
		$(".word:last").append($("<b></b>").text("Horizontal line: "))
		.append($("<span></span>").text(correct).addClass('count'))
		.append(" (pass), ")
		.append($("<span></span>").text(incorrect).addClass('count'))
		.append(" (fail)");	

	// for vertical
		correct=0;
		incorrect=0;
		for(i=0; i<n; i++){
			var total=0;
			for(j=0; j<n; j++){
				total+=m[j*n+i]["value"];

			}
			if(total==constant){
				correct++;
			}else{
				incorrect++;
			}
		}
		//$("#validate").append("<div class='word'><b> Vertical line:</b> "+correct+" (pass), "+incorrect+" (fail)</div>");
		$("#validate").append($("<div></div>").addClass('word'));
		$(".word:last").append($("<b></b>").text("Vertical line: "))
		.append($("<span></span>").text(correct).addClass('count'))
		.append(" (pass), ")
		.append($("<span></span>").text(incorrect).addClass('count'))
		.append(" (fail)");
	// for diagonal
	total=0;
	correct=0;
	incorrect=0;
	for(i=0; i<n; i++){
		total+=m[i*n+i]["value"];
	}
	if(total==constant){
		correct++;
	}else{
		incorrect++;
	}
	total=0;
	for(i=0; i<n; i++){
		total+=m[(i+1)*(n-1)]["value"];	
	}
	if(total==constant){
		correct++;
	}else{
		incorrect++;
	}
	//$("#validate").append("<div class='word'><b> Diagonal line:</b> "+correct+" (pass), "+incorrect+" (fail)</div>");
	$("#validate").append($("<div></div>").addClass('word'));
	$(".word:last").append($("<b></b>").text("Diagonal line: "))
	.append($("<span></span>").text(correct).addClass('count'))
	.append(" (pass), ")
	.append($("<span></span>").text(incorrect).addClass('count'))
	.append(" (fail)");	


}

$(document).ready(function(){
	var data;
	var num;
	var demo=d3.select("#shape")
	.append("svg")
	.attr("width",100)
	.attr("height",100);
	var circleSelection=demo.append("circle")
	.attr("cx",50)
	.attr("cy",50)
	.attr("r",30)
	.attr("stroke","green")
	.style("fill", "red");

	$("input").keyup(function(){
		var check_num=$("#number").val();
		console.log(check_num);
		if(Number(check_num)%2!=1 && check_num!=""){
			$(".tooltip").css("visibility", "visible");
			$(".tooltiptext").css("visibility", "visible");
			$("#magic").prop('disabled',true).addClass("disabled");
			$("#check").prop('disabled',true).addClass("disabled");
		}else{
			$(".tooltip").css("visibility", "hidden");
			$(".tooltiptext").css("visibility", "hidden");
			$("#magic").prop('disabled',false).removeClass("disabled");
			$("#check").prop('disabled',false).removeClass("disabled");
		
		}
	});

	$("#magic").click(function(){
		var color_table=["darkgray","darkorange","chartreuse","cyan","hotpink","khaki","mediumorchid"];
		var random_num=Math.floor(Math.random()*7);



		$("#square").empty();
		$("#validate").empty();
		num=Number($("#number").val());
		data=magic_matrix(num);
		
		//Create the SVG Viewport
 		var svgContainer = d3.select("#square").append("svg")
                                      .attr("width",60*num)
                                      .attr("height",60*num).style("border-style","outset");

		// Define the div for the tooltip
		var div = d3.select("body").append("div")	
		    .attr("class", "tooltipp")				
		    .style("opacity", 0);
		
		
		
		if(typeInUse==type[0]){
			//Add circles to the svgContainer
			var circles = svgContainer.selectAll("circle")
		                           .data(data)
		                           .enter()
		                           .append("circle");
			//Add the circle attributes
			var circleAttributes = circles
        	               .attr("cx", function (d) { return d.cx; })
        	               .attr("cy", function (d) { return d.cy; })
        	               .attr("r", function (d) { return d.radius; })
        	               .style("fill", function (d, i) {
        	               			 if (i%2==0){
        	               				return color_table[(random_num+1)%7];
        	               			}
        	               			return color_table[random_num]; })
        	               	.on("mouseover", function(d){
        	               			return div.transition().duration(200).style("opacity",0.9).	text("    row = "+d.row+", col = "+d.col+", value = "+d	.value+" ");
        	                })
        	         		.on("mousemove",function(){
        	         				return div.style("top", (event.pageY-10)+"px").		style("left",(event.pageX+10)+"px");})
        	         		.on("mouseout", function(d){
        	               			return div.transition().duration(500).style("opacity",0);
        	                });
	
			var text = svgContainer.selectAll("text")
			                     .data(data)
			                     .enter()
			                     .append("text");
			
			//Add SVG Text Element Attributes
			var textLabels = text
        	         .attr("x", function(d) { return d.cx; })
        	         .attr("y", function(d) { return d.cy+6; })
        	         .text( function (d) { return d.value; })
        	         .attr("font-family", "sans-serif")
        	         .attr("font-size", "20px")
        	         .attr("fill", "black")
        	         .attr("text-anchor","middle");
        }
        else if(typeInUse==type[1]){
        	//Add rectangle to the svgContainer
			var shape = svgContainer.selectAll("rect")
		                           .data(data)
		                           .enter()
		                           .append("rect");
			//Add the rectangle attributes
			var shapeAttributes = shape
        	               .attr("x", function (d) { return d.x; })
        	               .attr("y", function (d) { return d.y; })
        	               .attr("width", function (d) { return d.width; })
        	               .attr("height",function(d){return d.height;})
        	               .style("fill", function (d, i) {
        	               			 if (i%2==0){
        	               				return color_table[(random_num+1)%7];
        	               			}
        	               			return color_table[random_num]; })
        	               	.on("mouseover", function(d){
        	               			return div.transition().duration(200).style("opacity",0.9).	text("    row = "+d.row+", col = "+d.col+", value = "+d	.value+" ");
        	                })
        	         		.on("mousemove",function(){
        	         				return div.style("top", (event.pageY-10)+"px").		style("left",(event.pageX+10)+"px");})
        	         		.on("mouseout", function(d){
        	               			return div.transition().duration(500).style("opacity",0);
        	                });
	
			var text = svgContainer.selectAll("text")
			                     .data(data)
			                     .enter()
			                     .append("text");
			
			//Add SVG Text Element Attributes
			var textLabels = text
        	         .attr("x", function(d) { return d.x+30; })
        	         .attr("y", function(d) { return d.y+36; })
        	         .text( function (d) { return d.value; })
        	         .attr("font-family", "sans-serif")
        	         .attr("font-size", "20px")
        	         .attr("fill", "black")
        	         .attr("text-anchor","middle");

        }
        else if(typeInUse==type[2])
        {
        	
        	//Add triangles to the svgContainer
			shape = svgContainer.selectAll("g")
		                           .data(data)
		                           .enter()
		                           .append("g")
		                           .each(function(d,i){
		                           	group=d3.select(this).attr("transform","translate("+d.x+","+d.y+")")
		                           	group.append("path")
		                           	.attr("d",lineFunction(lineData2))
        	               .style("fill", i%2==0 ? color_table[(random_num+1)%7]:color_table[random_num])
        	               .on("mouseover", function(d){
        	               			return div.transition().duration(200).style("opacity",0.9).	text("    row = "+d.row+", col = "+d.col+", value = "+d	.value+" ");
        	                })
        	         		.on("mousemove",function(){
        	         				return div.style("top", (event.pageY-10)+"px").		style("left",(event.pageX+10)+"px");})
        	         		.on("mouseout", function(d){
        	               			return div.transition().duration(500).style("opacity",0);
        	                });
        	               
        	               	
        	               group.append("text")
        	                .attr("x", 30)
        	         .attr("y", 50)
        	         .text(d.value)
        	         .attr("font-family", "sans-serif")
        	         .attr("font-size", "20px")
        	         .attr("fill", "black")
        	         .attr("text-anchor","middle");
		                           });
		}
        else
        {
				
        	//Add polygons to the svgContainer
			shape = svgContainer.selectAll("g")
		                 .data(data)
		                 .enter()
		                 .append("g")
		                 .each(function(d,i){
		                 	group=d3.select(this).attr("transform","translate("+d.x+","+d.y+")")
		                    group.append("path")
		                           	.attr("d",lineFunction(newScaleData))
        	               .style("fill", i%2==0 ? color_table[(random_num+1)%7]:color_table[random_num])
        	               .on("mouseover", function(d){
        	               			return div.transition().duration(200).style("opacity",0.9).	text("    row = "+d.row+", col = "+d.col+", value = "+d	.value+" ");
        	                })
        	         		.on("mousemove",function(){
        	         				return div.style("top", (event.pageY-10)+"px").		style("left",(event.pageX+10)+"px");})
        	         		.on("mouseout", function(d){
        	               			return div.transition().duration(500).style("opacity",0);
        	                });
        	               
        	               	
        	               group.append("text")
        	                	.attr("x", 30)
        	         			.attr("y", 40)
        	         			.text(d.value)
        	         			.attr("font-family", "sans-serif")
        	         			.attr("font-size", "20px")
        	         			.attr("fill", "black")
        	         			.attr("text-anchor","middle");
		                    });
        }
		});



	
	$("#check").click(function(){
		$("#validate").empty();
		validate_result(data, num);

		$('.count').each(function () {
    	$(this).prop('Counter',0).animate(
    	{
        	Counter: $(this).text()
    	}, 
    	{
        	duration: 2000,
        	easing: 'swing',
        	step: function (now) {
            	$(this).text(Math.ceil(now));
        	}
    	});
		});


	});
		
	$("#circle").click(function(){
		typeInUse=type[0];
		$("#shape").empty();
		demo=d3.select("#shape")
				.append("svg")
				.attr("width",100)
				.attr("height",100);
		circleSelection=demo.append("circle")
							.attr("cx",50)
							.attr("cy",50)
							.attr("r",30)
							.attr("stroke","green")
							.attr("stroke-width",2)
							.style("fill", "red");
	});
	$("#triangle").click(function(){
		typeInUse=type[2];
		$("#shape").empty();
				  
	
		demo=d3.select("#shape")
				.append("svg")
				.attr("width",100)
				.attr("height",100);
		circleSelection=demo.append("path")
							.attr("d",lineFunction(lineData))
							.attr("stroke","blue")
							.attr("stroke-width",2)
							.style("fill", "red").style("opacity","0.5");
	});
	$("#rectangle").click(function(){
		typeInUse=type[1];
		$("#shape").empty();
		demo=d3.select("#shape")
				.append("svg")
				.attr("width",100)
				.attr("height",100);
		circleSelection=demo.append("rect")
							.attr("x",20)
							.attr("y",20)
							.attr("width",60)
							.attr("height",60)
							.attr("stroke","blue")
							.attr("stroke-width",2)
							.style("fill", "lime");
	});
	$("#polygon").click(function(){
		typeInUse=type[3];
		$("#shape").empty();
	
			
		demo=d3.select("#shape")
		.append("svg")
		.attr("width",100)
		.attr("height",100);
		circleSelection=demo.append("path")
							.attr("d",lineFunction(newScaleData2))
							.attr("stroke","blue")
							.attr("stroke-width",2)
							.style("fill", "yellow");
	});
	
	
});




    	
 

    