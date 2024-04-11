import './FormInput.css';

// eslint-disable-next-line react/prop-types
function FormInput({ placeholder, refer, name}) {
	return (
		<div className='formInput'>
			<label htmlFor="name">User</label>
			<input type="text" name={name} placeholder={placeholder} ref={refer} />
		</div>
	)
}

export default FormInput
