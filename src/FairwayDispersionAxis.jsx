
//RENDERS X AND Y AXIS 
class FairwayDispersionAxis extends React.Component {
    constructor(props) {
        super(props);      
    }

    componentDidUpdate() {
        this.renderAxis();
    }

    componentDidMount() {
        
        this.renderAxis();
    }

    renderAxis() {
        const node = ReactDOM.findDOMNode(this);
        d3.select(node).call(this.props.axis);
    }

    render() {
        const translate = 'translate(0,'+(this.props.h)+')';

       
            if(this.props.axisType == 'x'){
                return (
                    <g className='axisX' transform={this.props.axisType == 'x' ? translate : "" }>
                    </g>   
                );
            }
            else{
                
                return(
                                
                    <g className='axisY' transform={this.props.axisType == 'x' ? translate : "" }>
                    
                    </g>   

                )
            }
            
        
    }
}


FairwayDispersionAxis.propTypes = {
    h: React.PropTypes.number,
    axis: React.PropTypes.func,
    axisType: React.PropTypes.oneOf(['x', 'y'])
};

window.FairwayDispersionAxis = FairwayDispersionAxis;