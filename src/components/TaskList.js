import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import TaskItem from './TaskItem'

class TaskList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filterName: '',
			filterStatus: -1
		};
	}

	onChange = (event) => {
		var target = event.target;
		var name = target.name;
		var value = target.type === 'checkbox' ? target.checked : target.value;
		var filter = {
			name: name === 'filterName' ? value : this.state.filterName,
			status: name === 'filterStatus' ? value : this.state.filterStatus
		};
		this.props.onFilterTable(filter);
		this.setState({
			[name]: value
		});
	}

	render() {
		var { tasks, filterTable, keyword, sort } = this.props;
		//Filter by name and status
		if (filterTable.name) {
			tasks = tasks.filter(task => {
				return task.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1;
			});
		}
		tasks = tasks.filter(task => {
			if (filterTable.status === -1) return task;
			else return task.status === (filterTable.status === 1 ? true : false);
		});
		//Search
		if (keyword) {
			tasks = tasks.filter(task => {
				return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
			});
		}
		//Sort
		if (sort.by === 'name') {
			tasks.sort((a, b) => {
				if (a.name > b.name) return sort.value;
				else if (a.name < b.name) return -sort.value;
				else return 0;
			});
		} else {
			tasks.sort((a, b) => {
				if (a.status > b.status) return -sort.value;
				else if (a.status < b.status) return sort.value;
				else return 0;
			});
		}

		var elmTasks = tasks.map((task, index) => {
			return <TaskItem
				key={task.id}
				index={index}
				task={task}
			/>
		});
		return (
			<table className="table table-bordered table-hover">
				<thead>
					<tr>
						<th className="text-center">ID</th>
						<th className="text-center">Name</th>
						<th className="text-center">Status</th>
						<th className="text-center">Action</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td></td>
						<td>
							<input
								type="text"
								className="form-control"
								name="filterName"
								value={filterTable.name}
								onChange={this.onChange}
							/>
						</td>
						<td>
							<select
								className="form-control"
								name="filterStatus"
								value={filterTable.status}
								onChange={this.onChange}
							>
								<option value={-1}>All</option>
								<option value={0}>Hidden</option>
								<option value={1}>Active</option>
							</select>
						</td>
						<td></td>
					</tr>
					{elmTasks}
				</tbody>
			</table>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		tasks: state.tasks,
		filterTable: state.filterTable,
		keyword: state.search,
		sort: state.sort
	}
};
const mapDispatchToProps = (dispatch, props) => {
	return {
		onFilterTable: filter => {
			dispatch(actions.filterTask(filter));
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
