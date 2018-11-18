import React from 'react'
import {connect} from 'react-redux'
import {DateRangePicker} from 'react-dates'
import {setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from "../actions/filters";

export class ExpenseListFilter extends React.Component {
    
    state = {
        calenderFocused: null
    };

    onDatesChange = ( {startDate, endDate} ) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };

    onFocusChange = (calenderFocused) => {this.setState({calenderFocused})};
    
    render() {
        return (
            <div className="content-container">
                <div className="input-group">
                    <div className="input-group__item">
                        <input
                            className="text-input"
                            type="text"
                            value={this.props.filters.text}
                            name="description"
                            onChange={(e) => {
                                this.props.setTextFilter(e.target.value)
                            }}/>
                    </div>
                    <div className="input-group__item">
                        <select
                            className="select"
                            value={this.props.filters.sortBy}
                            onChange={(e) => {
                                const value = e.target.value;

                                if ( value === 'date' ) {
                                    this.props.sortByDate()
                                } else if ( value === 'amount' ) {
                                    this.props.sortByAmount()
                                }
                            }}
                        >
                            <option value="date">Date</option>
                            <option value="amount">Amount</option>
                        </select>
                    </div>
                    <div className="input-group__item">
                        <DateRangePicker
                            startDate={this.props.filters.startDate}
                            endDate={this.props.filters.endDate}
                            onDatesChange={this.onDatesChange}
                            focusedInput={this.state.calenderFocused}
                            onFocusChange={this.onFocusChange}
                            startDateId="range-start"
                            endDateId="range-end"
                            showClearDates={true}
                            numberOfMonths={1}
                            isOutsideRange={() => false}
                        />
                    </div>
                </div>
            </div>
        )
        
    }
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        sortByAmount: () => {dispatch(sortByAmount())},
        sortByDate: () => {dispatch(sortByDate())},
        setStartDate: (startDate) => dispatch(setStartDate(startDate)),
        setEndDate: (endDate) => dispatch(setEndDate(endDate)),
        setTextFilter: (text) => dispatch(setTextFilter(text))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilter);