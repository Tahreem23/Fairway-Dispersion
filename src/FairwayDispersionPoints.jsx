

//RENDERS CIRCLES ON GRAPH 
class FairwayDispersionPoints extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const _self = this;
        const circles = _self.props.data.map((d, i) => {
            
            //renders green circle if FAIRWAY_FLAG is true
            if(d.FAIRWAY_FLAG == 'T'){
             
                            return (
                                <circle className="dot" r="4.5" data-update={JSON.stringify(d)} cx={_self.props.x(d)} cy={_self.props.y(d)} key={i} stroke="white" fill="rgb(147, 223, 127)"></circle>
                            );   
            }
            //renders red circle if FAIRWAY_FLAG is false
            else{
                                             
                        return (
                            <circle className="dot" r="4.5" data-update={JSON.stringify(d)} cx={_self.props.x(d)} cy={_self.props.y(d)} key={i}  stroke="white" fill="rgb(252, 113, 137)"></circle>
                        );
             }
        });
        return (
            <g>{circles}</g>
        );
    }
}

FairwayDispersionPoints.propTypes = {
    data: React.PropTypes.array,
    x: React.PropTypes.func,
    y: React.PropTypes.func
}

window.FairwayDispersionPoints = FairwayDispersionPoints;