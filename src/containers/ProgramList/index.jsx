import React, { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchPrograms } from '../../actions/ProgramList';
import Loader from '../../components/Loader';
import ProgramListItem from '../../components/ProgramListItem';
import FilterButton from '../../components/FilterButton';

class ProgramList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: null,
            launch: null,
            land: null
        }
        this.yearList = [ '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', 
        '2015' , '2016', '2017', '2018', '2019','2020'];
    }

    componentDidMount() {
        this.props.fetchPrograms('');
    }

    // applying filters
    handleFilterClick = (type, value) => {
        switch(type) {
            case 'year':
                this.setState((prevState) => {
                    return {
                        year: prevState.year === value? null: value
                    };
                }, this.formatParam);
                break;
            case 'launch':
                this.setState((prevState) => {
                    return {
                        launch: prevState.launch === value? null: value
                    };
                }, this.formatParam);
                break;
            case 'land':
                this.setState((prevState) => {
                    return {
                        land: prevState.land === value? null: value
                    };
                }, this.formatParam);
                break;
            default:
                break;
        }
    }

    // framr query string
    formatParam = () => {
        let param = "";
        if (this.state.year !== null){
            param += "launch_year=" + this.state.year + "&";
        }
        if (this.state.launch !== null){
            param += "launch_success=" + this.state.launch + "&";
        }
        if (this.state.land !== null){
            param += "land_success=" + this.state.land + "&";
        }
        param = "&" + param.substring(0, param.length - 1);
        this.props.fetchPrograms(param);
    }

    render() {
        return(
            <div className="main-container">
                <h4>SpaceX Launch Programs</h4>
                <Fragment>
                    <div className="row program-list-container">
                        <div className="col-md-2 filters">
                            Filters
                            <div className="text-center p-1">
                                <span className="filter-title">Launch Year</span>
                            </div>
                            <div className="container-fluid row m-0">
                                {this.yearList.map((yr) => {
                                    return (
                                        <FilterButton 
                                            title={yr} 
                                            className={"col-5 btn green-pill" + 
                                                (this.state.year === yr ? "-active" : "")} 
                                            onClick={() => this.handleFilterClick('year', yr)} 
                                        />
                                    );
                                })}
                            </div>
                            <div className="text-center p-1">
                                <span className="filter-title">Successful Launch</span>
                            </div>
                            <div className="container-fluid row m-0">
                                <FilterButton 
                                    title="True" 
                                    className={"col-5 btn green-pill" + 
                                        (this.state.launch === "true" ? "-active" : "")} 
                                    onClick={() => this.handleFilterClick("launch", "true")} 
                                />
                                <FilterButton 
                                    title="False" 
                                    className={"col-5 btn green-pill" + 
                                        (this.state.launch === "false" ? "-active" : "")}  
                                    onClick={() => this.handleFilterClick("launch", "false")} 
                                />
                            </div>
                            <div className="text-center p-1">
                                <span className="filter-title">Successful Landing</span>
                            </div>
                            <div className="container-fluid row m-0">
                                <FilterButton 
                                    title="True" 
                                    className={"col-5 btn green-pill" + 
                                        (this.state.land === "true" ? "-active" : "")} 
                                    onClick={() => this.handleFilterClick("land", "true")} 
                                />
                                <FilterButton 
                                    title="False" 
                                    className={"col-5 btn green-pill" + 
                                        (this.state.land === "false" ? "-active" : "")}  
                                    onClick={() => this.handleFilterClick("land", "false")} 
                                />
                            </div>
                        </div>
                        <div className="col-md-10 program-list">
                        <div className="row program-list-row">
                            {this.props.loading ? <Loader style={{ margin: "auto" }} /> :
                            this.props.programList && (
                                    Object.entries(this.props.programList).map((val, key) => {
                                        return (
                                            <ProgramListItem 
                                                className="col-sm-1 col-md-6 col-lg-3 program-list-box"
                                                data={this.props.programList[key]} 
                                            />
                                        );
                                    })
                                )
                            }
                        </div>
                    </div>
                    </div>
                </Fragment>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.programList.loading,
    programList: state.programList.data
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchPrograms,
    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProgramList);