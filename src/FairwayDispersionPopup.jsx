
//POP DISPLAYED ON CIRCLE HOVER
class FairwayDispersionPopup extends React.Component{
    
    constructor(props) {
        super(props);
    }
    
    render(){
        return(
        
                <div id="fairwayDispersionPopup">
                    
                    <div className="popH">
                        <div className="popName" id="popName"></div>
                        <div className="popHole"><span id="popHole"> </span></div>
                    </div>
                
                    <div className="popB">
                        <div className="popImgDiv">
                            <div className="popImg"> 
                        
                                    <svg height="50" width="100" id="greenCircle">
                                      <circle id="popCircle" cx="20" cy="20" r="15" fill='green' />
                                        <text x="13" y="20" fill="#000" dy=".3em">Dr</text>
                                    </svg>
            
                                    <svg height="50" width="100" id="redCircle">
                                      <circle id="popCircle" cx="20" cy="20" r="15" fill='#b53737' />
                                        <text x="13" y="20" fill="#000" dy=".3em">Dr</text>
                                    </svg>
                            </div>
                            <div className="popImgYds"> <span id="popImgYds"> </span></div>
                        </div>
            
                        <div className="popYdDiv">
                            <div className="popYd"> <span id="popYd"></span></div>
                            <div className="popDate" id="popDate"> </div>
                        </div>
                    </div>
                </div>
        );
    }
}

window.FairwayDispersionPopup = FairwayDispersionPopup;
