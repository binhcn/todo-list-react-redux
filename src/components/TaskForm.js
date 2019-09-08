import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class TaskForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			name: '',
			status: false
		}
		if (this.props.taskEditing && !this.props.taskEditing.id) {
			this.state = this.props.taskEditing;
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps && nextProps.taskEditing) {
			this.setState({
				id: nextProps.taskEditing.id,
				name: nextProps.taskEditing.name,
				status: nextProps.taskEditing.status
			});
		}
	}

	onCloseForm = () => {
		this.props.onCloseForm();
	}

	onChange = (event) => {
		var target = event.target;
		var name = target.name;
		var value = target.value;
		if (name === 'status') {
			value = value === 'true' ? true : false;
		}
		this.setState({
			[name]: value
		});
	}

	onSubmit = (event) => {
		event.preventDefault();
		this.props.onSaveTask(this.state);
		this.onCloseForm();
	}

	onClear = () => {
		this.setState({
			name: '',
			status: false
		});
	}
	render() {
		if (!this.props.isDisplayForm) return null;
		return (
			<div className="panel panel-warning">
				<div className="panel-heading">
					<h3 className="panel-title">
						{!this.state.id ? 'Add your task' : 'Update your task'}
						<span
							className="fa fa-times-circle text-right" onClick={this.onCloseForm}
						></span>
					</h3>
				</div>
				<div className="panel-body">
					<form onSubmit={this.onSubmit}>
						<div className="form-group">
							<label>Name: </label>
							<input
								type="text"
								className="form-control"
								name="name"
								value={this.state.name}
								onChange={this.onChange}
							/>
						</div>

						<label>Status: </label>
						<select
							className="form-control"
							name="status"
							value={this.state.status}
							onChange={this.onChange}
						>
							<option value={true}>Active</option>
							<option value={false}>Hidden</option>
						</select><br />

						<div className="text-center">
							<button type="submit" className="btn btn-warning">
								<span className="fa fa-plus mr-5"></span>Save
              </button>&nbsp;
              <button type="button" className="btn btn-danger" onClick={this.onClear}>
								<span className="fa fa-close mr-5"></span>Cancel
              </button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isDisplayForm: state.isDisplayForm,
		taskEditing: state.taskEditing
	}
};
const mapDispatchToProps = (dispatch, props) => {
	return {
		onSaveTask: task => {
			dispatch(actions.saveTask(task))
		},
		onCloseForm: () => {
			dispatch(actions.closeForm())
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
