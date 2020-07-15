 

//Global variables
var user_option='Null';
var basemap;
var overlaymap;
var map;
var districts = new  L.LayerGroup();
var layerControl;
var dst1,dst2,dst3,dst4,dst5,dst6,dst7,dst8,dst9,dst10,dst11,dst12,dst13,dst14;
var D1, D2;



var representatives =[ "State Stats",
                    "Buddy Carter",
                    "Sanford Bishop Jr.",
                    "Drew Ferguson IV",
                    "Henry “Hank” Johnson Jr.",
                    "John Lewis",
                    "Lucy McBath",
                    "Rob Woodall",
                    "Austin Scott",
                    "Doug Collins",
                    "Jody Hice",
                    "Barry Loudermilk",
                    "Rick Allen",
                    "David Scott",
                    "Tom Graves",
                    "David Perdue",
                    "Kelly Loeffler"
    ]

//read data from route1
var rep_url = "http://127.0.0.1:5000/reps";
var votes_url = "http://127.0.0.1:5000/votes";
var sponsored_url = "http://127.0.0.1:5000/sponsored";

//here read data from route2
//var url = "http://127.0.0.1:5000/route2";

//console.log(d3_obj);
//////////////////////////////////////////////
//read the database in the local directory ////
//run the python http server to read it//////
////////////////////////////////////////////////

d3.json(rep_url, function(data) {
  //console.log(data);
  menu = d3.select("#selDataset");

 //create initial plots when the page is loading
  make_init(data);

  //create the dropdown menu to select test subjects
  makeDropdown(representatives);

  //read the selected rep's name and update the user_option variable
  read_input();
  console.log(user_option);

 
  });

/////////////////////////////
//////function to create initial plots
/////////////////////
function make_init(data){
  var voter_value=[];
  var dist = [];
  err = [];
  avg =[]
  //read the data
  for (i=2;i<16;i++) {
    var n = 1000000/data[i][9];
    var err_n = n*Math.sqrt(n)/1000;
    voter_value.push(1000000/data[i][9]);
    dist.push(data[i][8]);
    err.push(err_n);
    avg.push(1000000*14/7196101 	)
    //console.log(voter_value,avg);
  }
 // console.log(dist);

  /// This part creates the information box
  var html_code = "<h4> Total Representatives: 16 </h4>" +
  "<br>" + "<h4> Senate : 2 </h4> " +
  "<br>" + "<h4> House : 14 </h4> ";
  document.getElementById("basic-info").innerHTML=html_code;

  // create a chart diplaying the voter value in each district (1/voters)
  var trace1 = 
  {
    x: dist,
    y: voter_value,
    name: 'dist.',
    error_y: {
      type: 'data',
      array: err,
      visible: true
    },
    mode: 'lines+markers',
    marker: {
    color: 'rgb(17, 157, 255)',
    //color: 'np.random.randn(500)',
    colorscale:'Viridis',
    showscale: 'True',
    size: 15
    // line: {
    //   color: 'rgb(231, 99, 250)',
    //   width: 1
    // }
  }
  };

 var trace2 =
 {
   x: dist,
   y:avg,  
   mode:'lines',
   name:'state avg.',
   type: 'scatter',
   line: {
     dash: 'dot',
     width: 3,
     color:'red'
    },
 };

  var data = [trace1,trace2];

  var layout = {
   title: 'Representatives per voter vs District',
   plot_bgcolor:"white",
    paper_bgcolor:"#FFF3",
    xaxis: {
    title: 'District',
    showgrid: false,
    zeroline: false,
    showline: true
   },
   yaxis: {
     title: 'Rep. per voter (x10^-6)',
     showline: true
    }
   };
  Plotly.newPlot('spider',data,layout);

  ////// chart shows the time in  seniority
  var name =[];
  var seniority=[];
  d3.json(rep_url, function(data){
    for(i=0;i<16;i++){name.push(data[i][1]);seniority.push(data[i][6]);}
    //console.log(name,seniority);
  //})
  var trace3 = {x: name, y:seniority, name: 'Seniority',type: 'scatter',
  mode: 'lines+markers',
  marker: {
    color: 'rgb(17, 157, 255)',
    size: 15
    // line: {
    //   color: 'rgb(231, 99, 250)',
    //   width: 1
    // }
  }
};
  var data1 = [trace3];
  var layout1 = {
    title: 'Seniority vs Representative',
    plot_bgcolor:"white",
    paper_bgcolor:"white",
    xaxis: {
     title: 'Name',
     showgrid: true,
     zeroline: false,
     showline: true,
     tickangle:-30
    },
    yaxis: {
      title: 'Seniority (years)',
      showline: true
     },
     
    };
    Plotly.newPlot('doughnut',data1,layout1);
  });
}// end of make_init
    
///////////////////////////////////////////////////////
//function to  create the dropdown menu
///////////////////////////////////////////////////////
function makeDropdown(names_list){
    var size = names_list.length;
    var html_code ;
    //console.log(size);
    for (i=0; i<size; i++){
     html_code = html_code+"<option value=" + names_list[i] + ">"+ names_list[i] + "</option>";
    }
    document.getElementById("selDataset").innerHTML=html_code;

  
}


/////////////////////////////////////
//function to listen to the user input
////////////////////////////////////
function read_input(){

  menu.on("change",read_userinput);
  menu.on("click",read_userinput);
  //console.log(user_option);

}

// ///////////////////////////////////
// //function to remove unwanted layers
// //////////////////////////
function remove_layers(){
 dst1.remove();
 dst2.remove();dst3.remove();dst4.remove();dst5.remove();dst6.remove();
 dst7.remove();dst8.remove();
 dst9.remove();dst10.remove();dst11.remove();dst12.remove();dst13.remove();dst14.remove();
}

/////////////////////////////////////////////
///MAKING GRAPHS
/////////////////////////////////////////////

function spiderGraph(district){
  //console.log(district);
  var member_id;
  var bill_ids = [];
  var unique = {};
  var subjects = [];
  
    d3.json(rep_url, function(data){
      for(i=2;i<16;i++){
        if (data[i][8]==district){
          member_id = data[i][2];        
        }
      }
    
    //});
  
    d3.json(votes_url, function(data){
      for(i=0;i<data.length;i++){
        if(data[i][3]==member_id && data[i][6]=="Yes"){ //&& data[i][4]=="Bill Passed"){
          subjects.push(data[i][7]);
        }
      }

   
    //});
    for(i=0;i<subjects.length;i++){
      unique[subjects[i]] = 1+(unique[subjects[i]] || 0); 
    }
/// PLOTLY
    var r_data = [];
    var theta_data = [];
    for(item in unique){
      r_data.push(unique[item]);
      theta_data.push(item);
    }
    for (i = 0; i < theta_data.length; i++) {
      temp = theta_data[i].split(' ');
      for (j = 0; j < temp.length; j++) {
        temp[j] = temp[j] + "<br>";
      }
      theta_data[i] = temp.join(' ');
    }
    data = [
      {
      type: 'scatterpolar',
      r: r_data,
      theta: theta_data,
      fill: 'toself'
    }]
    
    layout = {
      polar: {
        radialaxis: {
          visible: true,
          range: [0, 5]
        }
      },

      margin: {
        t:200,
        r:0
      }, 
      width:500,
      height:500,
      showlegend: false,
      title:{
        text:"Bills Voted 'Yes' by Catogory",
        fontSize: 20,
      fontFamily: "tahoma",
      padding:20
      
      }
    
    }
    
    Plotly.newPlot("spider", data, layout)
    

  });
});
}

//////////////////////////////////////////////////////////////
function donutGraph(district){
//console.log(district);
var member_id;
var subjects = [];
var unique = {};
var name;

  d3.json(rep_url, function(data){
    for(i=2;i<16;i++){
      if (data[i][8]==district){
        member_id = data[i][2];   
        name = data[i][1];     
      }
    }
  
  //});
//console.log(data);
  d3.json(sponsored_url, function(data){
    for(i=0;i<data.length;i++){
      if((data[i][6]==member_id) & (data[i][20]=="introduced")){
        subjects.push(data[i][8]);
      }
    }
  //});
  for(i=0;i<subjects.length;i++){
    unique[subjects[i]] = 1+(unique[subjects[i]] || 0); 
    
  }
  //CREATE DOUGHNUT
var chartData = [];
for(item in unique){

  chartData.push({"y":unique[item], "label":item});
}
  var chart = new CanvasJS.Chart("doughnut", {
    animationEnabled: true,
    title:{
      text: "Sponsored Bill Categories by "+name,
      horizontalAlign: "left",
      fontSize: 20,
      fontFamily: "tahoma",
      padding:20
    },
    data: [{
      type: "doughnut",
      startAngle: 60,
      //innerRadius: 60,
      indexLabelFontSize: 17,
      indexLabel: "{label} - #percent%",
      toolTipContent: "<b>{label}:</b> {y} (#percent%)",
      dataPoints: chartData
    }]
  });
  chart.render();
});
});
}

////////////////////////////////////
//read user input and update plots//
//all updates should be done inside this function
//////////////////////////////////////
function read_userinput(){
  d3.event.preventDefault();
  var menu1 = document.getElementById("selDataset");
  var temp = menu1.options[menu1.selectedIndex].text;   
  user_option = temp;

  //first clear the default plot
  d3.selectAll("#doughnut > *").remove();
  d3.selectAll("#spider > *").remove();
  // document.getElementById("rep-info").innerHTML= "<h4>" + "You selected " + temp + " add the plot/plots in this area" + "</h4>";


  //update district 1 map info
 //update district 1 map info
 if (temp == representatives[0])
 {
   console.log(temp);
  d3.json(rep_url, function(data) {
    //console.log(data);
    menu = d3.select("#selDataset");
   //create initial plots when the page is loading
    make_init(data);
    //create the dropdown menu to select test subjects
    makeDropdown(representatives);
   //read the selected rep's name and update the user_option variable
    read_input();
    console.log(user_option);
    //remove_layers();
    //map.addLayer(dst1);
  });
    map.setView(new L.LatLng(32.5, -82.9), 7); 
    remove_layers();
    map.addLayer(dst1);map.addLayer(dst2);map.addLayer(dst3);map.addLayer(dst4);map.addLayer(dst5);map.addLayer(dst6);map.addLayer(dst7);
    map.addLayer(dst8);map.addLayer(dst9);map.addLayer(dst10);map.addLayer(dst11);map.addLayer(dst12);map.addLayer(dst13);map.addLayer(dst14);
   
    
   

  
 }//end of if
 if (temp == representatives[1])
 {
   //d3.selectAll("#rep-info > *").remove();
 
   donutGraph(1);
   spiderGraph(1);
   map.setView(new L.LatLng(31.37, -82.287), 8); 
   remove_layers();
   map.addLayer(dst1,dst2);
  
 }//end of if
 if (temp == representatives[2])
 {
   //d3.selectAll("#rep-info > *").remove();
   donutGraph(2);
   spiderGraph(2);
   map.setView(new L.LatLng(31.95, -84.46), 8); 
   remove_layers();
   map.addLayer(dst2);
 }//end of if
 
 if (temp == representatives[3])
 {
   donutGraph(3);
   spiderGraph(3);
   map.setView(new L.LatLng(33.238, -84.858), 8); 
   remove_layers();
   map.addLayer(dst3);
 }//end of if
 if (temp == representatives[4])
 {
   donutGraph(4);
   spiderGraph(4);
   map.setView(new L.LatLng(33.815, -84.122), 8); 
   remove_layers();
   map.addLayer(dst4);
 }//end of if

 if (temp == representatives[5])
 {
   donutGraph(5);
   spiderGraph(5);
   map.setView(new L.LatLng(33.797, -84.3), 8); 
   remove_layers();
   map.addLayer(dst5);
 }//end of if
 if (temp == representatives[6])
 {
   donutGraph(6);
   spiderGraph(6);
   map.setView(new L.LatLng(34.043, -84.43), 8); 
   remove_layers();
   map.addLayer(dst6);
 }//end of if

 if (temp == representatives[7])
 {
   donutGraph(7);
   spiderGraph(7);
   map.setView(new L.LatLng(34.107, -84.133), 8); 
   remove_layers();
   map.addLayer(dst7);
 }//end of if
 if (temp == representatives[8])
 {
   donutGraph(8);
   spiderGraph(8);
   map.setView(new L.LatLng(31.494, -83.529), 8); 
   remove_layers();
   map.addLayer(dst8);
 }//end of if
 if (temp == representatives[9])
 {
   donutGraph(9);
   spiderGraph(9);
   map.setView(new L.LatLng(34.606, -83.716), 8); 
   remove_layers();
   map.addLayer(dst9);
 }//end of if
 if (temp == representatives[10])
 {
   donutGraph(10);
   spiderGraph(10);
   map.setView(new L.LatLng(33.514, -83.169), 8); 
   remove_layers();
   map.addLayer(dst10);
 }//end of if
 if (temp == representatives[11])
 {
   donutGraph(11);
   spiderGraph(11);
   map.setView(new L.LatLng(34.189, -84.738), 8); 
   remove_layers();
   map.addLayer(dst11);
 }//end of if
 
 if (temp == representatives[12])
 {
   donutGraph(12);
   spiderGraph(12);
   map.setView(new L.LatLng(32.445, -82.089), 8); 
   remove_layers();
   map.addLayer(dst12);
 }//end of if

 if (temp == representatives[13])
 {
   donutGraph(13);
   spiderGraph(13);
   map.setView(new L.LatLng(33.5966, -84.7485), 8); 
   remove_layers();
   map.addLayer(dst13);
 }//end of if

 if (temp == representatives[14])
 {
   donutGraph(14);
   spiderGraph(14);
   map.setView(new L.LatLng(34.615, -85.177), 8); 
   remove_layers();
   map.addLayer(dst14);
 }//end of if

  if (temp == representatives[15])
  {
    //center: [32.5, -82.9],
    var memberID = 'P000612';
    var subjects=[];
    var unique = {};

    d3.json(sponsored_url, function(data){
      for(i=0;i<data.length;i++){
        if((data[i][6]==memberID) & (data[i][20]=="introduced")){
          subjects.push(data[i][8]);
        }
      }
   // });
    //console.log(memberID);
    //console.log(subjects);

    for(i=0;i<subjects.length;i++){
      unique[subjects[i]] = 1+(unique[subjects[i]] || 0); 
      
    }
    //CREATE DOUGHNUT
    var chartData = [];
    for(item in unique){
  
      chartData.push({"y":unique[item], "label":item});
    }
    //console.log(unique);
    var chart = new CanvasJS.Chart("doughnut", {
      animationEnabled: true,
      title:{
        text: "Sponsored Bill Categories by " + temp,
        horizontalAlign: "left"
      },
      data: [{
        type: "doughnut",
        startAngle: 60,
        //innerRadius: 60,
        indexLabelFontSize: 17,
        indexLabel: "{label} - #percent%",
        toolTipContent: "<b>{label}:</b> {y} (#percent%)",
        dataPoints: chartData
      }]
    });
    chart.render();

  });

    map.setView(new L.LatLng(32.5, -82.9), 7); 
    remove_layers();
    map.addLayer(dst1);map.addLayer(dst2);map.addLayer(dst3);map.addLayer(dst4);map.addLayer(dst5);map.addLayer(dst6);map.addLayer(dst7);
    map.addLayer(dst8);map.addLayer(dst9);map.addLayer(dst10);map.addLayer(dst11);map.addLayer(dst12);map.addLayer(dst13);map.addLayer(dst14);
  }//end of if

  if (temp == representatives[16])
  {
    var memberID = 'P000612';
    var subjects=[];
    var unique = {};

    d3.json(sponsored_url, function(data){
      for(i=0;i<data.length;i++){
        if((data[i][6]==memberID) & (data[i][20]=="introduced")){
          subjects.push(data[i][8]);
        }
      }
   // });
    //console.log(memberID);
    //console.log(subjects);

    for(i=0;i<subjects.length;i++){
      unique[subjects[i]] = 1+(unique[subjects[i]] || 0); 
      
    }
    //CREATE DOUGHNUT
    var chartData = [];
    //name = 'temp'
    for(item in unique){
  
      chartData.push({"y":unique[item], "label":item});
    }
   // console.log(unique);
    var chart = new CanvasJS.Chart("doughnut", {
      animationEnabled: true,
      title:{
        text: "Sponsored Bill Categories by " + temp,
        horizontalAlign: "left"
      },
      data: [{
        type: "doughnut",
        startAngle: 60,
        //innerRadius: 60,
        indexLabelFontSize: 17,
        indexLabel: "{label} - #percent%",
        toolTipContent: "<b>{label}:</b> {y} (#percent%)",
        dataPoints: chartData
      }]
    });
    chart.render();

  });
    map.setView(new L.LatLng(32.5, -82.9), 7); 
    remove_layers();
    map.addLayer(dst1);map.addLayer(dst2);map.addLayer(dst3);map.addLayer(dst4);map.addLayer(dst5);map.addLayer(dst6);map.addLayer(dst7);
    map.addLayer(dst8);map.addLayer(dst9);map.addLayer(dst10);map.addLayer(dst11);map.addLayer(dst12);map.addLayer(dst13);map.addLayer(dst14);
    
  }//end of if


}//end of user_input


///////////////////////////////////////////////////////////////////////////
// Creating default map object

  // Adding tile layer
  var map1= L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  })

 // Adding a second tile layer
 var map2= L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  })

//read data file
// Load in geojson data
//var geoData = "static/data/Georgia_Senate_Districts.geojson";
//var geoData = "static/data/U.S._Congressional_Districts.geojson";
var geoData1 = "https://theunitedstates.io/districts/cds/2012/GA-1/shape.geojson";
var geoData2 = "https://theunitedstates.io/districts/cds/2012/GA-2/shape.geojson";
var geoData3 = "https://theunitedstates.io/districts/cds/2012/GA-3/shape.geojson";
var geoData4 = "https://theunitedstates.io/districts/cds/2012/GA-4/shape.geojson";
var geoData5 = "https://theunitedstates.io/districts/cds/2012/GA-5/shape.geojson";
var geoData6 = "https://theunitedstates.io/districts/cds/2012/GA-6/shape.geojson";
var geoData7 = "https://theunitedstates.io/districts/cds/2012/GA-7/shape.geojson";
var geoData8 = "https://theunitedstates.io/districts/cds/2012/GA-8/shape.geojson";
var geoData9 = "https://theunitedstates.io/districts/cds/2012/GA-9/shape.geojson";
var geoData10 = "https://theunitedstates.io/districts/cds/2012/GA-10/shape.geojson";
var geoData11 = "https://theunitedstates.io/districts/cds/2012/GA-11/shape.geojson";
var geoData12 = "https://theunitedstates.io/districts/cds/2012/GA-12/shape.geojson";
var geoData13 = "https://theunitedstates.io/districts/cds/2012/GA-13/shape.geojson";
var geoData14 = "https://theunitedstates.io/districts/cds/2012/GA-14/shape.geojson";


//adding distric 1
     d3.json(geoData1, function(data) {
    
        dst1 = L.geoJSON(data, {
         style: function() {
          return {
              color: "orange", 
              fillColor: "green",
              fillOpacity: 0.3
            }
         }
       }).addTo(map) //test
  
       .bindPopup("<h5>" +representatives[1]+ '<br>'+ 'Dist. : ' + 1 + "</h5>");
    })
//adding distric 2
    d3.json(geoData2, function(data) {
    
        dst2=L.geoJSON(data, {
        style: function() {
         return {
             color: "orange", 
             fillColor: "green",
             fillOpacity: 0.3
           }
        }
      }).addTo(map)
 
      .bindPopup("<h5>" +representatives[2]+ '<br>'+ 'Dist. : ' + 2 + "</h5>");
   })

   //adding district 3
   d3.json(geoData3, function(data) {   
    dst3=L.geoJSON(data, {
     style: function() {
     return {
         color: "orange", 
         fillColor: "green",
         fillOpacity: 0.3
       }
    }
    }).addTo(map)

  .bindPopup("<h5>" + representatives[3]+ '<br>'+'Dist. : ' + 3 + "</h5>");
  })

//adding district 4
d3.json(geoData4, function(data) {
    
    dst4=L.geoJSON(data, {
    style: function() {
     return {
         color: "orange", 
         fillColor: "green",
         fillOpacity: 0.3
       }
    }
  }).addTo(map)

  .bindPopup("<h5>" +representatives[4]+ '<br>'+ 'Dist. : ' + 4 + "</h5>");
})
//adding district 4
d3.json(geoData5, function(data) {
    
    dst5=L.geoJSON(data, {
    style: function() {
     return {
         color: "orange", 
         fillColor: "green",
         fillOpacity: 0.3
       }
    }
  }).addTo(map)

  .bindPopup("<h5>" + representatives[5]+ '<br>'+'Dist. : ' + 5 + "</h5>");
})
//adding district 6
d3.json(geoData6, function(data) {
    
    dst6=L.geoJSON(data, {
    style: function() {
     return {
         color: "orange", 
         fillColor: "green",
         fillOpacity: 0.3
       }
    }
  }).addTo(map)

  .bindPopup("<h5>" + representatives[6]+ '<br>'+'Dist. : ' + 6 + "</h5>");
})

//adding district 7
d3.json(geoData7, function(data) {
    
    dst7=L.geoJSON(data, {
    style: function() {
     return {
         color: "orange", 
         fillColor: "green",
         fillOpacity: 0.3
       }
    }
  }).addTo(map)

  .bindPopup("<h5>" +representatives[7]+ '<br>'+ 'Dist. : ' + 7+ "</h5>");
})
//adding district 8
d3.json(geoData8, function(data) {
    
    dst8=L.geoJSON(data, {
    style: function() {
     return {
         color: "orange", 
         fillColor: "green",
         fillOpacity: 0.3
       }
    }
  }).addTo(map)

  .bindPopup("<h5>" + representatives[8]+ '<br>'+'Dist. : ' + 8 + "</h5>");
})
//adding district 9
d3.json(geoData9, function(data) {
    
    dst9=L.geoJSON(data, {
    style: function() {
     return {
         color: "orange", 
         fillColor: "green",
         fillOpacity: 0.3
       }
    }
  }).addTo(map)

  .bindPopup("<h5>" +representatives[9]+ '<br>'+ 'Dist. : ' + 9 + "</h5>");
})
//adding district 10
d3.json(geoData10, function(data) {
    
    dst10=L.geoJSON(data, {
    style: function() {
     return {
         color: "orange", 
         fillColor: "green",
         fillOpacity: 0.3
       }
    }
  }).addTo(map)

  .bindPopup("<h5>" +representatives[10]+ '<br>'+ 'Dist. : ' + 10 + "</h5>");
})
//adding district 11
d3.json(geoData11, function(data) {
    
    dst11=L.geoJSON(data, {
    style: function() {
     return {
         color: "orange", 
         fillColor: "green",
         fillOpacity: 0.3
       }
    }
  }).addTo(map)

  .bindPopup("<h5>" +representatives[11]+ '<br>'+ 'Dist. : ' + 11 + "</h5>");
})
//adding district 12
d3.json(geoData12, function(data) {
    
    dst12=L.geoJSON(data, {
    style: function() {
     return {
         color: "orange", 
         fillColor: "green",
         fillOpacity: 0.3
       }
    }
  }).addTo(map)

  .bindPopup("<h5>" + representatives[12]+ '<br>'+'Dist. : ' + 12 + "</h5>");
})

//adding district 13
d3.json(geoData13, function(data) {
    
    dst13=L.geoJSON(data, {
    style: function() {
     return {
         color: "orange", 
         fillColor: "green",
         fillOpacity: 0.3
       }
    }
  }).addTo(map)

  .bindPopup("<h5>" + representatives[13]+ '<br>'+'Dist. : ' + 13 + "</h5>");
})
//adding district 14
d3.json(geoData14, function(data) {
    
    dst14=L.geoJSON(data, {
    style: function() {
     return {
         color: "orange", 
         fillColor: "green",
         fillOpacity: 0.3
       }
    }
  }).addTo(map)

  .bindPopup("<h5>" + representatives[14]+ '<br>'+'Dist. : ' + 14 + "</h5>");
})

basemap = {
    "Base Map":map1,
    "Light Map": map2
  };
overlaymap = {
    "Districts": districts,
};

map = L.map("map-cont", {
    center: [32.5, -82.9],
    zoom: 7,
    layers: [map1,districts]
    
});

// layerControl = L.control.layers(basemap, overlaymap, {
//     collapsed: false
// }).addTo(map);
//rep-info

layerControl = L.control.layers(basemap).addTo(map);

// map.on("click", function(e){
//   new L.Marker([e.latlng.lat, e.latlng.lng]).addTo(map);
// })



//finding the lat-lng values

// var popup = L.popup();

// // write a function that will populate the popup element using methods from the popup object
// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(map);
//         console.log(e.latlng);
// }

// // on click, run function to populate popup and open it on the map
// map.on('click', onMapClick);



 


