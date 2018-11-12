import React from 'react'
import expensesTotal from './../selectors/expenses-total'
import selectExpenses from './../selectors/expenses'
import {connect} from "react-redux";
import numeral from 'numeraljs';

export const ExpensesSummary = ({count, total}) => (
    <div>
        <h1>Viewing {count} expense/s totaling {numeral(total).format('$0,0.00')}</h1>
    </div>
);

const mapStateToProps = (state) => {
    let visibleExpenses = selectExpenses(state.expenses, state.filters);
    
    return {
        total: expensesTotal(visibleExpenses),
        count: visibleExpenses.length
    }
};

export default connect(mapStateToProps)(ExpensesSummary);