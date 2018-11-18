import React from 'react'
import moment from 'moment'
import {SingleDatePicker} from 'react-dates'

export default class ExpenseForm extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            description: props.expense ? props.expense.description : "",
            note: props.expense ? props.expense.note : "",
            amount: props.expense ? ((props.expense.amount / 100) * 100).toString() : "",
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calenderFocused: false,
            error: ''
        }; 
    }

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState({
            description
        })
    };

    onAmountChange = (e) => {
        const amount = e.target.value;

        if ( !amount || amount.match(/^\d*(\.\d{0,2})?$/) ) {
            this.setState({
                amount
            })
        }
    };

    onDateChange = (createdAt) => {

        if ( createdAt ) {
            this.setState({createdAt})
        }
    };

    onNoteChange = (e) => {
        const note = e.target.value;

        this.setState({
            note
        })
    };

    onSubmit = (e) => {
        e.preventDefault();

        if ( !this.state.description || !this.state.amount ) {
            this.setState({error: 'Please provide description and amount'})
        } else {
            this.setState({error: ''});
            
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount),
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note,
            })
        }
    };

    render() {
        return (
            <form onSubmit={this.onSubmit} className="form">
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input
                    type="text"
                    placeholder="Description"
                    autoFocus={true}
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                    className="text-input"
                />

                <input
                    type="text"
                    placeholder="Amount"
                    onChange={this.onAmountChange}
                    value={this.state.amount}
                    className="text-input"
                />

                <SingleDatePicker
                    id={"single-date-picker"}
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calenderFocused}
                    onFocusChange={({focused}) => this.setState({calenderFocused: focused})}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />

                <textarea
                    value={this.state.note}
                    placeholder="Add a note for your expense (optional)"
                    onChange={this.onNoteChange}
                    className="text-area"
                >
                    
                </textarea>

                <div>
                    <button className="button">Save Expense</button>
                </div>
            </form>
        )
    }
}
