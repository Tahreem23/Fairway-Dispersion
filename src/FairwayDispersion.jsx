//MAIN COMPONENT
class FairwayDispersion extends React.Component {
  constructor(props) {
        super(props);
      
        this.state = {
            data: this.props.data
        };
      
      this.componentDidMount=this.componentDidMount.bind(this);
      this.ceilFunc=this.ceilFunc.bind(this);
      this.floorFunc=this.floorFunc.bind(this);
      this.showPopup=this.showPopup.bind(this);
      this.hidePopup=this.hidePopup.bind(this);
      
  }

componentWillMount() {
   
    //calculating min and max values of X and Y axis, and avg dispersion both INT and FLOAT
    
    var minY = 0, maxY = 0, minX = 0, maxX = 0, avgDispersion = 0.0, avgDispersionInt = 0, sumDispersionAllPositive = 0.0, sumCenterLineDist = 0.0;
    
    for(var i = 0; i < this.state.data.length; i++){  
        
        this.state.data[i].CENTER_LINE_DIST = parseFloat(this.state.data[i].CENTER_LINE_DIST);
        this.state.data[i].SHOT_DIST = parseFloat(this.state.data[i].SHOT_DIST);
        
        sumDispersionAllPositive += this.state.data[i].CENTER_LINE_DIST;
        
        if(this.state.data[i].CENTER_LINE_DIST > maxX){
            
            maxX = this.state.data[i].CENTER_LINE_DIST;
        }
        
        
        if(this.state.data[i].CENTER_LINE_DIST < minX){
            
            minX = this.state.data[i].CENTER_LINE_DIST;
        }
    }
    
     for(var i = 0; i < this.state.data.length; i++){
        
        if(this.state.data[i].LEFT_FLAG == "T"){
            
             this.state.data[i].CENTER_LINE_DIST = this.state.data[i].CENTER_LINE_DIST * -1;
        }
         
        sumCenterLineDist += this.state.data[i].CENTER_LINE_DIST;
     }
    
    avgDispersion = sumCenterLineDist / this.state.data.length;
    var avg = parseInt(sumDispersionAllPositive / this.state.data.length);
    avgDispersionInt = avg < 0 ? avg + -1 : avg;
    
    for(var i = 0; i < this.state.data.length; i++){
        
        if(this.state.data[i].SHOT_DIST > maxY){
            
            maxY = this.state.data[i].SHOT_DIST;
        }
        
        if(this.state.data[i].SHOT_DIST < minY){
            
            minY = this.state.data[i].SHOT_DIST;
        }
    }
    
    
    this.setState({
        
        maxY : maxY,        
        minY : minY,        
        maxX :  maxX,        
        minX :  minX,        
        avgDispersionInt : avgDispersionInt,
        avgDispersion: avgDispersion
    
    });

}
    
    componentDidMount() {
        
        var elements = Array.from(document.querySelectorAll('svg circle'));
                
        // add event listeners on cicles
        for(var i = 0; i < elements.length; i++) {

            elements[i].addEventListener("mouseenter", this.showPopup);
            elements[i].addEventListener("mouseleave",  this.hidePopup);
        }
        
              
        var svg = d3.select("svg"); console.log(svg);
        svg.selectAll(".axisY .tick text")
            .attr("transform", "translate(0,-10)");
        
         svg.selectAll(".axisY .tick line")
            .attr("x1", "-50")
            .attr("id", function(d, i){
                    return "yaxis"+d;
            });
        
        d3.select("yaxis0").attr("stroke", "none");
    }
      
    ceilFunc(N){
        
        return Math.ceil(N / 10) * 10;
    }
    
     floorFunc(N){
        
        return Math.round(N / 10) * 10;
    }
    
    showPopup(evt) {

        fairwayDispersionPopup.style.left = (evt.clientX + 20) + "px";
        fairwayDispersionPopup.style.top = (window.scrollY + evt.clientY + 10) + "px";
        fairwayDispersionPopup.style.display = "block";
        
        //expand size of circle on hover
        evt.target.attributes.r.nodeValue = '6.5';

        var currentCircle = JSON.parse(evt.target.attributes['data-update'].nodeValue);
        var yardCenterLineDist = parseInt(currentCircle.CENTER_LINE_DIST) < 0 ? parseInt(currentCircle.CENTER_LINE_DIST) * -1 : parseInt(currentCircle.CENTER_LINE_DIST);
        var yardMsg = yardCenterLineDist + ' yd ' + (currentCircle.LEFT_FLAG == "T" ? " left " : " right ") + "of center";
        
        popName.innerHTML = currentCircle.COURSE_NAME;
        popHole.innerHTML = "Hole " + currentCircle.HOLE_NO;
        popImgYds.innerHTML = parseInt(currentCircle.SHOT_DIST) + " yds";
        popYd.innerHTML = yardMsg;
        popDate.innerHTML = currentCircle.PLAYED_DT_TIME;
        
        
        if(currentCircle.FAIRWAY_FLAG == 'T'){
            
            greenCircle.style.display = "block";
            redCircle.style.display = "none";
        }
        else{
            
            greenCircle.style.display = "none";
            redCircle.style.display = "block";
        }
    }

    hidePopup(evt) {
        
        //put circle back to proginal size on hover out
        evt.target.attributes.r.nodeValue = '4.5';
        
        fairwayDispersionPopup.style.display = "none";
        
    }

  render() {
       
    const tooltipStyle = {
      display: this.state.hover ? 'block' : 'none'
    }
      
    const margin = {top: 20, right: 20, bottom: 30, left: 50};
    const width = 1000 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const data = this.state.data.map(d => d);
      
      
    const maxYCeil = this.ceilFunc(this.state.maxY) + 50;
   
    const maxXCeil = this.ceilFunc(this.state.maxX + 10);
    const minXFloor = this.ceilFunc(this.state.maxX + 10) * -1;
      
    var minYf = 0;  
    if(this.floorFunc(this.state.minY) - 50 < 0){
        
        minYf = 0;  
    } 
    else{
           minYf = this.floorFunc(this.state.minY) - 50;
    }
      
    const minYFloor = minYf;

    //binding CENTER_LINE_DIST with x axis
    const x = (d) => d['CENTER_LINE_DIST'];
    

    const xScale = d3.scaleLinear()
            .domain([minXFloor, maxXCeil])
            .range([0, width]);
      
    const xMap = (d) => {
      return xScale(x(d));
    };
      
    const xMapEclipse = (d) => {
      return xScale(d);
    };
      
      
    const xAxis = d3.axisBottom(xScale).tickFormat(function (d) {
        
                                                if(d != 0)    
                                                  return d + " yds";
                                                else return "";
                                                
                                        });

    //binding SHOT_DIST with y axis
    const y = (d) => d['SHOT_DIST'];
    const yScale = d3.scaleLinear()
                    .domain([minYFloor, maxYCeil])
                    .range([height, 0]);
    const yMap = (d) => {;
      return yScale(y(d));
    };
      
      
  const yMapEclipse = (d) => {
      return yScale(d);
    };
      
      
    const yAxis = d3.axisLeft(yScale).tickFormat(function (d) {
                                                if(d != minYFloor)
                                                  return d + " yds";
                                                else return "";
                                        }).tickSize(-width - 20, 0, 0);

    const svgContainerWidth = width + margin.left + margin.right;
    const svgContainerHeight = height + margin.top + margin.bottom + 200;
    const innerContainer = 'translate(' + margin.left + ',' + margin.top + ')';

    return (
        <div className='plot-block'>
            <svg width={svgContainerWidth} height='410' className="fairwayGraph">

                <g transform={innerContainer}>
                  <path className="vPath" d="M470 -20 v310 400"/>
                  <FairwayDispersionEllipse data={this.state.data} avgDisp={this.state.avgDispersion} x={xMapEclipse} y={yMapEclipse} maxXCeil={maxXCeil}/>
                  <FairwayDispersionAxis h={height} axis={xAxis} axisType="x" />
                  <FairwayDispersionAxis h={height} axis={yAxis} axisType="y" />
                  <FairwayDispersionPoints data={this.state.data} x={xMap} y={yMap} />
                </g>

            </svg>
            <div className="avgD">
                    <h3>{this.state.avgDispersionInt} yds </h3>
                    <p>Avg Dispersion</p>
            </div>

            <FairwayDispersionPopup data={this.state} />

        </div>
    );
  }
}

window.FairwayDispersion = FairwayDispersion;

