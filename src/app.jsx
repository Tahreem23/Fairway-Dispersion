

class MainComponent extends React.Component{
    
    constructor(){
        
        super();
        
        this.state = {
            
            data: []
        }
        
        // Bind this to function updateData (This eliminates the error)
        this.updateData = this.updateData.bind(this);
    }
    
  componentWillMount() {

       //loading data from CSV file
        var csvFilePath = "./data/data100.csv";
       
        Papa.parse(csvFilePath, {
          header: true,
          download: true,
          skipEmptyLines: true,
       
          complete: this.updateData
        });
  }
    
  updateData(result) {
      
    //save CSV data in State  
    const data = result.data;    
    this.setState({data: data});
      
  }
    
    render(){
    
        if(!this.state.data.length)
            return null;
        
        return (
            <div>
                <h3></h3>
                <div className="bottom-right-svg">
                    <FairwayDispersion data={this.state.data}/>
                </div>
            </div>
        )
    }
};


ReactDOM.render(<MainComponent/>,document.getElementById("top-line-chart"));






