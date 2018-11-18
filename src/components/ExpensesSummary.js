import React from 'react';
import { Link } from 'react-router-dom';
import expensesTotal from './../selectors/expenses-total';
import selectExpenses from './../selectors/expenses';
import {connect} from "react-redux";
import numeral from 'numeraljs';

export const ExpensesSummary = ({count, total}) => (
    <div className="page-header">
        <div className="content-container">
            <h1 className="page-header__title">Viewing <span>{count}</span> expense/s totaling <span>{numeral(total).format('$0,0.00')}</span></h1>
            <div className="page-header__actions">
                <Link className="button" to="/create">Add Expense</Link>
            </div>
        </div>
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